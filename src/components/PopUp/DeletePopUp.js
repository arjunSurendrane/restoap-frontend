/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SvgColor from '../svg-color/SvgColor';
import { StyledAddButton, StyledCancelButton } from '../../theme/overrides/Button';

DeletePopUp.propTypes = {
  openPopUp: PropTypes.bool,
  content: PropTypes.string,
  setOpenPopUp: PropTypes.func,
  setConfirmDelete: PropTypes.func,
  itemId: PropTypes.string,
  storeId: PropTypes.string,
};

export default function DeletePopUp({
  openPopUp,
  content,
  setOpenPopUp,
  setConfirmDelete,
  itemId,
  storeId,
}) {
  console.log(
    'openPopup data',

    setOpenPopUp,
    setConfirmDelete,
    itemId,
    storeId
  );
  const [open, setOpen] = useState(openPopUp);
  console.log('initail child value', open);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpenPopUp(false);
    setOpen(false);
  };

  useEffect(() => {
    setOpen(openPopUp); // Synchronize the state with the prop changes
  }, [openPopUp]);

  const handleDelete = () => {
    if (storeId) {
      setConfirmDelete(itemId, storeId);
    } else {
      setConfirmDelete(itemId);
    }
    setOpenPopUp(false);
    setOpen(false);
  };

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
            height: '265px',
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
            Delete
          </Typography>
          <Box sx={{ display: 'flex', textAlign: 'center' }}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete
              <br />
              You can't undo this action.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              marginTop: '30px',
              justifyContent: 'space-between',
            }}
          >
            <StyledCancelButton onClick={handleClose}>Cancel</StyledCancelButton>
            <StyledAddButton onClick={handleDelete}>Confirm</StyledAddButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
