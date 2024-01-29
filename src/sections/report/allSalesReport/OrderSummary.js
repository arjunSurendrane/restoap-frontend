import { Box, Card } from '@mui/material';
import { useSelector } from 'react-redux';
import OrderSummaryCard from './OrderSummaryCard';
import ReportSummarySkelton from '../../../components/skeleton/ReportSummarySkelton';

const cardStyle = { display: 'flex', justifyContent: 'space-between', my: 2, p: 1 };

function OrderSummary() {
  const { reportSummaryDate, isLoadingSummary } = useSelector((state) => state.report);
  if (isLoadingSummary || !Object.keys(reportSummaryDate).length)
    return (
      <Card sx={cardStyle}>
        <ReportSummarySkelton sx={{ width: '100%' }} />
      </Card>
    );
  const totalSalesAmount = reportSummaryDate?.totalSalesAmount[0]?.totalAmount || 0;
  // todayPercentage = ((todaySalesAmount - yesterdaySalesAmount) / yesterdaySalesAmount) * 100
  const todayTotalSales = reportSummaryDate?.todayTotalSales[0]?.totalAmount || 0;
  const thisWeekSalesAmount = reportSummaryDate?.thisWeekSalesAmount[0]?.totalAmount || 0;
  const previousWeekSalesAmount = reportSummaryDate?.previousWeekSalesAmount[0]?.totalAmount || 0;
  const thisMonthSalesAmount = reportSummaryDate?.thisMonthSalesAmount[0]?.totalAmount || 0;
  const previousMonthSalesAmount = reportSummaryDate?.previousMonthSalesAmount[0]?.totalAmount || 0;
  const thisYearSalesAmount = reportSummaryDate?.thisYearSalesAmount[0]?.totalAmount || 0;
  const previousYearSalesAmount = reportSummaryDate?.previousYearSalesAmount[0]?.totalAmount || 0;
  const weeklyPercentage =
    ((thisWeekSalesAmount - previousWeekSalesAmount) / previousWeekSalesAmount !== 0
      ? previousWeekSalesAmount
      : 1) * 100;
  const monthlyPercentage =
    ((thisMonthSalesAmount - previousMonthSalesAmount) / previousMonthSalesAmount !== 0
      ? previousMonthSalesAmount
      : 1) * 100;

  return (
    <Box>
      <Card sx={cardStyle}>
        <OrderSummaryCard
          total={reportSummaryDate?.totalSalesAmount[0]?.totalAmount || 0}
          title="Total Sales"
          icon="/assets/icons/reports/totalSales.svg"
          color="#51B7F0"
          percent={100}
        />
        <OrderSummaryCard
          total={reportSummaryDate?.todayTotalSales[0]?.totalAmount || 0}
          title="Today Sales"
          icon="/assets/icons/reports/todaySales.svg"
          subtitle="Yesterday"
          color="#0BB30B"
          percent={100}
          subtitleValue={reportSummaryDate?.yesterdaySales[0]?.totalAmount || 0}
        />
        <OrderSummaryCard
          total={reportSummaryDate?.thisWeekSalesAmount[0]?.totalAmount || 0}
          title="Weekly Sales"
          subtitle="Last week"
          icon="/assets/icons/reports/weeklySales.svg"
          color="#F3C628"
          subtitleValue={reportSummaryDate?.previousWeekSalesAmount[0]?.totalAmount || 0}
        />
        <OrderSummaryCard
          total={reportSummaryDate?.thisMonthSalesAmount[0]?.totalAmount || 0}
          title="Monthly Sales"
          subtitle="Last month"
          icon="/assets/icons/reports/monthlySales.svg"
          color="#EF6A30"
          subtitleValue={reportSummaryDate?.previousMonthSalesAmount[0]?.totalAmount || 0}
        />
        <OrderSummaryCard
          total={reportSummaryDate?.thisYearSalesAmount[0]?.totalAmount || 0}
          title="Yearly Sales"
          subtitle="Last year"
          icon="/assets/icons/reports/yearlySales.svg"
          color="#FF3C3C"
          subtitleValue={reportSummaryDate?.previousYearSalesAmount[0]?.totalAmount || 0}
          border={false}
        />
      </Card>
    </Box>
  );
}

export default OrderSummary;
