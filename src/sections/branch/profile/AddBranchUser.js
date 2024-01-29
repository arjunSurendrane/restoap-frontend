/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';

// @mui
import { Box, Container, useMediaQuery } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import UserCreateForm from '../../@dashboard/user/UserCreateForm';

export default function AddBranchUser() {
  const { themeStretch } = useSettingsContext();
  const params = useParams();
  console.log('user add storeid', params);
  const isDesktop = useMediaQuery('(min-width:1024px)');
  useEffect(() => {
    localStorage.setItem('tabValue', 'Users');
  }, []);
  return (
    <>
      <Helmet>
        <title> User: Create a new user | RestoAp</title>
      </Helmet>

      <CustomBreadcrumbs
        iconName="/assets/icons/navbar/branches.svg"
        heading="Create a new user"
        links={[
          {
            name: 'Dashboard',
            href: PATH_DASHBOARD.root,
          },
          {
            name: 'Store',
            href: PATH_DASHBOARD.branch,
          },

          {
            name: 'Users',
            href: PATH_DASHBOARD.branchProfile,
          },

          { name: 'New user' },
        ]}
      />

      <UserCreateForm storeId={params} />
    </>
  );
}
