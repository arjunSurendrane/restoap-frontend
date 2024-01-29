import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
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
import SearchIcon from '@mui/icons-material/Search';
import VegNonVeg from '../../../components/switch/VegNonVeg';
import menu, { getMenu } from '../../../redux/slices/menu';
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
import MenuItemCardMobile from './mobileComponents/MenuItemCardMobile';
import { MenuSearch } from '../../menu';

MenuListMobile.propTypes = {
  loading: PropTypes.bool,
  menus: PropTypes.array,
  tableDetail: PropTypes.object,
  categories: PropTypes.array,
  setSearch: PropTypes.array,
};

const MainContainer = styled(Box)({
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  backgroundColor: '#fff',
  borderRadius: '8px',
  height: '100%',
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,

  margin: '15px 0px 15px 15px',
  border: '1px solid #212B36',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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

function MenuListMobile({ loading, menus, tableDetail, categories, setSearch }) {
  const isDesktop = useMediaQuery('(min-width:900px)');
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  // Set single menu item for detail page
  const [age, setAge] = useState('');
  const [category, setCategory] = useState('');
  const [openAddOns, setOpenAddOns] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  const [currentAddedItem, setCurrentAddedItem] = useState({});
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [openCustomizeModal, setOpenCustomizeModal] = useState(false);
  const [openItemDetailDrawer, setOpenItemDetailDrawer] = useState(false);
  const [filteredItems, setFilteredItems] = useState();

  const { cartItems } = useSelector((state) => state.cart);
  const onlyActiveItems = menus?.results?.filter((item) => item.Active);

  const defaultStore = user.storeId;
  const { addOns } = useSelector((state) => state.addOn);

  const handleChange = (e) => setCategory(e.target.value);

  // Function which handle filter items
  // eslint-disable-next-line consistent-return
  const handleFilter = () => {
    if (!category) return setFilteredItems(onlyActiveItems);
    const updatedItems = onlyActiveItems?.filter((item) => item.category === category);
    setFilteredItems(updatedItems);
  };

  // useEffect for filter
  useEffect(() => {
    handleFilter(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    setFilteredItems(onlyActiveItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menus]);

  // Function to calculate cart total quantity
  const totalQty = (items) => {
    let total;
    const result = items.reduce((acc, cartItem) => {
      total = acc + cartItem.qty;
      return total;
    }, 0);
    return result;
  };

  const handleCloseDrawer = () => {
    setOpenViewDrawer(false);
  };
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

  // Function to handle open addons modal
  const handleOpenAddOns = () => setOpenAddOns(true);

  // Function to handle open addons modal
  const hanldeCloseAddOns = () => setOpenAddOns(false);

  useEffect(() => {
    dispatch(getAddOns(defaultStore, user.storeId));
  }, [dispatch, defaultStore, user]);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          height: '180px',
          backgroundColor: '#fff',
          zIndex: 1,
          left: 0,
          width: '100%',
        }}
      >
        <Grid container p="15px 15px">
          <Grid item xs={9} display="flex" justifyContent="start" alignItems="center">
            <MenuSearch search={setSearch} />
          </Grid>
          <Grid item xs={3} display="flex" alignItems="center" justifyContent="end">
            <Badge badgeContent={totalQty(cartItems)} color="primary">
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
        <Grid container>
          <Grid item xs={7} display="flex" justifyContent="start" pl="15px" alignItems="center">
            <Typography fontSize="18px" fontWeight="600">
              Table : {tableDetail?.name}
            </Typography>
          </Grid>
          <Grid item xs={5} pr="15px" display="flex" alignItems="center" justifyContent="end">
            {/* <CustomButton value="Add Ons" sx={{ mr: '50px' }} fun={handleOpenAddOns} /> */}
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sm={6}
          display="flex"
          alignItems="center"
          p="15px"
          justifyContent={isDesktop ? 'start' : 'center'}
        >
          <FormControl sx={{ minWidth: '100%' }} size="small">
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
          </FormControl>
        </Grid>
      </Box>

      <Grid container spacing={1} p="15px" display="flex" justifyContent="space-between" mt={20}>
        {filteredItems?.map((data, index) => (
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
            <MenuItemCardMobile
              menus={data}
              handleOpenDetalpage={handleOpenDetalpage}
              handleVariant={handleVariant}
              handleOpenCartDrawer={handleOpenCartDrawer}
            />
          </Grid>
        ))}
      </Grid>

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

export default MenuListMobile;
