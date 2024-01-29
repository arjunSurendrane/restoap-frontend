import React, { useState } from 'react';
import {
  Typography,
  Box,
  IconButton,
  Button,
  CardMedia,
  CardContent,
  Grid,
  Drawer,
  useMediaQuery,
  styled,
} from '@mui/material';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementCount, incrementCount } from '../../../../redux/slices/takeOrderCart';
import SvgColor from '../../../../components/svg-color/SvgColor';
import CustomButton from '../../../../components/button/CustomButton';
import Iconify from '../../../../components/iconify/Iconify';
import VariantsModal from '../components/VariantsModal';
import CustomizeModal from '../components/CustomizeModal';
import MenuDetailPage from '../components/MenuDetailPage';

MenuItemCardMobile.propTypes = {
  menus: PropTypes.object,
  handleOpenDetalpage: PropTypes.func,
  handleVariant: PropTypes.func,
  handleOpenCartDrawer: PropTypes.func,
  closeModal: PropTypes.func,
};

const AddButton = styled(Button)(({ w, h }) => ({
  width: w,
  height: h,
  minWidth:w,
  minHeight:h,
  backgroundColor: '#BB3138',
  borderRadius: '5px',
  color: 'White',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding:"0px !important",
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  border: '#fff 2px solid',
  '&:hover': {
    backgroundColor: '#212b36',
    color: 'white',
  },
  
  '& .MuiButton-root':{
    padding:"0px !important",
  }
}));

const CustomCard = styled(Card)(({ isDesktop }) => ({
  width: '100%',
  height: '92px',
  display: 'flex',
  maxWidth:"400px",
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: ' 0px 0px 7px -1px rgba(0, 0, 0, 0.29)',
  borderRadius: '8px',
  marginBottom:"10px"
}));

const ContentBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '10px 10px 10px 10px',
 
  height: '100%',
  width: '100%',
  backgroundColor: 'blue',
});

