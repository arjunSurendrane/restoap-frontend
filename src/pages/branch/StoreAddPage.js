import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// @mui
import { Box, Container, Modal, useMediaQuery, Typography, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import AddBranchForm from '../../sections/branch/addBranch';
import { getBranches } from '../../redux/slices/branch';
import { useDispatch, useSelector } from '../../redux/store';

// ----------------------------------------------------------------------

export default function StoreAddPage() {
  const dispatch = useDispatch();
  const { themeStretch } = useSettingsContext();
  const isDesktop = useMediaQuery('(min-width:1024px)');
  // const notifySuccess = () => toast.success('Store Added successfully!');
  return (
    <>
      <Helmet>
        <title>Restoap | Store Add</title>
      </Helmet>

      <CustomBreadcrumbs
        iconName="/assets/icons/navbar/branches.svg"
        heading="Stores"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.dashboard },
          {
            name: 'Stores',
            href: PATH_DASHBOARD.branch,
          },
          { name: 'Add Store' },
        ]}
      />
      <AddBranchForm />
    </>
  );
}
