import {
  Box,
  Button,
  Chip,
  Drawer,
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
import Iconify from '../../../../components/iconify';
import DineInIcon from '../../../../assets/icons/DineInIcon';
import TakeAwayIcon from '../../../../assets/icons/TakeAwayIcon';

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

const CustomTableRow = styled(TableRow)({
  height: '10px',
  padding: '5px !important',
  borderBottom: '1px dotted black',
});

const CustomTableHead = styled(TableRow)({
  height: '10px',
  padding: '5px !important',
  '& .MuiTableRow-root': {
    height: '10px',
    padding: '5px !important',
  },
});
const CustomTableCell = styled(TableCell)({
  padding: '5px 10px',
});

function OrderDetailDrawerMobile({ closeDrawer, open, order, addAdditionalOrder, addNewOrder }) {
  const { subOrders } = order;

  const getTime = (time) => moment(order?.createdAt, 'hh:mm').format('hh:mm A');

  return (
    <Drawer
      open={open}
      onClose={closeDrawer}
      anchor="right"
      PaperProps={{
        sx: {
          width: {
            xs: '100%',
            sm: 480,
            md: 480,
            lg: 480,
            xl: 480,
          },
        },
      }}
    >
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
          <IconButton sx={{ color: 'white' }} onClick={() => closeDrawer()}>
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
        <Typography textTransform="capitalize" color="black" fontSize="16px" fontWeight="600">
          Table-{order?.tableNo}
        </Typography>

        <CommonBtn
          variant="contained"
          onClick={() =>
            order?.paymentDetails?.status === 'success'
              ? addNewOrder()
              : addAdditionalOrder(order?.id)
          }
        >
          Add Additional Order
        </CommonBtn>
      </Box>
      <Box>
        <Table sx={{ minWidth: 300, width: '100%' }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#F5F5F5 !important', height: '33px !important' }}>
            <CustomTableHead>
              <CustomTableCell>ITEM NAME</CustomTableCell>
              <CustomTableCell>QTY</CustomTableCell>
              <CustomTableCell>SIZE</CustomTableCell>
            </CustomTableHead>
          </TableHead>
          <TableBody>
            {subOrders?.map((orders) => (
              <>
                <CustomTableRow
                  key={orders?._id}
                  sx={{
                    backgroundColor: '#D9D9D9',
                    '&:last-child td, &:last-child th': { border: 0 },
                    borderBottom: '0.5px solid black',
                    height: '20px',
                  }}
                >
                  <CustomTableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                    {orders?.kotNumber}
                  </CustomTableCell>
                  <CustomTableCell
                    sx={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}
                  >
                    {orders?.orderType === 'dining' ? (
                      <Chip
                        sx={{ backgroundColor: '#05C805', color: '#fff', height: '24px' }}
                        icon={<DineInIcon />}
                        label="Dine-In"
                      />
                    ) : (
                      <Chip
                        sx={{ backgroundColor: '#F57C24', color: '#fff', height: '24px' }}
                        icon={<TakeAwayIcon />}
                        label="Takeaway"
                      />
                    )}
                  </CustomTableCell>
                  <CustomTableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                      {getTime(orders?.createdAt)}
                    </Typography>
                  </CustomTableCell>
                </CustomTableRow>
                {orders?.orderItems.map((item) => (
                  <TableRow
                    key={item?._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      borderBottom: '0.5px solid black',
                    }}
                  >
                    <CustomTableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                      {item?.name}
                    </CustomTableCell>
                    <CustomTableCell
                      sx={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}
                    >
                      {item?.quantity}
                    </CustomTableCell>
                    <CustomTableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                      <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                        {item?.variant?.variantName || 'Nil'}
                      </Typography>
                    </CustomTableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Drawer>
  );
}
OrderDetailDrawerMobile.propTypes = {
  closeDrawer: PropTypes.func,
  open: PropTypes.bool,
  order: PropTypes.object,
  addAdditionalOrder: PropTypes.func,
  addNewOrder: PropTypes.func,
};

export default OrderDetailDrawerMobile;