function MenuItemCardMobile({
  menus,
  handleOpenDetalpage,
  handleVariant,
  handleOpenCartDrawer,
  closeModal,
}) {
  const isDesktop = useMediaQuery('(min-width:900px)');
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();
  const [openCustomizeModal, setOpenCustomizeModal] = useState(false);

  // Fuction to handle add to cart
  const handleAddToCard = (e, id, name, price, variants, foodCategory, prepTime, addOns,taxInclude) => {
    e.stopPropagation();
    if (variants && variants.length > 0) {
      handleVariant(menus);
    } else {
      dispatch(
        addToCart({
          itemId: id,
          qty: 1,
          price: Number(price),
          name,
          variants,
          foodCategory,
          prepTime,
          addOns,
          taxInclude
        })
      );
    }
    // setOpenCustomizeModal(true);
  };

  // Function to handle decrement item
  const handleDecrement = (e, id, variants) => {
    e.stopPropagation();
    // If variants open variants modal
    if (variants && variants.length > 0) {
      handleOpenCartDrawer();
      closeModal();
    } else {
      dispatch(decrementCount(id));
    }
  };
  // Function to handle increment item
  const handleIncrement = (e, id, variants) => {
    e.stopPropagation();
    // If variants open variants modal
    if (variants && variants.length > 0) {
      handleVariant(menus);
    } else {
      dispatch(incrementCount(id));
    }
  };

  // Function to calculate quantity
  const calculateQuantity = (itemId) => {
    let totalQty = 0;
    const result = cartItems.filter((item) => {
      if (item.itemId === itemId) {
        totalQty += item.qty;
      }
      return item;
    });
    return totalQty;
  };

  return (
    <>
      <CustomCard onClick={() => handleOpenDetalpage(menus)} isDesktop={isDesktop}>
        <Grid container display="flex" justifyContent="space-between" height="100%" p="15px">
          <Grid item xs={9}  display="flex">
            <Box sx={{ marginRight: '10px' }}>
              {menus.foodCategory === 'Non-Veg' ? (
                <img
                  height={20}
                  width={20}
                  src="/assets/icons/branch/Veg or Non Veg.png"
                  alt="non"
                />
              ) : (
                <img
                  height={20}
                  width={20}
                  src="https://restoap-assets.s3.ap-south-1.amazonaws.com/Veg+or+Non+Veg+(1).png"
                  alt="veg"
                />
              )}
            </Box>
            <Typography sx={{ fontSize: '16px', fontWeight: '600',lineHeight:"1.1" }}>{menus.name}</Typography>
          </Grid>
          <Grid item xs={3} display="flex" justifyContent="end">
            <Chip
              sx={{
                backgroundColor: '#FFD4D4',
                maxWidth: '67px',
                width: '67px',
                color: '#BB3138',
                height: '18px',
                fontSize: '10px',
                fontWeight: '500',
              }}
              label={`${menus.preparationTime} Min`}
              icon={
                <Iconify
                  sx={{
                    color: '#BB3138 !important',
                    fontSize: '10px',
                    width: '12px',
                    marginRight: '2px',
                  }}
                  icon="mdi:clock-outline"
                />
              }
            />
          </Grid>
          <Grid item xs={6} display="flex" alignItems="center">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Iconify
                sx={{ color: '#BB3138', fontSize: '16px', height: '16px' }}
                icon="mdi:rupee"
              />
              <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#BB3138' }}>
                {menus.price}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}  display="flex" justifyContent="end" alignItems="end">
            {cartItems.find((ele) => ele.itemId === menus?.id) ? (
              <Box
                sx={{
                  width: '90px',
                  height: '30px',
                  boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
                  display: 'flex',
                  justifyContent:"space-between"
                 
                }}
              >
                <AddButton
                  w="30px"
                  h="30px"
                  onClick={(e) => handleDecrement(e, menus?.id, menus?.variants)}
                >
                  <Iconify icon="uil:minus" />
                </AddButton>
                <Box display="flex" alignItems="center" justifyContent="center" width="30px">
                  <Typography fontSize="16px" color="#BB3138">
                    {calculateQuantity(menus?.id)}
                  </Typography>
                </Box>
                <AddButton
                  w="30px"
                  h="30px"
                  onClick={(e) => handleIncrement(e, menus?.id, menus?.variants)}
                >
                  <Iconify icon="uil:plus" sx={{fontSize:"12px"}}/>
                </AddButton>
              </Box>
            ) : (
              <AddButton
                w="30px"
                h="30px"
                onClick={(e) =>
                  handleAddToCard(
                    e,
                    menus?.id,
                    menus?.name,
                    menus?.price,
                    menus?.variants,
                    menus?.foodCategory,
                    menus?.preparationTime,
                    menus?.addOns,
                    menus?.taxInclude
                  )
                }
              >
                <Iconify icon="uil:plus" />
              </AddButton>
            )}
          </Grid>
        </Grid>
        {/* <Box
            width="100%"
            pl={isDesktop ? '10px' : '0'}
            height="100px"
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box sx={{ marginRight: '15px' }}>
                {menus.foodCategory === 'Non-Veg' ? (
                  <img
                    height={20}
                    width={20}
                    src="/assets/icons/branch/Veg or Non Veg.png"
                    alt="non"
                  />
                ) : (
                  <img
                    height={20}
                    width={20}
                    src="https://restoap-assets.s3.ap-south-1.amazonaws.com/Veg+or+Non+Veg+(1).png"
                    alt="veg"
                  />
                )}
              </Box>
              <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>{menus.name}</Typography>
            </Box>
            {menus?.preparationTime && (
              <Chip
                sx={{
                  backgroundColor: '#FFD4D4',
                  marginTop: '12px',
                  maxWidth: '90px',
                  color: '#BB3138',
                  height: '24px',
                }}
                label={`${menus.preparationTime} Min`}
                icon={<Iconify sx={{ color: '#BB3138' }} icon="mdi:clock-outline" />}
              />
            )}

            <Box
              sx={{
                display: 'flex',
                marginTop: '2px',
                flexDirection: 'row',
                minWidth: '180px',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Iconify sx={{ color: '#BB3138' }} icon="mdi:rupee" />
                <Typography sx={{ fontSize: '18px', fontWeight: '600', color: '#BB3138' }}>
                  {menus.price}
                </Typography>
              </Box>

              {cartItems.find((ele) => ele.itemId === menus?.id) ? (
                <Box display="flex">
                  <AddButton
                    width="30px"
                    height="30px"
                    onClick={(e) => handleDecrement(e, menus?.id, menus?.variants)}
                  >
                    <Iconify icon="uil:minus" />
                  </AddButton>
                  <Typography mr="10px" ml="10px">
                    {calculateQuantity(menus?.id)}
                  </Typography>
                  <AddButton
                    width="30px"
                    height="30px"
                    onClick={(e) => handleIncrement(e, menus?.id, menus?.variants)}
                  >
                    <Iconify icon="uil:plus" />
                  </AddButton>
                </Box>
              ) : (
                <AddButton
                  sx={{ width: '20px', height: '30px' }}
                  onClick={(e) =>
                    handleAddToCard(
                      e,
                      menus?.id,
                      menus?.name,
                      menus?.price,
                      menus?.variants,
                      menus?.foodCategory,
                      menus?.preparationTime,
                      menus?.addOns
                    )
                  }
                >
                  <Iconify icon="uil:plus" />
                </AddButton>
              )}
            </Box>
          </Box> */}
      </CustomCard>

      <CustomizeModal
        openCustomizeModal={openCustomizeModal}
        setOpenCustomizeModal={setOpenCustomizeModal}
      />
    </>
  );
}

export default MenuItemCardMobile;
