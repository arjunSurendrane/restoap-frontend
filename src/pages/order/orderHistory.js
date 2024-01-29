import { MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';

// eslint-disable-next-line import/no-unresolved
import { PATH_DASHBOARD } from 'src/routes/paths';
// eslint-disable-next-line import/no-unresolved
import Select from 'src/theme/overrides/Select';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { getCompletedOrder, getOrders } from 'src/redux/slices/order';
import PropTypes from 'prop-types';
import { useAuthContext } from '../../auth/useAuthContext';
import PreviousOrder from '../../sections/order/orderHistory/OderHistory';

OrderHistory.prototype = {
  handleData: PropTypes.func,
};

function OrderHistory() {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  console.log('historyuser', user);
  const { storeId } = user;
  console.log('storeId', storeId);
  const [calendarData, setCalendarData] = useState([]);
  const handleData = (data) => setCalendarData(data);
  console.log('calendarData', calendarData);
  const from = calendarData[0]?.startDate;
  const to = calendarData[0]?.endDate;
  console.log('fromto', from, to);
  useEffect(() => {
    dispatch(getCompletedOrder({ storeId, from, to }));
  }, [dispatch, storeId, from, to]);
  const { orders } = useSelector((state) => state.order);
  console.log('completeorder', orders);

  console.log('from', from);
  return (
    <>
      <CustomBreadcrumbs
        iconName="/assets/icons/navbar/Order_Vector.svg"
        heading="Order List"
        links={[
          {
            name: 'Dashboard',
            href: PATH_DASHBOARD.root,
          },
          {
            name: 'Orders',
            href: PATH_DASHBOARD.order.liveOrder,
          },
          {
            name: 'History',
          },
        ]}
        // action={
        //   <Select>
        //     <MenuItem value="" disabled>
        //       Select an option
        //     </MenuItem>
        //   </Select>
        // }
      />
      <PreviousOrder data={orders} handleData={(data) => handleData(data)} />
    </>
  );
}

export default OrderHistory;
