import { styled } from '@mui/material';
import moment from 'moment';

// Get the current date
export const today = moment();

export const todayStart = today.clone().subtract(0, 'days').startOf('day');
export const todayEnd = today.clone().subtract(0, 'days').endOf('day');

export const yesterdayStart = today.clone().subtract(1, 'days').startOf('day');
export const yesterdayEnd = today.clone().subtract(1, 'days').endOf('day');

// Calculate the start of the week
export const startofThisWeek = today.clone().subtract(0, 'weeks').startOf('week');
export const endofThisWeek = today.clone().subtract(0, 'weeks').endOf('week');

// Calculate the start and end of previous week
export const startofPreviousWeek = today.clone().subtract(1, 'weeks').startOf('week');
export const endofPreviousWeek = today.clone().subtract(1, 'weeks').endOf('week');

// Calculate the start and end of this month
export const startofThisMonth = today.clone().subtract(0, 'months').startOf('month');
export const endofThisMonth = today.clone().subtract(0, 'months').endOf('month');

// Calculate the start and end of Previous month
export const startofPreviousMonth = today.clone().subtract(1, 'months').startOf('month');
export const endofPreviousMonth = today.clone().subtract(1, 'months').endOf('month');

// Calculate the start and end of This Year
export const startofThisYear = today.clone().subtract(0, 'years').startOf('year');
export const endofThisYear = today.clone().subtract(0, 'years').endOf('year');

// Calculate the start and end of Previous Year
export const startofPreviousYear = today.clone().subtract(1, 'years').startOf('year');
export const endofPreviousYear = today.clone().subtract(1, 'years').endOf('year');

export const findstartAndend = (data) => {
  switch (data) {
    case 'Today':
      return { start: todayStart, endDate: todayEnd };
    case 'This Week':
      return { start: startofThisWeek, endDate: endofThisWeek };
    case 'Last Week':
      return { start: startofPreviousWeek, endDate: endofPreviousWeek };
    case 'This Month':
      return { start: startofThisMonth, endDate: endofThisMonth };
    case 'Last Month':
      return { start: startofPreviousMonth, endDate: endofPreviousMonth };
    case 'This Year':
      return { start: startofThisYear, endDate: endofThisYear };
    case 'Yesterday':
      return { start: yesterdayStart, endDate: yesterdayEnd };
    default:
      return { start: '', endDate: '' };
  }
};

export const hamburgerMenuOptions = [
  { name: 'clear', icon: 'eva:trash-2-outline' },
  { name: 'download', icon: 'material-symbols:download-sharp' },
];

export const columns = [
  { field: 'saleDate', headerName: 'Sale Date', maxWidth: 120, flex: 1 },
  { field: 'orderNumber', headerName: 'Order No', maxWidth: 120, flex: 1 },
  { field: 'customerName', headerName: 'Customer Name', maxWidth: 195, flex: 1 },
  {
    field: 'paymentMethod',
    headerName: 'Payment Method',
    maxWidth: 150,
    flex: 1,
  },
  {
    field: 'subtotalBillAmount',
    headerName: 'Amount',
    type: 'number',
    maxWidth: 100,
    flex: 1,
  },
  {
    field: 'tax',
    headerName: 'Tax',
    type: 'number',
    maxWidth: 90,
    flex: 1,
  },
  {
    field: 'additionalCharge',
    headerName: 'Additional Charge',
    type: 'number',
    maxWidth: 140,
    flex: 1,
  },
  {
    field: 'discount',
    headerName: 'Discount',
    type: 'number',
    maxWidth: 90,
    flex: 1,
  },
  {
    field: 'finalBillAmount',
    headerName: 'Total Amount',
    type: 'number',
    maxWidth: 150,
    flex: 1,
  },
];
