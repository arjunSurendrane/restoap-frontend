import { Drawer, useMediaQuery } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import PrevOrderDrawerHeader from './PrevOrderDrawerHeader';
import PrevOrderDrawerContent from './PrevOrderDrawerContent';
import PrevOrderDrawerBillDetails from './PrevOrderDrawerBillDetails';
import PrevOrderDrawerTable from './PrevOrderDrawerTable';

function PrevOrderDetailDrawer({ data, open, closeDrawer }) {
  console.log({data});
  const isDesktop = useMediaQuery('(min-width:768px)');
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={closeDrawer}
      BackdropProps={{
        invisible: false,
      }}
      PaperProps={{
        sx: { minWidth: isDesktop ? '450px' : '320px', borderLeft: '#980403 2px solid' },
      }}
    >
      <PrevOrderDrawerHeader onClose={closeDrawer} />
      <PrevOrderDrawerContent orderData={data}/>
      <PrevOrderDrawerTable orderData={data}/>
      <PrevOrderDrawerBillDetails orderData={data}/>
    </Drawer>
  );
}

PrevOrderDetailDrawer.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool,
  closeDrawer: PropTypes.func,
};

export default PrevOrderDetailDrawer;
