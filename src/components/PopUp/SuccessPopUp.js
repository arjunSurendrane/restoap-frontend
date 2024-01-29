import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import SvgColor from '../svg-color/SvgColor';

SuccessPopUp.propTypes = {
  openSuccessPopUp: PropTypes.bool,
  setOpenSuccessPopUp: PropTypes.func,
};

function SuccessPopUp({ openSuccessPopUp, setOpenSuccessPopUp }) {
  const isMobileScreen = useMediaQuery('(max-width:475px)');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '20px',
    // width: 400,
    bgcolor: 'background.paper',
    // minWidth: '300px',
    width: isMobileScreen ? '280px' : '351px',
    height: '299px',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    // display: 'flex',
    // FlexDirection: 'row',
  };
  const [open, setOpen] = useState(openSuccessPopUp);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpenSuccessPopUp(false);
    setOpen(false);
  };

  useEffect(() => {
    setOpen(openSuccessPopUp);
  }, [openSuccessPopUp]);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <img
              style={{
                marginTop: !isMobileScreen ? '-137px' : '-127px',
                width: !isMobileScreen ? '200px' : '180px',
                height: !isMobileScreen ? '200px' : '180px',
              }}
              alt=""
              src="/assets/icons/notification/Success.png"
            />
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '130px',
                position: 'absolute',
                flexDirection: 'Column',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: '28px', fontWeight: '500' }}>Deleted</Typography>

              <Typography sx={{ fontSize: '28px', fontWeight: '500' }}>Successfully</Typography>
            </Box>
          </Box>

          {/* <Typography>Deleted Successfully</Typography> */}
        </Box>
      </Modal>
    </div>
  );
}

export default SuccessPopUp;
