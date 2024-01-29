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
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify/Iconify';
import { getOrders, updateItemStatus } from '../../../redux/slices/order';
// import { stateColor, statusColor } from './constant';
// import { orderStatus, itemStatus } from './constant';

import CustomButton from '../../../components/button/CustomButton';

KitchenInvoiceTable.propTypes = {
  dataIndex: PropTypes.number,
  orderId: PropTypes.string,
  storeId: PropTypes.string,
  orderStatus: PropTypes.string,
};

export default function KitchenInvoiceTable({ dataIndex, orderId, storeId, orderStatus }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState('');
  const handleOpen = (noteData) => {
    setNote(noteData);
    setOpen(true);
  };
  const handleClose = () => {
    setNote('');
    setOpen(false);
  };
  const dispatch = useDispatch();

  const { orders, isLoading, error } = useSelector((state) => state.order);
  const order = orders[dataIndex];
  const data = order.items;

  const handleReadytoServe = async (itemId) => {
    setLoading(itemId);
    await dispatch(updateItemStatus({ status: 'cooked', orderId, itemId }));
    await dispatch(getOrders(storeId));
    setLoading('');
  };

  console.log({ loading });

  const isDesktop = useMediaQuery('(min-width:768px)');

  return (
    <>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead sx={{ width: '50px' }}>
          <TableRow>
            <TableCell sx={{ color: 'black' }}>ITEM NAME</TableCell>
            <TableCell sx={{ color: 'black' }}>QTY</TableCell>
            <TableCell sx={{ color: 'black' }}>SIZE</TableCell>
            {/* <TableCell>STATUS</TableCell> */}
            <TableCell sx={{ color: 'black' }}>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
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
              <TableCell>{row.qty}</TableCell>
              <TableCell>{row.size ? row.size : 'Nil'}</TableCell>
              <TableCell>
                {(row.status === 'preparing' || row.status === 'open') &&
                orderStatus !== 'verified' ? (
                  <LoadingButton
                    variant="contained"
                    key={row.status + index}
                    loading={loading === row._id}
                    onClick={() => handleReadytoServe(row._id)}
                    sx={{
                      backgroundColor: '#BB3138',
                      borderRadius: '5px',
                      color: '#White',
                      boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
                      border: '#fff 2px solid',
                      whiteSpace: 'nowrap',
                      display: 'inline-block',
                      textAlign: 'center',
                      '&:hover': {
                        backgroundColor: '#212b36',
                        color: 'white',
                      },
                    }}
                  >
                    Ready to serve
                  </LoadingButton>
                ) : (
                  // <Chip
                  //   label={
                  //     // eslint-disable-next-line no-nested-ternary
                  //     row.status
                  //   }
                  //   sx={{ backgroundColor: stateColor[row.status], color: 'white' }}
                  // />
                  <LoadingButton
                    variant="contained"
                    key={row.status + index}
                    loading={loading === row._id}
                    disabled
                    onClick={() => handleReadytoServe(row._id)}
                    sx={{
                      backgroundColor: '#BB3138',
                      borderRadius: '5px',
                      color: '#White',
                      boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
                      border: '#fff 2px solid',
                      whiteSpace: 'nowrap',
                      display: 'inline-block',
                      textAlign: 'center',
                      '&:hover': {
                        backgroundColor: '#212b36',
                        color: 'white',
                      },
                    }}
                  >
                    Ready to serve
                  </LoadingButton>
                )}
              </TableCell>
            </TableRow>
          ))}
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
