import React, { useEffect, useState } from 'react';
import {
  Box,
  // Chip,
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
  Typography,
  Button,
} from '@mui/material';
import Popover from '@mui/material/Popover';

import moment from 'moment';

import PropTypes from 'prop-types';
import { DateRangePicker } from 'react-date-range';
// import { DateRangePicker } from 'react-date-range';
// eslint-disable-next-line import/no-unresolved
import 'react-date-range/dist/styles.css'; // main css file
// eslint-disable-next-line import/no-unresolved
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import BasicPagination from '../../../components/pagination/pagination';
import CustomizedTables from '../../../components/table/MuiCustomTable';
import TableToolbar from '../../list/TableToolbar';

import SvgColor from '../../../components/svg-color/SvgColor';
// import CustomButton from '../../../components/button/CustomButton';
import OrderHistoryDrawer from './OrderHistoryDrawer';
import Iconify from '../../../components/iconify/Iconify';

PreviousOrder.propTypes = {
  data: PropTypes.object,
  handleData: PropTypes.func,
};

export default function PreviousOrder({ data, handleData }) {
  console.log('historydata', data);
  const { results } = data;

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
  const [drawerOrderData, setDrawerOrderDAta] = useState({});
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
  useEffect(() => {
    handleData(state);
  }, [state, handleData]);
  console.log('date', state);
  const handleOpenDrawer = (item) => {
    // console.log({ item });
    setDrawerOrderDAta(item);
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
  console.log('state', state);
  const handleChangeDate = (item) => {
    console.log('handleCHANGE', item);
    // setState([item.selection]);
    const getEndInTime = item.selection.endDate.getTime() + 24 * 60 * 60 * 1000 - 1000;
    console.log('handleCHANGE', getEndInTime);
    const endNew = new Date(getEndInTime);
    console.log('handleCHANGE', endNew);
    const finalDate = {
      startDate: item.selection.startDate,
      endDate: endNew,
      key: 'selection',
    };
    setState([finalDate]);
  };
  return (
    <>
      <Box sx={{ marginBottom: '5px' }}>
        {' '}
        <Button
          sx={{
            backgroundColor: '#BB3138',
            borderRadius: '5px',
            color: 'White',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
            border: '#fff 2px solid',
            '&:hover': {
              backgroundColor: '#212b36',
              color: 'white',
            },
          }}
          onClick={handleClick}
        >
          {' '}
          <Iconify icon="ph:calendar-bold" />
        </Button>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <DateRangePicker
          // color="green"
          // preview={{ color: 'green' }}
          rangeColors={['#bb3138']}
          onChange={(item) => handleChangeDate(item)}
          showSelectionPreview
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          direction="vertical"
        />
        ;
      </Popover>
      {/* <TableToolbar /> */}
      <CustomizedTables
        tableLabels={[
          { id: 'orderNo', label: 'Order No.' },
          { id: 'TableNo', label: 'Table No.' },
          { id: 'OrderDate', label: 'Order Date' },
          { id: 'CustomerName', label: 'Customer Name' },
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
      <Box style={{ display: 'flex', marginTop: '8px', justifyContent: 'flex-end' }}>
        <BasicPagination
          page={page}
          setRowsPerPage={data.limit}
          count={data.totalPages}
          fun={setPage}
        />
      </Box>

      <OrderHistoryDrawer
        //   isDefault={isDefault}
        data={drawerOrderData}
        open={openDrawer}
        onOpen={handleOpenDrawer}
        onClose={handleCloseDrawer}
      />
    </>
  );
}
