import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { m } from 'framer-motion';
// @mui
import {
  Box,
  Card,
  Container,
  Typography,
  CardHeader,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Button,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { varBounce } from '../components/animate';
import { ForbiddenIllustration } from '../assets/illustrations';
import CenteredContent from '../components/custom-styles/displayCenter';
// routes
// import { PATH_DASHBOARD } from '../../routes/paths';
// // components
// import { useSettingsContext } from '../../components/settings';
// import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// // auth
// import RoleBasedGuard from '../../auth/RoleBasedGuard';

// ----------------------------------------------------------------------

export default function Page403() {
  //   const { themeStretch } = useSettingsContext();
  const year = new Date().getFullYear();
  const [role, setRole] = useState('admin');

  //   const handleChangeRole = (event, newRole) => {
  //     if (newRole !== null) {
  //       setRole(newRole);
  //     }
  //   };

  return (
    <>
      <Helmet>
        <title> 403 | Permission Denied </title>
      </Helmet>

      <Stack sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <img
            // disabledEffect
            // visibleByDefault
            alt="auth"
            src="/assets/illustrations/characters/403.svg"
            style={{ width: '560px', height: '300px' }}
          />
          <Typography variant="h3" paragraph sx={{ color: '#BB3138' }}>
            We are sorry ...
          </Typography>

          <Typography sx={{ color: '#212B36', fontSize: '20px', fontWeight: '500px' }}>
            Access denied! Return to the homepage or seek assistance to your Admin.
          </Typography>

          <Button
            component={RouterLink}
            to="/"
            sx={{
              marginTop: '10px',
              backgroundColor: '#BB3138',
              borderRadius: '5px',
              color: 'White',
              boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
              border: '#fff 2px solid',
              '&:hover': {
                backgroundColor: '#212b36',
                color: 'white',
              },
            }}
          >
            Go To Dashboard
          </Button>
          {/* <CenteredContent> */}

          {/* </CenteredContent> */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              bottom: 10,
              position: 'fixed',
              textAlign: 'center',
            }}
          >
            <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>
              Copyright © {year} RestoAp | All Rights Reserved | Design & Developed By
              <a style={{ textDecoration: 'none' }} href="https://b-jelt.com/">
                <span style={{ color: '#BB3138' }}>B-JeLT Technologies Pvt Ltd</span>
              </a>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </>
  );
}
