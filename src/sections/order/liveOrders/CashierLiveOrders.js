import React, { useState, useEffect } from 'react';
// import/extensions
import {
  Box,
  Button,
  Chip,
  IconButton,
  Modal,
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
  useMediaQuery,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  TextField,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import CustomizedTables from '../../../components/table/MuiCustomTable';
import SvgColor from '../../../components/svg-color/SvgColor';
import CustomButton from '../../../components/button/CustomButton';
import Iconify from '../../../components/iconify/Iconify';
import CustumPagination from '../../../components/custom-pagination/Pagination';
import { TableToolbar } from '../../list';
import Paper from '../../../theme/overrides/Paper';
import Card from '../../../theme/overrides/Card';
import OrderCashierDrawer from './CashierOderDrawer';
import { getOrders, updateOrderPaymentStatus } from '../../../redux/slices/order';
import { useAuthContext } from '../../../auth/useAuthContext';
import OrderDrawer from './OrderDrawer';
import { orderStatus } from './constant';
import { getStore } from '../../../redux/slices/branch';

import PrintIcon from '../../../assets/icons/PrintIcon';

function CashierLiveOrders() {
  const { user } = useAuthContext();
  const { roles, storeId } = user;
  const [drawerOrderDataIndex, setDrawerOrderDataIndex] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [modalDAta, setModalData] = useState();
  const [paymentOption, setPaymentOption] = useState();
  const [loading, setLoading] = useState(false);
  const { orders, isPaid } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (storeId) {
      dispatch(getOrders(storeId));
      dispatch(getStore(storeId));
    }
  }, [dispatch, storeId]);

  const navOrderId = location?.state?.orderId;

  useEffect(() => {
    if (navOrderId) {
      const order = orders.findIndex((data) => data._id === navOrderId);
      setDrawerOrderDataIndex(order);
      setOpenDrawer(true);
      console.log(order);
    }
  }, [navOrderId, orders]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#F4F4F4;',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#E6E6E6;',
    },
    // hide last border  #E6E6E6;
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleSettleBill = async () => {
    setLoading(true);
    await dispatch(
      updateOrderPaymentStatus({ orderId: modalDAta._id, paymentMethod: paymentOption })
    );
    await dispatch(getOrders(modalDAta.store));
    setLoading(false);
    handleClose();
  };

  const handleOpenModal = (data) => {};

  const handleOpenDrawer = (index) => {
    setDrawerOrderDataIndex(index);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    navigate('/dashboard/order/order-list/cashier');
    setOpenDrawer(false);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (data) => {
    setModalData(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const isDesktop = useMediaQuery('(min-width:768px)');

  console.log({ orders });
  return (
    <>
      {/* *************************************************** */}
      <CustomizedTables
        tableLabels={[
          { id: 'orderNo', label: 'Order No.' },
          { id: 'TableNo', label: 'Table No.' },
          { id: 'CustomerName', label: 'Customer Name' },
          { id: 'PaymentStatus', label: 'Payment Status' },
          { id: 'Amount', label: 'Amount' },
          { id: 'OrderStatus', label: 'Order Status' },
          { id: 'Actions', label: 'Actions' },
        ]}
      >
        {orders.map((data, index) => {
          const isDelivered = data.items.length === data.deliveredOrders;
          return (
            <StyledTableRow key={data._id}>
              <StyledTableCell>{data.OrderId}</StyledTableCell>
              <StyledTableCell>{data.tableNo}</StyledTableCell>
              <StyledTableCell>
                <Chip
                  sx={{
                    backgroundColor: `${
                      isDelivered ? orderStatus.delivered : orderStatus[data.orderStatus]
                    } `,
                    color: 'black',
                  }}
                  label={isDelivered ? 'delivered' : data.orderStatus}
                />
              </StyledTableCell>
              <StyledTableCell>
                {data?.customerDetails[0]?.firstName || 'unknown user'}
              </StyledTableCell>
              <StyledTableCell>
                {' '}
                <Chip sx={{ backgroundColor: '#BB3138', color: 'white' }} label="Not Paid" />
              </StyledTableCell>
              <StyledTableCell>{data.totalAmount}</StyledTableCell>
              {data.orderStatus !== 'completed' && (
                <StyledTableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignContent: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                     
                    }}
                  >
                    <Box
                      onClick={() => handleOpenDrawer(index)}
                      sx={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#23C6C8',
                        color: 'white',
                        borderRadius: '8px',
                        border: '2px solid white',
                        boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <SvgColor src="/assets/icons/Order/Eye3.svg" />
                    </Box>

                    <Box
                      onClick={() => handleOpenDrawer(index)}
                      sx={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#1699D7',
                        color: 'white',
                        borderRadius: '8px',
                        border: '2px solid white',
                        boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <SvgColor src="/assets/icons/Order/printer.svg" />
                    </Box>

                    <Button
                      variant="contained"
                      sx={{ minWidth: '120px', border: '2px solid #fff' }}
                    >
                      Settle Bill
                    </Button>
                    {isDelivered && (
                      <CustomButton fun={() => handleOpen(data)} value="Settle Bill" />
                    )}
                  </Box>
                </StyledTableCell>
              )}
            </StyledTableRow>
          );
        })}
      </CustomizedTables>

      <OrderDrawer
        //   isDefault={isDefault}
        dataIndex={drawerOrderDataIndex}
        open={openDrawer}
        onOpen={handleOpenDrawer}
        onClose={handleCloseDrawer}
      />
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
            height: isDesktop ? 350 : 400,
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
              Settle Bill
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
          <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography variant="h6">Order No. : {modalDAta?.OrderId}</Typography>
              <Typography variant="h6">Amount {modalDAta?.totalAmount}</Typography>
            </Box>
            <Typography variant="h6">Table No : {modalDAta?.tableNo}</Typography>
            <Typography variant="h6">
              Customer Name : {modalDAta?.customerDetails[0]?.firstName || 'unknown user'}{' '}
            </Typography>
            <Typography variant="h6">Choose Payment Method</Typography>

            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => setPaymentOption(e.target.value)}
              >
                <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                <FormControlLabel value="Card " control={<Radio />} label="Card" />
                <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
              </RadioGroup>
            </FormControl>
            <Box
              sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
              onClick={handleSettleBill}
            >
              {loading ? (
                <Box sx={{ textAlign: 'center' }}>
                  <CircularProgress color="inherit" size={20} />
                </Box>
              ) : (
                <CustomButton value="Settle Bill" />
              )}
            </Box>
          </Stack>
        </Box>
      </Modal>
      <Box sx={{ paddingTop: '10px' }}>
        <CustumPagination />
      </Box>
    </>
  );
}

export default CashierLiveOrders;
