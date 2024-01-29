import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import axios from 'axios';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Link,
  Stack,
  Button,
  Alert,
  // MuiAlert,
  IconButton,
  InputAdornment,
  Modal,
  Box,
  Typography,
  TextField,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { setPricingPageForInitialUser } from '../../redux/slices/subscription';
import API from '../../utils/axios';
import InputField from '../../components/form/FormInput';
import PasswordField from '../../components/form/PasswordField';
import { ForgotPasswordSchema, LoginSchema } from './YupSchema';
import { forgotPassword, handleErrorResponse, verifyEmailUsingToken } from './AuthUtils';
import EmailVerification from '../../pages/auth/EmailVerification';
// import Button from '../../theme/overrides/Button';

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxHeight: '90vh',

  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 420,
  minWidth: 360,
  bgcolor: 'background.paper',
  // borderStyle: 'none',
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

export default function AuthLoginForm() {
  const { login, verifyToken, user } = useAuthContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [successVerificaton, setSuccessVerification] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const dispatch = useDispatch();
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openVerifyModal, setopenVerifyModal] = useState(false);

  useEffect(() => {
    if (token) {
      verifyEmailUsingToken(
        token,
        verifyToken,
        setSuccessVerification,
        searchParams,
        setSearchParams,
        setErrorMessage
      );
    }
  }, [token, verifyToken, searchParams, setSearchParams]);

  const defaultValue = {
    email: '',
    password: '',
  };

  const forgotPasswordMethods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  // use form
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    reset,
    resetField,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const {
    handleSubmit: handleForgotPasswordSubmit,
    formState: {
      errors: forgotPasswordErrors,
      isSubmitting: isForgotPasswordSubmitting,
      isSubmitSuccessful: isForgotPasswordSubmitSuccessful,
    },
  } = forgotPasswordMethods;

  // eslint-disable-next-line no-unused-expressions
  const onSubmit = async (data) => {
    try {
      const loginResponse = await login(data.email, data.password);
      console.log({ loginResponse });
      if (token) navigate('/pricing');
    } catch (error) {
      if (error?.response?.data?.message === 'email address not verified') {
        setEmail(data.email);
        setopenVerifyModal(true);
      } else {
        handleErrorResponse(error, reset, defaultValue, setError, setErrorMessage);
      }
    }
  };

  const handleForgotPasswordFormSubmit = async (data) => {
    await forgotPassword(data, setOpen, setOpenModal, resetField, setErrorMessage);
    resetField();
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpen(false);
    setopenVerifyModal(false);
    setErrorMessage('');
    forgotPasswordMethods.reset();
  };

  const handleNavigate = () => {
    navigate('/login');
  };

  const snackbar = (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Verification Link sent to your email!
      </MuiAlert>
    </Snackbar>
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {snackbar}
      <Stack spacing={3}>
        {errorMessage && !openModal ? <Alert severity="error">{errorMessage}</Alert> : ''}
        {successVerificaton && <Alert>{successVerificaton}</Alert>}

        {/* {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>} */}

        <InputField name="email" label="Email address" size="small" />

        <PasswordField
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
        />
      </Stack>

      <Stack
        alignItems="flex-end"
        sx={{ my: 2, cursor: 'pointer' }}
        onClick={() => setOpenModal(true)}
      >
        <Link variant="subtitle2" underline="none">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        Login
      </LoadingButton>
      <Modal
        open={openVerifyModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EmailVerification email={email} />
        </Box>
      </Modal>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormProvider methods={forgotPasswordMethods} onSubmit={handleForgotPasswordFormSubmit}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{ color: '#980403' }}
              >
                FORGOT PASSWORD
              </Typography>
            </Box>
            <Typography
              id="modal-modal-description"
              variant="subtitle2"
              sx={{
                mt: 2,
                fontSize: '14px',
                textAlign: 'center',
                fontFamily: 'Public Sans',
                fontWeight: 400,
                marginBottom: '30px',
              }}
            >
              Enter your Email address below and we will send you a link to reset your password !
            </Typography>
            {/* <TextField
              sx={{ mt: 2 }}
              name="email"
              {...forgotPasswordMethods.register('email')}
              variant="outlined"
              label="Email ID"
              fullWidth
            /> */}
            <InputField size="small" name="email" label="Email address" />

            {errorMessage ? (
              <Typography color="red" sx={{ fontSize: 13, pl: 1 }}>
                {errorMessage}
              </Typography>
            ) : (
              ''
            )}
            {/* <RHFTextField sx={{ mt: 2 }} name="email" label="Email address" /> */}
            <CustomButton
              sx={{ backgroundColor: '#212B36', color: '#fff', mt: 2, height: '48px' }}
              fullWidth
              onClick={forgotPasswordMethods.handleSubmit(handleForgotPasswordFormSubmit)}
            >
              <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>SEND REQUEST</Typography>
            </CustomButton>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                mt: 2,
                color: '#980403',
              }}
            >
              <Typography sx={{ cursor: 'pointer' }} variant="subtitle2" onClick={handleClose}>
                Return to Sign In
              </Typography>
            </Box>
          </FormProvider>
        </Box>
      </Modal>
    </FormProvider>
  );
}
