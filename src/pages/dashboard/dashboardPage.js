/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

// @mui
import { useTheme } from '@mui/material/styles';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
// eslint-disable-next-line import/no-unresolved
import 'react-date-range/dist/theme/default.css';
// mui components
import {
  Container,
  Grid,
  Stack,
  Button,
  Typography,
  Box,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Popover,
} from '@mui/material';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getCompletedOrder } from '../../redux/slices/order';
import {
  getBranches,
  getStoresRevenueUnderAdmin,
  getMyStoresRevenue,
  resetRevenue,
} from '../../redux/slices/branch';

import { useAuthContext } from '../../auth/useAuthContext';
import OrderStatistics from '../../sections/@dashboard/general/app/OrderStatistics';
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import HasPermission from '../../auth/RightGuard';

import AppWidgetSummary from '../../sections/@dashboard/general/app/AppWidgetSummerry';
import { PATH_DASHBOARD } from '../../routes/paths';
import { getAllUsersUnderStore } from '../../redux/slices/user';
import RevenueAnalytics from '../../sections/@dashboard/general/app/RevenueAnalytics';
import Iconify from '../../components/iconify/Iconify';

import SvgColor from '../../components/svg-color';

const DashboardPage = () => {
  const { themeStretch } = useSettingsContext();
  const theme = useTheme();
  const { themeStrech } = useSettingsContext();
  const isMobileScreen = useMediaQuery('(max-width:1024px)');
  const iconName = '../../../public/assets/icons/navbar/Dash_Vec.svg';
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const { branches, isLoading, revenue } = useSelector((state) => state.branch);
  const { allUsers } = useSelector((state) => state.user);
  const [stores, setStores] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [store, setStore] = useState(user.storeId ? user.storeId : 'all');
  const [storeIds, setStoreIds] = useState([]);
  const [diningOrder, setDiningOrder] = useState({ count: 0, amount: 0 });
  const [qrOrder, setQrOrder] = useState({ count: 0, amount: 0 });
  const [takeAway, setTakeAway] = useState({ count: 0, amount: 0 });
  const [preorder, setPreorder] = useState({ count: 0, amount: 0 });
  const [totalStaff, setTotalStaff] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [displayDate, setDisplayDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  console.log('Order revenue date', revenue);
  console.log('totalStaff', totalStaff);
  useEffect(() => {
    resetRevenue(dispatch);
  }, [dispatch]);

  useEffect(() => {
    // eslint-disable-next-line no-plusplus
    setTotalCount(0);
    setTotalAmount(0);
    setTotalStaff(0);
    setDiningOrder({ count: 0, amount: 0 });
    setQrOrder({ count: 0, amount: 0 });
    setTakeAway({ count: 0, amount: 0 });
    setPreorder({ count: 0, amount: 0 });
    // eslint-disable-next-line no-plusplus
    if (revenue[0]?.unwindAndCount?.length) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < revenue[0]?.unwindAndCount.length; i++) {
        if (revenue[0]?.unwindAndCount[i]?._id === 'dining') {
          setDiningOrder({
            count: revenue[0]?.unwindAndCount[i]?.totalCount,
            amount: revenue[0]?.unwindAndCount[i]?.totalAmount,
          });
        } else if (revenue[0]?.unwindAndCount[i]?._id === 'take_away') {
          setTakeAway({
            count: revenue[0]?.unwindAndCount[i]?.totalCount,
            amount: revenue[0]?.unwindAndCount[i]?.totalAmount,
          });
        } else if (revenue[0]?.unwindAndCount[i]?._id === 'preorder') {
          setPreorder({
            count: revenue[0]?.unwindAndCount[i]?.totalCount,
            amount: revenue[0]?.unwindAndCount[i]?.totalAmount,
          });
        }
      }
    }

    if (revenue[0]?.Employees || revenue[1]?.Employees) {
      setTotalStaff(revenue[0]?.Employees || revenue[1]?.Employees);
    }

    if (revenue[0]?.totalOrderAmount) {
      setTotalAmount(revenue[0]?.totalOrderAmount[0]?.totalAmount);
    }
    if (revenue[0]?.totalMainOrder) {
      setTotalCount(revenue[0]?.totalMainOrder?.count);
    }
  }, [
    totalStaff,
    branches.results,
    diningOrder.amount,
    diningOrder.count,
    preorder.amount,
    preorder.count,
    qrOrder.amount,
    qrOrder.count,
    revenue,
    takeAway.amount,
    takeAway.count,
    user.storeId,
  ]);

  useEffect(() => {
    const limit = 1000;
    dispatch(getBranches(limit));
  }, [dispatch]);

  useEffect(() => {
    setStore(user.storeId ? user.storeId : 'all');
  }, [branches.results, user.storeId]);

  useEffect(() => {
    // Update storeIds when branches change
    const newStoreIds = branches?.results?.map((data) => data.id);
    setStores(newStoreIds);
  }, [branches?.results]);

  useEffect(() => {
    if (store === 'all') {
      getStoresRevenueUnderAdmin(user.id, user.storeId, dispatch);
    } else {
      dispatch(getAllUsersUnderStore(store));
      getMyStoresRevenue(store, dispatch, date[0].startDate, date[0].endDate);
    }
  }, [dispatch, store, date, user.id, user.storeId]);

  const totalTurnOver = revenue?.reduce(
    // eslint-disable-next-line no-shadow
    (accumulator, store) => accumulator + store.totalRevenue,
    0
  );
  const revenueMap = new Map(revenue?.map(({ storeId, totalRevenue }) => [storeId, totalRevenue]));

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangeStore = (e) => {
    setStore(e.target.value);
  };

  const handleChangeDate = (item) => {
    setDisplayDate([item.selection]);
    // setState([item.selection]);
    const getEndInTime = item.selection.endDate.getTime() + 24 * 60 * 60 * 1000 - 1000;
    const endNew = new Date(getEndInTime);
    const finalDate = {
      startDate: item.selection.startDate,
      endDate: endNew,
      key: 'selection',
    };
    setDate([finalDate]);
  };
  return (
    <>
      <Helmet>
        <title>RestoAp | Dashboard</title>
      </Helmet>

      <>
        <CustomBreadcrumbs
          iconName="/assets/icons/navbar/Dash_Vec.svg"
          heading="Dashboard"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.dashboard,
            },
          ]}
        />

        <Grid container spacing={2} marginTop="15px">
          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5">Hi, Welcome Back</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                gap: 2,

                alignItems: 'center',
              }}
            >
              {/* <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#BB3138',
                  borderRadius: '5px',
                  color: 'White',
                  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
                  border: '#fff 2px solid',
                  '&:hover': {
                    backgroundColor: '#212b36',
                    color: 'white',
                  },
                }}
                onClick={handleClick}
              >
                <SvgColor
                  sx={{ color: 'white', width: '25px', height: '25px' }}
                  src="/assets/icons/home/calander.svg"
                  alt=""
                />
              </Box>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <DateRangePicker
                  // color="green"
                  // preview={{ color: 'green' }}
                  rangeColors={['#bb3138']}
                  onChange={(item) => handleChangeDate(item)}
                  showSelectionPreview
                  moveRangeOnFirstSelection={false}
                  months={1}
                  ranges={displayDate}
                  direction="vertical"
                />
              </Popover> */}
              <HasPermission permissionKey="GRANT_PERMISSION">
                {branches?.results?.length > 0 && (
                  <FormControl size="small">
                    <InputLabel sx={{ color: 'black' }} id="demo-select-small-label">
                      Switch Store
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={store}
                      minWidth="40px"
                      label="Switch Branch"
                      onChange={handleChangeStore}
                      sx={{ minWidth: '200px', backgroundColor: 'white' }}
                    >
                      <MenuItem value="all">All</MenuItem>
                      {branches?.results?.map((storeDetails) => (
                        <MenuItem value={storeDetails.id}>{storeDetails.location}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </HasPermission>
            </Box>
          </Grid>
          {/* </Box> */}

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Staffs"
              percent={2.6}
              total={totalStaff}
              name="totalstaff.svg"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Orders"
              percent={0.2}
              total={totalCount}
              name="totalorders.svg"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Revenue"
              percent={5}
              total={totalAmount}
              name="totalrevenue.svg"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={0.5}>
          {/* <HasPermission permissionKey="GRANT_PERMISSION"> */}
          <Grid item xs={12} md={6} lg={8}>
            <OrderStatistics
              title="KOT Orders"
              // subheader="(+43%) than last year"
              chart={{
                series: [
                  { label: 'Take Away', value: takeAway?.count || 0 },
                  { label: 'Dining', value: diningOrder?.count || 0 },
                  { label: 'Pre Order', value: preorder?.count || 0 },
                ],
                colors: ['#ED5565', '#F8AC59', '#23C6C8'],
              }}
            />
          </Grid>
          {/* </HasPermission> */}
          <Grid item xs={12} md={6} lg={4}>
            <RevenueAnalytics
              title="Revenue"
              chart={{
                series: [
                  {
                    label: 'Dining',
                    value: diningOrder?.amount || 0,
                  },
                  {
                    label: 'Pre Order',
                    value: preorder?.amount || 0,
                  },
                  {
                    label: 'Take Away',
                    value: takeAway?.amount || 0,
                  },
                ],
                colors: ['#23C6C8', '#F8AC59', '#ED5565'],
              }}
            />
          </Grid>
        </Grid>
      </>
    </>
  );
};
export default DashboardPage;
