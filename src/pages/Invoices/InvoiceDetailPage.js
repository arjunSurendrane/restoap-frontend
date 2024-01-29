import React from 'react';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import InvoiceDetails from '../../sections/invoices/invoiceDetailPage';

function InvoiceDetailPage() {
  return (
    <>
      <Helmet>
        <title>RestoAp | Invoice</title>
      </Helmet>
      <CustomBreadcrumbs
        iconName="/assets/icons/navbar/invoices.svg"
        heading="Invoices"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'Billing', href: PATH_DASHBOARD.billing },
          { name: 'Invoices', href: PATH_DASHBOARD.billing.invoices },
          { name: 'Invoice Detail', href: PATH_DASHBOARD.billing.invoiceDetail },
        ]}
      />
      <InvoiceDetails />
    </>
  );
}

export default InvoiceDetailPage;
