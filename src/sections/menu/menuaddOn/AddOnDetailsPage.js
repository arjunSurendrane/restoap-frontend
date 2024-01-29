import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Box,
  TextField,
  useMediaQuery,
  Typography,
  IconButton,
  Grid,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  styled,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Iconify from '../../../components/iconify/Iconify';
// import {
//   addToCart,
//   changeVariant,
//   decrementCount,
//   incrementCount,
//   incrementQtyByVariant,
//   selectAddOnCartById,
//   selectCartById,
// } from '../../../redux/slices/takeOrderCart';

const modalBoxStyle = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  minWidth: 300,
  bgcolor: 'background.paper',
  borderStyle: 'none',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

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

const ImgBox = styled(Box)(({ theme, heigh }) => ({
  height: heigh,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'cemter',
  justifyContent: 'center',
  // padding: '40px',
  borderRadius: '10px',
  width: '100%',
  bgcolor: 'green',
}));

const AddOnsModal = ({
  addOnsModalDetails,
  setAddOnModalOpen,
  addOnModalOpen,
  currentAddedItem,
  setOpenItemDetailDrawer,
}) => {
  const isDesktop = useMediaQuery('(min-width:900px)');
  const isMobile = useMediaQuery('(min-width:425px)');
  const dispatch = useDispatch();

  // State for quantity

  // State for variant

  const handleClose = () => setAddOnModalOpen(false);
  console.log('addOnsModalDetails', addOnsModalDetails);
  return (
    <>
      <ToastContainer hideProgressBar autoClose={2000} />
      <Modal
        open={addOnModalOpen}
        onClose={() => setAddOnModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalBoxStyle}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isDesktop ? 660 : 300,
              // height: isDesktop &&390 ,
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
                sx={{ color: 'white', fontWeight: '600', fontSize: '18px' }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                {addOnsModalDetails?.name}
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
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
              <Grid container sx={{ height: '100%' }}>
                <Grid item xs={12} md={6} sx={{ height: '100%', p: '15px' }}>
                  <ImgBox height={isDesktop ? 266 : 125}>
                    <img
                      style={{ objectFit: 'cover', width: '100%', borderRadius: '8px' }}
                      src={
                        addOnsModalDetails?.image?.path
                          ? addOnsModalDetails?.image?.path
                          : '/assets/images/home/defaultaddonsImage.jpg'
                      }
                      alt="no"
                    />
                  </ImgBox>
                </Grid>
                <Grid item p="15px 15px 15px 15px" xs={12} md={6}>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      bgcolor: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box borderBottom="1px dashed grey">
                      <Typography fontSize="18px" fontWeight="600">
                        Quantity
                      </Typography>
                      {/* <Typography fontSize="16px" fontWeight="500" color="#637381">
                        Select any 1 option
                      </Typography> */}
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      height="100%"
                      justifyContent="space-between"
                    >
                      <Box>
                        {addOnsModalDetails?.variants?.map((data) => (
                          <div style={{ width: '100%' }}>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                              }}
                            >
                              <Typography variant="subtitle">{data.name}</Typography>
                              <Typography variant="subtitle" color="red">
                                ₹{data.price}
                              </Typography>
                            </Box>
                          </div>
                        ))}
                        {!addOnsModalDetails?.variants?.length && (
                          <Box>
                            <div style={{ width: '100%' }}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  width: '100%',
                                }}
                              >
                                <Typography variant="subtitle">full</Typography>
                                <Typography variant="subtitle" color="red">
                                  ₹{addOnsModalDetails?.price}
                                </Typography>
                              </Box>
                            </div>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  {/* </Box> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

AddOnsModal.propTypes = {
  addOnsModalDetails: PropTypes.object,
  setAddOnModalOpen: PropTypes.func,
  addOnModalOpen: PropTypes.bool,
  currentAddedItem: PropTypes.object,
  setOpenItemDetailDrawer: PropTypes.func,
};

export default AddOnsModal;
