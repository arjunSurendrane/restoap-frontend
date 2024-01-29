import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import OrderDrawerHeader from './OrderDrawerHeader';
import OrderDrawerContent from './OrderDrawerContent';

function OrderDrawer({ dataIndex, open, onOpen, onClose }) {
  const isDesktop = useMediaQuery('(min-width:768px)');

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      BackdropProps={{
        invisible: false,
      }}
      PaperProps={{
        sx: { minWidth: isDesktop ? '450px' : '320px', borderLeft: '#980403 2px solid' },
      }}
    >
      <OrderDrawerHeader onClose={onClose} />
      <Divider />

      <OrderDrawerContent dataIndex={dataIndex} onClose={onClose} />
    </Drawer>
  );
}

OrderDrawer.propTypes = {
  dataIndex: PropTypes.number,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default OrderDrawer;
