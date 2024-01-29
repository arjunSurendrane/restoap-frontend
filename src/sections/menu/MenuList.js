import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import { Box } from '@mui/material';
// components
import { SkeletonProductItem } from '../../components/skeleton';
//
import MenuCard from './MenuCard';
import CommonModal from '../../components/PopUp/DeletePopUp';

// ----------------------------------------------------------------------

MenuList.propTypes = {
  loading: PropTypes.bool,
  menus: PropTypes.array,
};

export default function MenuList({ menus, loading, ...other }) {
  console.log('menus', loading);
  const [openModal, setOpenModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState('');
  console.log('confirm delete', confirmDelete);
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      {...other}
    >
      {!loading &&
        menus?.length > 0 &&
        menus?.map((item, index) => (
          <MenuCard
            key={item.id}
            menu={item}
            // setOpenModal={setOpenModal}
            // confirmDelete={confirmDelete}
          />
        ))}
      {loading && (
        <>
          <SkeletonProductItem />
          <SkeletonProductItem />
          <SkeletonProductItem />
          <SkeletonProductItem />
          <SkeletonProductItem />
          <SkeletonProductItem />
          <SkeletonProductItem />
          <SkeletonProductItem />
          <SkeletonProductItem />
          <SkeletonProductItem />
        </>
      )}

      {/* <CommonModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setConfirmDelete={setConfirmDelete}
      /> */}
    </Box>
  );
}
