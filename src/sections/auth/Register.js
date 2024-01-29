import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Typography, Link, Tooltip, Box } from '@mui/material';
// layouts
import { useAuthContext } from '../../auth/useAuthContext';
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import AuthWithSocial from './AuthWithSocial';
import AuthRegisterForm from './AuthRegistrationForm';
import CenteredContent from '../../components/custom-styles/displayCenter';

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuthContext();
  return (
    <LoginLayout>
      {/* <CenteredContent></CenteredContent> */}

      <Stack spacing={2} sx={{ mb: 3, position: 'relative', marginTop: '-120px' }}>
        <Box
          component="img"
          alt={method}
          src="/assets/icons/auth/restoap1.png"
          sx={{ width: 400, height: 74 }}
        />

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Already have an account? </Typography>

          <Link component={RouterLink} to={PATH_AUTH.login} variant="subtitle2">
            Sign in
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm />

      {/* <Typography
        component="div"
        sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
      >
        {'By signing up, I agree to '}
        <Link underline="always" color="text.primary">
          Terms of Service
        </Link>
        {' and '}
        <Link underline="always" color="text.primary">
          Privacy Policy
        </Link>
        .
      </Typography> */}

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}
