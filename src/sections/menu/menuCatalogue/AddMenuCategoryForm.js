import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FieldArray, Form, Formik, FormikProvider, setIn, useFormik } from 'formik';

// @mui
import { LoadingButton } from '@mui/lab';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Container,
  Typography,
  Box,
  useMediaQuery,
  Grid,
  Stack,
  Card,
  Button,
  Select,
  Popover,
  MenuItem,
  FormControlLabel,
  Switch,
  InputLabel,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// import { makeStyles } from '@mui/styles';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useAuthContext } from '../../../auth/useAuthContext';

// Redux

import { useDispatch, useSelector } from '../../../redux/store';
import { getBranches } from '../../../redux/slices/branch';
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from '../../../redux/slices/category';
import { getRoles } from '../../../redux/slices/role';

// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// import FormProvider, { RHFAutocomplete, RHFTextField } from '../../../components/hook-form';
import CustomizedTables from '../../../components/table/MuiCustomTable';
import SvgColor from '../../../components/svg-color/SvgColor';
import BasicPagination from '../../../components/pagination/pagination';
import HasPermission from '../../../auth/RightGuard';
import { StyledAddButton, StyledEditButton } from '../../../theme/overrides/Button';
// import Select from 'src/theme/overrides/Select';

// ----------------------------------------------------------------------
MenuCategoryForm.propTypes = {
  editValue: PropTypes.object,
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
  count: PropTypes.number,
  notifySuccess: PropTypes.func,
  notifyError: PropTypes.func,
  setStoreId: PropTypes.func,
  page: PropTypes.string,
  limit: PropTypes.string,
};
export default function MenuCategoryForm({
  editValue,
  edit,
  setEdit,
  count,
  notifySuccess,
  notifyError,
  setStoreId,
  page,
  limit,
}) {
  const dispatch = useDispatch();

  const { branches, isLoading } = useSelector((state) => state.branch);
  const { categories } = useSelector((state) => state.category);
  const { roles } = useSelector((state) => state.role);
  const { user } = useAuthContext();
  console.log('userasdas editValue', editValue);

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: edit ? editValue?.name.replace(/\b\w/g, (char) => char.toUpperCase()) : '',
      store: edit ? editValue?.store.id.replace(/\b\w/g, (char) => char.toUpperCase()) : '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .trim()
        .matches(
          /^[a-zA-Z\s!@#$%^&*()-_=+[\]{}|;:'",.<>?/\\]+$/,
          'Category Name  can only contain letters'
        )
        .required('Category Name is required'),
      store: user.storeId ? '' : Yup.string().required('Store is required'),
    }),

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (edit) {
          values.active = editValue?.active;
          console.log('values in edit', values);
          const response = await dispatch(updateCategory(editValue.id, values, page, limit));
          console.log('response in category update', response);
          setStoreId(values.store);
          if (`${response.status}`.startsWith('2')) {
            const message = 'success';
            toast.success(message);
            resetForm();
          } else if (`${response.status}`.startsWith('4')) {
            notifyError(response.data?.message);
          }
          resetForm();
          setEdit(false);
        } else {
          console.log('values', values);
          if (user?.storeId) {
            values.store = user.storeId;
          }
          console.log('values', values);
          const response = await dispatch(createCategory(values));
          setStoreId(values.store);
          console.log('response succes category', response);
          if (`${response.status}`.startsWith('2')) {
            const message = 'success';
            toast.success(message);
          } else if (`${response.status}`.startsWith('4')) {
            notifyError(response.data?.message);
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
    resetForm();
    dispatch(getBranches());
  }, [dispatch, resetForm, count]);

  // delete category function
  const handleDelete = async (categoryId, store) => {
    await dispatch(deleteCategory(categoryId, store));
  };

  const handleChangeActive = async (row) => {
    console.log('valuedsfhj', row);

    await dispatch(updateCategory(row.id, !row.active));
    // setChecked(e.target.value);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} mb={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography variant="h5">{edit ? 'Edit Category' : 'Add Category'}</Typography>
                </Grid>

                <HasPermission permissionKey="GRANT_PERMISSION">
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Stores</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="store"
                        value={values.store}
                        label="Stores"
                        onChange={handleChange}
                        error={Boolean(touched.store && errors.store)}
                        helperText={touched.store && errors.store}
                      >
                        {branches?.results
                          ?.filter((val) => val.isActive)
                          ?.map((val) => (
                            <MenuItem value={val.id}>
                              {val.location.replace(/\b\w/g, (char) => char.toUpperCase())}
                            </MenuItem>
                          ))}
                      </Select>
                      {touched.store && errors.store && (
                        <FormHelperText error>{errors.store}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </HasPermission>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="outlined-error-helper-text"
                    fullWidth
                    label="Category Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                <Grid item xs={12} md={12} sx={{ textAlign: 'end' }}>
                  {!edit ? (
                    <StyledAddButton
                      fullWidth
                      // height="30px"
                      type="submit"
                      variant="contained"
                      size="small"
                      sx={{ padding: '5px' }}
                      loading={isSubmitting}
                    >
                      Add Menu Category
                    </StyledAddButton>
                  ) : (
                    <StyledEditButton
                      fullWidth
                      // height="30px"
                      type="submit"
                      variant="contained"
                      sx={{ padding: '5px' }}
                      size="small"
                      loading={isSubmitting}
                    >
                      Edit Menu Catalogue
                    </StyledEditButton>
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
