import { Box, Card, Skeleton, Stack, useMediaQuery } from '@mui/material';
import React from 'react';

function SkeletonTakeOrderMenuItem() {
  const isDesktop = useMediaQuery('(min-width:900px)');
  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <Stack spacing={2}>
        <Card sx={{ width: isDesktop ? '346px' : '100%', height: isDesktop ? '130px' : '120px' }}>
          <Skeleton variant="rectangular" sx={{ paddingTop: '100%' }} />
        </Card>{' '}
        <Card sx={{ width: isDesktop ? '346px' : '100%', height: isDesktop ? '130px' : '120px' }}>
          <Skeleton variant="rectangular" sx={{ paddingTop: '100%' }} />
        </Card>
      </Stack>
      <Stack spacing={2}>
        <Card sx={{ width: isDesktop ? '346px' : '100%', height: isDesktop ? '130px' : '120px' }}>
          <Skeleton variant="rectangular" sx={{ paddingTop: '100%' }} />
        </Card>{' '}
        <Card sx={{ width: isDesktop ? '346px' : '100%', height: isDesktop ? '130px' : '120px' }}>
          <Skeleton variant="rectangular" sx={{ paddingTop: '100%' }} />
        </Card>
      </Stack>
      <Stack spacing={2}>
        <Card sx={{ width: isDesktop ? '346px' : '100%', height: isDesktop ? '130px' : '120px' }}>
          <Skeleton variant="rectangular" sx={{ paddingTop: '100%' }} />
        </Card>{' '}
        <Card sx={{ width: isDesktop ? '346px' : '100%', height: isDesktop ? '130px' : '120px' }}>
          <Skeleton variant="rectangular" sx={{ paddingTop: '100%' }} />
        </Card>
      </Stack>
    </Box>
  );
}

export default SkeletonTakeOrderMenuItem;
