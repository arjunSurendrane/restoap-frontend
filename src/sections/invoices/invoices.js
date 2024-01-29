import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, InputAdornment, MenuItem, Stack, TextField } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useAuthContext } from '../../auth/useAuthContext';
import InvoiceWidget from './invoiceWidget';
import InvoiceTable from './invoiceTable';
import Iconify from '../../components/iconify/Iconify';
import BasicPagination from '../../components/pagination/pagination';
import SkeltonForInvoiceTable from '../../components/skeleton/SkeltonForInvoiceTable';
import { getsubsInvoices } from '../../redux/slices/invoices';
import CustumPagination from '../../components/custom-pagination/Pagination';

function InvoicesSection() {
  const { invoices, paginatedInvoice, isLoading } = useSelector((state) => state.invoices);
  const [invoice, setInvoice] = useState([]);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { user } = useAuthContext();
  const dipsatch = useDispatch();
  const customerId = user.stripeCustomerId;
  useEffect(() => {
    if (invoices.length) {
      const startingIndex = page * rowsPerPage - rowsPerPage;
      const endIndex = page * rowsPerPage;
      const data = invoices.slice(startingIndex, endIndex);
      console.log({ data });
      setInvoice(data);
    }
  }, [invoices, page, rowsPerPage]);

  const handlePagination = (limit) => {
    console.log({ limit });
    setPage(limit);
    const end = limit * 5;
    const start = end - 5;
    const data = invoices.slice(start, end);
    console.log({ data });
    setInvoice(data);
    // dipsatch(getsubsInvoices(customerId, limit, skip))
  };

  return (
    <>
      {/* <Stack
        spacing={2}
        alignItems="center"
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        sx={{ px: 2.5, py: 3 }}
      >
        <TextField
          fullWidth
          select
          label="Category"

          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  maxHeight: 260,
                },
              },
            },
          }}
          sx={{
            maxWidth: { sm: 240 },
            textTransform: 'capitalize',
          }}
        >

          <MenuItem

            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          />

        </TextField>

        <TextField
          fullWidth

          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      </Stack> */}

      <Stack spacing={2} marginTop="25px">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <InvoiceWidget
              title="Next invoice issue date"
              data={moment(user.plan.current_period_end).format('MMM DD YYYY')}
              icon="/assets/illustrations/invoice.png"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <InvoiceWidget
              title="Current Plan"
              data={user.plan.name}
              icon="/assets/illustrations/ActivePlans.svg"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <InvoiceWidget
              title="Invoice Amount"
              data={(user.plan.amount / 100).toFixed(2)}
              icon="/assets/illustrations/invoiceAmount.png"
            />
          </Grid>
        </Grid>
        {!isLoading ? (
          <>
            <InvoiceTable invoices={invoice} />
            <Box style={{ display: 'flex', marginTop: '8px', justifyContent: 'flex-end' }}>
              <CustumPagination
                count={parseInt(invoices.length / rowsPerPage || 0, 10) || 1}
                page={page}
                rowsPerPage={rowsPerPage}
                setCurrentPage={setPage}
                setRowsPerPage={setRowsPerPage}
              />
            </Box>
          </>
        ) : (
          <SkeltonForInvoiceTable />
        )}
      </Stack>
    </>
  );
}

export default InvoicesSection;
