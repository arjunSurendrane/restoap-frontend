import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, styled, useMediaQuery } from '@mui/material';
import { useAuthContext } from '../../../auth/useAuthContext';
import MenuList from '../../../sections/order/takeOrders/MenuList';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { getMenus } from '../../../redux/slices/menu';
import { getTables, selectTableById } from '../../../redux/slices/table';
import { getCategories } from '../../../redux/slices/category';
import MenuListMobile from '../../../sections/order/takeOrders/MenuListMobile';
import CardPagination from '../../../components/pagination/cardPagination';
import { clearCartItems, setOrderType } from '../../../redux/slices/takeOrderCart';
import ChooseDineInOrTakeAway from '../../../sections/order/takeOrders/components/ChooseDineInOrTakeAway';
import { getAddOns } from '../../../redux/slices/addOns';
import { PATH_DASHBOARD } from '../../../routes/paths';

const MainContainer = styled(Box)({
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  backgroundColor: '#fff',
  borderRadius: '8px',
  minHeight: '600px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

function TakeOrderMenu() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [searchParams] = useSearchParams();
  // Table id from params
  const tableId = searchParams.get('table');
  const [search, setSearch] = useState('');
  console.log('search state', search);
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [openChooseOrderType, setOpenChooseOrderType] = useState(true);
  const { menus, isLoadingMenuItems } = useSelector((state) => state.menu);
  console.log({ isLoadingMenuItems });
  const categoryDetails = useSelector((state) => state.category.categories);
  const categories = categoryDetails?.results?.filter((item) => item.active);

  const tableDetail = useSelector((state) => selectTableById(state, tableId));
  const { storeId } = user;
  useEffect(() => {
    dispatch(getMenus(storeId, search, '', category, search ? 1 : page, '', limit));
  }, [dispatch, storeId, search, page, limit, category]);

  useEffect(() => {
    dispatch(getTables(storeId));
    dispatch(getCategories(storeId));
  }, [storeId, dispatch]);
  const handleChooseOrderType = (type) => {
    dispatch(setOrderType(type));
    setOpenChooseOrderType(false);
  };

  return (
    <>
      <Box sx={{ height: isMobile ? '100vh' : '100%' }}>
        {!isMobile && (
          <CustomBreadcrumbs
            heading="Order List"
            iconName="/assets/icons/navbar/Order_Vector.svg"
            links={[
              {
                name: 'Dashboard',
                href: PATH_DASHBOARD.root,
              },
              {
                name: 'Orders',
                //   href: PATH_DASHBOARD.invoice.root,
              },
              {
                name: 'Take Orders',
              },
            ]}
          />
        )}
        <MainContainer>
          {isMobile ? (
            <MenuListMobile
              menus={menus}
              loading={isLoadingMenuItems}
              tableDetail={tableDetail}
              categories={categories}
              setSearch={setSearch}
              setCategory={setCategory}
            />
          ) : (
            <MenuList
              menus={menus}
              loading={isLoadingMenuItems}
              tableDetail={tableDetail}
              categories={categories}
              setSearch={setSearch}
              setCategory={setCategory}
            />
          )}
        </MainContainer>
      </Box>
      {menus?.results?.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'end', padding: '2rem' }}>
          <CardPagination
            count={menus.totalPages}
            page={page}
            fun={setPage}
            setLimit={setLimit}
            rowPerpage={9}
          />
        </Box>
      )}
      <ChooseDineInOrTakeAway
        open={openChooseOrderType}
        setOpen={setOpenChooseOrderType}
        handleChooseOrderType={handleChooseOrderType}
      />
    </>
  );
}

export default TakeOrderMenu;
