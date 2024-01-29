import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui

import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';

import {
  Tooltip,
  Stack,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Modal,
  TextField,
  Button,
} from '@mui/material';

// common Styles
import Iconify from '../../components/iconify/Iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';

// auth
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import LoginLayout from '../../layouts/login';
import API from '../../utils/axios';

// routes
import { PATH_AUTH } from '../../routes/paths';

//
import AuthLoginForm from './AuthLoginForm';

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  minWidth: 300,
  bgcolor: 'background.paper',
  borderStyle: 'none',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};
const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#212B36',
  color: '#fff',
  mt: 2,
  height: '48px',

  // Disable hover effect
  '&:hover': {
    backgroundColor: '#212B36', // Set the same color as the normal background to effectively disable the hover effect
  },
}));
export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token, 'token');
  const { method } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const forgotSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .test('no-spaces', 'Spaces are not allowed', (value) => !value.includes(' '))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
        'Password must include at least one uppercase letter.'
      ),

    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      // eslint-disable-next-line func-names
      .test('passwords-match', 'Passwords must match', function (value) {
        // 'this.parent' refers to the entire form values object
        // eslint-disable-next-line react/no-this-in-sfc
        return value === this.parent.password;
      }),
  });

  const methods = useForm({
    resolver: yupResolver(forgotSchema),
  });

  const {
    reset,
    setError,
    resetField,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log('values', data);

      await API.post(`/auth/reset-password/?token=${token}`, {
        password: data.password,
      });
      setOpenModal(true);
      reset({
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.log({ error });
      reset({
        password: '',
        confirmPassword: '',
      });
      setError('afterSubmit', {
        ...error,
        message: error?.response?.data?.message || 'Something gone wrong. Try again...',
      });
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <LoginLayout>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
          <Tooltip title={method} placement="left">
            <Box
              component="img"
              alt={method}
              src="/assets/icons/auth/restoap1.png"
              sx={{ width: 400, height: 74 }}
            />
          </Tooltip>
          <Stack direction="column" spacing={3}>
            <RHFTextField
              name="password"
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitSuccessful || isSubmitting}
              sx={{
                bgcolor: 'text.primary',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:hover': {
                  bgcolor: 'text.primary',
                  color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                },
              }}
            >
              Reset Password
            </LoadingButton>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              {errors.afterSubmit ? (
                <p style={{ color: 'red' }}>{errors.afterSubmit.message}</p>
              ) : (
                ''
              )}
            </Box>
          </Stack>
        </Stack>
      </FormProvider>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box mb={3}>
            <img src="/assets/images/Login/PasswordResetLogo.svg" alt="password-reset-logo" />
          </Box>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{ color: '#980403', textAlign: 'center' }}
          >
            PASSWORD CHANGE SUCCESSFULLY
          </Typography>

          <CustomButton
            sx={{ backgroundColor: '#212B36', color: '#fff', mt: 2, height: '48px' }}
            fullWidth
            onClick={() => navigate('/login')}
          >
            LOGIN
          </CustomButton>
          {/* <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              mt: 2,
              color: '#980403',
            }}
          >
            <Typography variant="subtitle2">Return to Sign In</Typography>
          </Box> */}
        </Box>
      </Modal>
    </LoginLayout>
  );
}
