import { PropTypes } from 'prop-types';

// @mui
import { alpha } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import Chart from '../../../../components/chart';
import SvgColor from '../../../../components/svg-color/SvgColor';

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  sx: PropTypes.object,
  chart: PropTypes.object,
  title: PropTypes.string,
  name: PropTypes.string,
  total: PropTypes.number,
  percent: PropTypes.number,
};

export default function AppWidgetSummary({ title, name, percent, total, chart, sx, ...other }) {
  //   const { colors, series, options } = chart;

  //   const chartOptions = {
  //     colors,
  //     chart: {
  //       sparkline: {
  //         enabled: true,
  //       },
  //     },
  //     plotOptions: {
  //       bar: {
  //         columnWidth: '68%',
  //         borderRadius: 2,
  //       },
  //     },
  //     tooltip: {
  //       x: { show: false },
  //       y: {
  //         formatter: (value) => fNumber(value),
  //         title: {
  //           formatter: () => '',
  //         },
  //       },
  //       marker: { show: false },
  //     },
  //     ...options,
  //   };

  return (
    <Card
      sx={{
        height: '150px',
        display: 'flex',
        alignItems: 'center',
        p: 3,
        ...sx,
        borderRadius: '8px',
        background: 'linear-gradient(246deg, #FEE 37.21%, #FFFFFD 68.17%)',
        boxShadow: '0px 4px 4px 2px rgba(0, 0, 0, 0.05)',
      }}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontSize: '32px', fontWeight: '700', color: '#212B36' }}>
          {fNumber(total)}
        </Typography>
        <Typography sx={{ fontSize: '16px', fontWeight: '400', color: '#637381' }}>
          {title}
        </Typography>

        {/* <TrendingInfo percent={percent} /> */}
      </Box>

      <img
        src={`/assets/images/home/${name}`}
        style={{ width: '102.77px', height: '120px' }}
        alt="logo"
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

TrendingInfo.propTypes = {
  percent: PropTypes.number,
};

function TrendingInfo({ percent }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mt: 2, mb: 1 }}>
      <Iconify
        icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'}
        sx={{
          mr: 1,
          p: 0.5,
          width: 24,
          height: 24,
          borderRadius: '50%',
          color: 'success.main',
          bgcolor: (theme) => alpha(theme.palette.success.main, 0.16),
          ...(percent < 0 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
          }),
        }}
      />

      <Typography component="div" variant="subtitle2">
        {percent > 0 && '+'}

        {fPercent(percent)}
      </Typography>
    </Stack>
  );
}
