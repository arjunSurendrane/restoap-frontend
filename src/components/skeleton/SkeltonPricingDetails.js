import { Grid, Skeleton } from '@mui/material';
import React from 'react';

export default function SkeltonPricingDetails() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={3} md={3} lg={3}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          sx={{ paddingTop: '100%', borderRadius: 2 }}
        />
      </Grid>
      <Grid item xs={3} md={3} lg={3}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          sx={{ paddingTop: '100%', borderRadius: 2 }}
        />
      </Grid>
      <Grid item xs={3} md={3} lg={3}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          sx={{ paddingTop: '100%', borderRadius: 2 }}
        />
      </Grid>
      <Grid item xs={3} md={3} lg={3}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          sx={{ paddingTop: '100%', borderRadius: 2 }}
        />
      </Grid>
    </Grid>
  );
}
