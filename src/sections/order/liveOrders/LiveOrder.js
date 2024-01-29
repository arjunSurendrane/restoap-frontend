import {
  Box,
  Button,
  Card,
  Grid,
  InputBase,
  Typography,
  alpha,
  styled,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import SquareIcon from '@mui/icons-material/Square';
import { MenuSearch } from '../../menu';
import DineInIcon from '../../../assets/icons/DineInIcon';
import TakeAwayIcon from '../../../assets/icons/TakeAwayIcon';
import OrderCard from './OrderCard';
import CommonDrawer from './liveOrderComponent/CommonDrawer';
import OrderDetailDrawer from './liveOrderComponent/OrderDetailDrawer';
import OrderSearch from './liveOrderComponent/OrderSearch';
import { SkeltonForLiveOrderList } from '../../../components/skeleton';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: 280,
  minWidth: 280,
  marginTop: 0,
  border: '1px solid #212B36',
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(1),
    border: '1px solid #212B36',
    width: '280px',
    minWidth: 280,
    marginTop: '15px',
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

const MainCardContainer = styled(Box)({
  width: '100%',
  minHeight: '300px',
  marginTop: '25px',
  display: 'flex',
  gap: 2,
  flexWrap: 'wrap',
});

const CommonButton = styled(Button)(({ isSelected, col, border }) => ({
  height: '40px',
  minWidth: '165px',
  fontSize: '14px !important',
  fontWeight:'500 !Important',
  padding:'5px',
  border: isSelected ? `1px solid ${border}` : '1px solid black',
  color: 'black',
  boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
  backgroundColor: isSelected ? col : '#fff',
}));

const OrderTypeButton = ({ isSelected, col, label, onClick, border }) => (
  <CommonButton
    isSelected={isSelected}
    col={col}
    border={border}
    onClick={onClick}
    variant="outlined"
    startIcon={
      <SquareIcon
        sx={{
          borderRadius: '2px',
          border: '2px solid #fff',
          boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.25)',
          color: col,
        }}
      />
    }
  >
    {label}
  </CommonButton>
);

