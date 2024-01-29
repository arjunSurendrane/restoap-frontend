import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Modal, Box } from '@mui/material';
// routes
// components
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getMenu } from '../../redux/slices/menu';
// eslint-disable-next-line import/no-unresolved
import { PATH_DASHBOARD } from '../../routes/paths';
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// eslint-disable-next-line import/no-named-as-default
import EditMenu from '../../sections/menu/editMenu/editMenu';
import { getBranches } from '../../redux/slices/branch';
import { getCategories, getMenuCategoriesByStoreId } from '../../redux/slices/category';
import { getAddOns } from '../../redux/slices/addOns';
import { ImageCrop } from '../../sections/menu/imageCrop/ImageCrop';

// sections

// ----------------------------------------------------------------------

export default function MenuEditPage() {
  const { themeStretch } = useSettingsContext();
  const { itemId, storeId } = useParams();
  const dispatch = useDispatch();
  const { menu } = useSelector((state) => state.menu);
  const [image, setImage] = useState(null);
  const [cropImage, setCropImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getMenu(itemId));
    dispatch(getBranches());
    dispatch(getMenuCategoriesByStoreId(storeId));
    dispatch(getAddOns(storeId));
  }, [dispatch, itemId, storeId]);

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
    // maxWidth: 620,
    // minWidth: 360,
    bgcolor: 'background.paper',
    // borderStyle: 'none',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Helmet>
        <title>Restoap | Menu Edit</title>
      </Helmet>

      <CustomBreadcrumbs
        iconName="/assets/icons/navbar/MenuIcon_Vector.svg"
        heading="Edit Menu Item"
        links={[
          {
            name: 'Dashboard',
            href: PATH_DASHBOARD.dashboard,
          },
          {
            name: 'Menu',
            href: PATH_DASHBOARD.menu.menuList,
          },
          { name: 'New Item' },
        ]}
      />
      {menu && (
        <EditMenu
          setOpenModal={setOpenModal}
          setImage={setImage}
          cropImage={cropImage}
          setCropImage={setCropImage}
        />
      )}
      {image && (
        <Modal
          open={openModal}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ImageCrop
              image={image}
              setCropImage={setCropImage}
              setOpenModal={setOpenModal}
              setImage={setImage}
            />
          </Box>
        </Modal>
      )}
    </>
  );
}
