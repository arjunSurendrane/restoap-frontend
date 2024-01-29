/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { cleanDigitSectionValue } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';
import { useDispatch } from 'react-redux';
import { getOrders, updateItemStatus } from '../../../../redux/slices/order';

const CustomBtn = styled(Button)(({ col, disable }) => ({
  minWidth: '120px',
  fontSize: '14px',
  minHeight: '30px',
  height: '40px',
  disabled: true,
  fontWeight: 500,
  backgroundColor: col || '#BB3138',
  borderRadius: '5px',
  color: 'White',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  border: '#fff 2px solid',
  '&:hover': {
    backgroundColor: '#212b36',
    color: 'white',
  },
}));
const columns = [
  { field: 'name', headerName: 'ITEM NAME', width: 130 },
  { field: 'quantity', headerName: 'QTY', width: 70 },
  { field: 'size', headerName: 'SIZE', width: 100 },
  {
    field: 'itemStatus', // Add a new field for the button
    headerName: 'STATUS',
    width: 120,
    renderCell: (params) => {
      const status = params.row.itemStatus;
      // eslint-disable-next-line no-nested-ternary
      const text =
        status === 'delivered' ? 'Delivered' : status === 'readytoserve' ? 'Ready' : 'Prepairing';
      // eslint-disable-next-line no-nested-ternary
      const color =
        status === 'delivered' ? '#A6DA38' : status === 'readytoserve' ? '#E4AF47' : '#E44751';

      return (
        <Chip
          sx={{
            fontSize: '12px',
            width: '90px',
            height: '30px',
            backgroundColor: color,
            color: '#fff',
          }}
          label={text}
        />
      );
    },
  },
];

function AcceptedOrderTable({ items, orderId, suborderId, storeId }) {
  console.log({ items });
  const orderedItems = items?.orderItems;
  const addons = items?.addons || [];
  const [orderItems, setOrderItems] = useState(orderedItems);
  const rows = orderItems.map((item) => ({ ...item, id: item?._id }));
  const dispatch = useDispatch();
  const [selectionModel, setSelectionModel] = useState([]);
  const [itemIds, setItemIds] = React.useState([]);
  const handleItemStatusChange = async (status) => {
    console.log({ orderId });
    await dispatch(updateItemStatus({ status, orderId, suborderId, itemIds }));
    await dispatch(getOrders({ storeId }));
  };

  useEffect(() => {
    setOrderItems(orderedItems);
  }, [items, orderedItems]);
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          '.MuiDataGrid-footerContainer': {
            display: 'none',
          },
        }}
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = ids;
          // const selectedRow = data.rows.filter((row) => selectedIDs.has(row.id));
          setItemIds(selectedIDs);
        }}
      />
      {addons.length > 0 && (
        <>
          <Box sx={{ width: '100%', height: '30px', bgcolor: '#8080803d', textAlign: 'center' }}>
            AddOns
          </Box>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead sx={{ width: '50px', fontWeight: '500', fontSize: '14px', color: 'black' }}>
              <TableRow>
                <TableCell>ITEM NAME</TableCell>
                <TableCell>QTY</TableCell>
                <TableCell>SIZE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addons?.map((item) => (
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
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                    {item?.quantity}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}
                  >
                    {item?.variant?.variantName || 'Nil'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      <Box
        sx={{
          padding: '10px',
          display: 'flex',
          justifyContent: 'end',
          gap: 2,
          width: '100%',
          height: '60px',
        }}
      >
        <Button
          variant="contained"
          sx={{
            minWidth: '120px',
            fontSize: '14px',
            minHeight: '30px',
            height: '40px',
            fontWeight: 500,
            backgroundColor: '#BB3138',
            borderRadius: '5px',
            color: 'White',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
            border: '#fff 2px solid',
            '&:hover': {
              backgroundColor: '#212b36',
              color: 'white',
            },
          }}
          disabled={!(itemIds.length > 0)}
          onClick={() => handleItemStatusChange('readytoserve')}
        >
          Ready to serve
        </Button>
        {/* <CustomBtn disabled>Delivered</CustomBtn> */}
        <Button
          sx={{
            minWidth: '120px',
            fontSize: '14px',
            minHeight: '30px',
            height: '40px',
            fontWeight: 500,
            backgroundColor: '#BB3138',
            borderRadius: '5px',
            color: 'White',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
            border: '#fff 2px solid',
            '&:hover': {
              backgroundColor: '#212b36',
              color: 'white',
            },
          }}
          variant="contained"
          disabled={!(itemIds.length > 0)}
          onClick={() => handleItemStatusChange('delivered')}
        >
          Delivered
        </Button>
      </Box>
    </>
  );
}
AcceptedOrderTable.propTypes = {
  items: PropTypes.object,
  orderId: PropTypes.string,
  suborderId: PropTypes.string,
  storeId: PropTypes.string,
};

export default AcceptedOrderTable;
