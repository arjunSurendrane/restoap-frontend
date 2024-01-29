/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { useState, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { toast } from 'react-toastify';

// @mui
import {
  Box,
  Card,
  Link,
  Stack,
  Fab,
  Typography,
  IconButton,
  MenuItem,
  FormControlLabel,
  Switch,
  Drawer,
} from '@mui/material';
import { alpha, useTheme, styled, zIndex } from '@mui/material/styles';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import { fCurrency } from '../../utils/formatNumber';
// redux
import { useDispatch } from '../../redux/store';
import { deleteMenu, editMenu } from '../../redux/slices/menu';
// components
import Iconify from '../../components/iconify';
import Label from '../../components/label';
import Image from '../../components/image';
import Carousel, { CarouselDots, CarouselArrows } from '../../components/carousel';
import { createAddOn, getAddOns, deleteAddOn } from '../../redux/slices/addOns';
import { MotionContainer, varFade } from '../../components/animate';
import MuiCarousel from '../../components/carousel/MuiCaruousel';
import MenuPopover from '../../components/menu-popover/MenuPopover';
import DeletePopUp from '../../components/PopUp/DeletePopUp';
import MenuDetails from './MenuDetailPage';
import HasPermission from '../../auth/RightGuard';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

MenuCard.propTypes = {
  menu: PropTypes.object,
};

export default function MenuCard({ menu }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const carouselRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(null);
  const [checked, setCheked] = useState(menu.Active);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openViewDrawer, setOpenViewDrawer] = useState(false);

  const non = false;
  const {
    id,
    name,
    storeId,
    cover,
    price,
    shortDescription,
    description,
    featured,
    images,
    size,
    priceSale,
    foodCategory,
  } = menu;
  const [currentIndex, setCurrentIndex] = useState(
    theme.direction === 'rtl' ? images.length - 1 : 0
  );
  const carouselSettings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,

    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselDots({
      sx: {
        top: 20,
        left: 20,
        position: 'relative',
        // display: 'flex',
      },
    }),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleOpenDrawer = () => {
    setOpenViewDrawer(true);
    setOpenPopover(null);
  };
  const handleCloseDrawer = () => {
    setOpenViewDrawer(false);
  };

  // eslint-disable-next-line no-shadow
  const handledelete = async (id) => {
    await dispatch(deleteMenu(id, storeId[0]));
  };

  // eslint-disable-next-line no-shadow
  const handleEdit = async (itemId, storeId) => {
    navigate(`/dashboard/menus/edit/${storeId}/${itemId}`);
  };
  const handleDisable = async (menuId, status) => {
    const data = {
      id: menuId,
      Active: status,
    };
    const res = await dispatch(editMenu(data));
    if (res.status === 201) {
      setCheked(!checked);
    }
    if (`${res.status}`.startsWith('4')) {
      const message = 'success';
      toast.error(res.data.message);
    }
  };

  return (
    <>
      <DeletePopUp
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
        setConfirmDelete={handledelete}
        itemId={id}
        content="Are You Sure want To Delete"
      />
      <Drawer
        open={openViewDrawer}
        onClose={handleCloseDrawer}
        anchor="right"
        PaperProps={{
          sx: {
            width: {
              xs: 320,
              sm: 480,
              md: 480,
              lg: 480,
              xl: 480,
            },
          },
        }}
      >
        <MenuDetails menu={menu} handleCloseDrawer={handleCloseDrawer} />
      </Drawer>
      <Card
        sx={{
          '&:hover .add-cart-btn': {
            opacity: !checked ? 0.5 : 1,
          },
          borderRadius: '8px',
          border: '3px solid #FEE',
          boxShadow: ' 0px 4px 4px 2px rgba(0, 0, 0, 0.05)',
          backgroundColor: '#F9FAFB',
        }}
      >
        <Box sx={{ opacity: checked ? '' : 0.5 }}>
          <IconButton
            sx={{
              color: '#fff',
              position: 'absolute',
              zIndex: 100,
              // width: '100%',
              justifyContent: 'end',
              right: '8px',
              top: '5px',
            }}
          >
            <Iconify icon="eva:more-vertical-fill" onClick={handleOpenPopover} />
          </IconButton>
          <MenuPopover
            open={openPopover}
            onClose={handleClosePopover}
            arrow="right-top"
            sx={{ width: 160, zIndex: 999 }}
          >
            <MenuItem
              onClick={() => {
                handleOpenDrawer();
              }}
            >
              <Iconify icon="eva:eye-fill" />
              View
            </MenuItem>

            <HasPermission permissionKey="MENU_UPDATE">
              <MenuItem
                onClick={() => {
                  handleEdit(id);
                }}
              >
                <Iconify icon="eva:edit-fill" />
                Edit
              </MenuItem>
            </HasPermission>

            <HasPermission permissionKey="MENU_DELETE">
              <MenuItem
                onClick={() => {
                  setOpenPopUp(true);
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon="eva:trash-2-outline" />
                Delete
              </MenuItem>
            </HasPermission>
          </MenuPopover>
          <Box
            sx={{
              top: 16,
              left: 10,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {foodCategory === 'Non-Veg' ? (
              <img height={20} width={20} src="/assets/icons/branch/Veg or Non Veg.png" alt="non" />
            ) : (
              <img
                height={20}
                width={20}
                src="https://restoap-assets.s3.ap-south-1.amazonaws.com/Veg+or+Non+Veg+(1).png"
                alt="veg"
              />
            )}
          </Box>
          {featured && (
            <Box
              sx={{
                top: 16,
                left: 40,
                zIndex: 9,
                position: 'absolute',
                textTransform: 'uppercase',
              }}
            >
              <img
                height={20}
                width={20}
                src="https://restoap-assets.s3.ap-south-1.amazonaws.com/Vector+(2).svg"
                alt="non"
              />
            </Box>
          )}

          <MuiCarousel image={images} status={menu.Active} />
        </Box>

        <Stack spacing={1.5} sx={{ p: 1, pl: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
              alignItems: 'center',
            }}
          >
            <Link
              component={RouterLink}
              color="inherit"
              variant="subtitle1"
              noWrap
              sx={{ textDecoration: 'none' }}
              onClick={() => setOpenViewDrawer(true)}
            >
              {name?.en
                ? name.en.replace(/\b\w/g, (char) => char.toUpperCase())
                : name.replace(/\b\w/g, (char) => char.toUpperCase())}
            </Link>
            <HasPermission permissionKey="MENU_UPDATE">
              <FormControlLabel
                control={<Switch checked={checked} onClick={() => handleDisable(id, !checked)} />}
                sx={{
                  pl: 2,
                  marginRight: '-6px',
                }}
              />
            </HasPermission>
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: 'Public Sans',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                color: '#637381',
              }}
            >
              {shortDescription || ''}
            </Typography>
          </Box>
        </Stack>
      </Card>
    </>
  );
}

CarouselItem.propTypes = {
  isActive: PropTypes.bool,
  item: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

function CarouselItem({ item, isActive }) {
  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <MotionContainer action animate={isActive}>
      <Image
        alt="img"
        width="100%"
        src={item}
        sx={{
          height: 170,
          background: '#fff',
          // height:{ xs: 50, xl: 50, md:50 ,lg:50},
          borderRadius: '6px 6px 0px 0px',
          zIndex: 100,
        }}
      />
    </MotionContainer>
  );
}
