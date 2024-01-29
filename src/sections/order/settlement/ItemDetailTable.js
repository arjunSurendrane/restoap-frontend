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

ItemDetailTable.propTypes = {
  data: PropTypes.object,
};

function ItemDetailTable({ data }) {
  let itemsArray = [];
  data.subOrders.map((suborder) => {
    itemsArray = [...itemsArray, ...suborder.orderItems];
    return null;
  });
  console.log({ itemsArray });
  return (
    <Table sx={{ minWidth: 350 }} aria-label="simple table">
      <TableHead sx={{ width: '50px' }}>
        <TableRow>
          <TableCell>ITEM NAME</TableCell>
          <TableCell>QTY</TableCell>
          <TableCell>SIZE</TableCell>
          <TableCell>PRICE</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {itemsArray.map((item) => (
          <TableRow
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              borderBottom: '0.5px solid black',
            }}
          >
            <TableCell component="th" scope="row">
              <Box>
                <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>{item?.name}</Typography>
              </Box>

              <Box>{item?.note}</Box>
            </TableCell>
            <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>{item?.quantity}</TableCell>
            <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
              {item?.variant?.variantName || 'Nil'}
            </TableCell>

            <TableCell>{item?.finalPrice}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ItemDetailTable;
