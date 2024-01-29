import React from 'react';
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
import { IconButton, useMediaQuery, Chip, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import order, { getOrders, updateItemStatus, updateOrderStatus } from '../../../../redux/slices/order';
import Iconify from '../../../../components/iconify/Iconify';
import { itemStatus } from '../constant';
import './kotstyle.css'
import OrderDrawerBottom from '../OrderDrawerBottom';

const FinalBill = ({ data, isAdditional }) => {

    const { branch } = useSelector(state => state.branch)

    const kotDetails = [
        { leftKey: 'Bill No', rightKey: 'Date', left: '45948594', right: moment(data.createdAt).format("MMM Do YY") },
        { leftKey: 'Order No', rightKey: 'Time', left: '45454', right: moment(data.createdAt).format("hh:mm a") },
        { leftKey: 'Table No', rightKey: 'Dine in', left: 'table009', right: false },
        { leftKey: 'Customer Name', rightKey: false, left: 'Abeesh', right: false },
    ]

    const tableBody = data.items.filter(item => isAdditional ? !item.isPrinted : true)

    return (
        <div className='billBody'>
            <div style={{ padding: '10px' }}>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <div>
                        <h3>{branch.name}</h3>
                    </div>
                    <div>
                        <h4>{branch.storeType}</h4>
                    </div>
                    <div>{branch.address} - {branch.location}</div>
                    <div>Pincode</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>email: example@gmail.com</div>
                    <div>phone: {branch.phone}</div>
                </div>
                <div>Gstno: 45848545999</div>
                <div>Fssai: 59685869956895</div>
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
            <hr />
            <div>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead sx={{ width: '50px' }}>
                        <TableRow>
                            <TableCell>ITEM NAME</TableCell>
                            <TableCell>QTY</TableCell>
                            <TableCell>SIZE</TableCell>
                            <TableCell>AMOUNT</TableCell>
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

                                </TableCell>
                                <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>{row.qty}</TableCell>
                                <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                                    {row.size ? row.size : 'Nil'}
                                </TableCell>
                                <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                                    {row.price}
                                </TableCell>


                            </TableRow>
                        )
                        )}
                    </TableBody>
                </Table>
            </div>
            <div style={{ padding: '10px' }}>
                <div spacing={3} style={{ p: 2.5 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h4>Total Amount (Before Tax)</h4>
                        </div>
                        <div>
                            <h4>{data.subtotalAmount}</h4>
                        </div>
                    </div>
                    {/* Other amount-related sections */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p >SGST @ 2.5 % </p>
                        </div>
                        <div>
                            {' '}
                            <p >{data.sgst}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p >CGST @ 2.5 %</p>
                        </div>
                        <div>
                            <p >{data.cgst}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p >Additional Charges ( AC )</p>
                        </div>
                        <div>
                            {' '}
                            <p >{data?.additionalCharge || 0}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p >Gross Amount</p>
                        </div>
                        <div>
                            {' '}
                            <p >{data.grossAmount}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p >Rounded</p>
                        </div>
                        <div>
                            {' '}
                            <p >{data.discount}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: '#D9D9D9',
                    paddingInline: '15px',
                    minHeight: '35px',
                    alignItems: 'center',
                }}
            >
                <div>
                    <h4>GRAND TOTAL</h4>
                </div>
                <div>
                    <h4>{parseInt(data.totalAmount, 10)}</h4>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h4>Thank You Visit Again</h4>
            </div>

        </div >
    );
};

FinalBill.propTypes = {
    data: PropTypes.object.isRequired,
    isAdditional: PropTypes.bool.isRequired
};

export default FinalBill;
