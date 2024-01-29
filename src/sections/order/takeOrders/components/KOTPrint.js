import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import { ConstructionOutlined } from '@mui/icons-material';

const CustomTableRow = styled(TableRow)({
  height: '10px',
  padding: '5px !important',
  borderBottom: '1px dotted black',
});

const CustomTableHead = styled(TableRow)({
  height: '10px',
  padding: '5px !important',
});

const CustomTableCell = styled(TableCell)({
  padding: '5px',
});

KOTPrint.propTypes = {
  cartItems: PropTypes.array,
  newOrder: PropTypes.object,
  orderNumber: PropTypes.object,
  // billRef: PropTypes.object,
  printKot: PropTypes.func,
};

function KOTPrint({  cartItems, newOrder,printKot, orderNumber }) {

 

  // printKot();

  return (
    <Box>
      <Box
        height="80px"
        display="flex"
        justifyContent="space-between"
        borderBottom="1px dotted black"
      >
        <Box gap={1}>
          <Typography sx={{ fontWeight: '400', fontSize: '12px' }}>
            Order No :{' '}
            <span style={{ fontWeight: '500', fontSize: '12px' }}>{orderNumber}</span>
          </Typography>
          <Typography sx={{ fontWeight: '400', fontSize: '12px' }}>
            KOT No :{' '}
            <span style={{ fontWeight: '500', fontSize: '12px' }}>{newOrder?.kotNumber}</span>
          </Typography>
          <Typography sx={{ fontWeight: '400', fontSize: '12px' }}>
            Table No :{' '}
            <span style={{ fontWeight: '500', fontSize: '12px' }}>{newOrder?.tableNo}</span>
          </Typography>
          <Typography sx={{ fontWeight: '400', fontSize: '12px' }}>
            {newOrder?.customerName ? 'Customer Name' : 'Waiter'}:
            <span style={{ fontWeight: '500', fontSize: '12px' }}>
              {newOrder?.customerName || newOrder?.waiterName}
            </span>
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="end">
          <Typography sx={{ fontWeight: '400', fontSize: '10px', color: '#212B36' }}>
            Date :{' '}
            <span style={{ fontWeight: 500, fontSize: '10px' }}>
              {moment(new Date(newOrder?.createdAt)).format('MMM/DD/YYYY')}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: '400', fontSize: '10px' }}>
            Time :{' '}
            <span style={{ fontWeight: 500, fontSize: '10px' }}>
              {moment(newOrder?.createdAt).format('hh:mm')}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: '400', fontSize: '10px' }}>
            {newOrder?.orderType === 'take_away' ? 'Takeaway' : 'Dine-in'}
          </Typography>
        </Box>
      </Box>
      <Table sx={{ minWidth: 267, width: '100%', mt: '10px' }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#F5F5F5 !important', height: '33px !important' }}>
          <CustomTableHead>
            <CustomTableCell>ITEM NAME</CustomTableCell>
            <CustomTableCell>QTY</CustomTableCell>
            <CustomTableCell>SIZE</CustomTableCell>
          </CustomTableHead>
        </TableHead>
        <TableBody>
          {cartItems?.map((item) => (
            <CustomTableRow>
              <CustomTableCell>{item?.name}</CustomTableCell>
              <CustomTableCell>{item?.quantity}</CustomTableCell>
              <CustomTableCell>{item?.variant?.variantName}</CustomTableCell>
            </CustomTableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default React.memo(KOTPrint);
