import { Box, Chip, Typography, styled } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useAuthContext } from '../../../auth/useAuthContext';

const CommonText = styled(Typography)({
  fontSize: '14px',
  textTransform: 'capitalize',
  fontWeight: 400,
});

function PrevOrderDrawerContent({ orderData }) {
  console.log({ orderData });
  const { user } = useAuthContext();
  const { branch } = useSelector((state) => state.branch);
  console.log({ branch });
  const subOrderLength = orderData?.subOrders.length;
  const kotStarting = orderData?.subOrders[0].kotNumber || ' 0000';
  const kotEnd = orderData?.subOrders[subOrderLength - 1].kotNumber || ' 0000';
  const createdDate = moment(orderData?.createdAt).format('DD/MM/YYYY');
  const dateString = orderData?.createdAt;
  const dateObject = moment(dateString);
  const timeString = dateObject.format('hh:mm A');
  return (
    <Box width="100%">
      <Box width="100%" borderBottom="1px dashed grey" p="5px 15px">
        <Box textAlign="center">
          <Typography fontSize="18px" fontWeight="500">
            {orderData?.storeName}
          </Typography>
          {/* <Typography fontWeight="400" fontSize="14px">
            North Indian . South Indian . Fast Food
          </Typography> */}
          <Typography mt="3px" fontWeight="400" fontSize="16px">
            {branch?.address} <br /> {branch?.location}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box width="60%">
            <CommonText>GST No : {branch?.gstNumber}</CommonText>
            <CommonText>FSSAI Lic. No : {branch?.fssaiNumber}</CommonText>
          </Box>
          <Box width="40%" display="flex" justifyContent="end">
            <Typography fontWeight="400" fontSize="14px">
              Phone : {branch?.phone}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box p="5px 15px" width="100%" display="flex" justifyContent="space-between">
        <Box>
          <Typography fontWeight="300" fontSize="14px">
            Bill No : <span style={{ fontWeight: '500' }}>{orderData?.orderNumber}</span>
          </Typography>
          <Typography fontWeight="300" fontSize="14px">
            KOT No :{' '}
            <span style={{ fontWeight: '500' }}>
              {' '}
              {kotEnd === kotStarting ? kotStarting : `${kotStarting} - ${kotEnd}`}
            </span>
          </Typography>
          <Typography fontWeight="300" fontSize="14px">
            Table No :<span style={{ fontWeight: '500' }}> {orderData?.tableNo} </span>
          </Typography>
          <Typography fontWeight="300" fontSize="14px">
            {orderData?.customer ? 'Customer Name' : 'Waiter'}:
            <span style={{ fontWeight: '500' }}>
              {orderData?.customer || orderData?.subOrders[0]?.waiterName}{' '}
            </span>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="end" flexDirection="column">
          <Typography fontWeight="300" fontSize="12px">
            Date :{createdDate}
          </Typography>
          <Typography fontWeight="300" fontSize="12px">
            Time : {timeString}
          </Typography>
          <Chip
            label={
              orderData?.subOrders.find((item) => item.orderType === 'dining')
                ? 'Dine-in'
                : 'Takeaway'
            }
            sx={{ height: '18px', fontSize: '10px' }}
          />
        </Box>
      </Box>
    </Box>
  );
}
PrevOrderDrawerContent.propTypes = {
  orderData: PropTypes.object,
};
export default PrevOrderDrawerContent;
