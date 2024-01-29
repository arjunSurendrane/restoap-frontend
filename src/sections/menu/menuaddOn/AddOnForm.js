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
import InfoIcon from '@mui/icons-material/Info';
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
  InputAdornment,
  Tooltip,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PATH_DASHBOARD } from '../../../routes/paths';

// Redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getBranches } from '../../../redux/slices/branch';
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from '../../../redux/slices/category';
import { createAddOn, updateAddOn, getAddOns } from '../../../redux/slices/addOns';
import { getRoles } from '../../../redux/slices/role';

// components
import HasPermission from '../../../auth/RightGuard';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import CustomizedTables from '../../../components/table/MuiCustomTable';
import SvgColor from '../../../components/svg-color/SvgColor';
import BasicPagination from '../../../components/pagination/pagination';
import { useAuthContext } from '../../../auth/useAuthContext';
import Iconify from '../../../components/iconify/Iconify';
import {
  StyledActionsBox,
  StyledAddButton,
  StyledEditButton,
} from '../../../theme/overrides/Button';

// ----------------------------------------------------------------------
MenuAddOnForm.propTypes = {
  editAddonValue: PropTypes.object,
  edit: PropTypes.bool,
  open: PropTypes.bool,
  setEdit: PropTypes.func,
  setOpen: PropTypes.func,
  handleClose: PropTypes.func,
  notifyError: PropTypes.func,
  notifySuccess: PropTypes.func,
  setImgUrl: PropTypes.func,
  imgUrl: PropTypes.string,
};
export default function MenuAddOnForm({
  edit,
  open,
  editAddonValue,
  setImgUrl,
  imgUrl,
  setEdit,
  setOpen,
  handleClose,
  notifyError,
  notifySuccess,
}) {
  console.log('edit value in addon', edit, editAddonValue);
  const dispatch = useDispatch();
  // const notifySuccess = () => toast.success('Category Added successfully!');
  // const notifyError = () => toast.error('Cant Add Category!');
  const { branches, isLoading } = useSelector((state) => state.branch);
  const { categories } = useSelector((state) => state.category);
  const { roles } = useSelector((state) => state.role);
  // const [imgUrl, setImgUrl] = useState(editAddonValue.image ? editAddonValue.image.path : '');
  // eslint-disable-next-line no-unneeded-ternary
  const [variant, setVariant] = useState(editAddonValue?.variants?.length > 0 ? true : false);
  const { user } = useAuthContext();
  console.log('variant', variant);
  // useEffect(() => {
  //   if (!edit) {
  //     setVariant(false);
  //   }
  // }, [edit]);
  useEffect(() => {
    if (edit && editAddonValue.image) {
      setImgUrl(editAddonValue.image.path);
    }
  }, [edit, editAddonValue, setImgUrl]);

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: edit ? editAddonValue.name.replace(/\b\w/g, (char) => char.toUpperCase()) : '',
      storeId: edit ? editAddonValue.storeId.id.replace(/\b\w/g, (char) => char.toUpperCase()) : '',
      // eslint-disable-next-line no-nested-ternary
      variants: edit
        ? editAddonValue.variants.length > 0
          ? editAddonValue.variants
          : [
              {
                name: '',
                price: '',
              },
            ]
        : [{ name: '', price: '' }],
      price: edit ? editAddonValue.price : '',
      taxInclude: edit ? editAddonValue?.taxInclude : false,
      image: edit ? editAddonValue?.image : {},
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .trim()
        .required('AddOn Name is required')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Name can only contain letters'),
      storeId: user.storeId ? '' : Yup.string().required('Store is required'),
      price: !variant ? Yup.number().required('price is required') : '',
      variants: variant
        ? Yup.array(
            Yup.object().shape({
              name: Yup.string().required('Size Name is required'),
              price: Yup.string()
                .required('Price is Required')
                .matches(/^[0-9]+$/, 'Price must be number'),
            })
          )
        : '',
    }),

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (edit) {
          console.log('values in addons', values);
          const formData = new FormData();
          formData.append('storeId', user.storeId ? user.storeId : values.storeId);
          formData.append('image', values.image.name ? values.image : null);
          formData.append('name', values.name);
          formData.append('taxInclude', values.taxInclude);
          if (variant) {
            values.price = values.variants[0].price;
            formData.append('price', values.price);
            formData.append('variants', JSON.stringify(values.variants));
          } else {
            // values.variants = [];
            formData.append('price', values.price);
          }
          if (values.image.name === '') {
            formData.append('image', null);
          }
          // eslint-disable-next-line no-restricted-syntax
          for (const value of formData.values()) {
            console.log(value);
          }
          console.log('enter in edit', values.image);
          const response = await dispatch(
            updateAddOn(editAddonValue.id, formData, editAddonValue.storeId.id)
          );
          console.log('edit addon response', response);
          if (response.data.code === 409) {
            toast.error(response.data.message);
            resetForm();
            setImgUrl('');
            setOpen(false);
            setEdit(false);
          }
          if (response.status === 201) {
            toast.success('Updated Successfully');
            resetForm();
            setImgUrl('');
            setOpen(false);
            setEdit(false);
          }

          // resetForm();
          // handleClose();
          // setImgUrl('');
          // setOpen(false);
          // setEdit(false);
        } else {
          console.log('values in addons', values);
          const formData = new FormData();
          formData.append('storeId', user.storeId ? user.storeId : values.storeId);
          formData.append('image', values.image);
          formData.append('name', values.name);
          formData.append('taxInclude', values.taxInclude);
          if (variant) {
            values.price = values.variants[0].price;
            formData.append('price', values.price);
            formData.append('variants', JSON.stringify(values.variants));
          } else {
            // values.variants = [];
            formData.append('price', values.price);
          }
          // formData.append('variants', values.variants);
          const response = await dispatch(
            createAddOn(formData, user.storeId ? user.storeId : values.storeId)
          );
          console.log('response in addons', response);
          if (response?.status === 201) {
            notifySuccess(response?.statusText);
            setImgUrl('');
            setOpen(false);
            setEdit(false);
            resetForm();
          } else if (response.status === 409) {
            notifyError(response.data.message);
            setImgUrl('');
            setEdit(false);
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
    if (!edit) {
      resetForm();
    }
  }, [resetForm, edit]);
  // delete category function
  const handleDelete = async (categoryId, store) => {
    await dispatch(deleteCategory(categoryId, store));
  };

  const handleChangeActive = async (row) => {
    console.log('valuedsfhj', row);

    await dispatch(updateCategory(row.id, !row.active));
    // setChecked(e.target.value);
  };
  const handleChangeVariants = () => {
    setVariant(!variant);
  };

  const handleImageChange = (event) => {
    console.log('woking 0');

    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
      console.log('woking 1');

      if (allowedFormats.includes(selectedImage.type)) {
        const maxSize = 3.5 * 1024 * 1024;
        console.log('woking 2');

        if (selectedImage.size > maxSize) {
          alert('File size exceeds the maximum allowed size of 3.5MB.');
        } else {
          setValues({ ...values, image: selectedImage });
          console.log('woking 3');

          const reader = new FileReader();
          // eslint-disable-next-line no-shadow
          reader.onload = (event) => {
            setImgUrl(event.target.result);
          };

          reader.readAsDataURL(selectedImage);
          console.log('woking 4');
        }
      } else {
        alert('Invalid file format. Please select a jpg, jpeg, or png file.');
        event.target.value = null;
      }
    }
    event.target.value = null;
  };

  const onDelete = () => {
    setImgUrl('');
    setFieldValue('image', {});
    formik.setFieldValue('image.name', '');
    formik.setFieldValue('image.path', '');
  };

  console.log({ imgUrl });

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2} p={4}>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              id="outlined-error-helper-text"
              fullWidth
              label="AddOn Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
          </Grid>
          <HasPermission permissionKey="GRANT_PERMISSION">
            <Grid item xs={12} md={6}>
              <FormControl size="small" fullWidth>
                <InputLabel id="demo-simple-select-label">Stores</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-simple-select"
                  name="storeId"
                  value={values.storeId}
                  label="Stores"
                  onChange={handleChange}
                  error={Boolean(touched.storeId && errors.storeId)}
                  helperText={touched.storeId && errors.storeId}
                >
                  {branches?.results?.map((val) => (
                    <MenuItem value={val.id}>{val.location}</MenuItem>
                  ))}
                </Select>
                {touched.storeId && errors.storeId && (
                  <FormHelperText error>{errors.storeId}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </HasPermission>
          <Grid
            item
            xs={12}
            // sx={12}
            md={12}
            lg={12}
          >
            <TextField
              size="small"
              name="image"
              fullWidth
              label="Choose AddOn Image"
              value={values?.image?.name}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      component="label"
                      htmlFor="ImageInput"
                      sx={{ width: '100%', height: '38px', left: '14px', borderRadius: '8px' }}
                      variant="contained"
                    >
                      Upload File
                      <input
                        type="file"
                        id="ImageInput"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            {imgUrl && (
              <Grid
                item
                xs={12}
                // sx={12}
                md={12}
                lg={12}
              >
                <Box
                  sx={{
                    width: '121px',
                    height: '75px',
                    marginTop: '10px',
                    position: 'relative',
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={onDelete}
                    sx={{
                      top: 6,
                      right: 6,
                      zIndex: 9,
                      position: 'absolute',
                      color: '#fff',
                      bgcolor: '#565656',
                      '&:hover': {
                        bgcolor: 'black',
                      },
                    }}
                  >
                    <Iconify icon="eva:close-fill" width={18} />
                  </IconButton>
                  <img
                    alt="file preview"
                    src={imgUrl}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                      borderRadius: '8px',
                    }}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            // sx={12}
            md={12}
            lg={12}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Box>
              <Typography
                sx={{
                  color: '#212B36',
                  fontFamily: 'Public Sans',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  lineHeight: 'normal',
                }}
              >
                Price Details
              </Typography>
            </Box>
            <Box>
              {/* <Typography>Variants</Typography> */}
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    id="variants-switch"
                    name="variants"
                    checked={variant}
                    onChange={handleChangeVariants}
                  />
                }
                label="Variants"
                labelPlacement="start"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box sx={{ display: 'flex', justifyContent: 'end', marginRight: '-10px' }}>
              <Typography variant="subtitle2">Tax Included</Typography>
              <Switch
                size="small"
                name="taxInclude"
                label="Featured"
                value={values.taxInclude}
                checked={values.taxInclude}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            {variant ? (
              <Grid container>
                <Grid item xs={12} sx={12} md={12} lg={12}>
                  {/* Render the current variants */}
                  <FieldArray name="variants">
                    {(arrayHelpers) => (
                      <div>
                        {values.variants.map((value, index) => (
                          <div
                            key={index}
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              width: '100%',
                            }}
                          >
                            <Grid container spacing={4}>
                              <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField
                                  // fullWidth
                                  sx={{ marginY: 1, width: '301px' }}
                                  label="Size Name"
                                  name={`variants[${index}].name`}
                                  value={value?.name}
                                  onChange={handleChange}
                                  error={Boolean(
                                    touched.variants?.[index]?.name &&
                                      errors.variants?.[index]?.name
                                  )}
                                  helperText={
                                    touched.variants?.[index]?.name &&
                                    errors.variants?.[index]?.name
                                  }
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Tooltip
                                          title="Example: Small, Medium, Large, Ltr, cup, Half, Full, etc"
                                          placement="top"
                                        >
                                          <IconButton size="small">
                                            <InfoIcon />
                                          </IconButton>
                                        </Tooltip>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} sm={12} md={3} lg={3}>
                                <TextField
                                  sx={{ marginY: 1, width: '131px' }}
                                  label="price"
                                  name={`variants[${index}].price`}
                                  value={value.price}
                                  onChange={handleChange}
                                  error={Boolean(
                                    touched.variants?.[index]?.price &&
                                      errors.variants?.[index]?.price
                                  )}
                                  helperText={
                                    touched.variants?.[index]?.price &&
                                    errors.variants?.[index]?.price
                                  }
                                />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={3}
                                lg={3}
                                style={{
                                  display: 'flex',
                                  marginTop: '10px',
                                  justifyContent: 'end',
                                  gap: 3,
                                }}
                              >
                                {index !== 0 && values.variants.length - 1 === index && (
                                  <StyledActionsBox
                                    sx={{
                                      p: 0,
                                      backgroundColor: '#BB3138',
                                      // mt: 1,
                                      // width: '20px',
                                      // height: '45px',
                                      // marginRight: '20px',
                                      // border: '2px solid white',
                                      // boxShadow: ' 1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
                                    }}
                                    size="small"
                                    variant="contained"
                                    onClick={() => arrayHelpers.remove(values.variants.length - 1)}
                                  >
                                    <img
                                      src="/assets/icons/branch/deleteIcon.svg"
                                      alt="delete icon"
                                      height="18px"
                                      width={25}
                                    />
                                  </StyledActionsBox>
                                )}
                                {values.variants.length - 1 === index && (
                                  <StyledActionsBox
                                    sx={{
                                      p: 0,
                                      // mt: 1,
                                      // width: '20px',
                                      // height: '45px',
                                      backgroundColor: '#212b36',
                                      marginRight: '10px',
                                      border: '2px solid white',
                                      boxShadow: ' 1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
                                    }}
                                    variant="contained"
                                    onClick={() => arrayHelpers.push({ name: '', price: '' })}
                                  >
                                    <img
                                      src="/assets/icons/branch/addIcon.svg"
                                      alt="add icon"
                                      height="18px"
                                      width={25}
                                    />
                                  </StyledActionsBox>
                                )}
                              </Grid>
                            </Grid>
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12} sx={12} md={6} lg={6}>
                <TextField
                  size="small"
                  id="outlined-error-helper-text"
                  fullWidth
                  label="Price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                />
              </Grid>
            )}
          </Grid>
          <Grid item xs={8} md={9} />
          <Grid item xs={4} md={3} sx={{ textAlign: 'end' }}>
            {edit ? (
              <StyledEditButton
                width="124px"
                // height="40px"
                type="submit"
                variant="contained"
                size="small"
                loading={isSubmitting}
              >
                Edit AddOns
              </StyledEditButton>
            ) : (
              <StyledAddButton
                width="124px"
                // height="40px"
                type="submit"
                variant="contained"
                size="small"
                loading={isSubmitting}
              >
                Add Addons
              </StyledAddButton>
            )}
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
