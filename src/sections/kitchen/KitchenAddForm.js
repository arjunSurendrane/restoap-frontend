import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// @mui
import { FieldArray, Form, Formik, FormikProvider, setIn, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import {
  Container,
  Typography,
  Box,
  useMediaQuery,
  Grid,
  Stack,
  Card,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { PATH_DASHBOARD } from '../../routes/paths';
import HasPermission from '../../auth/RightGuard';
import { useAuthContext } from '../../auth/useAuthContext';

// Redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBranches } from '../../redux/slices/branch';
import { createKitchen, updateKitchen } from '../../redux/slices/kitchen';

// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { StyledAddButton, StyledEditButton } from '../../theme/overrides/Button';

// ----------------------------------------------------------------------

KitchenAddForm.propTypes = {
  edit: PropTypes.bool,
  editValues: PropTypes.object,
  setEdit: PropTypes.func,
  store: PropTypes.string,
  setOpen: PropTypes.func,
  setDropdownValue: PropTypes.func,
};

export default function KitchenAddForm({
  edit,
  editValues,
  setEdit,
  store,
  setOpen,
  setDropdownValue,
}) {
  const { themeStretch } = useSettingsContext();
  const isDesktop = useMediaQuery('(min-width:1024px)');
  const stores = [];

  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const { branches, isLoading } = useSelector((state) => state.branch);
  const { roles } = useSelector((state) => state.role);
  const [selectedStore, setSelectedStore] = useState(null);
  useEffect(() => {
    const limit = 1000;
    dispatch(getBranches(limit));
  }, [dispatch]);

  branches?.results?.forEach((data) => {
    if (data.isActive) {
      stores.push({ id: data.id, store: data.location });
    }
  });

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: edit ? editValues?.name : '',
      store: edit ? editValues?.store : '',
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required('Kitchen Name is required'),
      store: user.storeId ? '' : Yup.string().required('Store is Required'),
    }),

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (edit) {
          if (user?.storeId) {
            values.store = user?.storeId;
          }
          values.id = editValues.id;
          setDropdownValue(values.store);
          const response = await dispatch(updateKitchen(values));
          if (`${response.status}`.startsWith('2')) {
            const message = 'success';
            notifySuccess(message);
            setEdit(false);
          }
          if (response.data.code === 409) {
            notifyError(response.data.message);
          }
        } else {
          if (user?.storeId) {
            values.store = user?.storeId;
          }
          const response = await dispatch(createKitchen(values));
          setDropdownValue(values.store);
          if (response?.status === 201) {
            notifySuccess(response?.statusText);

            resetForm();
          } else if (response.status === 409) {
            notifyError(response.data.message);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const {
    resetForm,
    setValues,
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
    handleChange,
  } = formik;

  useEffect(() => {
    setEdit(false);
    resetForm();
  }, [resetForm, setEdit, setFieldValue, store]);

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Card sx={{ padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
            <Stack spacing={3} mb={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Typography variant="h6">
                    {edit ? 'Edit Kitchen Type' : 'Create Kitchen Type'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <TextField
                    id="outlined-error-helper-text"
                    fullWidth
                    size="small"
                    label="Kitchen Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                <HasPermission permissionKey="GRANT_PERMISSION">
                  <Grid item xs={12} md={12} lg={12} xl={12}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">Select Store</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="store"
                        value={values.store}
                        label="Select Store"
                        onChange={handleChange}
                        error={Boolean(touched.store && errors.store)}
                        helperText={touched.store && errors.store}
                      >
                        {stores?.map((val) => (
                          <MenuItem value={val.id}>
                            {val.store.replace(/\b\w/g, (char) => char.toUpperCase())}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.store && errors.store && (
                        <FormHelperText error>{errors.store}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </HasPermission>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  {edit ? (
                    <StyledEditButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="small"
                      loading={isSubmitting}
                    >
                      Update Kitchen Type
                    </StyledEditButton>
                  ) : (
                    <StyledAddButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="small"
                      loading={isSubmitting}
                    >
                      Create Kitchen Type
                    </StyledAddButton>
                  )}
                </Grid>
              </Grid>
            </Stack>
          </Card>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
