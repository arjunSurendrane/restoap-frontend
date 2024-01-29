import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { IconButton, useMediaQuery, Chip } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import order, { getOrders, updateItemStatus, updateOrderStatus } from '../../../redux/slices/order';
import Iconify from '../../../components/iconify/Iconify';
import { itemStatus } from './constant';

OrderInvoiceTablle.propTypes = {
  data: PropTypes.object,
  isverified: PropTypes.bool,
  isOrderCompletedfalse: PropTypes.bool,
  orderId: PropTypes.number,
  storeId: PropTypes.number,
  isAdditional: PropTypes.bool
};

function OrderInvoiceTablle({ data, isverified, isAdditional, isOrderCompletedfalse, orderId, storeId }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(isAdditional ? data.filter(item => !item.isPrinted) : data)
  const [loading, setLoading] = useState('');
  const [note, setNote] = useState('');
  const handleOpen = (noteData) => {
    setNote(noteData);
    setOpen(true);
  };
  const handleClose = () => {
    setNote('');
    setOpen(false);
  };
  const dispatch = useDispatch();

  const handleDelivered = async (itemId) => {
    setLoading(itemId);
    await dispatch(updateItemStatus({ status: 'delivered', orderId, itemId }));
    await dispatch(getOrders(storeId));
    setLoading('');
  };


  const isDesktop = useMediaQuery('(min-width:768px)');

  console.log({ data, isverified });

  const fontColor = {
    delivered: '#118d57',
  };
  return (
    <>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead sx={{ width: '50px' }}>
          <TableRow>
            <TableCell>ITEM NAME</TableCell>
            <TableCell>QTY</TableCell>
            <TableCell>SIZE</TableCell>
            {isverified ? <TableCell>Status</TableCell> : ''}
            <TableCell>PRICE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => {
            console.log({ row });
            if (row.status !== 'cooked') isOrderCompletedfalse();
            return (
              <TableRow
                key={row.name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  borderBottom: '0.5px solid black',
                }}
              >
                <TableCell component="th" scope="row">
                  <Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>{row.name}</Typography>
                  </Box>
                  {row.note ? (
                    <Box>
                      <Typography
                        sx={{ cursor: 'pointer', fontSize: '12px', fontWeight: '400' }}
                        onClick={() => handleOpen(row.note)}
                        style={{ color: 'red' }}
                      >
                        <u>Instructions</u>
                      </Typography>
                    </Box>
                  ) : (
                    ''
                  )}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>{row.qty}</TableCell>
                <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                  {row.size ? row.size : 'Nil'}
                </TableCell>
                {isverified ? (
                  <TableCell>
                    <Chip
                      size="small"
                      label={
                        // eslint-disable-next-line no-nested-ternary
                        row.status === 'open' ? 'Pending' : row.status
                      }
                      sx={{
                        backgroundColor: itemStatus[row.status],
                        color: 'white',
                      }}
                    />
                  </TableCell>
                ) : (
                  ''
                )}
                <TableCell>
                  <Box sx={{ fontSize: '14px', fontWeight: '500' }}>{row.price}</Box>
                  <Box>
                    <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>
                      {row.price / row.qty}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isDesktop ? 600 : 300,
            height: isDesktop ? 150 : 200,
            bgcolor: 'background.paper',
            overflow: 'hidden',
            boxShadow: 24,
            borderRadius: '8px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#BB3138',
              padding: '10px',
              width: '100%',
            }}
          >
            <Typography sx={{ color: 'white' }} id="modal-modal-title" variant="h6" component="h2">
              Instructions
            </Typography>
            <Box
              sx={{
                width: '26px',
                height: '26px',
                backgroundColor: 'white',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '5px',
              }}
            >
              <IconButton sx={{ color: 'red' }} onClick={handleClose}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </Box>
          </Box>
          <Box padding={1}>
            <Typography id="modal-modal-description" sx={{ marginBottom: '5px', marginTop: '5px' }}>
              {note}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default OrderInvoiceTablle;
