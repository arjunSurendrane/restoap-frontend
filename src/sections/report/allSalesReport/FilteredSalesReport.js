import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  styled,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FilterTableToolbar from './FilterTableToolbar';
import FilteredSalesReportTable from './FilteredSalesReportTable';
import { useAuthContext } from '../../../auth/useAuthContext';
import Iconify from '../../../components/iconify';
import { findstartAndend, hamburgerMenuOptions } from './constant';
import { CustomDatePicker } from './customStyles';
import { useSalesReportData } from './hooks/useSalesReportData';
import { useSalesReportFilter } from './hooks/useSalesReportFilter';

export default function FilteredSalesReport() {
  const {
    startDate,
    endDate,
    customDate,
    search,
    currentPage,
    rowsPerPage,
    setCurrentPage,
    setRowsPerPage,
    paymentStatus,
    handleStartDate,
    handleEndDate,
    handleSearch,
    handleSelectPaymentType,
    handleCustomDate,
    open,
    anchorEl,
    handleClick,
    handleClose,
  } = useSalesReportFilter();

  const { branches, isLoading, selectedStoreId } = useSalesReportData(
    startDate,
    endDate,
    search,
    paymentStatus,
    customDate,
    currentPage,
    rowsPerPage
  );

  return (
    <>
      {' '}
      <Card>
        <Box
          spacing={2}
          alignItems="center"
          display="flex"
          justifyContent="space-around"
          direction={{
            xs: 'column',
            md: 'row',
          }}
          sx={{ px: 2.5, py: 3 }}
        >
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CustomDatePicker
                fullWidth
                label="Start Date"
                // name={`offer[${index}].endDate`}
                value={dayjs(startDate)}
                onChange={handleStartDate}
                maxDate={dayjs(new Date())}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CustomDatePicker
                fullWidth
                label="End Date"
                // name={`offer[${index}].endDate`}
                value={dayjs(endDate)}
                onChange={handleEndDate}
                maxDate={dayjs(new Date())}
                minDate={dayjs(startDate)}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <TextField
              fullWidth
              select
              label="Custom date"
              value={customDate}
              onChange={handleCustomDate}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: { maxHeight: 220 },
                  },
                },
              }}
              sx={{
                maxWidth: { md: 160 },
                minWidth: 150,
                textTransform: 'capitalize',
              }}
              size="small"
            >
              {[
                'None',
                'Today',
                'Yesterday',
                'This Week',
                'Last Week',
                'This Month',
                'Last Month',
                'This Year',
              ].map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    textTransform: 'capitalize',
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box>
            <TextField
              fullWidth
              select
              label="Payment Option"
              value={paymentStatus}
              onChange={handleSelectPaymentType}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: { maxHeight: 220 },
                  },
                },
              }}
              sx={{
                maxWidth: { md: 160 },
                minWidth: 150,
                textTransform: 'capitalize',
              }}
              InputLabelProps={{
                sx: {
                  fontSize: 15,
                },
              }}
              size="small"
            >
              {['counter', 'app'].map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    textTransform: 'capitalize',
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box>
            <TextField
              fullWidth
              value={search}
              onChange={handleSearch}
              placeholder="Search customer or order number..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Box>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: '20ch',
              },
            }}
          >
            {hamburgerMenuOptions.map((option) => (
              <MenuItem
                key={option}
                selected={option === 'Pyxis'}
                onClick={() => handleClose(option.name)}
              >
                <Button
                  color="error"
                  sx={{ flexShrink: 0 }}
                  startIcon={<Iconify icon={option.icon} />}
                >
                  {option.name}
                </Button>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box sx={{ px: 3 }}>
          <FilteredSalesReportTable
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            setCurrentPage={setCurrentPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Box>
      </Card>
    </>
  );
}
