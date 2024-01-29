/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';
import {
  Box,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';
import './print.css';

const OrderBillForPrinter = ({ data }) => {
  const { branch } = useSelector((state) => state.branch);
  const subOrderLength = data?.subOrders.length;
  const kotStarting = data?.subOrders[0].kotNumber || ' 0000';
  const kotEnd = data?.subOrders[subOrderLength - 1].kotNumber || ' 0000';
  console.log({ taxRate: branch.taxRate });
  let itemsArray = [];
  data.subOrders.map((suborder) => {
    itemsArray = [...itemsArray, ...suborder.orderItems];
    return null;
  });
  return (
    <div style={{ paddingBottom: '30px' }}>
      <Box width="100%">
        <Box width="100%" borderBottom="1px dashed grey" p="5px 35px">
          <Box textAlign="center">
            <Typography fontSize="32px" fontFamily="sans-serif" fontWeight="500">
              {branch?.name}
            </Typography>
            <Typography fontWeight="400" fontSize="14px">
              {branch?.storeType}
            </Typography>
            <Typography mt="3px" fontWeight="400" fontSize="16px">
              {branch?.address} <br /> {branch?.location}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box width="60%">
              <Typography fontWeight="400" fontSize="14px">
                Email : {branch?.email || '--'}{' '}
              </Typography>
              <Typography fontWeight="400" fontSize="14px">
                GST No : {branch?.gstNumber || '--'}
              </Typography>
              <Typography fontWeight="400" fontSize="14px">
                FSSAI Lic. No : {branch?.fssaiNumber || '--'}
              </Typography>
            </Box>
            <Box width="40%" display="flex" justifyContent="end">
              <Typography fontWeight="400" fontSize="14px">
                Phone : {branch?.phone}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box width="100%" display="flex" justifyContent="space-between" p="5px 35px">
          <Box>
            <Typography fontWeight="300" fontSize="14px">
              Bill No : <span style={{ fontWeight: '500' }}> {data?.orderNumber || '--'}</span>
            </Typography>
            <Typography fontWeight="300" fontSize="14px">
              KOT No :{' '}
              <span style={{ fontWeight: '500' }}>
                {kotEnd === kotStarting ? kotStarting : `${kotStarting} - ${kotEnd}`}
              </span>
            </Typography>
            <Typography fontWeight="300" fontSize="14px">
              BTable No :<span style={{ fontWeight: '500' }}> {data.tableNo} </span>
            </Typography>
            {data?.customerName ? (
              <Typography fontSize="16px" fontWeight="500">
                Customer Name: {data?.customerName}
              </Typography>
            ) : (
              <Typography fontSize="16px" fontWeight="500">
                Waiter Name: {data?.subOrders[0]?.waiterName || '--'}
              </Typography>
            )}
          </Box>
          <Box display="flex" justifyContent="end" flexDirection="column">
            <Typography fontWeight="300" fontSize="12px">
              Date : {moment(data.createdAt).format('DD MM YYYY')}
            </Typography>
            <Typography fontWeight="300" fontSize="12px">
              Time : {moment(data.createdAt).format('hh:mm A')}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mx: 3 }}>
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
                    <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                      {item?.name}
                    </Typography>
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
        <Stack spacing={1} sx={{ p: '15px', display: 'flex', spacing: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle1">Total Amount (Before Tax)</Typography>
            </Box>
            <Box>
              {' '}
              <Typography variant="subtitle1">{data?.subtotalBillAmount}</Typography>
            </Box>
          </Box>
          {branch?.taxRate ? (
            <>
              {' '}
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle2">SGST @ 2.5 % </Typography>
                </Box>
                <Box>
                  {' '}
                  <Typography variant="subtitle2">
                    {(data?.charges?.tax / 2)?.toFixed(2) || 0}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle2">CGST @ 2.5 %</Typography>
                </Box>
                <Box>
                  {' '}
                  <Typography variant="subtitle2">
                    {(data?.charges?.tax / 2)?.toFixed(2) || 0}
                  </Typography>
                </Box>
              </Box>
            </>
          ) : (
            ''
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle2">
                Additional Charges ( {data?.charges?.additionalCharge?.name} )
              </Typography>
            </Box>
            <Box>
              {' '}
              <Typography variant="subtitle2">{data?.charges?.additionalCharge?.amount}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle2">Gross Amount</Typography>
            </Box>
            <Box>
              {' '}
              <Typography variant="subtitle2">
                {data?.grossAmount}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle1">Rounded</Typography>
            </Box>
            <Box>
              {' '}
              <Typography variant="subtitle1">{data?.roundoffAmount || 0}</Typography>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{
          mx: 3,
          mb:10,
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#D9D9D9',
          paddingInline: '15px',
          minHeight: '35px',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="subtitle1">GRAND TOTAL</Typography>
        </Box>
        <Box>
          {' '}
          <Typography variant="subtitle1">{data?.finalBillAmount}</Typography>
        </Box>
      </Box>
    </div>
  );
};

OrderBillForPrinter.propTypes = {
  data: PropTypes.object,
};

export default OrderBillForPrinter;
