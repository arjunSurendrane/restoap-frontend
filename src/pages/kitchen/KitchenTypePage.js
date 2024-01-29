import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FieldArray, Form, Formik, FormikProvider, setIn, useFormik } from 'formik';

// @mui
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PATH_DASHBOARD } from '../../routes/paths';

// Redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBranches } from '../../redux/slices/branch';
import {
  getKitchens,
  deleteKitchen,
  kitchenStatus,
  deleteAllKitchenItems,
} from '../../redux/slices/kitchen';

// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import FormProvider, { RHFAutocomplete, RHFTextField } from '../../components/hook-form';
import RoleListTable from '../../sections/roles/rolesList';
import KitchenAddForm from '../../sections/kitchen/KitchenAddForm';
import KitchenListTable from '../../sections/kitchen/KitchensListTable';
import DeletePopUp from '../../components/PopUp/DeletePopUp';
import Iconify from '../../components/iconify/Iconify';
import { StyledAddButton, StyledCancelButton } from '../../theme/overrides/Button';

// ----------------------------------------------------------------------

export default function KitchenPage() {
  const { themeStretch } = useSettingsContext();
  const stores = [];

  const dispatch = useDispatch();
  const { branches, isLoading } = useSelector((state) => state.branch);
  const { kitchens } = useSelector((state) => state.Kitchen);
  const [selectedStore, setSelectedStore] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [store, setStore] = useState('');
  const [openPopUp, setOpenPopUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [kitchenId, setKitchen] = useState({});
  const [selectedValue, setSelectedValue] = useState('move');
  const [deleteResponse, setDeleteResponse] = useState({});
  const [dropdownValue, setDropdownValue] = useState('');
  useEffect(() => {
    const limit = 1000;
    dispatch(getBranches(limit));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getKitchens(store));
  }, [dispatch, store]);
  const handleDelete = async (id, storeId) => {
    setDeleteResponse({});
    const response = await dispatch(deleteKitchen(id, storeId));
    if (response.status === 409) {
      setOpenDeleteModal(true);
    }
  };

  const filteredKitchen = kitchens.filter(
    (kitchen) => kitchen.id !== kitchenId.id && kitchen.isActive !== false
  );
  branches?.results?.map((data) => stores.push({ id: data.id, store: data.location }));

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      KitchenType: '',
      radioGroup: 'move',
    },
    validationSchema: Yup.object().shape({
      KitchenType: selectedValue === 'move' && Yup.string().required('Kitchen Type is required'),
    }),

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (edit) {
          setEdit(false);
        } else {
          if (values.radioGroup === 'disable') {
            const data = {
              action: values.radioGroup,
              status: false,
            };
            const response = await dispatch(kitchenStatus(kitchenId.id, data, store));
            if (`${response.status}`.startsWith('2')) {
              const message = 'success';
              toast.success(message);
              setOpen(false);
            }
          }
          if (values.radioGroup === 'move') {
            const data = {
              kitchenId: values.KitchenType,
            };
            const response = await dispatch(kitchenStatus(kitchenId.id, data, store));
            if (`${response.status}`.startsWith('2')) {
              const message = 'success';
              toast.success(message);
              setOpen(false);
              setOpenDeleteModal(false);
            }
          }

          if (values.radioGroup === 'delete') {
            const data = {
              kitchenId: values.KitchenType,
            };
            const response = await dispatch(deleteAllKitchenItems(kitchenId.id, store));
            if (`${response.status}`.startsWith('2')) {
              const message = 'success';
              toast.success(message);
              setOpenDeleteModal(false);
            }
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

  return (
    <>
      <Helmet>
        <title>Restoap</title>
      </Helmet>

      <>
        <CustomBreadcrumbs
          iconName="/assets/icons/navbar/kitchentypeicon.svg"
          heading="Kitchen Type"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.dashboard },
            {
              name: 'Kitchen',
              //   href: PATH_DASHBOARD.eCommerce.menuCreate,
            },
            { name: 'Kitchen Type' },
          ]}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={4}>
            <KitchenAddForm
              edit={edit}
              editValues={editValues}
              setEdit={setEdit}
              store={store}
              setOpen={setOpen}
              setDropdownValue={setDropdownValue}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={8}>
            <KitchenListTable
              title="Kitchen Type"
              tableLabels={[
                { id: 'name', label: 'Kitchen Name' },
                { id: 'status', label: 'Enable/Disable' },
                { id: 'Action', label: 'Actions' },
              ]}
              setKitchen={setKitchen}
              setEdit={setEdit}
              setEditValues={setEditValues}
              setStore={setStore}
              setOpenPopUp={setOpenPopUp}
              setOpen={setOpen}
              deleteResponse={deleteResponse}
              setDropdownValue={setDropdownValue}
              dropdownValue={dropdownValue}
            />
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={() => {
            // onClose();
          }}
          // {...other}
          sx={{ borderRadius: '8px' }}
          maxheight="20px"
          maxWidth="460px"
          PaperProps={{
            sx: {
              borderRadius: '8px',
            },
          }}
        >
          <Box sx={{ width: '460px', borderRadius: '8px', marginBottom: '21px' }}>
            <DialogTitle
              sx={{
                height: '55px',
                backgroundColor: '#BB3138',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#FFF',
                fontFamily: 'Public Sans',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: 'normal',
              }}
            >
              Enable Or Disable Kitchen Type
              <Box sx={{ ':hover': { cursor: 'pointer' }, marginTop: '5px', marginRight: '-5px' }}>
                <Iconify
                  width="2rem"
                  color="#fff"
                  icon="mdi:close-box"
                  onClick={() => {
                    setOpen(false);
                    // onClose();
                    // resetForm();
                  }}
                />
              </Box>
            </DialogTitle>
            <Box padding="21px" width="460px">
              <FormikProvider value={formik}>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="radioGroup"
                      value={selectedValue}
                      onChange={(e) => {
                        handleChange(e);
                        setSelectedValue(e.target.value);
                      }}
                    >
                      <FormControlLabel value="move" control={<Radio />} label="Move Item" />
                      <FormControlLabel
                        value="disable"
                        control={<Radio />}
                        label="Disable Kitchen Type"
                      />
                    </RadioGroup>
                  </FormControl>
                  {selectedValue === 'move' && (
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-select-small-label">Kitchen Type</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        name="KitchenType"
                        value={values?.KitchenType} 
                        label="KitchenType"
                        onChange={handleChange} 
                        error={Boolean(touched.KitchenType && errors.KitchenType)}
                        helperText={touched.KitchenType && errors.KitchenType}
                      >
                        {filteredKitchen?.map((data) => (
                          <MenuItem value={data.id}>{data.name}</MenuItem>
                        ))}
                      </Select>
                      {touched.KitchenType && errors.KitchenType && (
                        <FormHelperText error>{errors.KitchenType}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                  <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <StyledCancelButton onClick={() => setOpen(false)}>Cancel</StyledCancelButton>
                    <StyledAddButton type="submit">Confirm</StyledAddButton>
                  </Box>
                </Form>
              </FormikProvider>
            </Box>
          </Box>
        </Dialog>

        <Dialog
          open={openDeleteModal}
          // maxWidth="sm"
          onClose={() => {
            setOpenDeleteModal(false);
            // onClose();
          }}
          // {...other}
          sx={{ borderRadius: '8px' }}
          maxheight="20px"
          maxWidth="460px"
          PaperProps={{
            sx: {
              borderRadius: '8px',
            },
          }}
        >
          <Box sx={{ width: '460px', borderRadius: '8px', marginBottom: '21px' }}>
            <DialogTitle
              sx={{
                height: '55px',
                backgroundColor: '#BB3138',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#FFF',
                fontFamily: 'Public Sans',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: 'normal',
              }}
            >
              Move Or Delete Permanently Kitchen Type
              <Box sx={{ ':hover': { cursor: 'pointer' }, marginTop: '5px', marginRight: '-5px' }}>
                <Iconify
                  width="2rem"
                  color="#fff"
                  icon="mdi:close-box"
                  onClick={() => {
                    setOpenDeleteModal(false);
                    // onClose();
                    // resetForm();
                  }}
                />
              </Box>
            </DialogTitle>
            <Box padding="21px" width="460px">
              <FormikProvider value={formik}>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="radioGroup"
                      value={selectedValue}
                      onChange={(e) => {
                        handleChange(e);
                        setSelectedValue(e.target.value);
                      }}
                    >
                      <FormControlLabel value="move" control={<Radio />} label="Move Item" />
                      <FormControlLabel
                        value="delete"
                        control={<Radio />}
                        label="Delete Kitchen Type"
                      />
                    </RadioGroup>
                  </FormControl>
                  {selectedValue === 'move' && (
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-select-small-label">Kitchen Type</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        name="KitchenType"
                        value={values?.KitchenType} 
                        label="KitchenType"
                        onChange={handleChange} 
                        error={Boolean(touched.KitchenType && errors.KitchenType)}
                        helperText={touched.KitchenType && errors.KitchenType}
                      >
                        {filteredKitchen?.map((data) => (
                          <MenuItem value={data.id}>{data.name}</MenuItem>
                        ))}
                      </Select>
                      {touched.KitchenType && errors.KitchenType && (
                        <FormHelperText error>{errors.KitchenType}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                  <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <StyledCancelButton onClick={() => setOpenDeleteModal(false)}>
                      Cancel
                    </StyledCancelButton>
                    <StyledAddButton type="submit">Confirm</StyledAddButton>
                  </Box>
                </Form>
              </FormikProvider>
            </Box>
          </Box>
        </Dialog>

        <DeletePopUp
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
          setConfirmDelete={handleDelete}
          itemId={kitchenId.id}
          storeId={kitchenId.store}
          content="Are you sure you want to delete? You can't undo this action."
        />
      </>
    </>
  );
}
