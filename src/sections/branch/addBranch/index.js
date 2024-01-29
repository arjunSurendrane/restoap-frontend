// import react components
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  Card,
  useTheme,
} from '@mui/material';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFAutocomplete,
} from '../../../components/hook-form';

// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { useDispatch, useSelector } from '../../../redux/store';
import { createBranch, clearBranchError } from '../../../redux/slices/branch';
import useResponsive from '../../../hooks/useResponsive';
import { currency, allLanguages, storeTypes, allCountries } from '../../../assets/data/countries';
import { StyledAddButton, StyledCancelButton } from '../../../theme/overrides/Button';

export default function AddBranchForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.branch);
  const [toggleProperties, setToggleProperties] = useState(true);
  const isDesktop = useResponsive('up', 'md');

  const notifyError = () => toast.error('Cant Add Store!');
  const zipCodeRegex = /^\d{6}(?:[-\s]\d{4})?$/;
  const NewStoreSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required('Name is Required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Name can only contain letters and numbers'),
    phone: Yup.string()
      .required('Mobile Number is Required')
      .matches(/^[0-9]{10}$/, 'Invalid Mobile Number'),
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
    taxRate: Yup.string().test(
      'is-between-0-100',
      'Percentage must be in between 0% and 100%',
      (value) => {
        if (!value) return true;
        const numericValue = parseFloat(value);
        return numericValue >= 0 && numericValue <= 100;
      }
    ),
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
    name: '',
    storeType: '',
    phone: '',
    location: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    taxName: '',
    taxRate: '',
    gstNumber: '',
    fssaiNumber: '',
    currency: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewStoreSchema),
    defaultValues,
  });

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
      const response = await dispatch(createBranch(data));
      if (response.data.id) {
        reset();
        toast.success('Store Added Successfully');
        navigate('/dashboard/branches/list');
        return;
      }
      if (response.data.code === 403) {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error('error in add form', err);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ padding: '20px', borderRadius: '8px' }}>
        <Grid container spacing={2} sx={{ paddingTop: '10px' }}>
          <Grid item xs={12} md={4}>
            <RHFTextField name="name" label="Store Name" size="small" />
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
            <Typography
              sx={{
                color: '#212B36',
                fontFamily: 'Public Sans',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: 'normal',
              }}
            >
              Tax Details
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="taxName" label="Tax Name" size="small" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="taxRate" label="Rate (%)" size="small" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="gstNumber" label="Tax Number" size="small" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="fssaiNumber" label="FSSAI Number" size="small" />
          </Grid>
          <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
            <StyledCancelButton
              color="error"
              variant="contained"
              onClick={() => {
                reset();
                navigate('/dashboard/branches/list');
              }}
            >
              Cancel
            </StyledCancelButton>
            <StyledAddButton color="error" type="submit" variant="contained" loading={isSubmitting}>
              Add Store
            </StyledAddButton>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  );
}
