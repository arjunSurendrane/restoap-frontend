/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
import React, { useState, useEffect, useRef } from 'react';
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
  Switch,
  Checkbox,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useReactToPrint } from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import CustomizedTables from '../../../components/table/MuiCustomTable';
import SvgColor from '../../../components/svg-color/SvgColor';
import CustomButton from '../../../components/button/CustomButton';
import Iconify from '../../../components/iconify/Iconify';
import CustumPagination from '../../../components/custom-pagination/Pagination';
import { TableToolbar } from '../../list';
import Paper from '../../../theme/overrides/Paper';
import Card from '../../../theme/overrides/Card';
import OrderCashierDrawer from '../liveOrders/CashierOderDrawer';
import {
  getMainOrder,
  getOrders,
  settlePayment,
  updateOrderPaymentStatus,
} from '../../../redux/slices/order';
import { useAuthContext } from '../../../auth/useAuthContext';
import { orderStatus } from '../liveOrders/constant';
import { getStore } from '../../../redux/slices/branch';
import PrintIcon from '../../../assets/icons/PrintIcon';
import OrderDetailDrawer from './OrderDetailDrawer';
import FinalOrderBill from './FinalOrderBill';
import SkeltonForInvoiceTable from '../../../components/skeleton/SkeltonForInvoiceTable';
import OrderBillForPrinter from './OrderBillForPrinter';

