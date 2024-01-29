/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';

// @mui
import { Tab, Card, Tabs, Container, Box, useMediaQuery } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// // auth
// import { useAuthContext } from '../../auth';
// components
import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';

// eslint-disable-next-line
import { Profile, ProfileAbout, ProfileCover } from '../../@dashboard/user/Profile/index';

import { getUserById } from '../../../redux/slices/user';
import LoadingScreen from '../../../components/loading-screen/LoadingScreen';

function UserProfile() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.id;

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [userId, dispatch]);
  useEffect(() => {
    localStorage.setItem('tabValue', 'Users');
  }, []);

  useEffect(() => {
    localStorage.setItem('tabValue', 'Users');
  }, []);
  const [currentTab, setCurrentTab] = useState('profile');
  const TABS = [];
  const isDesktop = useMediaQuery('(min-width:1024px)');
  return (
    <>
      <Helmet>
        <title> User: Profile | RestoAp</title>
      </Helmet>

      <CustomBreadcrumbs
        iconName="/assets/icons/navbar/branches.svg"
        heading="User Profile"
        links={[
          {
            name: 'Dashboard',
            href: PATH_DASHBOARD.dashboard,
          },

          {
            name: 'Stores',
            href: PATH_DASHBOARD.branch,
          },
          {
            name: 'Users',
            href: PATH_DASHBOARD.branchProfile,
          },
          {
            name: 'Profile',
            // href: PATH_DASHBOARD.branchProfile,
          },
        ]}
      />
      <Card
        sx={{
          mb: 3,
          height: 280,
          position: 'relative',
        }}
      >
        <ProfileCover />

        <Tabs
          value={currentTab}
          onChange={(event, newValue) => setCurrentTab(newValue)}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            '& .MuiTabs-flexContainer': {
              pr: { md: 3 },
              justifyContent: {
                sm: 'center',
                md: 'flex-end',
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Card>
      <ProfileAbout />

      {TABS.map((tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>)}
    </>
  );
}

export default UserProfile;
