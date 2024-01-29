import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import Iconify from '../../../../components/iconify/Iconify';
import DineInIcon from '../../../../assets/icons/DineInIcon';
import TakeAwayIcon from '../../../../assets/icons/TakeAwayIcon';
import CustomButton from '../../../../components/button/CustomButton';

RunningOrderDetails.propTypes = {
  handleCloseDrawer: PropTypes.func,
  order: PropTypes.object,
  handleAddAdditionalOrder: PropTypes.func,
  handleAddNewOrder: PropTypes.func,
};

const CommonBtn = styled(Button)({
  backgroundColor: '#BB3138',
  borderRadius: '5px',
  color: '#White',
  fontSize: '14px !important',
  fontWeight: 500,
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  border: '#fff 2px solid',
  '&:hover': {
    backgroundColor: '#212b36',
    color: 'white',
  },
});

function RunningOrderDetails({
  handleCloseDrawer,
  order,
  handleAddAdditionalOrder,
  handleAddNewOrder,
}) {
  const { subOrders } = order;
  const getTime = (time) => moment(time?.createdAt).fromNow();

  // const allOrders = order.flatMap((obj)=>obj.items)
  // console.log({allOrders})
  // const handleClick = () => {
  //   // onClick(navigate(`/dashboard/order/take-order/menu?table=${data.id}`));
  // };
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pl: 2, pr: 1, py: 2, backgroundColor: '#F5F5F5' }}
      >
        <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>Order Details</Typography>
        <Box
          sx={{
            width: '26px',
            height: '26px',
            backgroundColor: '#AC161F',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <IconButton sx={{ color: 'white' }} onClick={() => handleCloseDrawer()}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Box>
      </Stack>
      <Box
        sx={{
          height: '60px',
          display: 'flex',
          padding: '15px',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography textTransform="capitalize" color="black">
          Table-{order?.tableNo}
        </Typography>

        <CommonBtn
          variant="contained"
          onClick={() =>
            order?.paymentDetails?.status === 'success'
              ? handleAddNewOrder()
              : handleAddAdditionalOrder(order?.id)
          }
        >
          Add Additional Order
        </CommonBtn>
      </Box>
      <Box>
        <Table sx={{ minWidth: 300, width: '100%' }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#D9D9D9 !important' }}>
            <TableRow sx={{ backgroundColor: '#D9D9D9' }}>
              <TableCell>ITEM NAME</TableCell>
              <TableCell>QTY</TableCell>
              <TableCell>SIZE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subOrders?.map((orders) => (
              <>
                <TableRow
                  key={orders?._id}
                  sx={{
                    backgroundColor: '#D9D9D9',
                    '&:last-child td, &:last-child th': { border: 0 },
                    borderBottom: '0.5px solid black',
                    height: '20px',
                  }}
                >
                  <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>KOT-001</TableCell>
                  <TableCell
                    sx={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}
                  >
                    {orders?.orderType === 'dining' ? (
                      <Chip
                        sx={{ backgroundColor: '#05C805', color: '#fff' }}
                        icon={<DineInIcon />}
                        label="Dine-In"
                      />
                    ) : (
                      <Chip
                        sx={{ backgroundColor: '#F57C24', color: '#fff' }}
                        icon={<TakeAwayIcon />}
                        label="Takeaway"
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                      {getTime(orders?.createdAt)}
                    </Typography>
                  </TableCell>
                </TableRow>
                {orders?.orderItems.map((item) => (
                  <TableRow
                    key={item?._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      borderBottom: '0.5px solid black',
                    }}
                  >
                    <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>{item?.name}</TableCell>
                    <TableCell
                      sx={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}
                    >
                      {item?.quantity}
                    </TableCell>
                    <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                      <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                        {item?.variant?.variantName || 'Nil'}
                        <br />
                        {/* <span style={{ fontSize: '12px', fontWeight: '400' }}>{item?.price}.00</span> */}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
                {orders?.addons.map((item) => (
                  <TableRow
                    key={item?._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      borderBottom: '0.5px solid black',
                    }}
                  >
                    <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>{item?.name}</TableCell>
                    <TableCell
                      sx={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}
                    >
                      {item?.quantity}
                    </TableCell>
                    <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                      <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                        {item?.variant?.variantName || 'Nil'}
                        <br />
                        {/* <span style={{ fontSize: '12px', fontWeight: '400' }}>{item?.price}.00</span> */}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
            {/*  */}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

export default RunningOrderDetails;
