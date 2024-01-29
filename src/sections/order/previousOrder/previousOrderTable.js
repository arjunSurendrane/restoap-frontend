/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from '@mui/material';
import { addDays } from 'date-fns';
import moment from 'moment';
import PropTypes from 'prop-types';
import CustomizedTables from '../../../components/table/MuiCustomTable';
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';
import { MenuSearch } from '../../menu';
import PrevOrderDetailDrawer from './PrevOrderDetailDrawer';
import OrderSearch from './OrderSearch';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#F4F4F4;',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#E6E6E6;',
  },
  // hide last border  #E6E6E6;
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function PreviousOrderTable({ orderData }) {
  console.log({ orderData });
  const [drawerOrderData, setDrawerOrderData] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [filterdOrders, setFilteredOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);
  const [filterType, setFilterType] = React.useState('All');

  useEffect(() => {
    setFilteredOrders(orderData);
  }, [orderData]);

  const handleChange = (event) => {
    setFilterType(event.target.value);
  };
  const handleOpenDrawer = (item) => {
    setDrawerOrderData(item);
    setOpenDrawer(true);
  };
  const closeDrawer = () => setOpenDrawer(false);

  return (
    <>
      <Box
        sx={{
          marginBottom: '5px',

          height: '70px',
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
        }}
      >
        {/* <Box width="273px">
          <FormControl fullWidth sx={{ height: '45px' }}>
            <InputLabel id="demo-simple-select-label">Order Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterType}
              label="Order Type"
              onChange={handleChange}
            >
              <MenuItem value={10}>All</MenuItem>
              <MenuItem value={20}>Take Away</MenuItem>
              <MenuItem value={30}>Dine In</MenuItem>
            </Select>
          </FormControl>
        </Box> */}
        <Box width="445px" display="flex" justifyContent="end">
          <OrderSearch setFilteredOrders={setFilteredOrders} orders={orderData} />
        </Box>
      </Box>
      <CustomizedTables
        tableLabels={[
          { id: 'orderNo', label: 'Order No.' },
          { id: 'TableNo', label: 'Table No.' },
          { id: 'OrderDate', label: 'Order Date' },
          { id: 'CustomerName', label: 'Customer Name/ Waiter Name' },
          { id: 'PaymentMode', label: 'Payment Mode' },
          { id: 'Amount', label: 'Amount' },
          { id: 'Actions', label: 'Actions' },
        ]}
      >
        {filterdOrders?.map((row) => (
          <StyledTableRow>
            <StyledTableCell>{row.orderNumber || 'ORD-004556'}</StyledTableCell>
            <StyledTableCell>{row.tableNo}</StyledTableCell>
            <StyledTableCell>
              <Typography>{moment(row.createdAt).format('DD-MM-YY')}</Typography>
            </StyledTableCell>
            <StyledTableCell>
              {row?.customerName || row?.subOrders?.[0]?.waiterName}
            </StyledTableCell>
            <StyledTableCell>{row?.paymentDetails?.paymentType}</StyledTableCell>
            <StyledTableCell>Rs.{row?.finalBillAmount}</StyledTableCell>
            <StyledTableCell>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                }}
              >
                <Box
                  onClick={() => handleOpenDrawer(row)}
                  sx={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#23C6C8',
                    color: 'white',
                    borderRadius: '8px',
                    border: '2px solid white',
                    boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SvgColor src="/assets/icons/Order/Eye3.svg" />
                </Box>
              </Box>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </CustomizedTables>
      <PrevOrderDetailDrawer data={drawerOrderData} open={openDrawer} closeDrawer={closeDrawer} />
    </>
  );
}

PreviousOrderTable.propTypes = {
  orderData: PropTypes.array,
};
export default PreviousOrderTable;
