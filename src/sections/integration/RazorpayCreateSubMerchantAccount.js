import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Stack,
  TextField,
  useMediaQuery,
  Button,
  Alert,
  FormHelperText,
  IconButton,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Form, Formik, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router';
import API from '../../utils/axios';
import { useAuthContext } from '../../auth/useAuthContext';
import RazorpaySubMerchantUserProfile from './RazorpaySubMerchantUserProfile';
import Iconify from '../../components/iconify';

const RazorpayCreateSubMerchantAccount = ({ open, handleClose }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const isDesktop = useMediaQuery('(min-width:768px)');
  const { user } = useAuthContext();
  const navigate = useNavigate();
  console.log({ user });

  // formik data
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ifsc_code: '',
      beneficiary_name: '',
      account_type: '',
      account_number: '',
      business_name: '',
    },
    validationSchema: Yup.object({
      ifsc_code: Yup.string().required('ifsc code is required'),
      beneficiary_name: Yup.string().required('Name is requierd'),
      business_name: Yup.string().required('Business name is required'),
      account_type: Yup.string().required('Account type is required'),
      account_number: Yup.number().required('Account number is required'),
      confirm_account_number: Yup.number()
        .oneOf([Yup.ref('account_number'), null], 'account_number must match')
        .required('Confirm account number is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      console.log('submitted');
      delete values.confirm_account_number;
      console.log({ values });
      try {
        const account = await API.post('/integration/razorpay/accounts', values);
        console.log({ account });
        window.location.href('https://dashboard.razorpay.com/app/dashboard');
      } catch (error) {
        console.log({ error });
        setErrorMessage(error.response?.data?.message.split('-')[0]);
        setTimeout(() => setErrorMessage(''), 4000);
      }
      resetForm();
    },
  });

  const {
    resetForm,
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    handleChange,
  } = formik;

  /**
   * TODO: Reset the form when closing the modal
   */

  if (user.paymentAccountId) {
    return <RazorpaySubMerchantUserProfile user={user} />;
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: isDesktop ? 600 : 300,
        // height: isDesktop ? 150 : 200,
        bgcolor: 'background.paper',
        overflow: 'hidden',
        boxShadow: 24,
        borderRadius: '8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#BB3138',
          padding: '10px',
          width: '100%',
        }}
      >
        <Typography sx={{ color: 'white' }} id="modal-modal-title" variant="h6" component="h2">
          Razorpay{' '}
        </Typography>
        <Box
          sx={{
            width: '26px',
            height: '26px',
            backgroundColor: 'white',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '5px',
          }}
        >
          <IconButton sx={{ color: 'red' }} onClick={handleClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Box>
      </Box>
      {/* <Box sx={{ my: 2 }}>Razorpay</Box> */}
      {errorMessage ? (
        <Alert severity="error" sx={{ m: 2 }}>
          {errorMessage}
        </Alert>
      ) : (
        ''
      )}

      <Box sx={{ padding: '8px' }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Stack spacing={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={12}>
                      <TextField
                        id="outlined-error-helper-text"
                        fullWidth
                        label="beneficiary_name"
                        {...getFieldProps('beneficiary_name')}
                        error={Boolean(touched.beneficiary_name && errors.beneficiary_name)}
                        helperText={touched.beneficiary_name && errors.beneficiary_name}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        fullWidth
                        label="account_type"
                        {...getFieldProps('account_type')}
                        error={Boolean(touched.account_type && errors.account_type)}
                        helperText={touched.account_type && errors.account_type}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        fullWidth
                        label="business_name"
                        {...getFieldProps('business_name')}
                        error={Boolean(touched.business_name && errors.business_name)}
                        helperText={touched.business_name && errors.business_name}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        fullWidth
                        label="ifsc_code"
                        {...getFieldProps('ifsc_code')}
                        error={Boolean(touched.ifsc_code && errors.ifsc_code)}
                        helperText={touched.ifsc_code && errors.ifsc_code}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        id="outlined-error-helper-text"
                        fullWidth
                        label="account_number"
                        {...getFieldProps('account_number')}
                        error={Boolean(touched.account_number && errors.account_number)}
                        helperText={touched.account_number && errors.account_number}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        id="outlined-error-helper-text"
                        fullWidth
                        label="confirm_account_number"
                        {...getFieldProps('confirm_account_number')}
                        error={Boolean(
                          touched.confirm_account_number && errors.confirm_account_number
                        )}
                        helperText={touched.confirm_account_number && errors.confirm_account_number}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      lg={12}
                      sx={{ display: 'flex', justifyContent: 'right' }}
                    >
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        size="large"
                        loading={isSubmitting}
                      >
                        Create Account
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Box>
    </Box>
  );
};

RazorpayCreateSubMerchantAccount.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default RazorpayCreateSubMerchantAccount;
