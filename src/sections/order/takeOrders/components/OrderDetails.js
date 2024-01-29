/* eslint-disable no-new */
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  CircularProgress,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthContext } from '../../../../auth/useAuthContext';
import Iconify from '../../../../components/iconify/Iconify';
import CustomButton from '../../../../components/button/CustomButton';

import {
  addNote,
  clearCartItems,
  decrementAddOnQtyByVariant,
  decrementAddOnsCount,
  decrementCount,
  decrementQtyByVariant,
  incrementAddOnQtyByVariant,
  incrementAddOnsCount,
  incrementCount,
  incrementQtyByVariant,
} from '../../../../redux/slices/takeOrderCart';
import AddNote from './AddNote';
import { IncrementerButton } from '../../../../components/custom-input';
import CommonModal from './CommonModal';
import order, { placeAdditionalOrder, placeOrderByWaiter } from '../../../../redux/slices/order';
import KOTPrint from './KOTPrint';
import SamplePrint from './SamplePrint';
import PrintQueue from './PrintQueue';
import KitchenTypeItemList from './KitchenTypeItemList';

const AddButton = styled(Box)(({ width, height }) => ({
  minWidth: width,
  minHeight: height,
  backgroundColor: '#BB3138',
  borderRadius: '5px',
  color: 'White',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  border: '#fff 2px solid',
  '&:hover': {
    backgroundColor: '#212b36',
    color: 'white',
  },
}));

OrderDetails.propTypes = {
  menu: PropTypes.object,
  handleCloseDrawer: PropTypes.func,
  tableDetail: PropTypes.object,
};

