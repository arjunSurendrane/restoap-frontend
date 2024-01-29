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
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import OrderInvoiceTable from './OrderInvoiceTablle';
import OrderAddonsTable from './OrderAddonsTable';
import { getOrders, updateAllItemStatus, updateOrderStatus } from '../../../redux/slices/order';
import { useAuthContext } from '../../../auth/useAuthContext';
import KitchenInvoiceTable from './kitchenInvoiceTable';
import { SkeltonForLiveOrderList } from '../../../components/skeleton';

OrderKitchenDrawer.propTypes = {
  dataIndex: PropTypes.number,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

function OrderKitchenDrawer({ dataIndex, open, onOpen, onClose }) {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.order);
  const isDesktop = useMediaQuery('(min-width:768px)');
  const { user } = useAuthContext();
  const [isOrderCompleted, setIsOrderCompleted] = useState(true);

  if (error) return <div>Error...</div>;

  const data = orders[dataIndex];
  const { customerDetails } = data;
  const { firstName, lastName } = customerDetails[0];
  const timeAgo = moment(data.createdAt).fromNow();
  const { items, addOns, orderStatus } = data;
  const isKitchen = user?.roles[0].name === 'kitchen';
  // const isKitchen = true;

  const handleCompletedButton = () => {
    dispatch(updateAllItemStatus('delivered', data?._id));
    dispatch(getOrders(orders[0]?.store));
  };

  // handle kitchen accepted button
  const handleKitchenAcceptedButton = () => {
    dispatch(updateAllItemStatus('accepted', data._id));
    dispatch(updateOrderStatus('accepted', data?._id));
    dispatch(getOrders(orders[0]?.store));
  };

  const handleVerifiedButton = () => {
    dispatch(updateOrderStatus('verified', data?._id));
    dispatch(getOrders(orders[0]?.store));
  };

  console.log({ isOrderCompleted });

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
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      BackdropProps={{
        invisible: true,
      }}
      PaperProps={{
        sx: { width: isDesktop ? '480px' : '320px', borderLeft: '#980403 2px solid' },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pl: 2, pr: 1, py: 2, backgroundColor: '#F5F5F5' }}
      >
        <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>Order Details</Typography>
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

      <Divider />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 2.5 }}>
          {orderStatus === 'open' && (
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button style={cancelOrderButtonStyle}>Cancel Order</Button>
                <Button style={verifyOrderButtonStyle} onClick={handleVerifiedButton}>
                  Verify Order
                </Button>
              </Box>
            </Stack>
          )}
          {isKitchen && orderStatus === 'verified' && (
            <Button style={verifyOrderButtonStyle} onClick={handleKitchenAcceptedButton}>
              Accept Order
            </Button>
          )}

          <Stack spacing={1}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
                Order NO: {data.OrderId}{' '}
              </Typography>
              <Typography
                sx={{ color: '#AC161F', fontSize: '16px', fontWeight: '500' }}
                // variant="subtitle1"
              >
                {timeAgo}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
              Table No: {data.tableNo}
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
              Customer Name: {`${firstName} ${lastName || ''}`}
            </Typography>
          </Stack>

          <Stack spacing={1} sx={{ pb: 2 }}>
            <Typography sx={{ flexGrow: 1, color: '#BB3138', fontSize: '16px', fontWeight: '500' }}>
              Order Details
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={1}>
          {isKitchen ? (
            <KitchenInvoiceTable dataIndex={dataIndex} orderId={data._id} storeId={data.store} />
          ) : (
            <OrderInvoiceTable
              data={items}
              isverified={data.orderStatus !== 'open'}
              isOrderCompletedfalse={() => setIsOrderCompleted(false)}
            />
          )}

          <Stack spacing={3} sx={{ p: 2.5, display: 'flex', spacing: 5 }}>
            <Typography sx={{ flexGrow: 1, color: '#BB3138', fontSize: '16px', fontWeight: '500' }}>
              Add Ons
            </Typography>
          </Stack>
          {addOns && <OrderAddonsTable data={addOns} />}
        </Stack>

        {!isKitchen && (
          <>
            <Stack spacing={3} sx={{ p: 2.5, display: 'flex', spacing: 5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                    Total Amount (Before Tax)
                  </Typography>
                </Box>
                <Box>
                  {' '}
                  <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                    {data.subtotalAmount}
                  </Typography>
                </Box>
              </Box>
              {/* Other amount-related sections */}
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
                <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>GRAND TOTAL</Typography>
              </Box>
              <Box>
                {' '}
                <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                  {parseInt(data.totalAmount, 10)}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', padding: '8px' }}>
              {isOrderCompleted && (
                <Button
                  variant="contained"
                  disabled={!isOrderCompleted}
                  sx={
                    isOrderCompleted
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
                  Complete Order
                </Button>
              )}
            </Box>
          </>
        )}
      </Scrollbar>

      <Box sx={{ p: 2.5, backgroundColor: '#F5F5F5', minHeight: '49px' }}>{/* Clear button */}</Box>
    </Drawer>
  );
}

export default OrderKitchenDrawer;
