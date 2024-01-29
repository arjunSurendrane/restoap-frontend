import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Iconify from '../../../components/iconify';  
import Scrollbar from '../../../components/scrollbar';
import OrderInvoiceTable from './OrderInvoiceTablle';
import OrderAddonsTable from './OrderAddonsTable';
import { getOrders, updateAllItemStatus, updateOrderStatus } from '../../../redux/slices/order';
import { useAuthContext } from '../../../auth/useAuthContext';
import KitchenInvoiceTable from './kitchenInvoiceTable';
import { SkeltonForLiveOrderList } from '../../../components/skeleton';

const OrderDrawerBottom = ({ data, handleCompletedButton, loading }) => {
  let isOrderCompleted = false;
  if (data?.items.length === data?.completedTasks) isOrderCompleted = true;
  console.log({ data });
  const notCompleted = data.items.filter(
    (item) => item.status !== 'cooked' && item.status !== 'delivered'
  );

  // eslint-disable-next-line no-unneeded-ternary
  const completed =
    // eslint-disable-next-line no-unneeded-ternary
    notCompleted.length || data.deliveredOrders === data.items.length ? false : true;
  console.log({ completed });

  return (
    <>
      <Stack spacing={3} sx={{ p: 2.5, display: 'flex', spacing: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle1">Total Amount (Before Tax)</Typography>
          </Box>
          <Box>
            {' '}
            <Typography variant="subtitle1">{data.subtotalAmount}</Typography>
          </Box>
        </Box>
        {/* Other amount-related sections */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle2">SGST @ 2.5 % </Typography>
          </Box>
          <Box>
            {' '}
            <Typography variant="subtitle2">{data.sgst}</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle2">CGST @ 2.5 %</Typography>
          </Box>
          <Box>
            {' '}
            <Typography variant="subtitle2">{data.cgst}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle2">Additional Charges ( AC )</Typography>
          </Box>
          <Box>
            {' '}
            <Typography variant="subtitle2">{data?.additionalCharge || 0}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle2">Gross Amount</Typography>
          </Box>
          <Box>
            {' '}
            <Typography variant="subtitle2">{data.totalAmount}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle1">Rounded</Typography>
          </Box>
          <Box>
            {' '}
            <Typography variant="subtitle1">{data.discount}</Typography>
          </Box>
        </Box>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#D9D9D9',
          paddingInline: '15px',
          minHeight: '35px',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="subtitle2">GRAND TOTAL</Typography>
        </Box>
        <Box>
          {' '}
          <Typography variant="subtitle2">{parseInt(data.totalAmount, 10)}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', padding: '8px' }}>
        {completed && (
          <Button
            variant="contained"
            disabled={!completed}
            sx={
              completed
                ? {
                    backgroundColor: '#BB3138',
                    color: 'white',
                    borderRadius: '8px',
                    border: '2px solid white',
                    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
                  }
                : {}
            }
            onClick={handleCompletedButton}
          >
            {loading ? <CircularProgress color="inherit" size={20} /> : 'Complete Order'}
          </Button>
        )}
      </Box>
    </>
  );
};

OrderDrawerBottom.propTypes = {
  data: PropTypes.number,
  handleCompletedButton: PropTypes.bool,
  loading: PropTypes.bool,
};

export default OrderDrawerBottom;
