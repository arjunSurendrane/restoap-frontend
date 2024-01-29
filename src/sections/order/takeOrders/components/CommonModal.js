import { Dialog, styled } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';


const CustomDialog = styled(Dialog)(({ theme, color }) => ({
  minWidth: '250px',

  '& .MuiPaper-root': {
    minWidth: '285px',
    
    overFlowY: 'scroll',
    backgroundColor: color,
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      width: '350px',
    },
    [theme.breakpoints.up('md')]: {
      width: '450px',
    },
  },
}));

CommonModal.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.func,
  color: PropTypes.string,
  handleClose: PropTypes.func,
};

function CommonModal({ open, children, color, handleClose }) {
  return (
    <CustomDialog open={open} onClose={handleClose} color={color || 'white'}>
      {children}
    </CustomDialog>
  );
}

export default CommonModal;
