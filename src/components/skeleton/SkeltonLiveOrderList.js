import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const LiveOrderList = () => (
  <Grid container spacing={1} mt={3}>
    <Grid item xs={2} md={2} lg={2}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="75%"
        sx={{ paddingTop: '100%', borderRadius: 2 }}
      />
    </Grid>
    <Grid item xs={2} md={2} lg={2}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="75%"
        sx={{ paddingTop: '100%', borderRadius: 2 }}
      />
    </Grid>
    <Grid item xs={2} md={2} lg={2}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="75%"
        sx={{ paddingTop: '100%', borderRadius: 2 }}
      />
    </Grid>
    <Grid item xs={2} md={2} lg={2}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="75%"
        sx={{ paddingTop: '100%', borderRadius: 2 }}
      />
    </Grid>
    <Grid item xs={2} md={2} lg={2}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="75%"
        sx={{ paddingTop: '100%', borderRadius: 2 }}
      />
    </Grid>
    <Grid item xs={2} md={2} lg={2}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="75%"
        sx={{ paddingTop: '100%', borderRadius: 2 }}
      />
    </Grid>
  </Grid>
);

export default LiveOrderList;
