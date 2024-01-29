import PropTypes from 'prop-types';
import {
  Chip,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  styled,
} from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import { addToCart, decrementCount, incrementCount } from '../../../../redux/slices/takeOrderCart';
import defualtItemImage from '../../../../assets/images/defaultaddonsImage.svg';

MenuDetailPage.propTypes = {
  menu: PropTypes.object,
  handleCloseDrawer: PropTypes.func,
  handleVariant: PropTypes.func,
  handleOpenCartDrawer: PropTypes.func,
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

const AddItemButton = styled(Button)({
  minWidth: '120px',
  width: '100px',
  minHeight: '30px',
  backgroundColor: '#BB3138',
  fontWeight:500,
  fontSize:"14px",
  borderRadius: '5px',
  color: 'White',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  border: '#fff 2px solid',
  '&:hover': {
    backgroundColor: '#212b36',
    color: 'white',
  },
});

function MenuDetailPage({ menu, handleCloseDrawer, handleVariant, handleOpenCartDrawer }) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  // Function to add item to the cart
  const handleAddToCard = (e, id, name, price, variants, foodCategory, prepTime, addOns,taxInclude) => {
    e.stopPropagation();
    handleCloseDrawer();
    if (variants && variants.length > 0) {
      handleVariant(menu);
    } else {
      const isExistsInCart = cartItems.find((item) => item.itemId === id);
      if (isExistsInCart) {
        handleIncrement(id, variants);
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
      toast.success('Item added to cart', {
        position: 'top-center',
      });
    }
    // setOpenCustomizeModal(true);
  };

  // Function to increment item
  const handleIncrement = (id, variants) => {
    // If variants open variants modal
    if (variants && variants.length > 0) {
      handleVariant(menu);
    } else {
      dispatch(incrementCount(id));
    }
  };

  // Function to decrement itme
  const handleDecrement = (id, variants) => {
    // If variants open variants modal
    if (variants && variants.length > 0) {
      handleOpenCartDrawer();
    } else {
      dispatch(decrementCount(id));
    }
  };

  // Function to calculate quantity
  const calculateQuantity = (itemId) => {
    let totalQty = 0;
    let price = 0;
    const result = cartItems.filter((item) => {
      if (item.itemId === itemId) {
        totalQty += item.qty;
        price += item.price;
      }
      return item;
    });
    return totalQty;
  };

  return (
    <>
      <ToastContainer autoClose={2000} hideProgressBar />
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2, pr: 1, py: 2, backgroundColor: '#F5F5F5' }}
        >
          <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>Food Details</Typography>
          <Box
            sx={{
              width: '26px',
              height: '26px',
              backgroundColor: '#AC161F',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <IconButton sx={{ color: 'white' }} onClick={() => handleCloseDrawer()}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Box>
        </Stack>
        <Container>
          {/* Image box */}
          <Box
            sx={{
              width: '100%',
              height: '250px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '30px',
            }}
          >
            <img
              src={menu?.images[0]?.name || defualtItemImage}
              alt="menu"
              style={{
                borderRadius: '8px',
                objectFit: 'cover',
                objectPosition: 'center center',
                width: '100%',
                height: '100%',
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              marginTop: '10px',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
               
              }}
            >
              {menu.foodCategory === 'Non-Veg' ? (
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

              <Typography variant="h6">
                {menu.name?.en
                  ? menu.name.en.replace(/\b\w/g, (char) => char.toUpperCase())
                  : menu.name.replace(/\b\w/g, (char) => char.toUpperCase())}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Box display="flex">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Iconify sx={{ color: '#BB3138' }} icon="mdi:rupee" />
                <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#BB3138' }}>
                  {menu?.offerPrice || menu?.price}
                </Typography>
              </Box>
              {menu?.offerPrice && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',

                    marginLeft: '5px',
                  }}
                >
                  <Iconify
                    sx={{ color: '#637381', width: '14px', height: '14px' }}
                    icon="mdi:rupee"
                  />
                  <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#637381' }}>
                    <del>{menu.price}</del>
                  </Typography>
                </Box>
              )}
            </Box>
            <AddItemButton
              onClick={(e) =>
                handleAddToCard(
                  e,
                  menu?.id,
                  menu?.name,
                  menu?.offerPrice||menu?.price,
                  menu?.variants,
                  menu?.foodCategory,
                  menu?.preparationTime,
                  menu?.addOns,
                  menu?.taxInclude
                )
              }
            >
              Add Item
            </AddItemButton>
          </Box>

          <Box mt={2} borderTop="2px dashed #212B36">
            <Typography>
              {menu.description.en ? (
                menu.description.en
              ) : (
                // eslint-disable-next-line react/no-danger
                <div dangerouslySetInnerHTML={{ __html: menu.description }} />
              )}
            </Typography>
          </Box>
          {menu?.videos?.length > 0 && (
            <Box
              sx={{
                width: '100%',
                height: '250px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '30px',
              }}
            >
              <video
                controls
                poster={menu.videos[0].name}
                style={{
                  borderRadius: '8px',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  width: '100%',
                  height: '100%',
                }}
              >
                <source src={menu.videos[0].name} type="video/mp4" />
                <track
                  label="English Captions"
                  kind="captions"
                  src={menu.captionsSource}
                  srcLang="en"
                  default
                />
                Your browser does not support the video tag.
              </video>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}

export default MenuDetailPage;
