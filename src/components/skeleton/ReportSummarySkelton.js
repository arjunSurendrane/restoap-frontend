import PropTypes from 'prop-types';
// @mui
import { Stack, Skeleton, Box } from '@mui/material';

// ----------------------------------------------------------------------

ReportSummarySkelton.propTypes = {
  sx: PropTypes.object,
};

export default function ReportSummarySkelton({ sx, ...other }) {
  return (
    <Stack
      spacing={1}
      direction="row"
      alignItems="center"
      display="flex"
      justifyContent="space-around"
      sx={{ px: 3, py: 1, ...sx }}
      {...other}
    >
      <Box sx={{ display: 'flex' }}>
        <Skeleton variant="circular" width={50} height={50} />
        <Box sx={{ml:2}}>
          <Skeleton variant="text" sx={{ width: 100, height: 16 }} />
          <Skeleton variant="text" sx={{ width: 100, height: 16 }} />
          <Skeleton variant="text" sx={{ width: 100, height: 16 }} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Skeleton variant="circular" width={50} height={50} />
        <Box sx={{ml:2}}>
          <Skeleton variant="text" sx={{ width: 100, height: 16 }} />
          <Skeleton variant="text" sx={{ width: 100, height: 16 }} />
          <Skeleton variant="text" sx={{ width: 100, height: 16 }} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Skeleton variant="circular" width={50} height={50} />
        <Box sx={{ml:2}}>
          <Skeleton variant="text" sx={{ width: 100, height: 16 }} />
          <Skeleton variant="text" sx={{ width: 100, height: 16 }} />
          <Skeleton variant="text" sx={{ width: 100, height: 16 }} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Skeleton variant="circular" width={50} height={50} />
        <Box sx={{ml:2}}>
          <Skeleton variant="text" sx={{ width: 100, height: 16 }} />
          <Skeleton variant="text" sx={{ width: 100, height: 16 }} />
          <Skeleton variant="text" sx={{ width: 100, height: 16 }} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Skeleton variant="circular" width={50} height={50} />
        <Box sx={{ml:2}}>
          <Skeleton variant="text" sx={{ width: 100, height: 16 }} />
          <Skeleton variant="text" sx={{ width: 100, height: 16 }} />
          <Skeleton variant="text" sx={{ width: 100, height: 16 }} />
        </Box>
      </Box>
    </Stack>
  );
}
