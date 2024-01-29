import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

// @mui
import {
  Box,
  Container,
  Modal,
  useMediaQuery,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import AddMenuForm from '../../sections/menu/createMenu/createMenuForm';
import { getBranches } from '../../redux/slices/branch';
import { useDispatch, useSelector } from '../../redux/store';
import { ImageCrop } from '../../sections/menu/imageCrop/ImageCrop';
import Iconify from '../../components/iconify/Iconify';

// sections
// import ProductNewEditForm from '../../sections/@dashboard/e-commerce/ProductNewEditForm';

// ----------------------------------------------------------------------

export default function MenuCreatePage() {
  const dispatch = useDispatch();
  const { themeStretch } = useSettingsContext();
  const isDesktop = useMediaQuery('(min-width:1024px)');
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState(null);
  const [cropImage, setCropImage] = useState(null);

  const handleClose = () => {
    setOpenModal(false);
  };

  const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    // borderStyle: 'none',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const limit = 1000;
    dispatch(getBranches(limit));
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Restoap | Menu Create</title>
      </Helmet>

      <CustomBreadcrumbs
        iconName="/assets/icons/navbar/MenuIcon_Vector.svg"
        heading="New Menu Item"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.dashboard },
          {
            name: 'Menu',
            href: PATH_DASHBOARD.menu.menuList,
          },
          { name: 'New Item' },
        ]}
      />
      <AddMenuForm
        setOpenModal={setOpenModal}
        setImage={setImage}
        cropImage={cropImage}
        setCropImage={setCropImage}
      />
      {image && (
        <Modal
          open={openModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ImageCrop image={image} setCropImage={setCropImage} setOpenModal={setOpenModal} />
          </Box>
        </Modal>
      )}
    </>
  );
}
