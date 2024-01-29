import { Box, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Iconify from '../../../components/iconify';

function PrevOrderDrawerHeader({ onClose }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        pl: 2,
        pr: 1,
        py: 2,
        backgroundColor: '#F5F5F5',
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25)',
      }}
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
PrevOrderDrawerHeader.propTypes = {
  onClose: PropTypes.func,
};

export default PrevOrderDrawerHeader;
