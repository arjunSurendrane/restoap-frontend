import React, { useState } from 'react';
import { Stack, Alert, InputAdornment, IconButton, Typography, Box, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckBox } from '@mui/icons-material';
import { useAuthContext } from '../../auth/useAuthContext';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import FormInput from '../../components/form/FormInput';
import PasswordField from '../../components/form/PasswordField';
import { RegisterSchema } from './YupSchema';
import { handleErrorResponse } from './AuthUtils';
import Iconify from '../../components/iconify/Iconify';

const AuthRegisterForm = () => {
  // State and hooks
  const { register, user } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  // Event handlers
  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      if (register) {
        console.log({ data });
        await register(
          data.firstName,
          data.lastName,
          data.email,
          data.phone,
          data.password,
          data.storeName
        );
        navigate('/email-verification');
      }
    } catch (error) {
      handleErrorResponse(error, reset, defaultValues, setError, setErrorMessage);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // JSX return
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}> */}
        <RHFTextField size="small" name="firstName" label="First name" />
        <RHFTextField size="small" name="lastName" label="Last name" />
        {/* </Stack> */}

        <FormInput name="email" label="Email address" size="small" />
        <FormInput name="phone" label="Phone Number" size="small" />

        <PasswordField showPassword={showPassword} toggleShowPassword={toggleShowPassword} />

        <RHFTextField
          size="small"
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          // size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting || isSubmitSuccessful}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
            height: '48px',
          }}
        >
          CREATE ACCOUNT
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default AuthRegisterForm;
