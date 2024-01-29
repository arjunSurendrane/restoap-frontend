import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SvgColor from '../svg-color/SvgColor';
import { StyledAddButton, StyledCancelButton } from '../../theme/overrides/Button';
import { useAuthContext } from '../../auth/useAuthContext';

InactiveStorePopupModal.propTypes = {
  openPopUp: PropTypes.bool,
  content: PropTypes.string,
  setOpenPopUp: PropTypes.func,
  setConfirmDelete: PropTypes.func,
  itemId: PropTypes.string,
  storeId: PropTypes.string,
  title: PropTypes.string,
  submitButton: PropTypes.bool,
  buttonContent: PropTypes.string,
};

function InactiveStorePopupModal({
  openPopUp,
  content,
  setOpenPopUp,
  setConfirmDelete,
  itemId,
  storeId,
  submitButton = true,
  buttonContent = 'Ok',
  title,
}) {
  const { logout } = useAuthContext();
  const handleClose = () => {
    logout();
  };
  const [open, setOpen] = useState(openPopUp);
  return (
    <>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
            width: 400,
            minHeight: '265px',
            bgcolor: 'background.paper',
            // border: '2px solid #000',
            borderRadius: '20px',
            boxShadow: 24,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img alt="dh" src="/assets/icons/components/warning2.png" />
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', textAlign: 'center' }}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {content}
            </Typography>
          </Box>
          {submitButton && (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                marginTop: '30px',
                justifyContent: 'center',
              }}
            >
              <Button variant="contained" onClick={handleClose}>
                {buttonContent}
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default InactiveStorePopupModal;
