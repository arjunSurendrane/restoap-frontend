/* eslint-disable import/no-named-as-default */
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// @mui
import { Tab, Card, Tabs, Container, Box, useMediaQuery } from '@mui/material';

// eslint-disable-next-line import/no-unresolved
import { getUserByStore } from 'src/redux/slices/user';
import SvgColor from '../../components/svg-color/SvgColor';
import { PATH_DASHBOARD } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';

import { useDispatch, useSelector } from '../../redux/store';
import { getBranches, getStore } from '../../redux/slices/branch';
import Iconify from '../../components/iconify';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections
import { BranchCover } from '../../sections/branch/profile';
import { BranchUsers } from '../../sections/branch/profile/BranchUsers';
import TableListPage from '../../sections/branch/profile/BranchTables';
// eslint-disable-next-line import/no-cycle
import { ProtectedRoute } from '../../routes';
import BranchSettings from '../../sections/branch/profile/BranchSettings';

// ----------------------------------------------------------------------

export default function BranchProfilePage() {
  const { themeStretch } = useSettingsContext();
  const params = useParams();
  const { branches, isLoading, branch } = useSelector((state) => state.branch);
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const [searchFriends, setSearchFriends] = useState('');
  const [currentTab, setCurrentTab] = useState(localStorage.getItem('tabValue') || 'Tables');
  const isDesktop = useMediaQuery('(min-width:1024px)');

  const TABS = [
    {
      value: 'Tables',
      label: 'Tables',
      icon: <SvgColor src="/assets/icons/branch/DiningTable.svg" />,
      component: <TableListPage />,
    },
    {
      value: 'Users',
      label: 'Users',
      icon: <SvgColor src="/assets/icons/branch/users.svg" />,
      component: <BranchUsers storeId={user.storeId ? user.storeId : params.id} />,
    },

    {
      value: 'settings',
      label: 'settings',
      icon: <Iconify icon="material-symbols:settings" />,
      component: <BranchSettings storeId={user.storeId ? user.storeId : params.id} />,
    },
  ];

  const branchProfile = user.storeId
    ? branch
    : branches?.results?.filter((data) => data.id === params.id)[0];

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);
  useEffect(() => {
    const tab = localStorage.getItem('tabValue');
    if (tab) {
      setCurrentTab(tab);
    }
    return () => {
      localStorage.setItem('tabValue', 'Tables');
    };
  }, []);
  useEffect(() => {
    if (user.storeId) {
      dispatch(getStore(user.storeId));
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getUserByStore(user.storeId ? user.storeId : params.id));
  }, [dispatch, user, params]);

  return (
    <>
      <Helmet>
        <title>RestoAp | Stores Profile</title>
      </Helmet>
      <CustomBreadcrumbs
        iconName="/assets/icons/navbar/branches.svg"
        heading="Stores"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: user.storeId ? 'My store' : 'Stores',
            href: !user.storeId && PATH_DASHBOARD.branch,
          },
          { name: 'Store Details' },
        ]}
      />
      <Card
        sx={{
          mb: 3,
          height: 280,
          position: 'relative',
          borderRadius: '10px',
          marginTop: '30px',
        }}
      >
        <BranchCover branchDetails={branchProfile} />

        <Tabs
          value={currentTab}
          onclick={localStorage.setItem('tabValue', currentTab)}
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

      {TABS.map((tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>)}
    </>
  );
}
