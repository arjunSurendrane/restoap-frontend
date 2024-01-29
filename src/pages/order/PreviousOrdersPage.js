import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
// import PreviousOrderTable from '../../../..//sections/order/previousOrder/previousOrderTable';
import PreviousOrderTable from '../../sections/order/previousOrder/previousOrderTable';
import { useAuthContext } from '../../auth/useAuthContext';
import { getCompletedOrder, getMainOrder, lastThreeDaysOrder } from '../../redux/slices/order';
import { getStore } from '../../redux/slices/branch';
import SkeltonForInvoiceTable from '../../components/skeleton/SkeltonForInvoiceTable';
import { PATH_DASHBOARD } from '../../routes/paths';

function PreviousOrdersPage() {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { storeId } = user;
  const [calendarData, setCalendarData] = useState([]);
  const handleData = (data) => setCalendarData(data);
  const { previousOrders, isLoading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getStore(storeId));
    dispatch(lastThreeDaysOrder({ storeId }));
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
            //   href: PATH_DASHBOARD.invoice.root,
          },
          {
            name: 'Previous Orders',
          },
        ]}
      />
      <Box
        sx={{
          width: '100%',
          p: '15px',
          borderRadius: '8px',
          boxShadow: ' 0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
          backgroundColor: '#fff',
        }}
      >
        {isLoading && <SkeltonForInvoiceTable />}
        {!isLoading && previousOrders?.length > 0 && (
          <PreviousOrderTable orderData={previousOrders} handleData={(data) => handleData(data)} />
        )}

        {!isLoading && !error && !previousOrders?.length && (
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <img src="../../assets/illustrations/No result.svg" alt="chefimg" height="400px" />
            <Typography fontWeight="700" fontSize="20px">
              No Orders
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}

export default PreviousOrdersPage;
