import React from 'react';
import { Helmet } from 'react-helmet-async';
import MyProfile from '../../sections/branch/profile/MyProfile';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import { useAuthContext } from '../../auth/useAuthContext';

function MyProfilePage() {
  return (
    <>
      <Helmet>
        <title>RestoAp | My Profile</title>
      </Helmet>

      <CustomBreadcrumbs
        iconName="/assets/icons/navbar/Dash_Vec.svg"
        heading="My Profile"
        links={[
          {
            name: 'Dashboard',
            href: PATH_DASHBOARD.dashboard,
          },
        ]}
      />
      <MyProfile />
    </>
  );
}

export default MyProfilePage;
