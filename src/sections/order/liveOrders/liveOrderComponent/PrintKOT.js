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
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
PrintKOT.propTypes = {
  mainOrder: PropTypes.object,
  printKot: PropTypes.func,
};

function PrintKOT({ mainOrder,printKot }) {
  console.log(mainOrder);

//   useEffect(() => {
//     if (Object.keys(mainOrder).length > 0) printKot();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [mainOrder]);

  return (
    <>
      <Box
        height="80px"
        display="flex"
        justifyContent="space-between"
        borderBottom="1px dotted black"
      >
        <Box gap={1}>
          <Typography sx={{ fontWeight: '400', fontSize: '12px' }}>
            Order No :{' '}
            <span style={{ fontWeight: '500', fontSize: '12px' }}>{mainOrder?.orderNumber}</span>
          </Typography>
          <Typography sx={{ fontWeight: '400', fontSize: '12px' }}>
            KOT No :{' '}
            <span style={{ fontWeight: '500', fontSize: '12px' }}>{mainOrder?.subOrders?.kotNumber}</span>
          </Typography>
          <Typography sx={{ fontWeight: '400', fontSize: '12px' }}>
            Table No :{' '}
            <span style={{ fontWeight: '500', fontSize: '12px' }}>{mainOrder?.tableNo}</span>
          </Typography>
          <Typography sx={{ fontWeight: '400', fontSize: '12px' }}>
            {mainOrder?.customerName ? 'Customer Name' : 'Waiter'}:
            <span style={{ fontWeight: '500', fontSize: '12px' }}>
              {mainOrder?.customerName || mainOrder?.waiterName}
            </span>
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="end">
          <Typography sx={{ fontWeight: '400', fontSize: '10px', color: '#212B36' }}>
            Date :{' '}
            <span style={{ fontWeight: 500, fontSize: '10px' }}>
              {moment(new Date(mainOrder?.subOrders?.createdAt)).format('MMM/DD/YYYY')}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: '400', fontSize: '10px' }}>
            Time :{' '}
            <span style={{ fontWeight: 500, fontSize: '10px' }}>
              {moment(mainOrder?.subOrders?.createdAt).format('hh:mm')}
            </span>
          </Typography>
          <Typography sx={{ fontWeight: '400', fontSize: '10px' }}>
            {mainOrder?.orderType === 'take_away' ? 'Takeaway' : 'Dine-in'}
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
          {mainOrder?.subOrders?.orderItems?.map((item) => (
            <CustomTableRow>
              <CustomTableCell>{item?.name}</CustomTableCell>
              <CustomTableCell>{item?.quantity}</CustomTableCell>
              <CustomTableCell>{item?.variant?.variantName}</CustomTableCell>
            </CustomTableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default PrintKOT;
