import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  Modal,
  Pagination,
  Radio,
  RadioGroup,
  Typography,
  alpha,
  styled,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import Iconify from '../../../../components/iconify/Iconify';
import MenuItemCard from './MenuItemCard';
import VariantsModal from './VariantsModal';
import MenuItemCardMobile from '../mobileComponents/MenuItemCardMobile';

const modalBoxStyle = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 758,

  bgcolor: 'background.paper',
  borderStyle: 'none',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  minWidth: 280,
  border: '1px solid #212B36',
  [theme.breakpoints.down('lg')]: {
    marginLeft: theme.spacing(1),
    border: '1px solid #212B36',
    width: 'auto',
    minWidth: 280,
    marginTop: '15px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const DashedLine = styled(Box)(({ theme }) => ({
  height: '2px',
  borderBottom: '1px dashed grey',
  width: '100%',
  marginTop: '10px',
}));

function AddOnsModal({ openModal, closeModal, title, addOns, setOpenViewDrawer }) {
  const { results } = addOns;
  const isDesktop = useMediaQuery('(min-width:900px)');
  const isTab = useMediaQuery('(min-width:768px)');
  const isMobile = useMediaQuery('(max-width:600px)');

  const [currentAddedItem, setCurrentAddedItem] = useState({});
  const [variantModalOpen, setVariantModalOpen] = useState(false);

  // Function to handle choose variant
  const handleVariant = (current) => {
    setCurrentAddedItem(current);
    setVariantModalOpen(true);
  };
  // Function to open/close cart drawer
  const handleOpenCartDrawer = () => {
    setOpenViewDrawer(true);
  };
  const handleClose = () => closeModal(false);
  return (
    <>
      <Modal
        open={openModal}
        onClose={() => closeModal(false)}
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
              width: isDesktop && isTab ? 760 : 300,
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
                {title}
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
            <Box sx={{ display: 'flex', flexDirection: 'column', p: '15px', height: '100%' }}>
              <Box display="flex" justifyContent="end">
                <Box>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
                </Box>
              </Box>
              <Box
                sx={{
                  maxHeight: isDesktop ? '300px' : '260px',
                  mt: '15px',
                  mb: '15px',
                  overflow: 'scroll',
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                  '& .MuiBox-root::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                <Grid container pb={1}>
                  {results?.map((item) => (
                    <Grid item xs={12} md={6} key={item?.id} mt={2} p="0px 10px">
                      {isMobile ? (
                        <MenuItemCardMobile
                          menus={item}
                          isDesktop={isDesktop}
                          handleVariant={handleVariant}
                          handleOpenCartDrawer={handleOpenCartDrawer}
                          closeModal={closeModal}
                        />
                      ) : (
                        <MenuItemCard
                          menus={item}
                          isDesktop={isDesktop}
                          handleVariant={handleVariant}
                          handleOpenCartDrawer={handleOpenCartDrawer}
                          closeModal={closeModal}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box mt="15px">
                <Box p="15px" display="flex" justifyContent="end">
                  <Pagination
                    count={5}
                    variant="outlined"
                    shape="rounded"
                    sx={{
                      '.MuiPaginationItem-root.Mui-selected ': {
                        color: '#fff',
                        backgroundColor: '#BB3138',
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
      {Object.keys(currentAddedItem).length > 0 && (
        <VariantsModal
          variantModalOpen={variantModalOpen}
          setVariantModalOpen={setVariantModalOpen}
          currentAddedItem={currentAddedItem}
        />
      )}
    </>
  );
}

AddOnsModal.propTypes = {
  closeModal: PropTypes.func,
  openModal: PropTypes.bool,
  title: PropTypes.string,
  addOns: PropTypes.object,
  setOpenViewDrawer: PropTypes.func,
};

export default AddOnsModal;
