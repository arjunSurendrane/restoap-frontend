/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../../redux/slices/user';

// @mui
/* eslint-disable-next-line */
import { Box, Container, useMediaQuery } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

// section
/* eslint-disable-next-line */
import UserEditForm from 'src/sections/@dashboard/user/UserEditForm';

// ............................................................................

export default function EditBranchUser() {
  const params = useParams();
  const dispatch = useDispatch();
  const { themeStretch } = useSettingsContext();
  const isDesktop = useMediaQuery('(min-width:1024px)');
  useEffect(() => {
    localStorage.setItem('tabValue', 'Users');
  }, []);

  return (
    <>
      <Helmet>
        <title> User | Edit user</title>
      </Helmet>

      <CustomBreadcrumbs
        iconName="/assets/icons/navbar/branches.svg"
        heading="Edit user"
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
          { name: 'Edit user' },
        ]}
      />

      <UserEditForm id={params} />
    </>
  );
}
