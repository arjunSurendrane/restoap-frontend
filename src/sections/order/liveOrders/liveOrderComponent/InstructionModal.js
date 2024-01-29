import { Box, Button, Dialog, Typography, styled } from '@mui/material';
import React from 'react';
import { PropTypes } from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';


const CloseBtn = styled(Button)({
  borderRadius: '6px',
  width: '10px !important',
  minWidth:"38px",
  height: '30px',
  backgroundColor: 'white',
  border: 'none',
  boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
  fontSize: '14px',
  padding: 0,
  ':hover': {
    backgroundColor: 'white',
  },
});
function InstructionModal({ open, handleClose,instructionData }) {
  return (
    <Dialog open={open} onClose={handleClose} height="145px" borderRadius="8px">
      <Box
        sx={{
          display: 'flex',
          justifyContent:"space-between",
          width: '560px',
          height: '55px',
          backgroundColor: '#BB3138',
          padding: '15px',
        }}
      >
        <Typography fontSize="18px" fontWeight="600" color="#fff"> Instructions </Typography>

        <CloseBtn onClick={() => handleClose()}>
          <ClearIcon
            sx={{
              color: '#BB3138',
              height: '1.2em',
            }}
          />
        </CloseBtn>
      </Box>
      <Box sx={{ width: '560px', height: '95px', padding: '15px' }}>{instructionData}</Box>
    </Dialog>
  );
}

InstructionModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  instructionData:PropTypes.string
};
export default InstructionModal;
