/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import orderBy from 'lodash/orderBy';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
// @mui
import {
  Container,
  Typography,
  Stack,
  Box,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  Grid,
} from '@mui/material';
// redux
// eslint-disable-next-line import/no-unresolved
import BreadcrumbsButton from 'src/components/button/BreadcrumsButton';
import { useDispatch, useSelector } from '../../redux/store';
import { getMenus } from '../../redux/slices/menu';
import { getBranches } from '../../redux/slices/branch';
import { useAuthContext } from '../../auth/useAuthContext';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import Iconify from '../../components/iconify';

// components
import FormProvider from '../../components/hook-form';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { MenuUploadSteppers } from '../../sections/menu/multipleUploadMenu/MultipleMenuUpload';

// sections
import {
  // eslint-disable-next-line no-unused-vars
  MenuTagFiltered,
  MenuSort,
  MenuList,
  MenuFilterDrawer,
  MenuSearch,
} from '../../sections/menu';
import CardPagination from '../../components/pagination/cardPagination';
import { TableNoData } from '../../components/table';
import NoResultFound from '../NoResultPage';
import { StyledBreadCrumbsButton } from '../../theme/overrides/Button';
import HasPermission from '../../auth/RightGuard';
// import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';

// ----------------------------------------------------------------------

export default function MenuListingPage({ ...other }) {
  const { user } = useAuthContext();

  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menus, isLoadingMenuItems } = useSelector((state) => state.menu);
  const { branches } = useSelector((state) => state.branch);
  const defaultBranchId = user.storeId ? user.storeId : branches.results?.[0]?.id;
  const [openFilter, setOpenFilter] = useState(false);
  const [search, setSearch] = useState('');
  const [branch, setBranch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState('');
  const [sort, setSort] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [limit, setLimit] = useState(8);
  const [open, setOpen] = useState(false);
  const isNotFound = !menus?.results?.length;
  const storeId = branch || defaultBranchId;
  const defaultValues = {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: [0, 200],
    rating: '',
    sortBy: 'featured',
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    watch,
    formState: { dirtyFields },
  } = methods;

  const values = watch();

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getMenus(defaultBranchId, search, branch, category, search ? 1 : page, sortValue, limit)
    );
  }, [dispatch, defaultBranchId, search, branch, category, page, sortValue, limit]);

  const handleResetFilter = () => {
    reset();
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleNavigate = () => {
    navigate('/dashboard/menus/create-menu');
  };

  return (
    <>
      <Helmet>
        <title>Restoap | Menu</title>
      </Helmet>

      <FormProvider methods={methods}>
        <CustomBreadcrumbs
          iconName="/assets/icons/navbar/MenuIcon_Vector.svg"
          heading="Menu Items"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.dashboard },
            {
              name: 'Menu',
              href: PATH_DASHBOARD.menu.menuList,
            },
            { name: 'Listing' },
          ]}
          action={
            <>
              <StyledBreadCrumbsButton onClick={() => setOpen(true)} sx={{ marginRight: '10px' }}>
                import Items
              </StyledBreadCrumbsButton>
              <StyledBreadCrumbsButton onClick={handleNavigate}>Add Items</StyledBreadCrumbsButton>
            </>
          }
        />
        <Grid container>
          <Grid
            items
            md={12}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <Grid container spacing={2} paddingY={2}>
              <Grid item xs={12} md={6}>
                <MenuSearch search={setSearch} />
              </Grid>
              <Grid item xs={12} md={6}>
                <MenuFilterDrawer
                  open={openFilter}
                  onOpen={handleOpenFilter}
                  onClose={handleCloseFilter}
                  onResetFilter={handleResetFilter}
                  setBranch={setBranch}
                  setCategory={setCategory}
                  setPage={setPage}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <MenuList menus={menus.results} loading={isLoadingMenuItems} />
        <Dialog
          open={open}
          onClose={() => {
            // onClose();
            setOpen(false);
            reset();
            // setIsEdit(false);
          }}
          {...other}
          sx={{ borderRadius: '8px' }}
          PaperProps={{
            sx: {
              borderRadius: '8px',
              // height: '603px',
              width: '660px',
            },
          }}
        >
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#FFF',
              backgroundColor: '#BB3138',
              fontFamily: 'Public Sans',
              // fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 'normal',
              height: '53px',
              width: '100%',
              paddingInline: '15px',
            }}
          >
            Bulk Import
            <Box sx={{ ':hover': { cursor: 'pointer' } }}>
              <Iconify
                width="2rem"
                color="#fff"
                icon="mdi:close-box"
                onClick={() => {
                  setOpen(false);
                  reset();
                  // setIsEdit(false);
                }}
              />
            </Box>
          </DialogTitle>
          <MenuUploadSteppers storeId={storeId} setOpen={setOpen} />
        </Dialog>
        {!isLoadingMenuItems && menus?.results?.length === 0 && (
          <Grid container>
            <Grid item xs={12} md={12} lg={12}>
              <NoResultFound
                title="No Item Added"
                content="You haven't added any item to your account yet."
              />
            </Grid>
          </Grid>
        )}

        {menus?.results?.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'end', padding: '2rem' }}>
            <CardPagination
              count={menus.totalPages}
              page={page}
              fun={setPage}
              setLimit={setLimit}
              totalResults={menus.totalResults}
            />
          </Box>
        )}
      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(products, filters) {
  const { gender, category, colors, priceRange, rating, sortBy } = filters;

  const min = priceRange[0];

  const max = priceRange[1];

  // SORT BY
  if (sortBy === 'featured') {
    products = orderBy(products, ['sold'], ['desc']);
  }

  if (sortBy === 'newest') {
    products = orderBy(products, ['createdAt'], ['desc']);
  }

  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['price'], ['desc']);
  }

  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['price'], ['asc']);
  }

  // FILTER PRODUCTS
  if (gender.length) {
    products = products.filter((product) => gender.includes(product.gender));
  }

  if (category !== 'All') {
    products = products.filter((product) => product.category === category);
  }

  if (colors.length) {
    products = products.filter((product) => product.colors.some((color) => colors.includes(color)));
  }

  if (min !== 0 || max !== 200) {
    products = products.filter((product) => product.price >= min && product.price <= max);
  }

  if (rating) {
    products = products.filter((product) => {
      const convertRating = (value) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return product.totalRating > convertRating(rating);
    });
  }

  return products;
}
