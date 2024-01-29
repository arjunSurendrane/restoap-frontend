import React, { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '../../../auth/useAuthContext';
import TableListComponent from '../../../sections/order/takeOrders/TableListComponent';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { getDiningCategories } from '../../../redux/slices/diningCategory';
import { getTables } from '../../../redux/slices/table';
import { getMainOrder, getOrders } from '../../../redux/slices/order';
import { PATH_DASHBOARD } from '../../../routes/paths';
import TableListMobile from '../../../sections/order/takeOrders/TableListMobile';

function TablesList() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { storeId } = user;

  useEffect(() => {
    dispatch(getDiningCategories(storeId));
  }, [dispatch, storeId]);

  useEffect(() => {
    dispatch(getTables(storeId));
    dispatch(getMainOrder({ storeId, status: 'open', limit: 100 }));
  }, [dispatch, storeId]);
  return (
    <>
      {!isMobile && (
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
              name: 'Take Order',
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
      )}
      {isMobile ? <TableListMobile /> : <TableListComponent />}
    </>
  );
}

export default TablesList;
