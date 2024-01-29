import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

function ReportTableSkelton() {
  return (
    <Box width="100%" sx={{my:1}}>
      <Stack spacing={0.3}>
        <Skeleton variant="rectangular" animation='wave' width="100%" height={50} />
        <Skeleton variant="rectangular" animation='wave' width="100%" height={50} />
        <Skeleton variant="rectangular" animation='wave' width="100%" height={50} />
        <Skeleton variant="rectangular" animation='wave' width="100%" height={50} />
      </Stack>
    </Box>
  );
}



export default ReportTableSkelton;
