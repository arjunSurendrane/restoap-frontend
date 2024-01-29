import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, useMediaQuery, Stack, Badge } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import OrderCard from './OrderCard';
import OrderAdminDrawer from './OrderAdminDrawer';
import { SkeltonForLiveOrderList } from '../../../components/skeleton';
import { useAuthContext } from '../../../auth/useAuthContext';
import OrderDrawer from './OrderDrawer';
import { orderFilter } from './constant';
import OrderListFiltersAndLegends from './OrderListFiltersAndLegends';
import { getOrders, filteredOrders } from '../../../redux/slices/order';

export default function LiveOrders() {
  // Check if the screen size is desktop or not
  const isDesktop = useMediaQuery('(min-width:768px)');

  const location = useLocation();
  const navigate = useNavigate();

  // State for the drawer order data and its visibility
  const [drawerOrderData, setDrawerOrderData] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [filteredOrder, setFilteredOrder] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const dispatch = useDispatch();

  // State to control the display of empty order message
  const [emptyOrder, setEmptyOrder] = useState(false);

  // Get user information from the authentication context
  const { user } = useAuthContext();
  const { roles, storeId } = user;
  const role = roles[0]?.name;

  // Redux state for error and loading indicators
  const { error, isLoading } = useSelector((state) => state.order);
  let { orders } = useSelector((state) => state.order);

  const navOrderId = location?.state?.orderId;

  useEffect(() => {
    if (navOrderId) {
      const order = orders.findIndex((data) => data._id === navOrderId);
      if (order >= 0) {
        setDrawerOrderData(order);
        setOpenDrawer(true);
      }
    }
  }, [navOrderId, orders]);

  // Set a timeout to display empty order message after a delay
  useEffect(() => {
    setTimeout(() => {
      setEmptyOrder(true);
    }, 2000);
  }, []);

  // Filter orders based on user role (for kitchen)
  if (role === 'kitchen') {
    orders = orders.map((data) =>
      data.orderStatus !== 'open' && data.items.length !== data.deliveredOrders ? data : false
    );
  }

  // Render if there are no orders and empty order message is shown
  if (!orders.length && emptyOrder) {
    return <div>Empty order</div>;
  }

  // Render skeleton loader if there are no orders
  if (!orders.length) {
    return <SkeltonForLiveOrderList />;
  }

  // Render error message if there's an error with fetching orders
  if (error) {
    return <div>Error...</div>;
  }

  const handleFilterdOrders = (status) => {
    // eslint-disable-next-line no-unused-expressions
    status.length ? setFiltering(true) : setFiltering(false);
    orders = orders.filter((data) => status.includes(data.orderStatus));
    setFilteredOrder(orders);
  };

  const handleSearchOrder = (value) => {
    // eslint-disable-next-line no-unused-expressions
    value ? setFiltering(true) : setFiltering(false);
    orders = orders.filter(
      (data) => data.OrderId && data.OrderId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOrder(orders);
  };

  // Handle opening the drawer with order data
  const handleOpenDrawer = (data) => {
    setDrawerOrderData(data);
    setOpenDrawer(true);
  };

  // Handle closing the drawer
  const handleCloseDrawer = () => {
    navigate('/dashboard/order/order-list');
    setOpenDrawer(false);
  };

  return (
    <>
      {/* Render OrderAdminDrawer if drawerOrderData is not null */}
      <Stack direction="row" spacing={1} flexShrink={0}>
        {openDrawer && (
          <OrderDrawer
            dataIndex={drawerOrderData}
            open={openDrawer}
            onOpen={handleOpenDrawer}
            onClose={handleCloseDrawer}
          />
        )}
      </Stack>

      <OrderListFiltersAndLegends
        handleFilterdOrders={(data) => handleFilterdOrders(data)}
        handleSearchOrder={(data) => handleSearchOrder(data)}
      />

      {/* Render orders grid or list based on screen size */}
      {isDesktop ? (
        // <Paper sx={{ minHeight: '657px', padding: '20px' }}>
        <Box
          gap={2}
          alignItems="center"
          display="flex"
          mx="auto"
          flexWrap="wrap"
          textAlign="center"
        >
          {filtering
            ? filteredOrder.map((data, index) => {
                if (data) {
                  return (
                    <OrderCard
                      handleOpen={handleOpenDrawer}
                      data={data}
                      index={index}
                      key={data._id}
                    />
                  );
                }
                // eslint-disable-next-line react/jsx-no-useless-fragment
                return <></>;
              })
            : orders.map((data, index) => {
                if (data) {
                  return (
                    <OrderCard
                      handleOpen={handleOpenDrawer}
                      data={data}
                      index={index}
                      key={data._id}
                    />
                  );
                }
                // eslint-disable-next-line react/jsx-no-useless-fragment
                return <></>;
              })}
        </Box>
      ) : (
        // </Paper>
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: isDesktop ? 'center' : 'center',
            alignItems: 'center',
          }}
        >
          {filtering
            ? filteredOrder.map((data, index) => {
                if (data) {
                  return (
                    <OrderCard
                      handleOpen={handleOpenDrawer}
                      data={data}
                      index={index}
                      key={data._id}
                    />
                  );
                }
                // eslint-disable-next-line react/jsx-no-useless-fragment
                return <></>;
              })
            : orders.map((data, index) => {
                if (data) {
                  return (
                    <OrderCard
                      handleOpen={handleOpenDrawer}
                      data={data}
                      index={index}
                      key={data._id}
                    />
                  );
                }
                // eslint-disable-next-line react/jsx-no-useless-fragment
                return <></>;
              })}
        </Grid>
      )}
    </>
  );
}
