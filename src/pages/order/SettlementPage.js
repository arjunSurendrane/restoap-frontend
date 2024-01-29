/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import TableHeader from '../../sections/order/settlement/TableHeader';
import OrderTable from '../../sections/order/settlement/OrderTable';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import CashierLiveOrders from '../../sections/order/liveOrders/CashierLiveOrders';
import { useAuthContext } from '../../auth/useAuthContext';
import { getMainOrder, getOrders } from '../../redux/slices/order';
import { PATH_DASHBOARD } from '../../routes/paths';

const TableContainer = styled(Box)({
  width: '100%',
  minHeight: '552px',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '8px',
});

function SettlementPage() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [searchParams] = useSearchParams();
  const { storeId } = user;
  const [filterContent, setFilterContent] = useState('allOrders');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [hasMounted, setHasMounted] = useState(false);
  const value = searchParams.get('rowsPerPage');
  console.log({ value });

  useEffect(() => {
    if (storeId && hasMounted) {
      navigate('/dashboard/order/settlement', { state: { rowsPerPage, currentPage } });
      dispatch(getMainOrder({ storeId, status: 'open', limit: rowsPerPage, page: currentPage }));
      setFilterContent('allOrders');
    } else {
      setHasMounted(true);
    }
  }, [dispatch, storeId, rowsPerPage, currentPage, searchParams, hasMounted]);

  useEffect(() => {
    if (state?.rowsPerPage && state?.currentPage) {
      const { currentPage: page, rowsPerPage: limit } = state;
      setCurrentPage(page);
      setRowsPerPage(limit);
    }
  }, []);

  const handleFilterContent = (filter) => {
    setFilterContent(filter);
    setCurrentPage(1);
    dispatch(getMainOrder({ storeId, orderType: filter }));
  };

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
            name: 'Settlement',
          },
        ]}
      />
      <TableContainer>
        <TableHeader setFilterContent={handleFilterContent} filterContent={filterContent} />
        <OrderTable
          filterContent={filterContent}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </TableContainer>
    </>
  );
}

export default SettlementPage;
