import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function PrevOrderDrawerTable({ orderData }) {
  const { subOrders } = orderData;
  console.log({ subOrders });
  // const flaternArray = subOrders.flat();
  const allOrders = subOrders.flatMap((item) => item.addons.concat(item.orderItems));
  console.log({ allOrders });

  return (
    <Table sx={{ minWidth: 350 }} aria-label="simple table">
      <TableHead sx={{ width: '50px' }}>
        <TableRow>
          <TableCell>ITEM NAME</TableCell>
          <TableCell>QTY</TableCell>
          <TableCell>SIZE</TableCell>
          {/* {isverified ? <TableCell>Status</TableCell> : ''} */}
          <TableCell>PRICE</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {allOrders?.map((item) => (
          <TableRow
            key={item?._id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              borderBottom: '0.5px solid black',
            }}
          >
            <TableCell component="th" scope="row">
              <Box>
                <Typography
                  sx={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}
                >
                  {item?.name}
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>{item?.note}</Typography>
              </Box>

              {/* <Box>{item?.note}</Box> */}
            </TableCell>
            <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>{item?.quantity}</TableCell>
            <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
              {item?.variant?.variantName || 'Nil'}
            </TableCell>
            <TableCell>{(item.finalPrice / item.quantity).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
PrevOrderDrawerTable.propTypes = {
  orderData: PropTypes.object,
};
export default PrevOrderDrawerTable;
