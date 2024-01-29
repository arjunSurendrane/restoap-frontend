import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Image } from '@mui/icons-material';
import CustomButton from '../../components/button/CustomButton';
import CenteredContent from '../../components/custom-styles/displayCenter';
// import Link from 'src/theme/overrides/Link';

function ActiveSubscription() {
  const year = new Date().getFullYear();
  return (
    <Container>
      <Stack>
        <CenteredContent>
          <Typography variant="h3" paragraph>
            Your Subscription <span style={{ color: '#BB3138' }}>Plan is Now Active!</span>
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            We are thrilled to inform you that your subscription plan has been successfully
            activated.
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            You are now all set to enjoy the benefits and features of our Basic plan service.
          </Typography>

          <img
            // disabledEffect
            // visibleByDefault
            alt="auth"
            src="/assets/illustrations/ActivePlan.svg"
            style={{ marginTop: '20px' }}
          />
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
        </CenteredContent>
      </Stack>
    </Container>
  );
}

export default ActiveSubscription;
