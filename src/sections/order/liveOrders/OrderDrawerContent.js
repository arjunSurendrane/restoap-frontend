import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography, Grid, Button } from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { useReactToPrint } from 'react-to-print';
import Scrollbar from '../../../components/scrollbar';
import OrderInvoiceTable from './OrderInvoiceTablle';
import OrderAddonsTable from './OrderAddonsTable';
import { updateAllItemStatus, updateOrderStatus, getOrders } from '../../../redux/slices/order';
import { useAuthContext } from '../../../auth/useAuthContext';
import KitchenInvoiceTable from './kitchenInvoiceTable';
import { SkeltonForLiveOrderList } from '../../../components/skeleton';
import OrderDrawerButtons from './OrderDrawerButtons';
import OrderKitchenDrawerHeader from './OrderDrawerHeader';
import OrderDrawerBottom from './OrderDrawerBottom';
import CustomButton from '../../../components/button/CustomButton';
import KotBill from './print/KotBIll';
import FinalBill from './print/FinalBill';

function OrderDrawerContent({ dataIndex }) {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState('');
  const [isOrderCompleted, setIsOrderCompleted] = useState(true);
  const totalKotRef = useRef();
  const finalBillRef = useRef();
  const additonalKotRef = useRef();
  const totalKotPrint = useReactToPrint({
    content: () => totalKotRef.current,
  });
  const additionalKotPrint = useReactToPrint({
    content: () => additonalKotRef.current,
  });
  const finalBillPrint = useReactToPrint({
    content: () => finalBillRef.current,
  });

  const data = orders[dataIndex];
  if (!data.customerDetails) return <div>User data not found</div>;
  const { customerDetails } = data;
  // if (!customerDetails[0]) return <div>Error...</div>;
  // const { firstName, lastName } = customerDetails[0];
  const timeAgo = moment(data.createdAt).fromNow();
  const { items, addOns, orderStatus } = data;
  const isKitchen = user?.roles[0].name === 'kitchen';

  const length = data?.items?.length;

  const isReprint = data?.items[0]?.isPrinted;

  const isNotPrinted = data.items.filter((item) => !item.isPrinted).length;

  console.log({ roles: user.roles });

  const buttonStyle = {
    backgroundColor: '#BB3138',
    borderRadius: '5px',
    color: 'White',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
    border: '#fff 2px solid',
    '&:hover': {
      backgroundColor: '#212b36',
      color: 'white',
    },
  };

  const rePrintButtonStyle = {
    backgroundColor: '#212b36',

    borderRadius: '5px',
    color: 'White',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
    border: '#fff 2px solid',
    '&:hover': {
      backgroundColor: '#BB3138',

      color: 'white',
    },
  };

  // Handle Completed Button
  const handleCompletedButton = async () => {
    setLoading(data._id);
    await dispatch(updateAllItemStatus({ status: 'delivered', orderId: data?._id }));
    await dispatch(getOrders(data.store));
    setLoading('');
  };

  // Handle Kitchen Accepted Button
  const handleKitchenAcceptedButton = async () => {
    setLoading(data._id);
    await dispatch(updateOrderStatus({ status: 'accepted', orderId: data?._id }));
    await dispatch(updateAllItemStatus({ status: 'preparing', orderId: data?._id }));
    await dispatch(getOrders(data.store));
    setLoading('');
  };

  // Handle Verified Button
  const handleVerifiedButton = async () => {
    setLoading(data._id);
    await dispatch(updateOrderStatus({ status: 'verified', orderId: data?._id }));
    await dispatch(getOrders(data.store));
    setLoading('');
  };

  const handleCancelButton = async () => {
    setLoading(data._id);
    await dispatch(updateOrderStatus({ status: 'cancel', orderId: data?._id }));
    await dispatch(getOrders(data.store));
    setLoading('');
  };

  const handlePrintTotalKOT = async () => {
    setLoading(data._id);
    await dispatch(updateAllItemStatus({ status: 'printed', orderId: data?._id }));
    await dispatch(getOrders(data.store));
    setLoading('');
    totalKotPrint();
  };

  const handlePrintAdditionalKOT = async () => {
    additionalKotPrint();
    setLoading(data._id);
    await dispatch(updateAllItemStatus({ status: 'printed', orderId: data?._id }));
    await dispatch(getOrders(data.store));
    setLoading('');
  };

  const handlePrintFinalBill = async () => {
    console.log('print clicked');
    finalBillPrint();
  };

  return (
    <Scrollbar sx={data.orderStatus === 'cancel' ? { backgroundColor: '#FFCBCB' } : {}}>
      <Stack spacing={3} sx={{ p: 2.5 }}>
        <OrderDrawerButtons
          buttonLoading={loading}
          isKitchen={isKitchen}
          orderStatus={orderStatus}
          handleVerifiedButton={handleVerifiedButton}
          handleKitchenAcceptedButton={handleKitchenAcceptedButton}
          handleCancelButton={handleCancelButton}
        />
        <Box sx={{ display: 'none' }}>
          <Box ref={totalKotRef}>
            <KotBill data={data} />
          </Box>
        </Box>
        <Box sx={{ display: 'none' }}>
          <Box ref={finalBillRef}>
            <FinalBill data={data} />
          </Box>
        </Box>
        <Box sx={{ display: 'none' }}>
          <Box ref={additonalKotRef}>
            <KotBill data={data} isAdditional />
          </Box>
        </Box>

        <Stack spacing={1}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle1">Order NO: {data.OrderId} </Typography>
            <Typography sx={{ color: 'red' }} variant="subtitle1">
              {timeAgo}
            </Typography>
          </Box>
          <Typography variant="subtitle1">Table N: {data.tableNo}</Typography>
          <Typography variant="subtitle1">
            Customer Name:{' '}
            {`${customerDetails.length ? customerDetails[0].firstName : 'unknown user'}`}
          </Typography>
        </Stack>
      </Stack>
      <Grid container>
        <Grid spacing={1} sx={{ px: 3, my: 1 }} items xs={4}>
          <Typography variant="subtitle1" sx={{ flexGrow: 1, color: 'red' }}>
            Order Details
          </Typography>
        </Grid>
        {data.orderStatus !== 'open' ? (
          <Grid container spacing={1} sx={{ px: 3, my: 1 }} items xs={8}>
            <Grid items xs={6}>
              <Button
                sx={isReprint ? rePrintButtonStyle : buttonStyle}
                onClick={handlePrintTotalKOT}
              >
                {isReprint ? 'Reprint KOT' : 'Print KOT'}
              </Button>
            </Grid>
            <Grid items xs={6}>
              <Button sx={buttonStyle} onClick={handlePrintFinalBill}>
                Print Bills
              </Button>
            </Grid>
          </Grid>
        ) : (
          ''
        )}
      </Grid>
      {/* Render invoice tables based on user role */}
      <Box>
        {isKitchen ? (
          <KitchenInvoiceTable
            dataIndex={dataIndex}
            orderId={data._id}
            storeId={data.store}
            orderStatus={data.orderStatus}
          />
        ) : (
          <OrderInvoiceTable
            data={items}
            orderId={data._id}
            storeId={data.store}
            isverified={data.orderStatus !== 'open'}
            isOrderCompletedfalse={() => setIsOrderCompleted(false)}
            handleCompletedButton={handleCompletedButton}
          />
        )}
      </Box>

      {isNotPrinted && isReprint ? (
        <>
          {' '}
          <Grid container>
            <Grid spacing={1} sx={{ px: 3, my: 1 }} items xs={6}>
              <Typography variant="subtitle1" sx={{ flexGrow: 1, color: 'red' }}>
                Additional Orders
              </Typography>
            </Grid>
            {data.orderStatus !== 'open' ? (
              <Grid container spacing={1} sx={{ px: 3, my: 1 }} items xs={6}>
                <Grid items xs={6}>
                  <Button sx={buttonStyle} onClick={handlePrintAdditionalKOT}>
                    Print KOT
                  </Button>
                </Grid>
              </Grid>
            ) : (
              ''
            )}
          </Grid>
          <Box>
            <OrderInvoiceTable
              data={items}
              isAdditional
              orderId={data._id}
              storeId={data.store}
              isverified={data.orderStatus !== 'open'}
              isOrderCompletedfalse={() => setIsOrderCompleted(false)}
              handleCompletedButton={handleCompletedButton}
            />
          </Box>
        </>
      ) : (
        ''
      )}

      {addOns.length ? (
        <>
          <Stack spacing={2} sx={{ px: 3, my: 1 }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1, color: 'red' }}>
              Add Ons
            </Typography>
          </Stack>
          {addOns && <OrderAddonsTable data={addOns} />}
        </>
      ) : (
        ''
      )}
      {!isKitchen && (
        <OrderDrawerBottom
          data={data}
          handleCompletedButton={handleCompletedButton}
          loading={loading}
        />
      )}
    </Scrollbar>
  );
}

OrderDrawerContent.propTypes = {
  dataIndex: PropTypes.number.isRequired,
};

export default OrderDrawerContent;