function LiveOrder() {
  const isMobile = useMediaQuery('(max-width:600px)');

  // eslint-disable-next-line prefer-const
  let { orders, error, isLoading } = useSelector((state) => state.order);
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const [selectedFilter, setselectedFilter] = useState('All Orders');
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState([]);
  // const [orderType, setSelectOrderData] = useState('All Orders');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openOpenOrderDrawer, setOpenOrderDrawer] = useState(false);
  const [openVerifiedOrderDrawer, setVerifiedOrderDrawer] = useState(false);
  const [openAcceptedOrderDrawer, setAcceptedOrderDrawer] = useState(false);
  const [openCompletedOrderDrawer, setCompletedOrderDrawer] = useState(false);
  const [selectedOrderData, setSelectOrderData] = useState('');
  const location = useLocation();

  // Use useEffect to update filteredOrders when orders change
  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]); // Watch for changes in orders

  // Use useEffect to updated if the orderStatus filter is changed
  useEffect(() => {
    filterItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderStatus]);

  useEffect(() => {
    if (location?.state?.orderId) {
      const orderId = location?.state?.orderId;
      setOpenDrawer(true);
      setSelectOrderData(orderId);
      navigate('/dashboard/order/order-list/cashier');
    }
  }, [navigate, location?.state?.orderId]);
  const handleCloseDrawer = () => setOpenDrawer(false);

  const handleSelectedOrder = (order) => {
    setOpenDrawer(true);
    setSelectOrderData(order?.subOrders?._id);
  };

  const handleSelectFilter = (filter) => {
    if (filter === 'All Orders') {
      setFilteredOrders(orders);
      setselectedFilter('All Orders');
    } else {
      setselectedFilter(filter);
      const afterFilter = orders.filter((item) => item.subOrders.orderType === filter);
      setFilteredOrders(afterFilter);
    }
  };

  const handleSelectStatusFilter = (filter) => {
    if (orderStatus.includes(filter)) {
      setOrderStatus(orderStatus.filter((item) => item !== filter));
      filterItems();
    } else {
      setOrderStatus((prev) => [...prev, filter]);
    }
  };
  const filterItems = () => {
    if (orderStatus.length > 0) {
      // eslint-disable-next-line prefer-const
      let tempOrders = orderStatus.map((status) => {
        if (selectedFilter !== 'All Orders') {
          orders = filteredOrders;
        }

        // eslint-disable-next-line prefer-const, array-callback-return
        let order = orders.filter((item) => item.subOrders.orderStatus === status);

        return order;
      });
      setFilteredOrders(tempOrders.flat());
    } else {
      setFilteredOrders(orders);
    }
  };

  return (
    <>
      <Card sx={{ height: '100%', width: '100%', p: '15px' }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <OrderSearch
              setFilteredOrders={setFilteredOrders}
              orders={orders}
              setselectedFilter={setselectedFilter}
              setOrderStatus={setOrderStatus}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Box
              sx={{
                overflowX: isMobile ? 'scroll' : 'none',
                maxWidth: '500px',
                marginTop: isMobile ? '5px' : '0px',
              }}
            >
              <Box height="40px" gap={2} display="flex" justifyContent="end" width="500px">
                <Button
                  sx={{
                    minWidth: '150px',
                    fontSize: '16px !important',
                    fontWeight:'600 !important',
                    color: selectedFilter.includes('All Orders') ? '#fff' : '#BB3138',
                    border: selectedFilter.includes('All Orders')
                      ? '1px solid #fff'
                      : '1px solid #BB3138',
                    backgroundColor: selectedFilter.includes('All Orders') ? '#BB3138' : '#fff',
                  }}
                  variant="contained"
                  onClick={() => handleSelectFilter('All Orders')}
                >
                  All Orders
                </Button>
                <Button
                  startIcon={<DineInIcon sx={{ color: '#05C805' }} />}
                  sx={{
                    fontSize: '16px !important',
                    minWidth: '150px',
                    border: '2px solid #05C805',
                    color: selectedFilter.includes('dining') ? '#fff' : '#BB3138',
                    backgroundColor: selectedFilter.includes('dining') ? '#05C805' : '#fff',
                  }}
                  onClick={() => handleSelectFilter('dining')}
                  variant="outlined"
                >
                  Dine In
                </Button>
                <Button
                  startIcon={<TakeAwayIcon sx={{ color: '#F57C24' }} />}
                  sx={{
                    fontSize: '16px !important',
                    minWidth: '150px',
                    border: '2px solid #F57C24',
                    color: selectedFilter.includes('take_away') ? '#fff' : '#BB3138',
                    backgroundColor: selectedFilter.includes('take_away') ? '#F57C24' : '#fff',
                  }}
                  variant="outlined"
                  onClick={() => handleSelectFilter('take_away')}
                >
                  Take Away
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box mt="15px" display="flex" justifyContent="end"  width="100%">
          <Box
            sx={{
              display: 'flex',
              height: '40px',
              gap: 2,
              overflowX: isMobile ? 'scroll' : 'none',
              maxWidth: '600px',
            }}
          >
            <OrderTypeButton
              isSelected={orderStatus.includes('open')}
              col="#FFD578"
              border="#FFD578"
              label="Open Orders"
              onClick={() => handleSelectStatusFilter('open')}
            />
            <OrderTypeButton
              isSelected={orderStatus.includes('verified')}
              border="#FFC8AE"
              col="#FFD2BC"
              label="Verified Orders"
              onClick={() => handleSelectStatusFilter('verified')}
            />
            <OrderTypeButton
              border="#C2A661"
              isSelected={orderStatus.includes('accepted')}
              col="#C4AF7A"
              label="Accepted Orders"
              onClick={() => handleSelectStatusFilter('accepted')}
            />
          </Box>
        </Box>

        {!isLoading && !filteredOrders.length && (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <img src="../../../assets/illustrations/No result.svg" alt="chefimg" height="300px" />
            <Typography fontWeight="700" fontSize="20px">
              No Orders
            </Typography>
          </Box>
        )}
        {isLoading ? (
          <SkeltonForLiveOrderList />
        ) : (
          <MainCardContainer>
            {filteredOrders?.map((item) => (
              <OrderCard
                key={item?.subOrders?._id}
                data={item}
                handleSelectedOrder={handleSelectedOrder}
              />
            ))}
          </MainCardContainer>
        )}
      </Card>
      <CommonDrawer openDrawer={openDrawer} closeDrawer={handleCloseDrawer}>
        <OrderDetailDrawer orderId={selectedOrderData} setOpenDrawer={setOpenDrawer} />
      </CommonDrawer>
    </>
  );
}

OrderTypeButton.propTypes = {
  isSelected: PropTypes.bool,
  col: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  border: PropTypes.string,
};

export default LiveOrder;
