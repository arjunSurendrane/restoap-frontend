import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, styled } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { getsubsInvoices } from '../../redux/slices/invoices';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import InvoicesSection from '../../sections/invoices/invoices';
import { useAuthContext } from '../../auth/useAuthContext';

const TableContainer = styled(Box)({
  width: '100%',
  minHeight: '552px',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '8px',
});

function Invoices() {
  const { user } = useAuthContext();
  console.log('user inside invoice', user);
  const customerId = user.stripeCustomerId;
  console.log('customerId', customerId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getsubsInvoices(customerId));
  }, [dispatch, customerId]);
  return (
    <>
      <Helmet>
        <title>RestoAp | Invoices</title>
      </Helmet>
      <CustomBreadcrumbs
        iconName="/assets/icons/navbar/invoices.svg"
        heading="Invoices"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'Billing' },
          { name: 'Invoices', href: PATH_DASHBOARD.billing.invoices },
        ]}
      />
      <TableContainer>
        <InvoicesSection />
      </TableContainer>
    </>
  );
}

export default Invoices;
