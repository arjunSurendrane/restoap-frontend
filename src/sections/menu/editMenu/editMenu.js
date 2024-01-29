import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { DesktopDatePicker, LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
// import AWS from 'aws-sdk';

import {
  Box,
  Card,
  Grid,
  Stack,
  styled,
  Typography,
  InputAdornment,
  Fab,
  Button,
  Chip,
  TextField,
  FormHelperText,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { FieldArray, Form, Formik, FormikProvider, setIn, useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from '../../../redux/store';
import { getCategories } from '../../../redux/slices/category';
import { getKitchens } from '../../../redux/slices/kitchen';

// import { getAddOns } from '../../../redux/slices/addOns';
import { useAuthContext } from '../../../auth/useAuthContext';

import Editor from '../../../components/editor/Editor';
import { editMenu, getSignedUrl } from '../../../redux/slices/menu';
import HasPermission from '../../../auth/RightGuard';
import { StyledActionsBox, StyledEditButton } from '../../../theme/overrides/Button';
import Iconify from '../../../components/iconify/Iconify';
import { InfoIcon } from '../../../theme/overrides/CustomIcons';
import { AWS_CREDENTIAL } from '../../../config-global';

EditMenu.propTypes = {
  setOpenModal: PropTypes.func,
  setImage: PropTypes.func,
  cropImage: PropTypes.object,
  setCropImage: PropTypes.func,
};

// const s3 = new AWS.S3({
//   accessKeyId: AWS_CREDENTIAL.accessKey,
//   secretAccessKey: AWS_CREDENTIAL.secretKey,
//   region: AWS_CREDENTIAL.region,
// });

const CustomDatePicker = styled(DatePicker)`
  .MuiInputBase-root {
    height: 40px; /* Adjust the height as needed */
    overflow: hidden; /* Hide overflow */
  }

  .MuiPickersPopper-container {
    height: auto; /* Adjust the calendar pop-up height as needed */
    overflow: hidden; /* Hide overflow */
  }
`;
export default function EditMenu({ setOpenModal, setImage, cropImage, setCropImage }) {
  console.log('cropImage', cropImage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifyError = (message) => toast.error(message);
  const { user } = useAuthContext();
  const { menu } = useSelector((state) => state.menu);
  const { branches } = useSelector((state) => state.branch);
  const { categories } = useSelector((state) => state.category);
  const { kitchens } = useSelector((state) => state.Kitchen);
  // const { addOns } = useSelector((state) => state.addOn);
  // const [storeLocation, setStoreLocation] = useState();
  const [previewImg, setPreviewImg] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [uploadVideoData, setUploadedVideoData] = useState([]);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [video, setVideo] = useState(menu?.videos ? menu?.videos : []);
  const [defaultImage, setDefaultImage] = useState(menu?.images ? menu?.images : []);

  // eslint-disable-next-line no-unneeded-ternary
  const [offers, setOffers] = useState(menu?.offer?.length > 0 ? true : false);
  // eslint-disable-next-line no-unneeded-ternary
  const [variant, setVariant] = useState(menu?.variants.length > 0 ? true : false);
  // const filteredAddOns = addOns?.results?.filter((data) => data.active === true);
  const filteredCategory = categories?.results?.filter((data) => data.active === true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: menu ? menu.name : '',
      foodCategory: menu ? menu.foodCategory : '',
      shortDescription: menu?.shortDescription ? menu?.shortDescription : '',
      description: menu ? menu.description : '',
      variants:
        menu?.variants?.length > 0 ? menu.variants : [{ name: '', price: '', offerPrice: '' }],
      price: menu ? menu.price : '',
      offerPrice: menu?.offerPrice ? menu.offerPrice : '',
      offer:
        menu?.offer?.length > 0
          ? menu?.offer
          : [
              {
                offerPercentage: '',
                startDate: '',
                endDate: '',
              },
            ],
      store: menu ? menu.storeId[0]?.id : '',
      category: menu ? menu?.category?.id : '',
      kitchenType: menu?.kitchen ? menu?.kitchen : '',
      images: { name: menu?.images.length > 0 ? menu?.images[0]?.id : cropImage?.name || '' },
      videos: { name: menu?.videos.length > 0 ? menu?.videos[0].id : video.name || '' },
      featured: menu ? menu.featured : '',
      taxInclude: menu ? menu.taxInclude : '',
      preparationTime: menu ? menu.preparationTime : '',
    },

    validationSchema: Yup.object({
      name: Yup.string().required('name is required'),
      shortDescription: Yup.string()
        .trim()
        .required('Short Description is required')
        .max(100, 'Short Description must be at most 100 characters'),
      description: Yup.string().test(
        'not-<p><br></p>',
        'Description is required',
        (value) => value !== '<p><br></p>'
      ),
      store: user.storeId ? '' : Yup.string().required('Store is required'),
      foodCategory: Yup.string().required('Category is required'),
      category: Yup.string().required('Category is required'),
      price: !variant ? Yup.number().required('price is required') : '',
      kitchenType: Yup.string().required('Kitchen Type is required'),
      variants: variant
        ? Yup.array(
            Yup.object().shape({
              name: Yup.string().required('Name is required'),
              price: Yup.string()
                .required('Price is Required')
                .matches(/^[0-9]+$/, 'Price must be number'),
            })
          )
        : '',

      offer: offers
        ? Yup.array(
            Yup.object().shape({
              offerPercentage: Yup.string()
                .required('Percentage is required')
                .matches(
                  /^(\d+(\.\d{0,2})?|\.\d{1,2})$/,
                  'Additional charge must be a valid number between 0 and 100'
                )
                .test(
                  'is-between-0-100',
                  'Additional charge must be between 0% and 100%',
                  (value) => {
                    if (!value) return true;
                    const numericValue = parseFloat(value);
                    return numericValue >= 0 && numericValue <= 100;
                  }
                ),
              endDate: Yup.date()
                .required('EndDate is Required')
                .min(Yup.ref('startDate'), 'EndDate must be after StartDate')
                .nullable(),
              startDate: Yup.date().required('StartDate is Required').nullable(),
            })
          )
        : '',
      preparationTime: Yup.string().required('Preparation Time is required'),
    }),
    // validationSchema: NewServiceValidationSchema,
    onSubmit: async (data, { setSubmitting, resetForm, setErrors }) => {
      try {
        const values = { ...data };
        values.storeId = [user.storeId ? user.storeId : values.store];
        values.id = menu.id;
        console.log('values iasnd', values);
        if (values.images?.name === '') {
          values.images = [];
        }
        if (values.images?.name === menu.images[0]?.id) {
          values.images = menu.images;
        }
        if (cropImage?.type?.startsWith('image/')) {
          const imageUploadResult = await handleFileUpload(cropImage);
          values.images = [imageUploadResult];
        }

        if (values.videos?.name === '') {
          values.videos = [];
        }
        if (values.videos?.name === menu.videos[0]?.id) {
          values.videos = menu.videos;
        }
        if (video?.type?.startsWith('video/')) {
          const videoUploadResult = await handleFileUpload(video);
          values.videos = [videoUploadResult];
        }

        if (!offers) {
          values.offer = [];
          values.offerPrice = null;
        }
        if (!variant) {
          values.variants = [];
        } else {
          values.price = values.variants[0].price;
          values.offerPrice = values.variants[0].offerPrice;
          if (!offers) {
            values.offerPrice = null;
            values.variants = values.variants.map((val) => ({ ...val, offerPrice: null }));
          }
        }
        console.log('values iasnd', values);
        const response = await dispatch(editMenu(values));
        if (response.status === 201) {
          resetForm();
          navigate('/dashboard/menus/list');
        }
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
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
  const handleCategory = async (id) => {
    const branch = id;
    if (values.store !== id) {
      setFieldValue('category', '');
      await dispatch(getCategories(branch));
    }
  };

  useEffect(() => {
    setVideo(menu?.videos ? menu?.videos : []);
    setDefaultImage(menu?.images ? menu?.images : []);
  }, [menu]);
  useEffect(() => {
    dispatch(getCategories(values.store));
  }, [dispatch, values.store]);

  useEffect(() => {
    const storeId = user.storeId ? user.storeId : values.store;
    dispatch(getKitchens(storeId));
  }, [dispatch, values.store, user]);

  useEffect(() => {
    if (menu?.images) {
      setPreviewImg(menu.images[0]?.name ? menu.images[0]?.name : '');
    }

    if (menu?.videos) {
      setPreviewVideo(menu.videos[0]?.name ? menu?.videos[0]?.name : '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu]);

  useEffect(() => {
    if (cropImage) {
      setPreviewImg(URL.createObjectURL(cropImage));
      setFieldValue('images', cropImage);
      // setDefaultImage(cropImage)
    }
  }, [cropImage, setFieldValue]);

  useEffect(() => {
    if (values?.offer?.length > 0) {
      // if (values.offer[0].offerPercentage ) {
      // eslint-disable-next-line array-callback-return
      values.variants?.map((val, index) => {
        const newOfferPrice = calculateOfferPrice(values.offer[0].offerPercentage, val.price);
        setFieldValue(`variants[${index}].offerPrice`, newOfferPrice);
      });
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFieldValue, values?.offer[0]?.offerPercentage]);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setPreviewImg('');

    if (selectedImage) {
      const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];

      if (allowedFormats.includes(selectedImage.type)) {
        const maxSize = 500 * 1024;

        if (selectedImage.size > maxSize) {
          const message = 'size must be less than 500KB';
          notifyError(message);
          // alert('File size exceeds the maximum allowed size of 3.5MB.');
        } else {
          setOpenModal(true);
          setPreviewImg(URL.createObjectURL(selectedImage));
          setImage(URL.createObjectURL(selectedImage));
          // setImage(selectedImage);
          // setValues({ ...values, images: selectedImage });
        }
      } else {
        const message = 'image format must be in image/jpeg,image/jpg,image/png';
        notifyError(message);
        // alert('Invalid file format. Please select a jpg, jpeg, or png file.');
        event.target.value = null;
      }
    }
    event.target.value = null;
  };

  const handleVideoChange = (event) => {
    const selectedVideo = event.target.files[0];

    if (selectedVideo) {
      const allowedFormats = ['video/mp4', 'video/webm', 'video/ogg'];

      if (allowedFormats.includes(selectedVideo.type)) {
        const maxSize = 5 * 1024 * 1024;

        if (selectedVideo.size > maxSize) {
          const message = 'size must be less than 5mb';
          notifyError(message);
          // alert('File size exceeds the maximum allowed size of 3.5MB.');
        } else {
          setPreviewVideo(URL.createObjectURL(selectedVideo));
          // handleFileUpload(selectedVideo);
          setValues({ ...values, videos: selectedVideo });
          setVideo(selectedVideo);
        }
      } else {
        const message = 'video format must be in video/mp4,video/webm,video/ogg';
        notifyError(message);
        // alert('Invalid file format. Please select a jpg, jpeg, or png file.');
        event.target.value = null;
      }
    }
    event.target.value = null;
  };

  const handleAddVariant = () => {
    values.variants.push({ name: '', price: '' });
  };

  const handleChangeVariants = () => {
    setVariant(!variant);
  };

  const handleChangeOffers = () => {
    setOffers(!offers);
  };

  const calculateOfferPrice = (offerPercentage, price) => {
    const percentage = parseFloat(offerPercentage) || 0;
    const originalPrice = parseFloat(price) || 0;
    const discount = (originalPrice * percentage) / 100;
    return originalPrice - discount;
  };

  const onRemoveImage = () => {
    setPreviewImg(null);
    setCropImage(null);
    setDefaultImage([]);
    setImage('');
    // setValues({ ...values, images: '' });
    setFieldValue('images.name', '');
  };

  const onRemoveVideo = () => {
    setVideo([]);
    // setValues({ ...values, videos: '' });
    setFieldValue('videos.name', '');
    setPreviewVideo(null);
  };

  const handleFileUpload = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles;
      if (!file) {
        console.error('No accepted file provided');
        return;
      }

      const fileName = file.name;
      const key = `${Date.now()}_${fileName}`;

      let contentType;
      if (file.type.startsWith('image/')) {
        contentType = 'image';
      } else if (file.type.startsWith('video/')) {
        contentType = 'video';
      } else {
        console.error('Unsupported file type');
        return;
      }
      try {
        const presignedPUTURL = await dispatch(getSignedUrl(key));

        const res = await fetch(presignedPUTURL.data.signedUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': contentType,
          },
        });
        const data = {
          id: key,
          name: res.url.split('?')[0],
        };
        // eslint-disable-next-line consistent-return
        return data;
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  console.log('default values', values?.images);

  return (
    <>
      <ToastContainer />

      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{ marginTop: '0px' }}>
            <Grid item xs={12} md={8}>
              <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                <Stack spacing={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={12} md={6} lg={6}>
                      <TextField
                        id="outlined-error-helper-text"
                        fullWidth
                        size="small"
                        label="Item Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item xs={12} sx={12} md={6} lg={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Food Category</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          name="foodCategory"
                          value={values?.foodCategory} // Make sure this is properly initialized
                          label="Food Category"
                          onChange={handleChange} // Make sure this function updates the state properly
                          error={Boolean(touched.foodCategory && errors.foodCategory)}
                          helperText={touched.foodCategory && errors.foodCategory}
                        >
                          <MenuItem value="Veg">Veg</MenuItem>
                          <MenuItem value="Non-Veg">Non Veg</MenuItem>
                        </Select>
                        {touched.foodCategory && errors.foodCategory && (
                          <FormHelperText error>{errors.foodCategory}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <HasPermission permissionKey="GRANT_PERMISSION">
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-select-small-label">Stores</InputLabel>
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
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
                      </HasPermission>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-select-small-label">Category</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          name="category"
                          value={values.category}
                          label="Category"
                          onChange={handleChange}
                          error={Boolean(touched.category && errors.category)}
                          helperText={touched.category && errors.category}
                        >
                          {filteredCategory?.map((val) => (
                            <MenuItem value={val?.id}>
                              {val?.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.category && errors.category && (
                          <FormHelperText error>{errors.category}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                      <TextField
                        fullWidth
                        label="Short Description"
                        aria-label="description"
                        multiline
                        rows={3}
                        name="shortDescription"
                        value={values.shortDescription}
                        onChange={handleChange}
                        error={Boolean(touched.shortDescription && errors.shortDescription)}
                      />
                      {touched.shortDescription && (
                        <FormHelperText error sx={{ px: 2 }}>
                          {errors ? errors.shortDescription : ''}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sx={12} md={12} lg={12}>
                      <Editor
                        simple
                        id="description"
                        value={values.description}
                        // onChange={handleChange}
                        name="description"
                        onChange={(value) => setFieldValue('description', value)}
                        error={Boolean(touched.description && errors.description)}
                        helperText={
                          (!!touched || touched) && (
                            <FormHelperText error={!!touched} sx={{ px: 2 }}>
                              {errors ? errors?.description : ''}
                            </FormHelperText>
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </Card>
              <Card sx={{ padding: '20px', borderRadius: '8px', mt: 2 }}>
                <Stack spacing={3}>
                  <Grid
                    item
                    xs={12}
                    // sx={12}
                    md={12}
                    lg={12}
                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Box>
                      <Typography>Price Details</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                      }}
                    >
                      <Typography>Offers</Typography>
                      <Switch
                        size="small"
                        id="variants-switch"
                        name="variants"
                        label="Variants"
                        checked={offers}
                        onChange={handleChangeOffers}
                      />
                      <Typography>Variants</Typography>
                      <Switch
                        size="small"
                        id="variants-switch"
                        name="variants"
                        label="Variants"
                        checked={variant}
                        onChange={handleChangeVariants}
                      />
                    </Box>
                  </Grid>

                  {offers && (
                    <FieldArray name="offer">
                      {(arrayHelpers) => (
                        <Grid container spacing={2} style={{ alignItems: 'end' }}>
                          {values.offer?.map((value, index) => (
                            // <div key={index}>
                            <>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                <TextField
                                  id={`offerPercentage-${index}`}
                                  fullWidth
                                  size="small"
                                  label="Offer Percentage"
                                  name={`offer[${index}].offerPercentage`}
                                  value={value.offerPercentage}
                                  onChange={(e) => {
                                    handleChange(e);
                                    const result = calculateOfferPrice(
                                      e.target.value,
                                      values.price
                                    );
                                    setFieldValue('offerPrice', result);
                                  }}
                                  error={Boolean(
                                    touched.offer &&
                                      touched.offer[index]?.offerPercentage &&
                                      errors.offer &&
                                      errors.offer[index]?.offerPercentage
                                  )}
                                  helperText={
                                    touched.offer &&
                                    touched.offer[index]?.offerPercentage &&
                                    errors.offer &&
                                    errors.offer[index]?.offerPercentage
                                  }
                                  // InputProps={{
                                  //   endAdornment: (
                                  //     <InputAdornment position="end">
                                  //       <Box
                                  //         display="flex"
                                  //         alignItems="center"
                                  //         backgroundColor="#D9D9D9"
                                  //         left="12px"
                                  //         width="100%"
                                  //       >
                                  //         <span>%</span>
                                  //       </Box>
                                  //     </InputAdornment>
                                  //   ),
                                  // }}
                                />
                              </Grid>

                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={['DatePicker']}>
                                    <CustomDatePicker
                                      fullWidth
                                      label="Start Date"
                                      name={`offer[${index}].startDate`}
                                      value={dayjs(value.startDate)}
                                      onChange={(date) => {
                                        // if (!date || typeof date === 'string') {
                                        //   // Handle the case when the user clears the date picker or selects an invalid date
                                        //   arrayHelpers.replace(index, {
                                        //     ...value,
                                        //     startDate: null,
                                        //   });
                                        // } else {
                                        //   // Ensure that date is a valid Date object
                                        //   const startDate =
                                        //     date instanceof Date ? date : new Date(date);
                                        //   arrayHelpers.replace(index, {
                                        //     ...value,
                                        //     startDate,
                                        //   });
                                        // }
                                        setFieldValue(`offer[${index}].startDate`, date?.$d);
                                      }}
                                      minDate={dayjs(new Date())}
                                    />
                                  </DemoContainer>
                                </LocalizationProvider>
                                {errors?.offer &&
                                  errors?.offer[index]?.startDate &&
                                  touched.offer &&
                                  touched.offer[index]?.startDate && (
                                    <FormHelperText error>
                                      {errors?.offer[index]?.startDate}
                                    </FormHelperText>
                                  )}
                              </Grid>
                              <Grid item xs={12} sm={12} md={4} lg={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  {/* You can create a separate component for the DatePicker and pass appropriate props */}
                                  <DemoContainer components={['DatePicker']}>
                                    <CustomDatePicker
                                      fullWidth
                                      label="End Date"
                                      name={`offer[${index}].endDate`}
                                      value={dayjs(value.endDate)}
                                      onChange={(date) => {
                                        // if (!date || typeof date === 'string') {
                                        //   // Handle the case when the user clears the date picker or selects an invalid date
                                        //   arrayHelpers.replace(index, {
                                        //     ...value,
                                        //     endDate: null,
                                        //   });
                                        // } else {
                                        //   // Ensure that date is a valid Date object
                                        //   const endDate =
                                        //     date instanceof Date ? date : new Date(date);
                                        //   arrayHelpers.replace(index, {
                                        //     ...value,
                                        //     endDate,
                                        //   });
                                        // }

                                        setFieldValue(`offer[${index}].endDate`, date?.$d);
                                      }}
                                      minDate={dayjs(new Date())}
                                    />
                                  </DemoContainer>
                                </LocalizationProvider>
                                {errors?.offer &&
                                  errors?.offer[index]?.endDate &&
                                  touched.offer &&
                                  touched.offer[index]?.endDate && (
                                    <FormHelperText error>
                                      {errors?.offer[index]?.endDate}
                                    </FormHelperText>
                                  )}
                              </Grid>
                            </>
                            // </div>
                          ))}
                        </Grid>
                      )}
                    </FieldArray>
                  )}
                  {variant ? (
                    <Grid container spacing={2} style={{ marginTop: '5px' }}>
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
                                  <Grid container>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                      <TextField
                                        sx={{ marginY: 1, marginRight: '6px' }}
                                        label="size"
                                        size="small"
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
                                        sx={{ marginY: 1, marginLeft: '10px', marginRight: '6px' }}
                                        label="Price"
                                        size="small"
                                        name={`variants[${index}].price`}
                                        value={value?.price}
                                        // onChange={handleChange}
                                        onChange={(e) => {
                                          // Update the form values with the new price and calculate offerPrice
                                          const newPrice = e.target.value;
                                          const newOfferPrice = calculateOfferPrice(
                                            values.offer[0].offerPercentage,
                                            newPrice
                                          );
                                          arrayHelpers.replace(index, {
                                            ...value,
                                            price: newPrice,
                                            offerPrice: newOfferPrice,
                                          });
                                        }}
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
                                    {offers && (
                                      <Grid item xs={12} sx={12} md={3} lg={3}>
                                        <TextField
                                          sx={{
                                            marginY: 1,
                                            marginLeft: '10px',
                                            marginRight: '6px',
                                          }}
                                          label="Offer Price"
                                          placeholder="Offer Price"
                                          size="small"
                                          name={`variants[${index}].offerPrice`}
                                          // eslint-disable-next-line no-undef
                                          // value={calculateOfferPrice(
                                          //   values.offer[0].offerPercentage,
                                          //   value.price
                                          // )}
                                          value={value?.offerPrice}
                                          // readOnly
                                          disabled
                                          // onChange={handleChange}
                                          error={Boolean(
                                            touched.variants?.[index]?.offerPrice &&
                                              errors.variants?.[index]?.offerPrice
                                          )}
                                          helperText={
                                            touched.variants?.[index]?.offerPrice &&
                                            errors.variants?.[index]?.offerPrice
                                          }
                                        />
                                      </Grid>
                                    )}
                                    <Grid
                                      item
                                      xs={12}
                                      sx={12}
                                      md={2}
                                      lg={2}
                                      style={{
                                        display: 'flex',
                                        // justifyContent: 'space-evenly',
                                        alignItems: 'center',
                                      }}
                                    >
                                      {values.variants.length - 1 === index && (
                                        <StyledActionsBox
                                          sx={{
                                            p: 0,
                                            // width: '20px',
                                            // height: '45px',
                                            backgroundColor: '#212b36',
                                            border: '2px solid white',
                                            boxShadow: ' 1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
                                          }}
                                          variant="contained"
                                          onClick={() => arrayHelpers.push({ name: '', price: '' })}
                                        >
                                          <img
                                            src="/assets/icons/branch/addIcon.svg"
                                            alt="add icon"
                                            height="20px"
                                            width={15}
                                          />
                                        </StyledActionsBox>
                                      )}
                                      {index !== 0 && values.variants.length - 1 === index && (
                                        <StyledActionsBox
                                          sx={{
                                            p: 0,
                                            // width: '20px',
                                            // height: '45px',
                                            marginRight: '20px',
                                            backgroundColor: '#BB3138',
                                            border: '2px solid white',
                                            boxShadow: ' 1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
                                          }}
                                          size="small"
                                          variant="contained"
                                          onClick={() =>
                                            arrayHelpers.remove(values.variants.length - 1)
                                          }
                                        >
                                          <img
                                            src="/assets/icons/branch/deleteIcon.svg"
                                            alt="delete icon"
                                            height="20px"
                                            width={15}
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
                    <Grid container spacing={2} mt={2}>
                      <Grid item xs={12} sx={12} md={4} lg={4}>
                        <TextField
                          id="outlined-error-helper-text"
                          fullWidth
                          size="small"
                          label="Price"
                          name="price"
                          value={values.price}
                          onChange={(e) => {
                            // eslint-disable-next-line no-undef
                            values.price = e.target.value;
                            const res = calculateOfferPrice(
                              values.offer[0].offerPercentage,
                              e.target.value
                            );
                            setFieldValue('offerPrice', res);
                          }}
                          error={Boolean(touched.price && errors.price)}
                          helperText={touched.price && errors.price}
                        />
                      </Grid>
                      {offers && (
                        <Grid item xs={12} sx={12} md={4} lg={4}>
                          <TextField
                            id="outlined-error-helper-text"
                            fullWidth
                            size="small"
                            label="Offer Price"
                            name="offerPrice"
                            value={values.offerPrice}
                            readOnly
                            disabled
                            // onChange={handleChange}
                            error={Boolean(touched.offerPrice && errors.offerPrice)}
                            helperText={touched.offerPrice && errors.offerPrice}
                          />
                        </Grid>
                      )}
                    </Grid>
                  )}
                </Stack>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ padding: '20px', borderRadius: '8px' }}>
                <Stack spacing={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Kitchen Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-select-small"
                      name="kitchenType"
                      value={values.kitchenType}
                      label="Kitchen Type"
                      onChange={handleChange}
                      error={Boolean(touched.kitchenType && errors.kitchenType)}
                      helperText={touched.kitchenType && errors.kitchenType}
                      // multiple
                    >
                      {kitchens?.map((val) => (
                        <MenuItem key={val.id} value={val.id}>
                          {val.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.kitchenType && errors.kitchenType && (
                      <FormHelperText error>{errors.kitchenType}</FormHelperText>
                    )}
                  </FormControl>
                  {/* <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">AddOns</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-select-small"
                      name="addOns"
                      value={values.addOns}
                      label="addOns"
                      onChange={handleChange}
                      error={Boolean(touched.addOns && errors.addOns)}
                      helperText={touched.addOns && errors.addOns}
                      multiple
                    >
                      {filteredAddOns?.map((val) => (
                        <MenuItem key={val.id} value={val.id}>
                          {val.name.replace(/\b\w/g, (char) => char.toUpperCase())}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.addOns && errors.addOns && (
                      <FormHelperText error>{errors.addOns}</FormHelperText>
                    )}
                  </FormControl> */}
                  <TextField
                    name="images"
                    label="Choose menu Image"
                    size="small"
                    value={values.images ? values.images.name : ''}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            component="label"
                            htmlFor="ImageInput"
                            sx={{ width: '100%', left: '12px' }}
                            variant="contained"
                            disabled={previewImg}
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
                    inputProps={{ readOnly: true }}
                    error={Boolean(touched.images && errors.images)}
                    helperText={touched.images && errors.images ? errors.images : ''}
                  />
                  {previewImg && (
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
                          // marginTop: '10px',
                          position: 'relative',
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={onRemoveImage}
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
                          src={previewImg}
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
                  <TextField
                    name="videos"
                    label="Choose menu Video"
                    size="small"
                    value={values.videos ? values.videos.name : ''}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            component="label" // Use component="label" to make it behave like a file input
                            htmlFor="VideoInput"
                            sx={{ width: '100%', left: '12px' }}
                            variant="contained"
                            disabled={previewVideo}
                          >
                            Upload File
                            <input
                              type="file"
                              id="VideoInput"
                              onChange={handleVideoChange}
                              style={{ display: 'none' }} // Hide the input element visually
                            />
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{ readOnly: true }}
                  />

                  {/* {videoLoading ? (
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                      <CircularProgress variant="determinate" value={loadingPercentage} />
                      <Box
                        sx={{
                          top: 0,
                          left: 2,
                          bottom: 0,
                          right: 0,
                          marginLeft: '5px',
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'start',
                          width: '100%', // Added width: '100%' to make sure the inner Box takes the full width
                        }}
                      >
                        <Typography variant="caption" component="div" color="text.secondary">
                          {`${Math.round(loadingPercentage)}%`}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <> */}
                  {previewVideo && (
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
                          // marginTop: '10px',
                          position: 'relative',
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={onRemoveVideo}
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
                        <video
                          controls
                          poster={previewVideo}
                          style={{
                            borderRadius: '8px',
                            objectFit: 'cover',
                            objectPosition: 'center center',
                            width: '100%',
                            height: '100%',
                          }}
                        >
                          <source src={previewVideo} type="video/mp4" />
                          <track
                            label="English Captions"
                            kind="captions"
                            src={previewVideo?.captionsSource}
                            srcLang="en"
                            default
                          />
                          Your browser does not support the video tag.
                        </video>
                      </Box>
                    </Grid>
                  )}
                  {/* </>
                  )} */}
                  <TextField
                    id="outlined-error-helper-text"
                    fullWidth
                    label="Preparation Time"
                    size="small"
                    name="preparationTime"
                    value={values.preparationTime}
                    onChange={handleChange}
                    error={Boolean(touched.preparationTime && errors.preparationTime)}
                    helperText={touched.preparationTime && errors.preparationTime}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="subtitle2">Featured</Typography>
                    <Switch
                      name="featured"
                      label="Featured"
                      size="small"
                      // value={values.featured}
                      checked={values.featured}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="subtitle2">Tax Included</Typography>
                    <Switch
                      size="small"
                      name="taxInclude"
                      label="Featured"
                      // value={values.featured}
                      checked={values.taxInclude}
                      onChange={handleChange}
                    />
                  </Box>
                  <StyledEditButton
                    type="submit"
                    variant="contained"
                    size="large"
                    loading={isSubmitting}
                  >
                    Edit Menu Item
                  </StyledEditButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}