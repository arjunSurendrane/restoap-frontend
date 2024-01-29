import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
import Header from '../layouts/compact/Header';
import WarningPopUp from '../components/PopUp/WarningPopUp';
import Main from '../layouts/dashboard/Main';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import InactiveStorePopupModal from '../components/PopUp/InactiveStorePopup';

const InactiveStorePopup = () => {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const content =
    'We regret to inform you that our store has been inactivated by the superadmin. This means that we are currently unable to process orders or provide support.';

  return (
    <>
      <Helmet>
        <title>Inactive Store | RestoAp</title>
      </Helmet>
      <Header />
      <Main>
        <InactiveStorePopupModal
          openPopUp={open}
          title="Inactive store"
          buttonContent="Logout"
          content={content}
        />
      </Main>
    </>
  );
};

export default InactiveStorePopup;
