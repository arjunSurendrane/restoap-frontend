import { useSelector } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import moment from 'moment';
import ReportTableSkelton from '../../../../components/skeleton/ReportTableSkelton';

export function useSalesReportTableData(rowsPerPage) {
  const { reportData, isLoadingOrderData } = useSelector((state) => state.report);
  const reportUpdatedData = reportData[0]?.orders?.map((data) => ({
    ...data,
    customerName: data?.customerName || '(taken by waiter)',
    saleDate: moment(data.createdAt).format('DD MM YYYY'),
    paymentMethod: data.paymentDetails?.paymentType,
    tax: data.charges?.tax,
    additionalCharge: data.charges?.additionalCharge?.amount,
    discount: data.charges?.appliedDiscount,
    finalBillAmount: data.finalBillAmount,
    subtotalBillAmount: data.subtotalBillAmount,
  }));
  const totalReportOrder = reportData[0]?.totalMainOrder?.count;
  const totalOrderdividedByLimit = Math.ceil(totalReportOrder / rowsPerPage);
  const count = totalOrderdividedByLimit;
  return {
    count,
    reportUpdatedData,
    reportData,
    isLoadingOrderData,
  };
}