const CustomIconBox = styled(Box)(({ color }) => ({
  width: '40px',
  height: '40px',
  backgroundColor: color,
  color: 'white',
  borderRadius: '8px',
  border: '2px solid white',
  boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border: '2px solid #fff',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: 'none', // Remove the default bottom border
    borderRight: '2px solid white', // Add a right border with white color
    padding: '8px', // Add padding to cells
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
OrderTable.propTypes = {
  filterContent: PropTypes.func,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  rowsPerPage: PropTypes.number,
  setRowsPerPage: PropTypes.func,
};
function OrderTable({ filterContent, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage }) {
  const isDesktop = useMediaQuery('(min-width:768px)');
  const { mainOrders, isPaid, totalMainOrders, isLoading } = useSelector((state) => state.order);
  const [disableSettlementButtonInModal, setDisableSettlementButtonInModal] = useState(false);
  const [recievedAmountErrorMessage, setRecievedAmountErrorMessage] = useState('');
  const [openOrderDetailDrawer, setOpenOrderDetailDrawer] = useState(false);
  const [openSettleBillModal, setOpenSettleBillModal] = useState(false);
  const [billSubmitLoading, setBillSubmitLoading] = useState(false);
  const [viewSplitBIll, SetViewSplitBIll] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [paymentOption, setPaymentOption] = useState('');
  const [recievedCash, setRecievedCash] = useState(null);
  const [balenceAmount, setBalenceAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuthContext();
  const { roles, storeId } = user;
  console.log({ mainOrders });

  // Function to check wheather the order is varified or not
  const checkIsOrderVerified = (orders) => {
    const varifiedOrder = orders?.find((order) => order.orderStatus === 'open');
    return varifiedOrder;
  };

  // const settleMentOrders  = mainOrders.filter(data=> )
  const billRef = useRef();
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

  // Function to close detail view drawer
  const closeOrderDetailDrawer = () => setOpenOrderDetailDrawer(false);

  // Function to close settle bill modal
  const closeSettleBillModal = () => {
    setOpenSettleBillModal(false);
    SetViewSplitBIll(false);
    setPaymentOption('');
    setPaymentMode({
      cash: false,
      card: false,
      UPI: false,
    });
    setSplitPaymentAmount({
      cash: '',
      card: '',
      UPI: '',
    });
  };

  // Function to open detail view drawer and set the selected data on state
  const handleOpenDetailDrawer = (data) => {
    setSelectedOrder(data);
    setOpenOrderDetailDrawer(true);
  };

  const handleRecievedCashInput = (e) => {
    const totalBill = selectedOrder.finalBillAmount;
    const recievedCash = Number(e.target.value);
    if (totalBill > recievedCash) {
      setDisableSettlementButtonInModal(true)
      setBalenceAmount(0);
      return setRecievedAmountErrorMessage('Entered amount is less than the total bill');
    }
    setDisableSettlementButtonInModal(false)
    setRecievedAmountErrorMessage('');
    setBalenceAmount(recievedCash - totalBill);
    if (totalBill === recievedCash) return null;
  };

  // Function to print the bill
  const handlePrintBill = (data) => {
    setSelectedOrder(data);
    setTimeout(() => printBill(), 500);
    console.log(billRef.current);
  };

  // Fuction to handle settle bill modal
  const handleBillSettle = (data) => {
    setOpenSettleBillModal(true);
    setSelectedOrder(data);
  };

  // BILL SETTLE MODAL
  const [paymentMode, setPaymentMode] = useState({
    cash: false,
    card: false,
    UPI: false,
  });

  const [splitPaymentAmount, setSplitPaymentAmount] = useState({
    cash: '',
    card: '',
    UPI: '',
  });

  const printBill = useReactToPrint({
    content: () => billRef.current,
  });

  // Function to change the payment mode state
  const handleChangePaymentMode = (e) => {    
    setPaymentMode((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
    if (!e.target.checked) {
      setSplitPaymentAmount((prev) => ({
        ...prev,
        [e.target.name]: '',
      }));
    }
  };

  const { cash, card, UPI } = paymentMode;

  const handleSelttleBillPayment = async (finalBill, orderId) => {
    setBillSubmitLoading(true);
    if (viewSplitBIll) {
      const total = Object.values(splitPaymentAmount).reduce(
        (sum, current) => sum + Number(current),
        0
      );
      if (total !== finalBill) {
        setBillSubmitLoading(false);
        return toast.error('Please re-check the amount');
      }
      try {
        const response = await settlePayment({
          orderId,
          paymentMethod: 'split',
          card: splitPaymentAmount.card || 0,
          cash: splitPaymentAmount.cash || 0,
          upi: splitPaymentAmount.UPI || 0,
          totalAmount: finalBill,
        });

        closeSettleBillModal();
        dispatch(getMainOrder({ storeId, orderType: filterContent }));
        toast.success('Settled Successfully ');
      } catch (error) {
        toast.error('something gone wrong');
      }
    } else {
      if (!paymentOption) {
        setBillSubmitLoading(false);
        return toast.error('Choose the payment method');
      }
      try {
        let cash;
        let card;
        let upi;
        const paymentMethod = paymentOption.toLowerCase();
        if (paymentMethod === 'cash') {
          cash = finalBill;
        } else if (paymentMethod === 'card') {
          card = finalBill;
        } else {
          upi = finalBill;
        }
        const response = await settlePayment({
          orderId,
          paymentMethod: paymentOption.toLowerCase(),
          totalAmount: finalBill,
          cash,
          card,
          upi,
        });
        console.log({ paymentOption });
        closeSettleBillModal();

        dispatch(getMainOrder({ storeId, orderType: filterContent }));
        toast.success('Settled Successfully ');
      } catch (error) {
        toast.error('something gone wrong');
      }
    }
    setBillSubmitLoading(false);
  };

  const handlePaymentOption = (data) => {
    if(data === 'Cash'){
      setDisableSettlementButtonInModal(true)
   }else{
     setDisableSettlementButtonInModal(false);
   }
    setPaymentOption(data);
    setBalenceAmount(0)
  };

  const handleSplitAmountData = (event, finalBill) => {
    if (event.target.value > finalBill) return null;
    let count = 0;
    const methods = [];
    if (paymentMode.cash && event.target.name !== 'cash') {
      count++;
      methods.push('cash');
    }
    if (paymentMode.card && event.target.name !== 'card') {
      count++;
      methods.push('card');
    }
    if (paymentMode.UPI && event.target.name !== 'UPI') {
      count++;
      methods.push('UPI');
    }
    const balance = finalBill - Number(event.target.value);

    setSplitPaymentAmount((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log({ count });
    if (count < 2)
      methods.forEach((method) => {
        setSplitPaymentAmount((prev) => ({
          ...prev,
          [method]: balance / count,
        }));
      });
  };

  const totalOrderdividedByLimit = Math.ceil(totalMainOrders / rowsPerPage);
  const count = totalOrderdividedByLimit;

  if (isLoading) {
    return <SkeltonForInvoiceTable />;
  }

  return (
    <>
      {/* *************************************************** */}
      <Box sx={{ marginTop: 3 }}>
        <ToastContainer />
        {mainOrders.length ? (
          <CustomizedTables
            tableLabels={[
              { id: 'No', label: 'No.' },
              { id: 'orderNo', label: 'Order No.' },
              { id: 'TableNo', label: 'Table No.' },
              { id: 'CustomerName', label: 'Customer / Waiter Name' },
              { id: 'PaymentStatus', label: 'Payment Status' },
              { id: 'Amount', label: 'Amount' },
              { id: 'Actions', label: 'Actions' },
            ]}
          >
            {mainOrders.map((data, index) => {
              const paidStatus = data?.paymentDetails?.status === 'success' ? 'paid' : 'Not paid';
              const paidStatusFontColor =
                data?.paymentDetails?.status === 'success' ? '#2E7140' : '#BB3138';
              const paidStatusBgcolor =
                data?.paymentDetails?.status === 'success' ? '#71C488' : '#FFD4D4';
              const No = currentPage * rowsPerPage - rowsPerPage + index + 1;
              const displayName = data?.customerName
                ? `${data?.customerName} (customer)`
                : `${data?.subOrders[0]?.waiterName} (waiter)`;
              return (
                <StyledTableRow key={data._id}>
                  <StyledTableCell>{No}</StyledTableCell>
                  <StyledTableCell>{data?.orderNumber || 'ORD-234'}</StyledTableCell>
                  <StyledTableCell>{data?.tableNo}</StyledTableCell>
                  <StyledTableCell>{displayName}</StyledTableCell>
                  <StyledTableCell>
                    {' '}
                    <Chip
                      sx={{ backgroundColor: paidStatusBgcolor, color: paidStatusFontColor }}
                      label={paidStatus}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{data.finalBillAmount.toFixed(2)}</StyledTableCell>

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
                        <CustomIconBox onClick={() => handleOpenDetailDrawer(data)} color="#23C6C8">
                          <SvgColor src="/assets/icons/Order/Eye3.svg" />
                        </CustomIconBox>

                        <CustomIconBox onClick={() => handlePrintBill(data)} color="#1699D7">
                          <SvgColor src="/assets/icons/Order/printer.svg" />
                        </CustomIconBox>

                        <Button
                          disabled={
                            data?.paymentDetails?.status === 'success' ||
                            checkIsOrderVerified(data?.subOrders)
                          }
                          variant="contained"
                          sx={{ minWidth: '120px', border: '2px solid #fff' }}
                          onClick={() => handleBillSettle(data)}
                        >
                          Settle Bill
                        </Button>
                      </Box>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              );
            })}
          </CustomizedTables>
        ) : (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <img src="../../assets/illustrations/No result.svg" alt="chefimg" height="400px" />
            <Typography fontWeight="700" fontSize="20px">
              No Orders
            </Typography>
          </Box>
        )}

        <OrderDetailDrawer
          //   isDefault={isDefault}
          checkIsOrderVerified={checkIsOrderVerified}
          data={selectedOrder}
          open={openOrderDetailDrawer}
          closeDrawer={closeOrderDetailDrawer}
        />
        {selectedOrder.createdAt && (
          <div style={{ display: 'none' }}>
            <div ref={billRef}>
              <OrderBillForPrinter data={selectedOrder} />
            </div>
          </div>
        )}
        
        <Modal
          open={openSettleBillModal}
          onClose={closeSettleBillModal}
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
              minHeight: isDesktop ? 350 : 400,
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
              <Typography
                sx={{ color: 'white' }}
                id="modal-modal-title"
                variant="h5"
                component="h5"
                fontWeight="fontWeightMedium"
              >
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
                onClick={closeSettleBillModal}
              >
                <IconButton sx={{ color: 'red' }}>
                  <Iconify icon="eva:close-fill" />
                </IconButton>
              </Box>
            </Box>
            <Box height="100%">
              <Box
                width="100%"
                display="flex"
                justifyContent="space-between"
                height="100px"
                p="15px"
                borderBottom="2px dashed #212B36"
              >
                <Box fontSize="14px" color="#212B36" lineHeight="1px">
                  <Typography fontWeight="300">
                    Bill No : <span style={{ fontWeight: '500' }}>{selectedOrder.orderNumber}</span>
                  </Typography>
                  <Typography fontWeight="300">
                    Table No :<span style={{ fontWeight: '500' }}>{selectedOrder?.tableNo}</span>
                  </Typography>
                  <Typography fontWeight="300">
                    Customer Name :{' '}
                    <span style={{ fontWeight: '500' }}>{selectedOrder?.customerName || '--'}</span>
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    Order No :{' '}
                    <span style={{ fontWeight: '500' }}>{selectedOrder?.orderNumber || '--'}</span>
                  </Typography>
                  {/* <Typography>
                  KOT No :<span style={{ fontWeight: '500' }}>09072023</span>
                </Typography> */}
                </Box>
              </Box>
              <Box p="15px" display="flex" justifyContent="space-between">
                <Box gap={2}>
                  <Typography fontWeight="fontWeightMedium">
                    Amount{' '}
                    <span style={{ marginLeft: '20px', color: '#BB3138' }}>
                      ₹ {selectedOrder?.finalBillAmount?.toFixed(2)}
                    </span>
                  </Typography>
                  <Typography fontWeight="500" mt="5px">
                    Choose Payment Method
                  </Typography>
                  {viewSplitBIll ? (
                    <Box display="flex">
                      <Box width="120px">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={cash}
                              onChange={handleChangePaymentMode}
                              name="cash"
                            />
                          }
                          label="Cash"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={card}
                              onChange={handleChangePaymentMode}
                              name="card"
                            />
                          }
                          label="Card"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox checked={UPI} onChange={handleChangePaymentMode} name="UPI" />
                          }
                          label="UPI"
                        />
                      </Box>
                      <Box display="flex" flexDirection="column">
                        <Box sx={{ mb: 1 }}>
                          <TextField
                            onChange={(e) =>
                              handleSplitAmountData(e, selectedOrder?.finalBillAmount)
                            }
                            size="small"
                            type="number"
                            value={splitPaymentAmount.cash}
                            disabled={!cash}
                            name="cash"
                            sx={{
                              '.MuiInputBase-root-MuiOutlinedInput-root': {
                                width: '70px',
                                border: '1px solid black',
                              },
                            }}
                          />
                        </Box>
                        <Box sx={{ mb: 1 }}>
                          <TextField
                            onChange={(e) =>
                              handleSplitAmountData(e, selectedOrder?.finalBillAmount)
                            }
                            size="small"
                            type="number"
                            name="card"
                            value={splitPaymentAmount.card}
                            disabled={!card}
                            sx={{
                              '.MuiInputBase-root-MuiOutlinedInput-root': {
                                width: '70px',
                                border: '1px solid black',
                              },
                            }}
                          />
                        </Box>
                        <Box sx={{ mb: 1 }}>
                          {' '}
                          <TextField
                            onChange={(e) =>
                              handleSplitAmountData(e, selectedOrder?.finalBillAmount)
                            }
                            size="small"
                            type="number"
                            name="UPI"
                            value={splitPaymentAmount.UPI}
                            disabled={!UPI}
                            sx={{
                              '.MuiInputBase-root-MuiOutlinedInput-root': {
                                width: '70px',
                                border: '1px solid black',
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={(e) => handlePaymentOption(e.target.value)}
                      >
                        <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                        <FormControlLabel value="Card " control={<Radio />} label="Card" />
                        <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
                      </RadioGroup>
                      {paymentOption === 'Cash' ? (
                        <Box sx={{ m: 2 }}>
                          <Box>
                            {' '}
                            <TextField
                              size="small"
                              type="number"
                              label="Recieved Amount"
                              onChange={handleRecievedCashInput}
                            />
                            <Typography color="red" fontSize={12}>
                              {recievedAmountErrorMessage}
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 4 }}>
                            {' '}
                            <TextField
                              size="small"
                              type="number"
                              label="Balance Amount"
                              value={balenceAmount}
                              InputProps={{ readOnly: true }}
                            />
                          </Box>
                        </Box>
                      ) : (
                        ''
                      )}
                    </FormControl>
                  )}
                </Box>
                <Box>
                  <FormControlLabel
                    sx={{
                      color: '#BB3138',
                      fontSize: '16px',
                      fontWeight: 'fontWeightMedium',
                      '& .MuiFormControlLabel-root': {},
                    }}
                    checked={viewSplitBIll}
                    control={<Switch color="primary" />}
                    label="Split Bill"
                    labelPlacement="start"
                    onChange={(e) => {
                      SetViewSplitBIll(e.target.checked);
                      setPaymentOption('');
                    }}
                  />
                </Box>
              </Box>
              <Box p="15px" sx={{ display: 'flex', justifyContent: 'right' }}>
                <LoadingButton
                  type="submit"
                  disabled={disableSettlementButtonInModal}
                  variant="contained"
                  loading={billSubmitLoading}
                  sx={{ minWidth: '120px', border: '2px solid #fff' }}
                  onClick={() =>
                    handleSelttleBillPayment(selectedOrder.finalBillAmount, selectedOrder.id)
                  }
                >
                  Submit
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Modal>
        <Box sx={{ paddingTop: '10px' }}>
          <CustumPagination
            count={count || 1}
            setCurrentPage={setCurrentPage}
            page={currentPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Box>
      </Box>
    </>
  );
}

export default OrderTable;
