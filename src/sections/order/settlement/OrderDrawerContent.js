import { Box, Chip, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';

OrderDrawerContent.propTypes = {
  data: PropTypes.object,
};

function OrderDrawerContent({ data }) {
  const { branch } = useSelector((state) => state.branch);
  const subOrderLength = data?.subOrders.length;
  const kotStarting = data?.subOrders[0].kotNumber || ' 0000';
  const kotEnd = data?.subOrders[subOrderLength - 1].kotNumber || ' 0000';
  return (
    <Box width="100%">
      <Box width="100%" borderBottom="1px dashed grey" p="5px 15px">
        <Box textAlign="center">
          <Typography fontSize="18px" fontWeight="500">
            {branch?.name}
          </Typography>
          <Typography fontWeight="400" fontSize="14px">
            {branch?.storeType}
          </Typography>
          <Typography mt="3px" fontWeight="400" fontSize="16px">
            {branch?.address} <br /> {branch?.location}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box width="60%">
            <Typography fontWeight="400" fontSize="14px">
              Email : {branch?.email || '--'}{' '}
            </Typography>
            <Typography fontWeight="400" fontSize="14px">
              GST No : {branch?.gstNumber || '--'}
            </Typography>
            <Typography fontWeight="400" fontSize="14px">
              FSSAI Lic. No : {branch?.fssaiNumber || '--'}
            </Typography>
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
            Bill No : <span style={{ fontWeight: '500' }}> {data?.orderNumber || '--'}</span>
          </Typography>
          <Typography fontWeight="300" fontSize="14px">
            KOT No :{' '}
            <span style={{ fontWeight: '500' }}>
              {kotEnd === kotStarting ? kotStarting : `${kotStarting} - ${kotEnd}`}
            </span>
          </Typography>
          <Typography fontWeight="300" fontSize="14px">
            Table No :<span style={{ fontWeight: '500' }}> {data.tableNo} </span>
          </Typography>
          {data?.customerName ? (
            <Typography fontSize="16px" fontWeight="500">
              Customer Name: {data?.customerName}
            </Typography>
          ) : (
            <Typography fontSize="16px" fontWeight="500">
              Waiter Name: {data?.subOrders[0]?.waiterName || '--'}
            </Typography>
          )}
        </Box>
        <Box display="flex" justifyContent="end" flexDirection="column">
          <Typography fontWeight="300" fontSize="12px">
            Date : {moment(data.createdAt).format('DD MM YYYY')}
          </Typography>
          <Typography fontWeight="300" fontSize="12px">
            Time : {moment(data.createdAt).format('hh:mm A')}
          </Typography>
          {/* <Chip label="Dine In" sx={{ height: '18px', fontSize: '10px' }} /> */}
        </Box>
      </Box>
    </Box>
  );
}

export default OrderDrawerContent;
