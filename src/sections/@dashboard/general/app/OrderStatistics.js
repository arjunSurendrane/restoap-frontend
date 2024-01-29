import PropTypes from 'prop-types';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

OrderStatitics.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function OrderStatitics({ title, subheader, chart, ...other }) {
  const { colors, series, options } = chart;
  console.log({ chart });

  const chartSeries = series?.map((i) => i.value);
  console.log({ chartSeries });
  console.log(colors);
  const chartOptions = {
    // colors: ['red', 'green', 'blue'],
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '15px',
        borderRadius: 0,
        dataLabels: {
          position: 'top',
          orientation: 'vertical',
        },
      },
    },
    xaxis: {
      categories: series?.map((i) => i.label),
      labels: {
        style: {
          colors: 'black', // Set x-axis label color to black
        },
        offsetY: 0,
      },
      title: {
        text: 'Order Count',
        style: {
          color: 'black', // Set x-axis title text color to black
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#BB3138',
        },
        offsetY: 0,
      },
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#BB3138',
      },
    },
    // ...options,
  };

  return (
    <Card
      sx={{
        paddingRight: '16px',
        height: '400px',
        boxShadow: '0px 4px 4px 2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <CardHeader title={title} />

      <Box dir="ltr" marginTop="0px">
        <Chart
          type="bar"
          series={[{ data: chartSeries }]}
          // options={chartOptions}
          options={{
            chart: {
              type: 'bar',
              height: 380,
            },
            plotOptions: {
              bar: {
                barHeight: '15px',
                distributed: true,
                horizontal: true,
                dataLabels: {
                  position: 'top',
                  orientation: 'vertical',
                },
              },
            },
            colors,
            dataLabels: {
              enabled: true,
              textAnchor: 'start',
              style: {
                colors: ['#fff'],
              },

              offsetX: 0,
              dropShadow: {
                enabled: true,
              },
            },
            stroke: {
              width: 1,
              colors: ['#fff'],
            },
            xaxis: {
              categories: series?.map((i) => i.label),
              title: {
                text: 'Order Count',
              },
            },
            yaxis: {
              labels: {
                show: false,
              },
            },

            // tooltip: {
            //   theme: 'dark',
            //   x: {
            //     show: false,
            //   },
            // },
          }}
          height={280}
          // marginTop="0px"
        />
      </Box>
    </Card>
  );
}
