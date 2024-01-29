import React from 'react';
import { Box, useMediaQuery, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const RazorpaySubMerchantUserProfile = ({ user }) => {
  const isDesktop = useMediaQuery('(min-width:768px)');
  console.log({ user });

  return (
    <Box
      sx={{
        position: 'absolute',
        p: 6,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        minHeight: 350,
        background: 'linear-gradient(to bottom, #00529B, #BBDEFB)',
        overflow: 'hidden',
        //   border: 1px solid '#ccc',
        borderRadius: '8px',
      }}
    >
      <Typography variant="h4" color="white">
        Razorpay SubMerchant User Profile
      </Typography>
      <Box>
        <Typography variant="subtitle1" color="white">
          Account id : {user?.paymentAccountId}
        </Typography>
        <Typography variant="subtitle1" color="white">
          Email : {user?.email}
        </Typography>
      </Box>
      <Box>
        <a href="https://dashboard.razorpay.com/app/dashboard">
          <Typography variant="subtitle1" color="white">
            View dashboard
          </Typography>
        </a>
      </Box>
    </Box>
  );
};

RazorpaySubMerchantUserProfile.propTypes = {
  user: PropTypes.object,
};

export default RazorpaySubMerchantUserProfile;
