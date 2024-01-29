import React from 'react';
import { Box, Grid } from '@mui/material';
import { services } from './services';
import { ServiceCard } from '../../sections/integration';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';

const Integration = () => (
  <>
    <CustomBreadcrumbs
      iconName="/assets/icons/navbar/integration.svg"
      heading="Integration"
      links={[
        { name: 'Dashboard', href: PATH_DASHBOARD.dashboard },
        {
          name: 'Integration',
          //   href: PATH_DASHBOARD.eCommerce.menuCreate,
        },
      ]}
    />
    <Box marginTop="25px">
      {/* <Box sx={{ display: 'grid' }}> */}
      <Grid container spacing={2}>
        {services.map((data, index) => (
          <Grid item md={3.5}>
            <ServiceCard service={data} />
          </Grid>
        ))}
      </Grid>
      {/* </Box> */}
    </Box>
  </>
);

export default Integration;
