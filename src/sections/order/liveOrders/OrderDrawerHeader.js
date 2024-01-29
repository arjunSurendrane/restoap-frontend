import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import Iconify from '../../../components/iconify';

function OrderDrawerHeader({ onClose }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ pl: 2, pr: 1, py: 2, backgroundColor: '#F5F5F5' }}
    >
      <Typography variant="h5">Order Details</Typography>
      <Box
        sx={{
          width: '26px',
          height: '26px',
          backgroundColor: '#AC161F',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <IconButton sx={{ color: 'white' }} onClick={onClose}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </Box>
    </Stack>
  );
}

OrderDrawerHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default OrderDrawerHeader;
