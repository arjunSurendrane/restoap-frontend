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
import {
  addAddOnsToCart,
  addToCart,
  decrementAddOnsCount,
  decrementCount,
  incrementAddOnsCount,
  incrementCount,
} from '../../../../redux/slices/takeOrderCart';
import SvgColor from '../../../../components/svg-color/SvgColor';
import CustomButton from '../../../../components/button/CustomButton';
import Iconify from '../../../../components/iconify/Iconify';
import VariantsModal from './VariantsModal';
import CustomizeModal from './CustomizeModal';
import MenuDetailPage from './MenuDetailPage';
import defaultItemImage from '../../../../assets/images/defaultaddonsImage.svg';

MenuItemCard.propTypes = {
  menus: PropTypes.object,
  handleOpenDetalpage: PropTypes.func,
  handleVariant: PropTypes.func,
  handleOpenCartDrawer: PropTypes.func,
  closeModal: PropTypes.func,
};

const AddButton = styled(Button)(({ w, h }) => ({
  width: w,
  height: h,
  minWidth: w,
  minHeight: h,
  backgroundColor: '#BB3138',
  borderRadius: '5px',
  color: 'White',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0px !important',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  border: '#fff 2px solid',
  '&:hover': {
    backgroundColor: '#212b36',
    color: 'white',
  },

  '& .MuiButton-root': {
    padding: '0px !important',
  },
}));

const CustomCard = styled(Card)(({ isDesktop }) => ({
  maxWidth: '346px',
  width: isDesktop ? '346px' : '100%',
  height: isDesktop ? '130px' : '120px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: ' 0px 0px 7px -1px rgba(0, 0, 0, 0.29)',
  borderRadius: '8px',
}));

const ContentBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  width: '91%',
  justifyContent: 'space-between',
});

function MenuItemCard({
  menus,
  handleOpenDetalpage,
  handleVariant,
  handleOpenCartDrawer,
  closeModal,
}) {
  const isDesktop = useMediaQuery('(min-width:900px)');
  const { cartItems, addOns } = useSelector((state) => state.cart);

  // Check whether the item is menu item or addon (because re-using the same card )
  const isAddon = !menus.foodCategory;
  const updatedCartItems = isAddon ? addOns : cartItems;

  // Check whether this item is exist in the cart item/ addons cart items
  const isItemExistinCart = isAddon
    ? addOns.find((ele) => ele.itemId === menus?.id)
    : cartItems.find((ele) => ele.itemId === menus?.id);

  const dispatch = useDispatch();
  const [openCustomizeModal, setOpenCustomizeModal] = useState(false);

  // Fuction to handle add to cart
  const handleAddToCard = (e, id, name, price, variants, foodCategory, prepTime, addOn,taxInclude) => {
    e.stopPropagation();
    if (variants && variants.length > 0) {
      handleVariant(menus);
    } else if (foodCategory) {
      dispatch(
        addToCart({
          itemId: id,
          qty: 1,
          price: Number(price),
          name,
          variants,
          foodCategory,
          prepTime,
          addOns: addOn,
          taxInclude
        })
      );
    } else {
      dispatch(
        addAddOnsToCart({
          itemId: id,
          qty: 1,
          price: Number(price),
          name,
          variants,
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

  // Function to handle decrement addons item
  const handleDecrementAddons = (e, id, variants) => {
    e.stopPropagation();
    // If variants open variants modal
    if (variants && variants.length > 0) {
      handleOpenCartDrawer();
      closeModal();
    } else {
      dispatch(decrementAddOnsCount(id));
    }
  };
  // Function to handle increment addons item
  const handleIncrementAddons = (e, id, variants) => {
    e.stopPropagation();
    // If variants open variants modal
    if (variants && variants.length > 0) {
      handleVariant(menus);
    } else {
      dispatch(incrementAddOnsCount(id));
    }
  };
  // Calculate the total quantity of the item in the cart.
  function calculateQuantity(itemId) {
    return updatedCartItems.reduce((totalQuantity, item) => {
      if (item.itemId === itemId) {
        totalQuantity += item.qty;
      }
      return totalQuantity;
    }, 0);
  }

  const handleIncrementButton = (e, id, vairants) => {
    if (isAddon) {
      handleIncrementAddons(e, id, vairants);
    } else {
      handleIncrement(e, id, vairants);
    }
  };

  const handleDecrementButton = (e, id, vairants) => {
    if (isAddon) {
      handleDecrementAddons(e, id, vairants);
    } else {
      handleDecrement(e, id, vairants);
    }
  };

  const handleDecrementAddButton = () => {};

  return (
    <>
      <CustomCard onClick={() => handleOpenDetalpage(menus)} isDesktop={isDesktop}>
        <ContentBox
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            width: '91%',
            justifyContent: 'space-between',
          }}
        >
          {isDesktop && (
            <Card
              sx={{
                width: '150px',
                height: '100px',
                borderRadius: '4px',
                boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
                // marginRight: '30px',
                display: 'flex',
              }}
            >
              {menus?.images.length > 0 ? (
                menus?.images?.map((data) => (
                  <img
                    key={data.path}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    alt=""
                    src={data?.name}
                  />
                ))
              ) : (
                <img
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  alt=""
                  src={defaultItemImage}
                />
              )}
              {/* <img style={{ width: '100%', height: '100%' }} alt="" src={menus?.image?.path} /> */}
            </Card>
          )}

          <Box
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
              <Box display='flex'>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                   
                  }}
                >
                  <Iconify sx={{ color: '#BB3138' }} icon="mdi:rupee" />
                  <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#BB3138' }}>
                    {menus?.offerPrice||menus?.price}
                  </Typography>
                </Box>
                {menus?.offerPrice&&
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    
                    marginLeft:"5px"
                  }}
                >
                  <Iconify sx={{ color: '#637381',width:"14px",height:'14px' }} icon="mdi:rupee" />
                  <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#637381' }}>
                    <del>{menus.price}</del>
                  </Typography>
                </Box>}
              </Box>

              {isItemExistinCart ? (
                <Box
                  sx={{
                    width: '90px',
                    height: '30px',
                    boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <AddButton
                    w="30px"
                    h="30px"
                    onClick={(e) => handleDecrementButton(e, menus?.id, menus?.variants)}
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
                    onClick={(e) => handleIncrementButton(e, menus?.id, menus?.variants)}
                  >
                    <Iconify icon="uil:plus" sx={{ fontSize: '12px' }} />
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
                      menus?.offerPrice||menus?.price,
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
            </Box>
          </Box>
        </ContentBox>
      </CustomCard>

      <CustomizeModal
        openCustomizeModal={openCustomizeModal}
        setOpenCustomizeModal={setOpenCustomizeModal}
      />
    </>
  );
}

export default MenuItemCard;
