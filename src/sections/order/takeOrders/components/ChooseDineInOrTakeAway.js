import { Box, Button, Dialog, Modal, styled } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import DineInIcon from '../../../../assets/icons/DineInIcon';
import TakeAwayIcon from '../../../../assets/icons/TakeAwayIcon';

const CustomBtn = styled(Button)(({ clr }) => ({
  width: '220px',
  height: '45px',
  backgroundColor: clr,
  fontSize: '16px !important',
  fontWeight: '600 ',
  boxShadow: 'none',
}));

const CustomDialog = styled(Dialog)(({ theme }) => ({
  //   '& .MuiDialog-container': {
  //     backgroundColor: '#000000CC',
  //   },
  '& .MuiPaper-root': {
    minWidth: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    color: 'white',
    boxShadow: 'none',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      height: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
      height: '100%',
    },
  },
}));

function ChooseDineInOrTakeAway({ open, setOpen, handleChooseOrderType }) {
  const handleClose = () => setOpen(false);
  const { branch } = useSelector((state) => state.branch);
  console.log({ branch });

  const handleButtonSelect = (type) => {
    if (type === 'take_away' && !branch?.isTakeawayAwailable) {
      toast.error('Takeaway is not currently available at this store', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      handleChooseOrderType(type);
    }
  };
  return (
    <CustomDialog open={open} onClose={handleClose}>
      <Box
        sx={{
          height: '100%',
          width: '100%',
          backgroundColor: 'transparent',
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center" gap={2} height="100%">
          <CustomBtn
            clr="#05C805"
            variant="contained"
            startIcon={<DineInIcon />}
            onClick={() => handleButtonSelect('dining')}
          >
            Dine In
          </CustomBtn>
          <CustomBtn
            clr="#F57C24"
            variant="contained"
            startIcon={<TakeAwayIcon />}
            onClick={() => handleButtonSelect('take_away')}
          >
            Take Away
          </CustomBtn>
        </Box>
      </Box>
    </CustomDialog>
  );
}

ChooseDineInOrTakeAway.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleChooseOrderType: PropTypes.func,
};

export default ChooseDineInOrTakeAway;
