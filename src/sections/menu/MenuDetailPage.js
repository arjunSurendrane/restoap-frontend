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
} from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import DefaultImage from '../../assets/images/defaultaddonsImage.svg';

MenuDetails.propTypes = {
  menu: PropTypes.object,
  handleCloseDrawer: PropTypes.func,
};

function MenuDetails({ menu, handleCloseDrawer }) {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.order);
  const isDesktop = useMediaQuery('(min-width:768px)');
  //   const { user } = useAuthContext();
  const [isOrderCompleted, setIsOrderCompleted] = useState(true);

  const cancelOrderButtonStyle = {
    backgroundColor: '#212B36',
    color: 'white',
    borderRadius: '8px',
    border: '2px solid white',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  };

  const verifyOrderButtonStyle = {
    backgroundColor: '#BB3138',
    color: 'white',
    borderRadius: '8px',
    border: '2px solid white',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  };
  const isOfferValid = () => {
    const currentDate = new Date();
    const startDate = new Date(menu?.offer[0]?.startDate);
    const endDate = new Date(menu?.offer[0]?.endDate);
    endDate.setDate(endDate.getDate() + 1);

    return currentDate >= startDate && currentDate <= endDate;
  };

  return (
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
            src={menu?.images[0]?.name ? menu.images[0]?.name : DefaultImage}
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
            gap: 2,
            alignItems: 'center',
            marginTop: '10px',
            justifyContent: 'space-between',
            marginBottom: '20px',
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
              <img height={20} width={20} src="/assets/icons/branch/Veg or Non Veg.png" alt="non" />
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Chip
              sx={{ backgroundColor: '#FFD4D4', marginTop: '12px', color: '#BB3138' }}
              label={`${menu.preparationTime} Min`}
              icon={<Iconify sx={{ color: '#BB3138' }} icon="mdi:clock-outline" />}
            />
          </Box>
        </Box>
        <Box>
          {menu?.variants?.map((data) => (
            <div style={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography
                  variant="subtitle"
                  sx={{
                    color: '#637381',

                    fontFamily: 'Public Sans',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  {data.name}
                </Typography>
                <Typography variant="subtitle">
                  {menu?.offer.length > 0 && isOfferValid() ? (
                    <>
                      <span style={{ marginRight: '10px', textDecoration: 'line-through' }}>
                        ₹{data.price}
                      </span>
                      <span style={{ color: 'red' }}>₹{data.offerPrice}</span>
                    </>
                  ) : (
                    <span style={{ color: 'red' }}>₹{data.price}</span>
                  )}
                </Typography>
              </Box>
            </div>
          ))}
        </Box>
        {!menu?.variants.length && (
          <Box>
            <div style={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography
                  variant="subtitle"
                  sx={{
                    color: '#637381',
                    fontFamily: 'Public Sans',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  full
                </Typography>
                <Typography variant="subtitle">
                  {menu?.offer.length > 0 && isOfferValid() ? (
                    <>
                      <span style={{ marginRight: '10px', textDecoration: 'line-through' }}>
                        ₹{menu?.price}
                      </span>
                      <span style={{ color: 'red' }}>₹{menu?.offerPrice}</span>
                    </>
                  ) : (
                    <span style={{ color: 'red' }}>₹{menu?.price}</span>
                  )}
                </Typography>
              </Box>
            </div>
          </Box>
        )}
        <Box>
          <Typography
            sx={{
              color: '#637381',

              fontFamily: 'Public Sans',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '24px',
            }}
          >
            {' '}
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
  );
}

export default MenuDetails;
