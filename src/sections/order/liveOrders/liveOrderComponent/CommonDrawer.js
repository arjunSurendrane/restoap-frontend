import { Box, Drawer, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { PropTypes } from 'prop-types';
import Iconify from '../../../../components/iconify';

function CommonDrawer({ children, openDrawer, closeDrawer }) {
  return (
    <Drawer
      open={openDrawer}
      onClose={closeDrawer}
      anchor="right"
      PaperProps={{
        sx: {
          width: {
            xs: 320,
            sm: 480,
            md: 480,
            lg: 480,
            xl: 480,
          },
        },
      }}
    >
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ pl: 2, pr: 1, py: 2, backgroundColor: '#F5F5F5',boxShadow:"0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <Typography fontSize="18px" fontWeight="600">Order Details</Typography>
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
        <IconButton sx={{ color: 'white' }} onClick={closeDrawer}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </Box>
    </Stack>
      {children}
    </Drawer>
  );
}

CommonDrawer.propTypes = {
  openDrawer: PropTypes.func,
  closeDrawer: PropTypes.func,
  children: PropTypes.element.isRequired,
};
export default CommonDrawer;
