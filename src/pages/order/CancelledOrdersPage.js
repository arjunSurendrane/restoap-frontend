import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import CancelledOrderTable from '../../sections/order/cancelledOrder/CancelledOrderTable';
import { useAuthContext } from '../../auth/useAuthContext';
import { getCompletedOrder } from '../../redux/slices/order';
import { PATH_DASHBOARD } from '../../routes/paths';

function CancelledOrdersPage() {
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
            name: 'Cancelled Orders',
          },
        ]}
      />
      <CancelledOrderTable data={orders} handleData={(data) => handleData(data)} />
    </>
  );
}

export default CancelledOrdersPage;
