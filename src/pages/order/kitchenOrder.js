import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Select, MenuItem } from '@mui/material';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { useAuthContext } from '../../auth/useAuthContext';
import { getOrders } from '../../redux/slices/order';
import KitchenLiveOrders from '../../sections/order/liveOrders/KitchenLiveOrders';

export default function OrderList() {
  const { user } = useAuthContext();
  const { roles, storeId } = user;
  const role = roles[0]?.name;
  const dispatch = useDispatch();

  useEffect(() => {
    if (storeId) {
      dispatch(getOrders(storeId));
    }
  }, [dispatch, storeId]);

  return (
    <>
      <CustomBreadcrumbs
        heading="Order List"
        links={[
          {
            name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,
          },
          {
            name: 'Invoices',
            //   href: PATH_DASHBOARD.invoice.root,
          },
          {
            name: 'List',
          },
        ]}
        action={
          <Select>
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
          </Select>
        }
      />

      <KitchenLiveOrders />
    </>
  );
}
