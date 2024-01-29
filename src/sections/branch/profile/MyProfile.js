import React from 'react';
import { Card } from '@mui/material';
import MyProfileCover from './MyProfileCover';
import MyProfileAbout from './MyProfileAbout';
import { useAuthContext } from '../../../auth/useAuthContext';

function MyProfile() {
  const { user } = useAuthContext();
  return (
    <>
      <Card
        sx={{
          mb: 3,
          height: 280,
          position: 'relative',
          marginTop: '25px',
        }}
      >
        <MyProfileCover user={user} />
      </Card>
      <MyProfileAbout user={user} />
    </>
  );
}

export default MyProfile;
