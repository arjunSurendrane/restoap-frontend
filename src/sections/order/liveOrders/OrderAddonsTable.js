import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import PropTypes from 'prop-types';

OrderAddonsTablle.propTypes = {
  data: PropTypes.object,
};

function OrderAddonsTablle({ data }) {
  // console.log({addOns})

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
        {data?.map((row) => (
          <TableRow
            key={row.name}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              borderBottom: '0.5px solid black',
            }}
          >
            <TableCell sx={{ fontSize: '14px', fontWeight: '500' }} component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>{row.qty}</TableCell>
            <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>{row.size || 'Nil'}</TableCell>
            <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>{row.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default OrderAddonsTablle;
