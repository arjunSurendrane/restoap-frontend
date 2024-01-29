/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

// @mui
import {
  Box,
  Stack,
  Drawer,
  Button,
  Typography,
  IconButton,
  Container,
  Grid,
  useTheme,
  Card,
} from '@mui/material';
import FormProvider, {
  //   RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFAutocomplete,
  //   RHFUploadAvatar,
} from '../../../components/hook-form';

// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { useDispatch, useSelector } from '../../../redux/store';
import { createBranch, updateBranches } from '../../../redux/slices/branch';
import useResponsive from '../../../hooks/useResponsive';
import { currency, allLanguages, storeTypes, allCountries } from '../../../assets/data/countries';
import { StyledCancelButton, StyledEditButton } from '../../../theme/overrides/Button';

// import { defaultLang } from 'src/locales';

// ----------------------------------------------------------------------

EditStoreForm.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  favorited: PropTypes.bool,
  onCopyLink: PropTypes.func,
  edit: PropTypes.func,
  page: PropTypes.string,
};

export default function EditStoreForm({
  page,
  open,
  favorited,
  edit,
  // onFavorite,
  onCopyLink,
  // eslint-disable-next-line react/prop-types
  onClose,
  onDelete,
  ...other
}) {
  const [openShare, setOpenShare] = useState(true);

  const navigate = useNavigate();
  // const [close, setClose] = useState(false);
  const { branch } = useSelector((state) => state.branch);
  console.log('branch in edit', branch);
  const [toggleTags, setToggleTags] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const theme = useTheme();
  const dispatch = useDispatch();
  const [toggleProperties, setToggleProperties] = useState(true);
  const isDesktop = useResponsive('up', 'md');
  console.log('isDesktop', isDesktop);

  const handleToggleTags = () => {
    setToggleTags(!toggleTags);
  };

  const handleToggleProperties = () => {
    setToggleProperties(!toggleProperties);
  };

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleChangeInvite = (event) => {
    setInviteEmail(event.target.value);
  };
  const handleClose = () => {
    console.log('enter in close');
    onClose();
    // edit(false)
    // setClose(true);
    // console.log(close);
    // open= false
  };
  const zipCodeRegex = /^\d{6}(?:[-\s]\d{4})?$/;
  const NewStoreSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required('Name is Required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Name can only contain letters and numbers'),
    phone: Yup.string()
      .required('Mobile Number is Required')
      .matches(/^[0-9]{10}$/, 'Invalid Mobile Number'),
    // address: Yup.string().trim().required('Address is Required'),
    storeType: Yup.string().required('Store Type is Required').nullable(),
    currency: Yup.string().required('Currency is Required').nullable(),
    location: Yup.string().trim().required('Location Name is Required'),
    city: Yup.string().trim().required('City is Required'),
    state: Yup.string().trim().required('State/Province/Region is Required'),
    pinCode: Yup.string()
      .trim()
      .matches(zipCodeRegex, 'Invalid ZIP Code')
      .required('Zip Code is Required'),
    country: Yup.string().trim().required('Country is Required'),
    taxRate: Yup.string()
      // .matches(/^(\d+(\.\d{0,2})?|\.\d{1,2})$/, 'Percentage between 0 and 100')
      .test('is-between-0-100', 'Percentage must be in between 0% and 100%', (value) => {
        if (!value) return true;
        const numericValue = parseFloat(value);
        return numericValue >= 0 && numericValue <= 100;
      }),
    // gstNumber: Yup.string()
    //   .nullable()
    //   .notRequired()
    //   .test('is-valid-gst', 'Invalid GST Number format', (value) => {
    //     if (!value || value.length === 0) {
    //       // If the field is empty, it's considered valid
    //       return true;
    //     }
    //     // Your custom validation logic for GST Number
    //     return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(value);
    //   }),

    fssaiNumber: Yup.string()
      .nullable()
      .notRequired()
      .test('is-valid-fssai', 'Invalid FSSAI Number', (value) => {
        if (!value || value.length === 0) {
          // If the field is empty, it's considered valid
          return true;
        }
        // Your custom validation logic for FSSAI Number
        return /^[0-9]{14}$/.test(value);
      }),
  });

  const defaultValues = {
    name: branch.name ? branch.name : '',
    storeType: branch.storeType,
    phone: branch.phone,
    address: branch.address,
    location: branch.location ? branch.location : ' ',
    city: branch.city ? branch.city : '',
    state: branch.state ? branch.state : '',
    pinCode: branch.pinCode ? branch.pinCode : '',
    country: branch.country ? branch.country : '',
    taxName: branch.taxName ? branch.taxName : '',
    taxRate: branch.taxRate ? branch.taxRate : '',
    currency: branch.currency,
    gstNumber: branch.gstNumber ? branch.gstNumber : '',
    fssaiNumber: branch.fssaiNumber ? branch.fssaiNumber : '',
  };

  const methods = useForm({
    resolver: yupResolver(NewStoreSchema),
    defaultValues,
  });
  console.log('default', defaultValues);

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      data.storeId = branch.id;
      console.log('data in edit', data);
      const res = await updateBranches(data, dispatch, page);
      console.log('res in edit branch', res);
      if (res.status === 200) {
        reset();
        toast.success('Store Updated Success');
        navigate('/dashboard/branches/list');
      }
      await new Promise((resolve) => setTimeout(resolve, 500));

      onClose();
      //   enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      //
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ padding: '20px', borderRadius: '8px' }}>
        <Grid container spacing={2} sx={{ paddingTop: '10px' }}>
          <Grid item xs={12} md={4}>
            <RHFTextField name="name" label="Store Name" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFAutocomplete
              size="small"
              id="store-add-from-storeType"
              name="storeType"
              label="Store Type"
              options={storeTypes.map((option) => option).sort()}
              ChipProps={{ size: 'small' }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="phone" type="number" label="Phone Number" size="small" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="location" label="Street Address/Location" size="small" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="city" label="City" size="small" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="state" label="State/Province/Region" size="small" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="pinCode" label="Postal/Zip Code" size="small" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFAutocomplete
              size="small"
              id="store-add-from-country"
              name="country"
              label="Country"
              options={allCountries.map((option) => option).sort()}
              ChipProps={{ size: 'small' }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFAutocomplete
              size="small"
              id="store-add-from-currencyType"
              name="currency"
              label="Currency"
              options={currency.map((option) => option.code).sort()}
              ChipProps={{ size: 'small' }}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Typography variant="h5">Tax Details</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="taxName" label="Tax Name" size="small" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="taxRate" label="Rate" size="small" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="gstNumber" label="Tax Number" size="small" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="fssaiNumber" label="FSSAI Number" size="small" />
          </Grid>
          <Grid item xs={12} md={12}>
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
              <StyledCancelButton
                // fullWidth
                //   variant="soft"
                // color="error"
                // type="submit"
                onClick={() => {
                  reset();
                  navigate('/dashboard/branches/list');
                }}
                variant="contained"
                loading={isSubmitting}
              >
                Cancel
              </StyledCancelButton>
              <StyledEditButton
                // fullWidth
                // color="error"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Update
              </StyledEditButton>
            </Box>
          </Grid>
        </Grid>
        {/* </Scrollbar> */}
        {/* </Container> */}
      </Card>
    </FormProvider>
    // </Drawer>
  );
}
