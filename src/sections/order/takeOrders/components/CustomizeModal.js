import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  Typography,
  styled,
  useMediaQuery,
} from '@mui/material';
import React from 'react';

import PropTypes from 'prop-types';
import Iconify from '../../../../components/iconify/Iconify';

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

const DashedLine = styled(Box)(({ theme }) => ({
  height: '2px',
  borderBottom: '1px dashed grey',
  width: '100%',
  marginTop: '10px',
}));

function CustomizeModal({ openCustomizeModal, setOpenCustomizeModal }) {
  const isDesktop = useMediaQuery('(min-width:900px)');
  const isMobile = useMediaQuery('(min-width:425px)');
  
  const handleClose = () => setOpenCustomizeModal(false);
  return (
    <Modal
      open={openCustomizeModal}
      onClose={() => setOpenCustomizeModal(false)}
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
              Repeat last used customization?
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
            <Box sx={{ width: '100%' }}>
              <Box
                height="430px"
                maxHeight="456px"
                sx={{
                  overflow: 'scroll',
                  '& .MuiBox-root::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                <Box sx={{ height: '155px', maxHeight: '250px', p: '15px' }}>
                  <Box
                    display="flex"
                    //   justifyContent="space-between"

                    height="120px"
                  >
                    <Box width="120px" height="100%" display={isDesktop ? 'block' : 'none'}>
                      <img
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          borderRadius: '8px',
                          height: '100%',
                        }}
                        src="https://imgs.search.brave.com/w6LK-0qUKkSRG8bAW8xUrOXgEy30hiB-RXOuoOT_Flg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMzYw/NjU3Ny5qcGc"
                        alt=""
                      />
                    </Box>
                    <Box pl="10px">
                      <Box width={isDesktop ? '350px' : ''} display="flex">
                        <Box sx={{ marginRight: isDesktop ? '15px' : '0px', display: 'flex' }}>
                          {/* {menus.foodCategory === 'Non-Veg' ? (
                  <img
                    height={20}
                    width={20}
                    src="/assets/icons/branch/Veg or Non Veg.png"
                    alt="non"
                  />
                ) : ( */}
                          <img
                            height={20}
                            width={20}
                            src="https://restoap-assets.s3.ap-south-1.amazonaws.com/Veg+or+Non+Veg+(1).png"
                            alt="veg"
                          />
                          {/* )} */}
                        </Box>
                        <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>
                          Chicken Biriyani
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          mt: '10px',
                        }}
                      >
                        <Iconify sx={{ color: '#BB3138' }} icon="mdi:rupee" />
                        <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#BB3138' }}>
                          {200}
                        </Typography>
                      </Box>
                      <Typography mt="10px">Quarter</Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" width="150px" alignItems="end">
                      <Box display="flex">
                        <AddButton width="30px" height="30px">
                          <Iconify icon="uil:minus" />
                        </AddButton>
                        <Typography mr="10px" ml="10px">
                          8
                        </Typography>
                        <AddButton width="30px" height="30px">
                          <Iconify icon="uil:plus" />
                        </AddButton>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          mt: '10px',
                        }}
                      >
                        <Iconify sx={{ color: '#BB3138' }} icon="mdi:rupee" />
                        <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#BB3138' }}>
                          {200}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <DashedLine />
                </Box>
                <Box sx={{ height: '155px', maxHeight: '250px', p: '15px' }}>
                  <Box
                    display="flex"
                    //   justifyContent="space-between"

                    height="120px"
                  >
                    <Box width="120px" height="100%" display={isDesktop ? 'block' : 'none'}>
                      <img
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          borderRadius: '8px',
                          height: '100%',
                        }}
                        src="https://imgs.search.brave.com/w6LK-0qUKkSRG8bAW8xUrOXgEy30hiB-RXOuoOT_Flg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMzYw/NjU3Ny5qcGc"
                        alt=""
                      />
                    </Box>
                    <Box pl="10px">
                      <Box width={isDesktop ? '350px' : ''} display="flex">
                        <Box sx={{ marginRight: isDesktop ? '15px' : '0px', display: 'flex' }}>
                          {/* {menus.foodCategory === 'Non-Veg' ? (
                  <img
                    height={20}
                    width={20}
                    src="/assets/icons/branch/Veg or Non Veg.png"
                    alt="non"
                  />
                ) : ( */}
                          <img
                            height={20}
                            width={20}
                            src="https://restoap-assets.s3.ap-south-1.amazonaws.com/Veg+or+Non+Veg+(1).png"
                            alt="veg"
                          />
                          {/* )} */}
                        </Box>
                        <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>
                          Chicken Biriyani
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          mt: '10px',
                        }}
                      >
                        <Iconify sx={{ color: '#BB3138' }} icon="mdi:rupee" />
                        <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#BB3138' }}>
                          {200}
                        </Typography>
                      </Box>
                      <Typography mt="10px">Quarter</Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" width="150px" alignItems="end">
                      <Box display="flex">
                        <AddButton width="30px" height="30px">
                          <Iconify icon="uil:minus" />
                        </AddButton>
                        <Typography mr="10px" ml="10px">
                          8
                        </Typography>
                        <AddButton width="30px" height="30px">
                          <Iconify icon="uil:plus" />
                        </AddButton>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          mt: '10px',
                        }}
                      >
                        <Iconify sx={{ color: '#BB3138' }} icon="mdi:rupee" />
                        <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#BB3138' }}>
                          {200}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <DashedLine />
                </Box>
                <Box sx={{ height: '155px', maxHeight: '250px', p: '15px' }}>
                  <Box
                    display="flex"
                    //   justifyContent="space-between"

                    height="120px"
                  >
                    <Box width="120px" height="100%" display={isDesktop ? 'block' : 'none'}>
                      <img
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          borderRadius: '8px',
                          height: '100%',
                        }}
                        src="https://imgs.search.brave.com/w6LK-0qUKkSRG8bAW8xUrOXgEy30hiB-RXOuoOT_Flg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMzYw/NjU3Ny5qcGc"
                        alt=""
                      />
                    </Box>
                    <Box pl="10px">
                      <Box width={isDesktop ? '350px' : ''} display="flex">
                        <Box sx={{ marginRight: isDesktop ? '15px' : '0px', display: 'flex' }}>
                          {/* {menus.foodCategory === 'Non-Veg' ? (
                  <img
                    height={20}
                    width={20}
                    src="/assets/icons/branch/Veg or Non Veg.png"
                    alt="non"
                  />
                ) : ( */}
                          <img
                            height={20}
                            width={20}
                            src="https://restoap-assets.s3.ap-south-1.amazonaws.com/Veg+or+Non+Veg+(1).png"
                            alt="veg"
                          />
                          {/* )} */}
                        </Box>
                        <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>
                          Chicken Biriyani
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          mt: '10px',
                        }}
                      >
                        <Iconify sx={{ color: '#BB3138' }} icon="mdi:rupee" />
                        <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#BB3138' }}>
                          {200}
                        </Typography>
                      </Box>
                      <Typography mt="10px">Quarter</Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" width="150px" alignItems="end">
                      <Box display="flex">
                        <AddButton width="30px" height="30px">
                          <Iconify icon="uil:minus" />
                        </AddButton>
                        <Typography mr="10px" ml="10px">
                          8
                        </Typography>
                        <AddButton width="30px" height="30px">
                          <Iconify icon="uil:plus" />
                        </AddButton>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          mt: '10px',
                        }}
                      >
                        <Iconify sx={{ color: '#BB3138' }} icon="mdi:rupee" />
                        <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#BB3138' }}>
                          {200}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <DashedLine />
                </Box>
              </Box>
              <Box
                sx={{
                  height: '40px',
                  border: '1px solid grey',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Iconify sx={{ color: '#BB3138' }} icon="mdi:plus" />
                <Typography sx={{ fontSize: '16px', fontWeight: '700', color: '#BB3138' }}>
                  Add New Customization
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

CustomizeModal.propTypes = {
  setOpenCustomizeModal: PropTypes.func,
  openCustomizeModal: PropTypes.bool,
  // menu:PropTypes.
};

export default CustomizeModal;
