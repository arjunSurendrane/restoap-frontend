import PropTypes from 'prop-types';
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
import { tr } from 'date-fns/locale';
import React, { useState } from 'react';
import { IconButton, useMediaQuery, Chip } from '@mui/material';
import { useDispatch } from 'react-redux';
import moment from 'moment'
import order, { getOrders, updateItemStatus, updateOrderStatus } from '../../../../redux/slices/order';
import Iconify from '../../../../components/iconify/Iconify';
import { itemStatus } from '../constant';
import './kotstyle.css'

const KotBill = ({ data, isAdditional }) => {
    const variable = 8
    const kotDetails = [
        { leftKey: 'Order No', rightKey: 'Date', left: data.OrderId, right: moment(data.createdAt).format("MMM Do YY") },
        { leftKey: 'Kot No', rightKey: 'Time', left: data.OrderId.slice(-3), right: moment(data.createdAt).format("hh:mm a") },
        { leftKey: 'Table No', rightKey: 'Dine in', left: data.tableNo, right: false },
        { leftKey: 'Customer Name', rightKey: false, left: 'Abeesh', right: false },
    ]


    const tableBody = data.items.filter(item => isAdditional ? !item.isPrinted : true)
    return (
        <div className='billBody'>
            <div style={{ padding: '10px' }}>
                {kotDetails.map(detail => (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>{detail.leftKey}: {detail.left}</div>
                        <div>{detail.rightKey}{detail.right ? `: ${detail.right}` : ''}</div>
                    </div>
                ))}
            </div>
            <hr />
            <div>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead sx={{ width: '50px' }}>
                        <TableRow>
                            <TableCell>ITEM NAME</TableCell>
                            <TableCell>QTY</TableCell>
                            <TableCell>SIZE</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableBody.map((row) => (
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
                                    <Box>
                                        <Typography>{row.note}</Typography>
                                    </Box>

                                </TableCell>
                                <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>{row.qty}</TableCell>
                                <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                                    {row.size ? row.size : 'Nil'}
                                </TableCell>


                            </TableRow>
                        )
                        )}
                    </TableBody>
                </Table>
            </div>
            <hr />
            <div style={{ padding: '10px' }}>
                {kotDetails.map(detail => (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>{detail.leftKey}: {detail.left}</div>
                        <div>{detail.rightKey}{detail.right ? `: ${detail.right}` : ''}</div>
                    </div>
                ))}
            </div>
        </div>
    )
};

KotBill.propTypes = {
    data: PropTypes.object.isRequired,
    isAdditional: PropTypes.bool.isRequired
};

export default KotBill;
