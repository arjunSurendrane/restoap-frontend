/* eslint-disable react/jsx-boolean-value */
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import orderBy from 'lodash/orderBy';

import {
  Typography,
  Box,
  IconButton,
  Button,
  Grid,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  alpha,
  InputBase,
  Pagination,
  Drawer,
  useMediaQuery,
  Badge,
} from '@mui/material';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import FormProvider from '../../../components/hook-form/FormProvider';
import VegNonVeg from '../../../components/switch/VegNonVeg';
import menu, { getMenu, getMenus } from '../../../redux/slices/menu';
import SvgColor from '../../../components/svg-color/SvgColor';
import CustomButton from '../../../components/button/CustomButton';
import Iconify from '../../../components/iconify/Iconify';
import MenuItemCard from './components/MenuItemCard';
import { useAuthContext } from '../../../auth/useAuthContext';
import { TableToolbar } from '../../list';
import MenuDetailPage from './components/MenuDetailPage';
import AddOnsModal from './components/AddOnsModal';
import OrderDetails from './components/OrderDetails';
import VariantsModal from './components/VariantsModal';
import { getAddOns } from '../../../redux/slices/addOns';
import CardPagination from '../../../components/pagination/cardPagination';
import { MenuFilterDrawer, MenuSearch } from '../../menu';
import SkeletonTakeOrderMenuItem from '../../../components/skeleton/SkeletonTakeOrderMenuItem';

MenuList.propTypes = {
  loading: PropTypes.bool,
  menus: PropTypes.array,
  tableDetail: PropTypes.object,
  categories: PropTypes.array,
  setSearch: PropTypes.func,
  setCategory: PropTypes.func,
};

const MainContainer = styled(Box)({
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  backgroundColor: '#fff',
  borderRadius: '8px',
  minHeight: '600px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const VegNonVegBox = styled('Box')({
  boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.10)',
  height: '38px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mr: '10px',
  ml: '10px',
});

