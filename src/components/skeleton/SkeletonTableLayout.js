import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

function SkeletonTableLayout() {
  return (
    <Box width="100%" p={2}>
      <Stack spacing={2}>
        <Skeleton variant="rectangular" animation='wave' width="100%" height={100} />
        <Skeleton variant="rectangular" animation='wave' width="100%" height={100} />
        <Skeleton variant="rectangular" animation='wave' width="100%" height={100} />
        <Skeleton variant="rectangular" animation='wave' width="100%" height={100} />
      </Stack>
    </Box>
  );
}



export default SkeletonTableLayout;
