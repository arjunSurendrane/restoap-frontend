import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Tooltip, Stack, Box, Typography, useMediaQuery, Link } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';

//
import AuthLoginForm from './AuthLoginForm';

// ----------------------------------------------------------------------

export default function Login() {
  const isMobileScreen = useMediaQuery('(min-width:768px)');
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', marginTop: '40px' }}
      >
        <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
          <Box
            component="img"
            alt={method}
            src="/assets/icons/auth/restoap1.png"
            sx={{ width: 400, height: 74 }}
          />
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">New user?</Typography>

            <Link component={RouterLink} to={PATH_AUTH.Register} variant="subtitle2">
              Create an account
            </Link>
          </Stack>
        </Stack>

        <AuthLoginForm />

        {/* <AuthWithSocial /> */}
        {/* <Box>
          <Typography>
            © 2023 RestoAp | All Rights Reserved | Design & Developed By B-JeLT Technologies PVT LTD
          </Typography>
        </Box> */}
      </Box>
    </LoginLayout>
  );
}
