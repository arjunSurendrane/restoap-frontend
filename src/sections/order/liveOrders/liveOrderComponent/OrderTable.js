import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import KitchenTypeItemList from '../../takeOrders/components/KitchenTypeItemList';

function OrderTable({ items, handleSelectInstruction, order }) {
  const kitchenGroupedItems = items?.orderItems?.reduce((result, item) => {
    (result[item.kitchenName] = result[item.kitchenName] || []).push(item);
    return result;
  }, {});

  console.log({ kitchenGroupedItems });

  return (
    <Box >
      {Object.keys(kitchenGroupedItems).map((kitchenName) => (
        <KitchenTypeItemList
          order={{ ...items, kitchenGroupedItems }}
          kitchenName={kitchenName}
          orderNumber={order.orderNumber}
        />
      ))}
    </Box>
  );
  // return (
  //   <Table sx={{ minWidth: 350 }} aria-label="simple table">
  //     <TableHead sx={{ width: '50px', fontWeight: '500', fontSize: '14px', color: 'black' }}>
  //       <TableRow>
  //         <TableCell>ITEM NAME</TableCell>
  //         <TableCell>QTY</TableCell>
  //         <TableCell>SIZE</TableCell>
  //       </TableRow>
  //     </TableHead>
  //     <TableBody>
  //       {items?.orderItems?.map((item) => (
  //         <TableRow
  //           key={item?._id}
  //           sx={{
  //             '&:last-child td, &:last-child th': { border: 0 },
  //             borderBottom: '0.5px solid black',
  //           }}
  //         >
  //           <TableCell component="th" scope="row">
  //             <Box>
  //               <Typography
  //                 sx={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}
  //               >
  //                 {item?.name}
  //               </Typography>
  //               <Typography
  //                 sx={{ fontSize: '12px', fontWeight: '400', textTransform: 'capitalize',cursor:'pointer' }}
  //                 onClick={() => handleSelectInstruction(item?.note)}
  //               >
  //                 <u>{item?.note}</u>
  //               </Typography>
  //             </Box>
  //           </TableCell>
  //           <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>{item?.quantity}</TableCell>
  //           <TableCell sx={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}>
  //             {item?.variant?.variantName || 'Nil'}
  //           </TableCell>
  //         </TableRow>
  //       ))}
  //       {items?.addons?.map((item) => (
  //         <TableRow
  //           key={item?._id}
  //           sx={{
  //             '&:last-child td, &:last-child th': { border: 0 },
  //             borderBottom: '0.5px solid black',
  //           }}
  //         >
  //           <TableCell component="th" scope="row">
  //             <Box>
  //               <Typography
  //                 sx={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}
  //               >
  //                 {item?.name}
  //               </Typography>
  //             </Box>
  //           </TableCell>
  //           <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>{item?.quantity}</TableCell>
  //           <TableCell sx={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}>
  //             {item?.variant?.variantName || 'Nil'}
  //           </TableCell>
  //         </TableRow>
  //       ))}
  //     </TableBody>
  //   </Table>
  // );
}
OrderTable.propTypes = {
  items: PropTypes.object,
  order: PropTypes.object,
  handleSelectInstruction: PropTypes.func,
};
export default OrderTable;
