import { Box, InputBase, Typography, alpha, styled } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import SearchIcon from '@mui/icons-material/Search';
import TableOrderDrawer from './mobileComponents/TableOrderDrawer';
import TableCardMobile from './mobileComponents/TableCardMobile';
import OrderDetailDrawerMobile from './mobileComponents/OrderDetailDrawerMobile';
import { clearCartItems, setTableAndOrderId } from '../../../redux/slices/takeOrderCart';

const Heading = styled(Typography)({
  fontSize: '18px',
  fontWeight: '600',
  color: '#BB3138',
  textTransform: 'capitalize',
});
const TableCard = styled(Box)({
  borderRadius: '8px',
  border: '2px solid #fff',
  backgroundColor: '#E6E6E6',
  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.25)',
  height: '40px',
  width: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const TabelListContainer = styled(Box)({
  width: '100%',
  padding: '5px',
  paddingTop: '100px',
  paddingBottom: '50px',
});
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid grey',
  marginTop: '10px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
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

function TableListMobile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItemTableId = useSelector((state) => state.cart.table);

  // Fetch dining categories from store
  const { diningCategories } = useSelector((state) => state.diningCategory);
  // Fetch mainOrders from redux store
  const { mainOrders } = useSelector((state) => state.order);

  // Fetch tables from redux
  const { isLoading, tables } = useSelector((state) => state.table);

  // State for handle open/close bottom table drawer
  const [openTableOrderDrawer, setOpenTableOrderDrawer] = useState(false);

  // State for handle open/close running order details drawer
  const [openOrderDetailDrawer, SetOpenOrderDetailDrawer] = useState(false);

  // State for storing selected table number
  const [tableNo, setTableNo] = useState({});

  // State to set selected table running orders
  const [selectedTableOrders, setSelectedTableOrders] = useState([]);

  // State to store selected running order
  const [selectedRunningOrder, setSelectedRunnigOrder] = useState({});

  // Function to close/open table order drawer
  const hanldeCloseTableOrderDrawer = () => setOpenTableOrderDrawer(false);
  const handleOpenTableOrderDrawer = () => setOpenTableOrderDrawer(true);

  // Function to close/open order detail drawer
  const handleCloseOrderDetail = () => SetOpenOrderDetailDrawer(false);
  const handleOpenOrderDetail = () => SetOpenOrderDetailDrawer(true);

  // Function which set the selected table to the state
  const handleSelectTableOrders = (orders, table) => {
    setSelectedTableOrders(orders);
    setTableNo(table);
  };

  // Function which set the selected running order to state
  const handleSelectedRunningOrder = (order) => {
    handleOpenOrderDetail();
    setSelectedRunnigOrder(order);
  };

  // Function to handle add new order for selected table
  const handleAddNewOrder = () => {
    // If params table id is not equel to the redux table id then clear the cart
    if (cartItemTableId && cartItemTableId !== tableNo?.id) dispatch(clearCartItems());
    dispatch(setTableAndOrderId({ table: tableNo?.id }));
    navigate(`/dashboard/order/take-order/menu?table=${tableNo?.id}`);
  };

   // Function to handle add additional order seleted table
   const handleAddAdditionalOrder = (orderId) => {
    // If params table id is not equel to the redux table id then clear the cart
    if (cartItemTableId && cartItemTableId !== tableNo?.id) dispatch(clearCartItems());
    dispatch(setTableAndOrderId({ table: tableNo?.id, orderId }));
    navigate(`/dashboard/order/take-order/menu?table=${tableNo?.id}`);
  };

  /**
const matchingOrders = mainOrders.filter((order) => order.tableNo === table.name);
 */
  return (
    <>
      <Box width="100%" bgcolor="#fff" mt="-8px">
        <Box
          height="100px"
          p="5px"
          sx={{ position: 'fixed' }}
          bgcolor="#fff"
          width="100%"
          pr="15px"
        >
          <Box display="flex" justifyContent="space-between">
            <Heading>Table Layout</Heading>
            <Box>
              <Box display="flex" alignItems="center" bgcolor="">
                <SquareRoundedIcon sx={{ fontSize: '14px', color: '#E6E6E6', mr: '5px' }} />
                <Typography fontSize="12px" fontWeight="500">
                  Blank Table
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" bgcolor="">
                <SquareRoundedIcon sx={{ fontSize: '14px', color: '#71C488', mr: '5px' }} />
                <Typography fontSize="12px" fontWeight="500">
                  Runnig Table
                </Typography>
              </Box>
            </Box>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Box>
        <TabelListContainer>
          {diningCategories?.map((category) => (
            <>
              <Heading>{category?.name}</Heading>
              <Box width="100%" display="flex" gap={2} flexWrap="wrap" mt={1} mb={1}>
                {tables?.results?.map((table) => {
                  const isRunnigTable = mainOrders.filter((order) => order.tableNo === table.name);

                  return (
                    table.dineCategory.name === category.name && (
                      <TableCardMobile
                        tableData={table}
                        openOrderDrawer={handleOpenTableOrderDrawer}
                        isRunnigTable={isRunnigTable}
                        handleSelectTableOrders={handleSelectTableOrders}
                      />
                    )
                  );
                })}
              </Box>
            </>
          ))}
        </TabelListContainer>
      </Box>
      <TableOrderDrawer
        open={openTableOrderDrawer}
        closeDrawer={hanldeCloseTableOrderDrawer}
        orderDetailDrawerOpen={handleSelectedRunningOrder}
        orders={selectedTableOrders}
        table={tableNo}
        addNewOrder={handleAddNewOrder}
      />
      <OrderDetailDrawerMobile
        open={openOrderDetailDrawer}
        closeDrawer={handleCloseOrderDetail}
        order={selectedRunningOrder}
        addAdditionalOrder={handleAddAdditionalOrder}
        addNewOrder={handleAddNewOrder}
      />
    </>
  );
}

export default TableListMobile;