function OrderDetails({ menu, handleCloseDrawer, tableDetail }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, orderType, addOns, orderId } = useSelector((state) => state.cart);
  const { branch } = useSelector((state) => state.branch);
  console.log({ branch });
  const { dineCategory } = tableDetail;
  // State for store the addNote item id
  const [addNoteItem, setAddNoteItem] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [kotPrintComponent, setKotPrintComponent] = useState([]);
  const [printOpen, setPrintOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newOrder, setNewOrder] = useState({});
  const [mainOrder, setMainOrder] = useState({});
  const { user } = useAuthContext();
  console.log({ user });

  // Function to handle increment
  const handleIncrement = (itemId, variants) => {
    if (variants) {
      dispatch(incrementQtyByVariant({ id: itemId, variant: variants }));
    } else {
      dispatch(incrementCount(itemId));
    }
  };

  const handleIncrementAddOns = (itemId, variants) => {
    if (variants) {
      dispatch(incrementAddOnQtyByVariant({ id: itemId, variant: variants }));
    } else {
      dispatch(incrementAddOnsCount(itemId));
    }
  };

  // Function to handle decrement
  const handleDecrement = (itemId, variants) => {
    if (variants) {
      dispatch(decrementQtyByVariant({ id: itemId, variant: variants }));
    } else {
      dispatch(decrementCount(itemId));
    }
  };
  // Function to handle addons decrement
  const handleAddOnsDecrement = (itemId, variants) => {
    if (variants) {
      dispatch(decrementAddOnQtyByVariant({ id: itemId, variant: variants }));
    } else {
      dispatch(decrementAddOnsCount(itemId));
    }
  };

  // Function to calculate subtotal of cart items
  const calculateTotal = (items) => {
    const itemTotal = items.reduce((acc, item) => {
      const subTotal = Number(item.price) * item.qty;
      return acc + subTotal;
    }, 0);
    return itemTotal;
  };
  const subTotal = calculateTotal([...cartItems, ...addOns]);

  // Function to calculate subtotal with tax and additional charge
  const calculateGrossAmount = (isGetNotGstSubTotal) => {
    // Calculate gst not included items subtotal to calculate gst amount
    const gstNotIcludedSubtotal = cartItems
      .filter((item) => !item.taxInclude)
      .reduce((acc, item) => acc + Number(item.price) * item.qty, 0);

      console.log({gstNotIcludedSubtotal});
    // Return not gst not included subtotal id isGetNotGstSubTotal is true
    if (isGetNotGstSubTotal) return gstNotIcludedSubtotal;

    const calculateSubTotal = subTotal;
    const taxPercentage = branch?.taxRate || 0;
    // Additional charge percentage
    const additionalChargePercentage = dineCategory.additionalCharge || 0;

    // Calculate the service charge (2.5% of the subTotal)
    const serviceCharge = (gstNotIcludedSubtotal * taxPercentage) / 100;
    console.log({ serviceCharge });

    // Calculate parcel charge if order type is takeaway
    const parcelCharge =
      orderType === 'take_away' && branch?.parcelCharge > 0
        ? (calculateSubTotal * branch.parcelCharge) / 100
        : 0;

    console.log({ parcelCharge });

    // Calculate the additional charge (as a percentage of the subTotal)
    const additionalCharge = (calculateSubTotal * additionalChargePercentage) / 100;
    console.log({ additionalCharge });
    console.log({ calculateSubTotal });

    // Calculate the total amount by adding subTotal, serviceCharge, and additionalCharge
    const totalAmount = calculateSubTotal + serviceCharge + additionalCharge + parcelCharge;
    console.log({ totalAmount });

    return totalAmount;
  };

  const handleAddNote = (itemId, variant) => {
    setAddNoteItem(itemId, variant);
    setShowInstruction(true);
  };

  // Function to set note
  const setNote = (itemId, note, variant) => {
    dispatch(addNote({ itemId, note, variant }));
    setShowInstruction(false);
  };

  // Function to clear cart
  const handleClearCart = () => {
    setOrderPlaced(false);
    setNewOrder({});
    handleCloseDrawer();
    const additionalOrder = orderId !== ''
    console.log({additionalOrder})
    dispatch(clearCartItems(additionalOrder ));
  };

  // Fuction to customize the cart item to place order
  const customizeCartItems = (items, isAddon) => {
    const placeOrderItems = items.map((item) => {
      const fileterdItems = {};
      if (isAddon) {
        fileterdItems.quantity = item.qty;
        fileterdItems.variant = item.variant?.name;
        fileterdItems.note = item.note;
        fileterdItems.addonId = item.itemId;
      } else {
        fileterdItems.quantity = item.qty;
        fileterdItems.variant = item.variant?.name;
        fileterdItems.note = item.note;
        fileterdItems.itemId = item.itemId;
      }
      return fileterdItems;
    });
    return placeOrderItems;
  };

  const tableId = tableDetail?.id;

  // const handlePlaceOrder = () => {
  // const billRef = useRef()

  // const printKot = useReactToPrint({
  //   content: () => billRef.current,
  // });

  // };
  // Function to place order by waiter
  const handlePlaceOrder = async () => {
    const items = customizeCartItems(cartItems);
    const addons = customizeCartItems(addOns, true);

    const storeId = user?.storeId;
    const orderObj = {
      storeId,
      tableId,
      items,
      addons,
      orderType,
    };
    const additionalOrderObj = {
      storeId,
      items,
      addons,
      orderType,
    };
    setIsLoading(true);
    try {
      let result;
      if (orderId) {
        result = await placeAdditionalOrder(orderId, additionalOrderObj);
      } else {
        result = await placeOrderByWaiter(orderObj);
      }

      if (result) {
        setNewOrder(result?.suborder);
        setMainOrder(result?.mainOrder);
        setOrderPlaced(true);
        toast.success('Order placed');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error('Something Went Wrong');
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const handleNavigateToLiveOrders = ()=>{
    setOrderPlaced(false);
    setNewOrder({});
    handleCloseDrawer();
    dispatch(clearCartItems());
    navigate('/dashboard/order/order-list/cashier')
  }

  return (
    <>
      <ToastContainer hideProgressBar autoClose={2000} />
      {[...cartItems, ...addOns].length > 0 ? (
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              pl: 2,
              pr: 1,
              py: 2,
              backgroundColor: '#F5F5F5',
              boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25)',
            }}
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
          <Box sx={{ height: '100%' }}>
            <Box p="15px" display="flex" justifyContent="space-between">
              <Button
                onClick={handleClearCart}
                sx={{
                  backgroundColor: '#212b36',
                  borderRadius: '5px',
                  color: 'white',
                  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
                  border: '#fff 2px solid',
                  '&:hover': {
                    backgroundColor: '#212b36',
                    color: 'white',
                  },
                }}
              >
                {orderPlaced ? 'Create new order' : 'Clear'}
              </Button>
              {orderPlaced ? (
                <CustomButton value="Go to Live Orders" fun={handleNavigateToLiveOrders} />
              ) : (
                <Box>
                  {isLoading ? (
                    <CustomButton
                      widthValue="140px"
                      value={<CircularProgress size={20} sx={{ color: '#fff' }} />}
                    />
                  ) : (
                    <CustomButton value=" Place Order" fun={handlePlaceOrder} />
                  )}
                </Box>
              )}
            </Box>
            <Box p="0px 15px" display="flex" justifyContent="start">
              <Typography>Table: {tableDetail?.name}</Typography>
            </Box>
            <Box p="15px 15px" display="flex" justifyContent="space-between">
              <Typography fontWeight="500" fontSize="16px" color="#BB3138">
                Order Details
              </Typography>
            </Box>
            <Box width="100%" overflow="scroll">
              {orderPlaced ? (
                Object.keys(newOrder?.kitchenGroupedItems).map((kitchenName) => (
                  <KitchenTypeItemList
                    key={kitchenName}
                    order={{...newOrder, tableNo:mainOrder?.tableNo}}
                    kitchenName={kitchenName}
                    orderNumber={mainOrder?.orderNumber}
                  />
                ))
              ) : (
                <Table sx={{ minWidth: 300, width: '100%' }} aria-label="simple table">
                  <TableHead sx={{ backgroundColor: '#F5F5F5' }}>
                    <TableRow>
                      <TableCell>ITEM NAME</TableCell>
                      <TableCell>QTY</TableCell>
                      <TableCell>SIZE</TableCell>
                      <TableCell>PRICE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems?.map((item, index) => (
                      <TableRow
                        key={item.itemId + index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          borderBottom: '0.5px solid black',
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Box>
                            <Typography
                              sx={{
                                fontSize: '14px',
                                fontWeight: '500',
                                textTransform: 'capitalize',
                              }}
                            >
                              {item?.name}
                            </Typography>
                          </Box>

                          <Box>
                            <Typography
                              onClick={() => handleAddNote(item)}
                              sx={{ cursor: 'pointer', fontSize: '12px', fontWeight: '400' }}
                              style={{ color: 'red' }}
                            >
                              <u>{item?.note ? item.note.slice(0, 15) : ' + Add Instructions'}</u>
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                          <Box
                            sx={{
                              width: '90px',
                              height: '30px',
                              boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <AddButton
                              width="30px"
                              height="30px"
                              onClick={() => handleDecrement(item?.itemId, item?.variant)}
                            >
                              <Iconify icon="uil:minus" />
                            </AddButton>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              width="30px"
                            >
                              <Typography mr="10px" ml="10px">
                                {item?.qty}
                              </Typography>
                            </Box>
                            <AddButton
                              width="30px"
                              height="30px"
                              onClick={() => handleIncrement(item?.itemId, item?.variant)}
                            >
                              <Iconify icon="uil:plus" />
                            </AddButton>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}
                        >
                          {item?.variant?.name || 'Nil'}
                        </TableCell>
                        <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                          <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                            {item.price * item.qty}
                            <br />
                            <span style={{ fontSize: '12px', fontWeight: '400' }}>
                              {item?.price}
                            </span>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                    {addOns?.map((item, index) => (
                      <TableRow
                        key={item.itemId + Math.random()}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          borderBottom: '0.5px solid black',
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Box>
                            <Typography
                              sx={{
                                fontSize: '14px',
                                fontWeight: '500',
                                textTransform: 'capitalize',
                              }}
                            >
                              {item?.name}
                            </Typography>
                          </Box>

                          {/* <Box>
                          <Typography
                            onClick={() => handleAddNote(item)}
                            sx={{ cursor: 'pointer', fontSize: '12px', fontWeight: '400' }}
                            style={{ color: 'red' }}
                          >
                            <u>+ Add Instructions</u>
                          </Typography>
                        </Box> */}
                        </TableCell>
                        <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                          <Box
                            sx={{
                              width: '90px',
                              height: '30px',
                              boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <AddButton
                              width="30px"
                              height="30px"
                              onClick={() => handleAddOnsDecrement(item?.itemId, item?.variant)}
                            >
                              <Iconify icon="uil:minus" />
                            </AddButton>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              width="30px"
                            >
                              <Typography mr="10px" ml="10px">
                                {item?.qty}
                              </Typography>
                            </Box>
                            <AddButton
                              width="30px"
                              height="30px"
                              onClick={() => handleIncrementAddOns(item?.itemId, item?.variant)}
                            >
                              <Iconify icon="uil:plus" />
                            </AddButton>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: '14px', fontWeight: '500', textTransform: 'capitalize' }}
                        >
                          {item?.variant?.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: '14px', fontWeight: '500' }}>
                          <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                            {(item.price * item.qty).toFixed(2)}
                            <br />
                            <span style={{ fontSize: '12px', fontWeight: '400' }}>
                              {item?.price}
                            </span>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Box>
            <Box>
              <Stack spacing={1} sx={{ p: 2.5, display: 'flex', spacing: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle1">Total Amount (Before Tax)</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1">{subTotal}</Typography>
                  </Box>
                </Box>
                {/* Other amount-related sections */}
                {branch?.taxRate ? (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2">{`CGST @ ${branch.taxRate/2} % `}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">
                          {((calculateGrossAmount(true) * (branch.taxRate/2)) / 100).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="subtitle2">{`SGST @ ${branch.taxRate/2} %`}</Typography>
                      </Box>
                      <Box>
                        {' '}
                        <Typography variant="subtitle2">
                          {((calculateGrossAmount(true) * (branch.taxRate/2)) / 100).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                ) : (
                  ''
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    {orderType === 'take_away' && branch?.parcelCharge > 0 && (
                      <Typography variant="subtitle2" textTransform="capitalize">
                        Parcel Charge
                      </Typography>
                    )}
                    {dineCategory?.additionalCharge > 0 && (
                      <Typography variant="subtitle2" textTransform="capitalize">
                        Additional Charges {`( ${dineCategory.name} )`}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    {orderType === 'take_away' && branch?.parcelCharge > 0 && (
                      <Typography variant="subtitle2">
                        {((subTotal * branch.parcelCharge) / 100).toFixed(2)}
                      </Typography>
                    )}
                    {dineCategory?.additionalCharge > 0 && (
                      <Typography variant="subtitle2">
                        {((subTotal * dineCategory.additionalCharge) / 100).toFixed(2)}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle2">Gross Amount</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">{calculateGrossAmount().toFixed(2)}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle1">Rounded</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1">
                      {(calculateGrossAmount().toFixed(0) - calculateGrossAmount()).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  backgroundColor: '#D9D9D9',
                  paddingInline: '15px',
                  minHeight: '35px',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant="subtitle2">GRAND TOTAL</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">{calculateGrossAmount().toFixed(0)}</Typography>
                </Box>
              </Box>
            </Box>
            {/* <Box width="100%" >
              <Box
                // ref={}
                sx={{
                  width: '300px',
                  minHeight: '320px',

                  padding: '5px',
                }}
              >
                {newOrder?.kitchenGroupedItems && Object.keys(newOrder?.kitchenGroupedItems)?.map((kitchen) => (
                  <KOTPrint
                    cartItems={cartItems}
                    kitchenId={kitchen}
                    orderType={orderType}
                    tableDetail={tableDetail}
                    newOrder={newOrder}
                    mainOrder={mainOrder}
                  />
                ))}
              </Box>
            </Box> */}
          </Box>
        </Box>
      ) : (
        handleCloseDrawer()
      )}
      <CommonModal open={showInstruction} color="transparent" handleClose={setShowInstruction}>
        <AddNote
          setShowInstruction={setShowInstruction}
          openModal={showInstruction}
          setNote={setNote}
          item={addNoteItem}
        />
      </CommonModal>
    </>
  );
}

export default OrderDetails;