function MenuList({ loading, menus, tableDetail, categories, setSearch, setCategory }) {
  const isDesktop = useMediaQuery('(min-width:900px)');
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const defaultStore = user.storeId;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState('');
  const [veg, setVeg] = useState(false);
  const [nonVeg, setNonVeg] = useState(false);
  // const [category, setCategory] = useState('');
  const [filteredItems, setFilteredItems] = useState();
  const [openAddOns, setOpenAddOns] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [currentAddedItem, setCurrentAddedItem] = useState({});
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [openCustomizeModal, setOpenCustomizeModal] = useState(false);
  const [openItemDetailDrawer, setOpenItemDetailDrawer] = useState(false);

  const [openFilter, setOpenFilter] = useState(false);
  const [branch, setBranch] = useState('');
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

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleResetFilter = () => {
    reset();
  };

  const { addOns } = useSelector((state) => state.addOn);
  const { cartItems } = useSelector((state) => state.cart);
  const addonsCart = useSelector((state) => state.cart.addOns);
  const onlyActiveItems = menus?.results?.filter((item) => item.Active);

  // Function to calculate cart total quantity
  const totalQty = (items) => {
    let total;
    const result = items.reduce((acc, cartItem) => {
      total = acc + cartItem.qty;
      return total;
    }, 0);
    return result;
  };

  // Function which ha
  // const handleFilter = () => {
  //   const updatedItems = onlyActiveItems?.filter((item) => {
  //     if (veg) {
  //       return category
  //         ? item.foodCategory === 'Veg' && item.category === category
  //         : item.foodCategory === 'Veg';
  //     }
  //     if (nonVeg) {
  //       return category
  //         ? item.foodCategory === 'Non-Veg' && item.category === category
  //         : item.foodCategory === 'Non-Veg';
  //     }
  //     return category ? item.category === category : item;
  //   });
  //   setFilteredItems(updatedItems);
  // };

  // useEffect for filter
  // useEffect(() => {
  //   handleFilter(category);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [veg, nonVeg, category]);

  useEffect(() => {
    setFilteredItems(onlyActiveItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menus]);

  // // Fuction to set catogory
  // const handleChange = (e) => setCategory(e.target.value);

  // Fuction to close drawer
  const handleCloseDrawer = () => setOpenViewDrawer(false);

  // Function to handle open addons modal
  const handleOpenAddOns = () => setOpenAddOns(true);

  // Function to handle close addons modal
  const hanldeCloseAddOns = () => setOpenAddOns(false);

  // Function to handle choose variant
  const handleVariant = (current) => {
    setCurrentAddedItem(current);
    setVariantModalOpen(true);
  };

  // Function to set selected item to show detal page
  const handleOpenDetalpage = (item) => {
    setSelectedItem(item);
    setOpenItemDetailDrawer(true);
    setOpenViewDrawer(true);
  };
  const handleOpenCartDrawer = () => {
    setOpenItemDetailDrawer(false);
    setOpenViewDrawer(true);
  };

  // Function to handle non veg filter
  const handleNonVegFilter = (e) => {
    setNonVeg(e.target.checked);
    if (e.target.checked && veg) {
      setVeg(false);
    }
  };
  // Function to handle veg filter
  const handleVegFilter = (e) => {
    setVeg(e.target.checked);
    if (e.target.checked === true && nonVeg) {
      setNonVeg(false);
    }
  };

  return (
    <>
      <Box height="100%">
        <Grid container p="15px" border="1px solid white">
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            alignItems="center"
            justifyContent={isDesktop ? 'start' : 'center'}
          >
            <Typography fontSize="18px" fontWeight="600">
              Table : {tableDetail?.name}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent={isDesktop ? 'end' : 'center'}
            alignItems="center"
            gap={2}
          >
            {/* <CustomButton value="Add Ons" sx={{ mr: '50px' }} fun={handleOpenAddOns} /> */}
            {/* <VegNonVegBox onChange={handleVegFilter}>
              <VegNonVeg color="green" checked={veg} />
            </VegNonVegBox>
            <VegNonVegBox onChange={handleNonVegFilter}>
              <VegNonVeg color="red" checked={nonVeg} />
            </VegNonVegBox> */}
            <Badge badgeContent={totalQty([...cartItems, ...addonsCart])} color="primary">
              <IconButton
                color="primary"
                sx={{
                  width: '50px',
                  backgroundColor: '#BB3138',
                  borderRadius: '8px',
                  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
                  border: '#fff 2px solid',
                  '&:hover': {
                    backgroundColor: '#212b36',
                    color: 'white',
                  },
                }}
                aria-label="add to shopping cart"
                onClick={() => handleOpenCartDrawer(true)}
              >
                <ShoppingCartIcon sx={{ color: '#fff' }} />
              </IconButton>
            </Badge>
          </Grid>
        </Grid>
        <Grid container p="15px">
          <Grid
            item
            xs={12}
            md={6}
            sm={6}
            display="flex"
            alignItems="center"
            justifyContent={isDesktop ? 'start' : 'center'}
          >
            <MenuSearch search={setSearch} />

            {/* <FormControl sx={{ minWidth: 250 }} size="small">
              <InputLabel id="demo-select-small-label">Categories</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={category}
                label="Categories"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories?.map((item) => (
                  <MenuItem value={item?.id} key={item?.id} sx={{ textTransform: 'capitalize' }}>
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sm={6}
            display="flex"
            justifyContent={isDesktop ? 'end' : 'center'}
            alignItems="center"
          >
            <FormProvider methods={methods}>
              <MenuFilterDrawer
                open={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
                onResetFilter={handleResetFilter}
                setBranch={setBranch}
                setCategory={setCategory}
                setPage={setPage}
              />
            </FormProvider>
          </Grid>
        </Grid>
        {!loading && !filteredItems?.length && (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <img src="../../../assets/illustrations/No result.svg" alt="chefimg" height="300px" />
            <Typography fontWeight="700" fontSize="20px">
              No items found.
            </Typography>

            {/* <Typography fontWeight="400" fontSize="14px">
                No items found.
              </Typography> */}
          </Box>
        )}
        <Grid container spacing={1} p="15px" display="flex" justifyContent="start">
          {loading ? (
            <SkeletonTakeOrderMenuItem />
          ) : (
            filteredItems?.map((data, index) => (
              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                sm={6}
                xl={4}
                key={data.id}
                display="flex"
                justifyContent="center"
              >
                <MenuItemCard
                  menus={data}
                  handleOpenDetalpage={handleOpenDetalpage}
                  handleVariant={handleVariant}
                  handleOpenCartDrawer={handleOpenCartDrawer}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <AddOnsModal
        openModal={openAddOns}
        closeModal={hanldeCloseAddOns}
        setOpenViewDrawer={setOpenViewDrawer}
        addOns={addOns}
        title="Add Ons"
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
        {openItemDetailDrawer ? (
          <MenuDetailPage
            menu={selectedItem}
            handleCloseDrawer={handleCloseDrawer}
            handleVariant={handleVariant}
            handleOpenCartDrawer={handleOpenCartDrawer}
          />
        ) : (
          <OrderDetails
            menu={menus}
            handleCloseDrawer={handleCloseDrawer}
            tableDetail={tableDetail}
          />
        )}
      </Drawer>
      {Object.keys(currentAddedItem).length > 0 && (
        <VariantsModal
          variantModalOpen={variantModalOpen}
          setVariantModalOpen={setVariantModalOpen}
          currentAddedItem={currentAddedItem}
          setOpenItemDetailDrawer={setOpenItemDetailDrawer}
        />
      )}
    </>
  );
}

export default MenuList;

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
