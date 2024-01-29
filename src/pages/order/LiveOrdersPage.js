import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Select, MenuItem } from '@mui/material';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { useAuthContext } from '../../auth/useAuthContext';
import LiveOrder from '../../sections/order/liveOrders/LiveOrder';
import { getOrders } from '../../redux/slices/order';
import { getStore } from '../../redux/slices/branch';
import { PATH_DASHBOARD } from '../../routes/paths';

function LiveOrdersPage() {
  const { user } = useAuthContext();
  const { roles, storeId } = user;
  console.log({ storeId });
  const role = roles[0]?.name;
  const dispatch = useDispatch();

  useEffect(() => {
    if (storeId) {
      dispatch(getOrders({ storeId }));
      dispatch(getStore(storeId));
    }
  }, [dispatch, storeId]);

  return (
    <>
      <CustomBreadcrumbs
        heading="Order List"
        iconName="/assets/icons/navbar/Order_Vector.svg"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.dashboard },
          {
            name: 'Orders',
          },
          {
            name: 'Live Orders',
          },
        ]}
      />

      <LiveOrder />
    </>
  );
}

export default LiveOrdersPage;
