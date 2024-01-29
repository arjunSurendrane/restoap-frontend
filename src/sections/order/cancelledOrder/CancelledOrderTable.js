/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Box, TableCell, TableRow, Typography, styled, tableCellClasses } from '@mui/material';
import { addDays } from 'date-fns';
import moment from 'moment';
import PropTypes from 'prop-types';
import CustomizedTables from '../../../components/table/MuiCustomTable';
import SvgColor from '../../../components/svg-color';

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

function CancelledOrderTable({ data }) {
    
  const { results } = data;
  const [drawerOrderData, setDrawerOrderData] = useState({})
  const [openDrawer, setOpenDrawer] = useState(false);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);


  //   useEffect(() => {
  //     handleData(state);
  //   }, [state, handleData]);
  console.log('date', state);
  const handleOpenDrawer = (item) => {
    // console.log({ item });
    setDrawerOrderData(item);
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <CustomizedTables
      tableLabels={[
        { id: 'orderNo', label: 'Order No.' },
        { id: 'TableNo', label: 'Table No.' },
        { id: 'OrderDate', label: 'Order Date' },
        { id: 'CustomerName', label: 'Customer Name' },
        { id: 'PaymentMode', label: 'Payment Mode' },
        { id: 'Amount', label: 'Amount' },
        { id: 'Actions', label: 'Actions' },
      ]}
    >
      {data?.map((row) => (
        <StyledTableRow>
          <StyledTableCell>{row.OrderId}</StyledTableCell>
          <StyledTableCell>{row.tableNo}</StyledTableCell>
          <StyledTableCell>
            <Typography>{moment(row.createdAt).format('DD-MM-YY')}</Typography>
          </StyledTableCell>
          <StyledTableCell>{row?.customer?.firstName}</StyledTableCell>
          <StyledTableCell>{row.totalAmount}</StyledTableCell>
          <StyledTableCell>{row.totalAmount}</StyledTableCell>
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
  );
}

CancelledOrderTable.propTypes = {
  data: PropTypes.array,
};
export default CancelledOrderTable;
