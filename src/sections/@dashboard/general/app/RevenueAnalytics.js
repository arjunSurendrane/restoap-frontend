import PropTypes from 'prop-types';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, CardHeader, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 350;

const LEGEND_HEIGHT = 72;

const StyledChart = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  // marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT,
  },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

RevenueAnalytics.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function RevenueAnalytics({ title, subheader, chart, ...other }) {
  const theme = useTheme();

  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors,
    labels: series.map((i) => i.label),
    stroke: {
      colors: [theme.palette.background.paper],
    },
    legend: {
      floating: true,
      horizontalAlign: 'center',
    },
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: false },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
    ...options,
  });
  // console.log('chartOptions', chartOptions);
  const result = chartSeries.every((value) => value === 0);
  console.log('chartSeries', chartSeries);

  return (
    <Card
      {...other}
      sx={{
        boxShadow: '0px 4px 4px 2px rgba(0, 0, 0, 0.05)',
        padding: '12px',
      }}
    >
      <CardHeader title={title} subheader={subheader} />

      {!result ? (
        <StyledChart dir="ltr">
          <Chart type="pie" series={chartSeries} options={chartOptions} height={280} />
        </StyledChart>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            // disabledEffect
            alt="empty content"
            src="/assets/illustrations/No result.svg"
            height="288px"
            // width="50%"
            // sx={{ height: 340 }}
          />
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: '400',
              color: '#BB3138',
              // position: 'absolute',
              marginBottom: '10px',
            }}
          >
            No order data found for revenue !
          </Typography>
        </Box>
      )}
    </Card>
  );
}
