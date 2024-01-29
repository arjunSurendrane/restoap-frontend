import { Box, Button, Drawer, Typography, useMediaQuery } from '@mui/material';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import OrderDrawerHeader from './OrderDrawerHeader';
import OrderDrawerContent from './OrderDrawerContent';
import ItemDetailTable from './ItemDetailTable';
import OrderDrawerBillDetails from './OrderDrawerBillDetails';
import FinalOrderBill from './FinalOrderBill';
import OrderBillForPrinter from './OrderBillForPrinter';

function OrderDetailDrawer({ data, open, closeDrawer, checkIsOrderVerified }) {
  const [filterContent, setFilterContent] = useState('');
  const isDesktop = useMediaQuery('(min-width:768px)');
  const billRef = useRef();
  const printBill = useReactToPrint({
    content: () => billRef.current,
  });
  const isOrderVerified = checkIsOrderVerified(data?.subOrders);
  console.log(isOrderVerified);

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
      <OrderDrawerHeader onClose={closeDrawer} />
      <Box>
        <FinalOrderBill data={data} />
      </Box>
      <Box sx={{ display: 'none' }}>
        <Box ref={billRef}>
          <OrderBillForPrinter data={data} />
        </Box>
      </Box>

      {!isOrderVerified&&<Box sx={{ display: 'flex', flexDirection: 'row-reverse', padding: '8px' }}>
        <Button
          variant="contained"
          // disabled={!completed}
          sx={{
            backgroundColor: '#BB3138',
            color: 'white',
            borderRadius: '8px',
            border: '2px solid white',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
            fontSize: '12px',
            fontWeight: 400,
          }}
          onClick={printBill}
        >
          Print Bill
        </Button>
      </Box>}
     {isOrderVerified&& <Box mt={2} sx={{ display: 'flex', padding: '8px' }}>
        <Typography fontSize="12px"><span style={{fontWeight:"600"}}>Note</span>: Settling the bill is not possible until the order has been verified..</Typography>
      </Box>}
    </Drawer>
  );
}
OrderDetailDrawer.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool,
  closeDrawer: PropTypes.func,
  checkIsOrderVerified: PropTypes.func,
};

export default OrderDetailDrawer;
