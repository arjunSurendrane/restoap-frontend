/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux';
import OrderTable from './OrderTable';
import AcceptedOrderTable from './AcceptedOrderTable';
import InstructionModal from './InstructionModal';
import DineInIcon from '../../../../assets/icons/DineInIcon';
import TakeAwayIcon from '../../../../assets/icons/TakeAwayIcon';
import { getOrders, updateOrderStatus } from '../../../../redux/slices/order';
import PrintKOT from './PrintKOT';

const AddItemButton = styled(Button)(({ col }) => ({
  minWidth: '120px',
  fontSize: '14px',
  minHeight: '30px',
  fontWeight: 500,
  backgroundColor: col || '#BB3138',
  borderRadius: '5px',
  color: 'White',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  border: '#fff 2px solid',
  '&:hover': {
    backgroundColor: '#212b36',
    color: 'white',
  },
}));

function OrderDetailDrawer({ orderId, setOpenDrawer }) {
  console.log({ orderId });
  const dispatch = useDispatch();
  const [openInstructionModal, setOpenInstructionModal] = useState(false);
  const [instructionData, setInstructionData] = useState('');
  const [showKotView, setShowKotView] = useState(false);
  const { orders, isLoading } = useSelector((state) => state.order);
  const [isPrint, setIsPrint] = useState(false);
  const { branch } = useSelector((state) => state.branch);
  const billRef = useRef();
  const printKot = useReactToPrint({
    content: () => billRef.current,
  });

  console.log({ orders });
  if (!orders.length) return setOpenDrawer(false);
  const orderDetail = orders.find((order) => order.subOrders._id === orderId);

  if (!orderDetail) return setOpenDrawer(false);
  const { subOrders } = orderDetail;
  console.log({ subOrders });
  const { orderItems } = subOrders;
  const timeAgo = moment(subOrders?.createdAt).fromNow();
  let disableCancelButton = false;
  const readyToServeOrder = orderItems.filter(
    (data) => data.itemStatus === 'readytoserve' || data.itemStatus === 'delivered'
  );

  console.log({ readyToServeOrder });

  if (readyToServeOrder.length) {
    disableCancelButton = true;
  }
  // if()

  const closeModal = () => setOpenInstructionModal(false);

  // Function to set change status button
  const changeStatusButton = (status, isSelfOrder) => {
    let buttonText;
    let leftBtnText;

    switch (status) {
      case 'open':
        buttonText = 'Verify & Print KOT';
        leftBtnText = 'Cancel Order';
        break;
      case 'verified':
        buttonText = 'Accept Order';
        leftBtnText = 'Move to open Order';
        break;
      default:
        leftBtnText = 'Move to Verify Order';
        break;
    }

    if (buttonText === 'Verify & Print KOT') {
      !isSelfOrder ? (buttonText = 'Verify') : '';
    }

    if (!branch?.isKitchenHaveScreen && status === 'accepted') {
      leftBtnText = 'Move to Open Order';
    }
    return { buttonText, leftBtnText };
  };

  // Function to handle status change
  const handleStatusChange = async (isPreviousStatus) => {
    console.log({ isPreviousStatus });
    let status;
    let prevStatus;

    switch (subOrders?.orderStatus) {
      case 'open':
        status = 'verified';
        prevStatus = 'cancelled';
        break;
      case 'verified':
        status = 'accepted';
        prevStatus = 'open';
        break;
      case 'accepted':
        status = 'completed';
        prevStatus = 'verified';
        break;
      default:
        prevStatus = 'accepted';
        break;
    }
    console.log({ status });
    if (subOrders?.isSelfOrder && subOrders?.orderStatus === 'open' && status === 'verified') {
      printKot();
    }
    if (!branch?.isKitchenHaveScreen && subOrders?.orderStatus === 'open') {
      status = 'accepted';
    }
    status = isPreviousStatus ? prevStatus : status;
    if (isPreviousStatus && !branch?.isKitchenHaveScreen && subOrders?.orderStatus === 'accepted') {
      status = 'open';
    }

    await dispatch(
      updateOrderStatus({ status, orderId: orderDetail?._id, suborderId: subOrders?._id })
    );

    console.log(orderDetail?.storeId);
    await dispatch(getOrders({ storeId: orderDetail?.storeId }));
  };

  // Handle show instruction
  const handleSelectInstruction = (instruction) => {
    setInstructionData(instruction);
    setOpenInstructionModal(true);
  };

  const handlePrintKotView = (e) => {
    const target = e.target.checked;
    setShowKotView(target);
  };

  return (
    <>
      <Box sx={{ width: '100%', height: '150px', padding: '15px' }}>
        <Box display="flex" justifyContent="space-between">
          {!disableCancelButton && (
            <AddItemButton
              variant="contained"
              height="40px"
              col="#212B36"
              onClick={() => handleStatusChange(true)}
            >
              {isLoading ? (
                <CircularProgress
                  size={20}
                  sx={{
                    color: '#fff',
                  }}
                />
              ) : (
                changeStatusButton(subOrders?.orderStatus, subOrders.isSelfOrder)?.leftBtnText
              )}
            </AddItemButton>
          )}

          {subOrders?.orderStatus !== 'accepted' && (
            <AddItemButton variant="contained" onClick={() => handleStatusChange(false)}>
              {isLoading ? (
                <CircularProgress
                  size={20}
                  sx={{
                    color: '#fff',
                  }}
                />
              ) : (
                changeStatusButton(subOrders?.orderStatus, subOrders?.isSelfOrder)?.buttonText
              )}
            </AddItemButton>
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignContent="center"
          mt="15px"
          width="100%"
        >
          <Typography fontSize="16px" fontWeight="500">
            Order No: {orderDetail?.orderNumber}
          </Typography>
          <Typography color="#BB3138">{timeAgo}</Typography>
        </Box>
        <Box>
          <Typography fontSize="16px" fontWeight="500" sx={{ my: 0.5 }}>
            KOT No: {orderDetail?.subOrders?.kotNumber}
          </Typography>
          <Typography fontSize="16px" fontWeight="500" sx={{ my: 0.5 }}>
            Table No: {orderDetail?.tableNo}
          </Typography>
          {orderDetail?.customerName ? (
            <Typography fontSize="16px" fontWeight="500" sx={{ my: 0.5 }}>
              Customer Name: {orderDetail?.customerName}
            </Typography>
          ) : (
            <Typography fontSize="16px" fontWeight="500" sx={{ my: 0.5 }}>
              Waiter Name: {orderDetail?.subOrders?.waiterName || '--'}
            </Typography>
          )}
          <Chip
            icon={subOrders?.orderType === 'dining' ? <DineInIcon /> : <TakeAwayIcon />}
            sx={{
              my: 0.5,
              maxWidth: '110px',
              height: '24px',
              backgroundColor: subOrders?.orderType === 'dining' ? '#05C805' : '#F57C24',
              color: '#fff',
              textTransform: 'capitalize',
            }}
            label={subOrders?.orderType === 'take_away' ? 'Takeaway' : 'Dining'}
          />
        </Box>
      </Box>

      <Box>
        <Box
          display="flex"
          mt="40px"
          justifyContent="space-between"
          width="100%"
          pl="15px"
          pr="15px"
          alignItems="center"
        >
          <Typography color="#BB3138">Order Details</Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ my: 3 }} variant="subtitle2">
              Items by Kitchen Type
            </Typography>
            <Checkbox
              onChange={handlePrintKotView}
              disabled={subOrders?.orderStatus !== 'accepted'}
            />
          </Box>
        </Box>

        <Box>
          {showKotView || !(subOrders?.orderStatus === 'accepted') ? (
            <OrderTable
              items={subOrders}
              order={orderDetail}
              handleSelectInstruction={handleSelectInstruction}
            />
          ) : (
            <AcceptedOrderTable
              items={subOrders}
              orderId={orderDetail?._id}
              suborderId={subOrders?._id}
              storeId={orderDetail?.storeId}
            />
          )}
        </Box>
      </Box>
      <InstructionModal
        open={openInstructionModal}
        handleClose={closeModal}
        instructionData={instructionData}
      />
      <Box width="100%" display="none">
        <Box
          ref={billRef}
          sx={{
            width: '300px',
            minHeight: '320px',

            padding: '5px',
          }}
        >
          <PrintKOT mainOrder={orderDetail} printKot={printKot} />
        </Box>
      </Box>
    </>
  );
}

OrderDetailDrawer.propTypes = {
  orderId: PropTypes.string,
  setOpenDrawer: PropTypes.func,
};

export default OrderDetailDrawer;
