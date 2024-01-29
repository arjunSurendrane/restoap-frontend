import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function OrderDrawerButtons({
  orderStatus,
  handleVerifiedButton,
  handleKitchenAcceptedButton,
  handleCancelButton,
  isKitchen,
  buttonLoading,
}) {
  const cancelOrderButtonStyle = {
    backgroundColor: '#212B36',
    color: 'white',
    borderRadius: '8px',
    border: '2px solid white',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  };

  const verifyOrderButtonStyle = {
    backgroundColor: '#BB3138',
    color: 'white',
    borderRadius: '8px',
    border: '2px solid white',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  };

  return (
    <Stack spacing={1}>
      {orderStatus === 'open' && !isKitchen ? (
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* <Button style={cancelOrderButtonStyle} onClick={handleCancelButton}>
              {buttonLoading ? <CircularProgress color="inherit" size={20} /> : 'Cancel Order'}
            </Button> */}
            <Button style={verifyOrderButtonStyle} onClick={handleVerifiedButton}>
              {buttonLoading ? <CircularProgress color="inherit" size={20} /> : 'Verify Order'}
            </Button>
          </Box>
        </Stack>
      ) : (
        ''
      )}
      {/* Additional buttons based on conditions */}
      {orderStatus === 'verified' && isKitchen ? (
        <Button style={verifyOrderButtonStyle} onClick={handleKitchenAcceptedButton}>
          {buttonLoading ? <CircularProgress color="inherit" size={20} /> : 'Accept Order'}
        </Button>
      ) : (
        ''
      )}
    </Stack>
  );
}

OrderDrawerButtons.propTypes = {
  orderStatus: PropTypes.string.isRequired,
  handleVerifiedButton: PropTypes.func.isRequired,
  handleKitchenAcceptedButton: PropTypes.func.isRequired,
  isKitchen: PropTypes.bool.isRequired,
  buttonLoading: PropTypes.number.isRequired,
  handleCancelButton: PropTypes.func.isRequired,
};

export default OrderDrawerButtons;
