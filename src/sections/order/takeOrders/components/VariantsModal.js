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
import Iconify from '../../../../components/iconify/Iconify';
import {
  addAddOnsToCart,
  addToCart,
  changeVariant,
  decrementCount,
  incrementAddOnQtyByVariant,
  incrementCount,
  incrementQtyByVariant,
  selectAddOnCartById,
  selectCartById,
} from '../../../../redux/slices/takeOrderCart';

import defualtItemImage from '../../../../assets/images/defaultaddonsImage.svg';

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
  cursor: 'pointer',
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

const VariantsModal = ({
  setVariantModalOpen,
  variantModalOpen,
  currentAddedItem,
  setOpenItemDetailDrawer,
}) => {
  const isDesktop = useMediaQuery('(min-width:900px)');
  const isMobile = useMediaQuery('(min-width:425px)');
  const dispatch = useDispatch();

  const currentCartItems = useSelector((state) => state.cart.cartItems);
  const currentCartAddonsItems = useSelector((state) => state.cart.addOns);
  const isItemExistInCart = useSelector((state) => selectCartById(state, currentAddedItem.id));
  // const currentAddOnItem = useSelector((state) => selectAddOnCartById(state, currentAddedItem));

  const currentItem = currentAddedItem;
  const image = currentItem?.image?.path || currentItem?.images[0]?.name;
  const variant = currentItem.variants;

  // State for quantity
  const [quantity, setQuantity] = useState(1);

  // State for variant
  const [itemVariant, setItemVariant] = useState({
    name: currentItem?.variants[0]?.name,
    value: currentItem?.offerPrice || currentItem?.price,
  });
  const handleClose = () => setVariantModalOpen(false);

  // Function to change the item variant
  const handleVariantChange = (e, itemId) => {
    // dispatch(changeVariant({ price: e.target.value, id: itemId }));
    setItemVariant((state) => ({ name: itemId, value: e.target.value }));
  };

  // Function to add item to the cart
  const handleAddToCard = () => {
    const { id, name, price, variants, foodCategory, prepTime, addOns,taxInclude } = currentItem;

    if (foodCategory) {
      const sameItemsInCart = currentCartItems.filter(
        (item) => item.itemId === id && item.variant.name === itemVariant.name
      );
      if (sameItemsInCart && sameItemsInCart.length > 0) {
        dispatch(incrementQtyByVariant({ id, variant: itemVariant, quantity }));
      } else {
        dispatch(
          addToCart({
            itemId: id,
            qty: quantity,
            price: Number(itemVariant.value),
            name,
            variant: itemVariant,
            foodCategory,
            prepTime,
            addOns,
            taxInclude
          })
        );
      }
    } else {
      const sameItemsInCart = currentCartAddonsItems.filter(
        (item) => item.itemId === id && item.variant.name === itemVariant.name
      );
      if (sameItemsInCart && sameItemsInCart.length > 0) {
        dispatch(incrementAddOnQtyByVariant({ id, variant: itemVariant, quantity }));
      } else {
        dispatch(
          addAddOnsToCart({
            itemId: id,
            qty: quantity,
            price: Number(itemVariant.value),
            name,
            variant: itemVariant,
          })
        );
      }
    }

    toast.success('Item added to cart', {
      position: 'top-center',
      progress: undefined,
    });

    setVariantModalOpen(false);
  };

  const handleDecrement = (id) => {
    if (quantity < 2) return;
    setQuantity((prev) => prev - 1);
  };

  const handleIncrement = (id) => {
    setQuantity((prev) => prev + 1);
  };
  console.log(currentItem);

  return (
    <>
      <ToastContainer hideProgressBar autoClose={2000} />
      <Modal
        open={variantModalOpen}
        onClose={() => setVariantModalOpen(false)}
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
                {currentItem?.name}
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
                  <ImgBox height={isDesktop ? 295 : 125}>
                    <img
                      style={{ objectFit: 'cover', width: '100%', borderRadius: '8px' }}
                      src={image || defualtItemImage}
                      alt=""
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
                      <Typography fontSize="16px" fontWeight="500" color="#637381">
                        Select any 1 option
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      height="100%"
                      justifyContent="space-between"
                    >
                      <Box>
                        {currentItem?.variants?.map((item) => (
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                            key={item._id}
                          >
                            <FormControl fontSize="12px">
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                onChange={(e) => handleVariantChange(e, item?.name)}
                                // defaultValue={currentAddedItem?.price}
                                value={itemVariant.value}
                              >
                                <FormControlLabel
                                  labelPlacement="end"
                                  value={item?.offerPrice || item?.price}
                                  label={item?.name}
                                  control={
                                    <Radio
                                      sx={{
                                        '.MuiSvgIcon-root': {
                                          fontSize: '1rem',
                                        },
                                      }}
                                    />
                                  }
                                />
                              </RadioGroup>
                            </FormControl>
                            <Box display="flex" sx={{ p: '10px' }}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}
                              >
                                <Iconify sx={{ color: '#BB3138' }} icon="mdi:rupee" />
                                <Typography
                                  sx={{ fontSize: '16px', fontWeight: '600', color: '#BB3138' }}
                                >
                                  {item?.offerPrice || item?.price}
                                </Typography>
                              </Box>
                              {item?.offerPrice>0 && (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Iconify
                                    sx={{ color: '#637381', width: '14px', height: '14px' }}
                                    icon="mdi:rupee"
                                  />
                                  <Typography
                                    sx={{ fontSize: '14px', fontWeight: '600', color: '#637381' }}
                                  >
                                    <del>{item?.price}</del>
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Box display="flex" justifyContent="center" alignItems="center">
                          <AddButton
                            width="30px"
                            height="30px"
                            onClick={() => handleDecrement(currentItem?.id)}
                          >
                            <Iconify icon="uil:minus" />
                          </AddButton>
                          <Typography mr="10px" ml="10px">
                            {quantity}
                          </Typography>
                          <AddButton
                            width="30px"
                            height="30px"
                            onClick={() => handleIncrement(currentItem?.id)}
                          >
                            <Iconify icon="uil:plus" />
                          </AddButton>
                        </Box>
                        <AddButton width="100px" height="35px" onClick={handleAddToCard}>
                          Add Item
                        </AddButton>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

VariantsModal.propTypes = {
  setVariantModalOpen: PropTypes.func,
  variantModalOpen: PropTypes.bool,
  currentAddedItem: PropTypes.object,
  setOpenItemDetailDrawer: PropTypes.func,
};

export default VariantsModal;
