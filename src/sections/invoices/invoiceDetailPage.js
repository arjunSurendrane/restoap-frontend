/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { useRef } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
  Chip,
} from '@mui/material';
import { useLocation, useParams } from 'react-router';
import { Image, Label } from '@mui/icons-material';
// eslint-disable-next-line import/no-unresolved
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import moment from 'moment';
import Scrollbar from '../../components/scrollbar/Scrollbar';
import CustomButton from '../../components/button/CustomButton';
import InvoicePDF from './invoicePdf';
import InvoicePrint from './invoicePrint';

// utils
// import { fDate } from '../../../../utils/formatTime';
// import { fCurrency } from '../../../../utils/formatNumber';
// components
// import Label from '../../../../components/label';
// import Image from '../../../../components/image';
// import Scrollbar from '../../../../components/scrollbar';
//
// import InvoiceToolbar from './InvoiceToolbar';

// ----------------------------------------------------------------------

const StyledRowResult = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

InvoiceDetails.propTypes = {
  invoice: PropTypes.object,
};

export default function InvoiceDetails({ invoice }) {
  const invoiceRef = useRef();
  const { state } = useLocation();
  const today = new Date(Date.now());
  const past_due = new Date(state.dueDate * 1000) < today;
  // eslint-disable-next-line no-unneeded-ternary
  const status = state.status === 'paid' ? 'paid' : past_due ? 'past due' : 'open';
  const statusBgcolor = state.status === 'paid' ? '#d7f7c2' : past_due ? '#ffe7f2' : '#cff5f6';
  const statusFontColor = state.status === 'paid' ? '#006908' : past_due ? '#b3093c' : '#0055bc';

  console.log('state', state);
  const invoicePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  const handlePrintInvoice = async () => {
    console.log('print CLicked');
    invoicePrint();
  };

  const handleInvoicePayment = async () => {
    window.location.href = state.hostedInvoiceUrl;
  };
  return (
    <>
      {/* <InvoiceToolbar invoice={invoice} /> */}

      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <img src="/logo/logo_single.png" alt="j" style={{ maxWidth: '160px' }} />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Chip
                label={status}
                sx={{ backgroundColor: statusBgcolor, color: statusFontColor }}
              />

              <Typography variant="h6">{state.number}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Invoice from
            </Typography>

            <Typography variant="body2">Restoap</Typography>

            <Typography variant="body2"> First Floor, Adamstar Building, Kakkanad</Typography>

            <Typography variant="body2">Phone: 95447 77388</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Invoice to
            </Typography>

            <Typography variant="body2">{state.email}</Typography>

            <Typography variant="body2">
              {/* Seaport Airport Road, Kakkanad, Kochi (Cochin) 682037 India */}
            </Typography>

            <Typography variant="body2">{/* Phone: +91 484 297 2974 */}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              date create
            </Typography>

            <Typography variant="body2">
              {moment(new Date(state.createdAt * 1000)).format('MMM DD YYYY')}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Due date
            </Typography>

            <Typography variant="body2">
              {moment(new Date(state.dueDate * 1000)).format('MMM DD YYYY')}
            </Typography>
          </Grid>
        </Grid>

        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 960 }}>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: '#BB3138', color: 'white' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>

                  <TableCell align="left">Description</TableCell>

                  <TableCell align="left">Qty</TableCell>

                  <TableCell align="right">Unit price</TableCell>

                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* {items.map((row, index) => ( */}
                <TableRow
                  // key={index}
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  }}
                >
                  <TableCell>{state.index + 1}</TableCell>

                  <TableCell align="left">
                    <Box sx={{ maxWidth: 560 }}>
                      <Typography variant="subtitle2">
                        {state.plan} ({state.planInterval}ly)
                      </Typography>

                      {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.description}
                        </Typography> */}
                    </Box>
                  </TableCell>

                  <TableCell align="left">{state?.quantity}</TableCell>

                  {/* <TableCell align="right">{state?.data[0].price.unit_amount_decimal}</TableCell> */}

                  <TableCell align="right">{state.unitPrice / 100}</TableCell>
                  <TableCell align="right">{state.quantity * (state.unitPrice / 100)}</TableCell>
                </TableRow>
                {/* ))} */}

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 2 }} />
                    Subtotal
                  </TableCell>

                  <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 2 }} />
                    {state.subTotal / 100}
                  </TableCell>
                </StyledRowResult>

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  {!state?.discounts?.length === 0 && (
                    <>
                      <TableCell align="right" sx={{ typography: 'body1' }}>
                        Discount
                      </TableCell>

                      <TableCell
                        align="right"
                        width={120}
                        sx={{ color: 'error.main', typography: 'body1' }}
                      >
                        {state.discounts}
                      </TableCell>
                    </>
                  )}
                </StyledRowResult>

                <StyledRowResult>
                  <TableCell colSpan={3} />
                  {!state?.tax?.length === 0 && (
                    <>
                      <TableCell align="right" sx={{ typography: 'body1' }}>
                        Taxes
                      </TableCell>

                      <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                        {state.tax}
                      </TableCell>
                    </>
                  )}
                </StyledRowResult>

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'h6' }}>
                    Total
                  </TableCell>

                  <TableCell align="right" width={140} sx={{ typography: 'h6' }}>
                    {state.total / 100}
                  </TableCell>
                </StyledRowResult>
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <Divider sx={{ mt: 5 }} />

        <Grid container>
          <Grid item xs={12} md={9} sx={{ py: 3 }}>
            <Typography variant="subtitle2">NOTES</Typography>

            <Typography variant="body2">
              We appreciate your business. Should you need us to add VAT or extra notes let us know!
            </Typography>
          </Grid>

          <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
            <Typography variant="subtitle2">Have a Question?</Typography>

            <Typography variant="body2">info@restoap.com</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Box sx={{ padding: '10px' }} display="flex" justifyContent="flex-end">
          <PDFDownloadLink
            document={<InvoicePDF data={state} />}
            fileName={`${state.number} ${moment(new Date(state.createdAt * 1000)).format(
              'MMM DD YYYY'
            )}`}
            style={{ textDecoration: 'none' }}
          >
            <CustomButton value="Download" />
          </PDFDownloadLink>
          <CustomButton value="print" fun={handlePrintInvoice} />
          {status === 'open' && <CustomButton value="Pay" fun={handleInvoicePayment} />}

          <ReactToPrint />
        </Box>

        <Box sx={{ display: 'none' }}>
          <Box ref={invoiceRef}>
            <InvoicePrint data={state} />
          </Box>
        </Box>
      </Card>
    </>
  );
}
