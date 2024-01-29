import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { IconButton, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import Iconify from '../../../components/iconify/Iconify';

HistoryInvoiceTable.propTypes = {
  data: PropTypes.object,
};

export default function HistoryInvoiceTable({ data }) {
  console.log('Drawer', data);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isverified, setIsVerified] = useState(true);

  const isDesktop = useMediaQuery('(min-width:768px)');

  const stateColor = {
    accepted: 'yellow',
    completed: 'green',
  };
  return (
    <>
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
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                borderBottom: '0.5px solid black',
              }}
            >
              <TableCell component="th" scope="row">
                <Box>{row.name}</Box>
                <Box>
                  <Typography
                    sx={{ cursor: 'pointer' }}
                    onClick={handleOpen}
                    style={{ color: 'red' }}
                  >
                    <u>Instructions</u>
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{row.qty}</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>{row.size ? row.size : '-'}</TableCell>

              <TableCell>
                <Box>{row.price}</Box>
                <Box>
                  <Typography variant="subtitle6">100</Typography>
                </Box>
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
              Identify potential allergens: Carefully read ingredient labels. Common allergens
              include nuts, dairy, eggs, and wheat. Cross-check for hidden ingredients.
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
