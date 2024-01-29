import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Select, MenuItem } from '@mui/material';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { useAuthContext } from '../../auth/useAuthContext';
import { LiveOrders } from '../../sections/order/liveOrders';
import { getOrders } from '../../redux/slices/order';
import { getStore } from '../../redux/slices/branch';

export default function OrderList() {
  const { user } = useAuthContext();
  const { roles, storeId } = user;
  const role = roles[0]?.name;
  const dispatch = useDispatch();

  useEffect(() => {
    if (storeId) {
      dispatch(getOrders(storeId));
      dispatch(getStore(storeId))

    }
  }, [dispatch, storeId]);

  return (
    <>
      <CustomBreadcrumbs
        heading="Order List"
        iconName="/assets/icons/navbar/Order_Vector.svg"
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

      <LiveOrders />
    </>
  );
}
