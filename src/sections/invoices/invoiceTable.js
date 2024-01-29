/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Modal,
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
  useMediaQuery,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  TextField,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CustomizedTables from '../../components/table/MuiCustomTable';
import SvgColor from '../../components/svg-color/SvgColor';
import NoResultFound from '../../pages/NoResultPage';
import InvoicePDF from './invoicePdf';

InvoiceTable.propTypes = {
  invoices: PropTypes.array,
};

function InvoiceTable({ invoices }) {
  console.log('invoices inside table', invoices);
  const today = new Date(Date.now());
  console.log({ today });
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      borderBottom: 'none', // Remove the default bottom border
      borderRight: '2px solid white', // Add a right border with white color
      padding: '8px', // Add padding to cells
    },

    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      borderBottom: 'none', // Remove the default bottom border
      borderRight: '2px solid white', // Add a right border with white color
      padding: '8px', // Add padding to cells
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
    '&:last-child td, &:last-child th': {},
  }));
  const navigate = useNavigate();

  const handleInvoiceDetail = (data) => {
    console.log(data, 'data console');

    navigate(`/dashboard/billing/invoices/invoiceDetails`, { state: data });
  };

  return (
    <CustomizedTables
      tableLabels={[
        { id: 'invoiceNo', label: 'Invoice No' },
        { id: 'description', label: 'Description' },
        { id: 'invoiceDate', label: 'Invoice Date' },
        { id: 'invoiceStatus', label: 'Invoice Status' },
        { id: 'amount', label: 'Amount' },
        { id: 'Actions', label: 'Actions' },
      ]}
    >
      {invoices ? (
        invoices?.map((data) => {
          const past_due = new Date(data.dueDate * 1000) < today;
          // eslint-disable-next-line no-unneeded-ternary
          const status = data.status === 'paid' ? 'paid' : past_due ? 'past due' : 'open';
          const statusBgcolor =
            data.status === 'paid' ? '#71C488' : past_due ? '#ffe7f2' : '#cff5f6';
          const statusFontColor =
            data.status === 'paid' ? '#2E7140' : past_due ? '#b3093c' : '#0055bc';
          // const statusBgcolor = data.status === 'paid' ? '#006908' : past_due ? '#b3093c' : '#0055bc'
          // const statusFontColor = 'white'
          return (
            <StyledTableRow>
              <StyledTableCell>{data.number}</StyledTableCell>
              <StyledTableCell>
                {data.plan} ({data.planInterval}ly)
              </StyledTableCell>

              <StyledTableCell>
                {moment(new Date(data.createdAt * 1000)).format('DD-MM-YYYY')}
              </StyledTableCell>
              <StyledTableCell>
                {' '}
                <Chip
                  sx={{
                    backgroundColor: statusBgcolor,
                    color: statusFontColor,
                  }}
                  label={status}
                />
              </StyledTableCell>
              <StyledTableCell>{(data.total / 100).toFixed(2)}/-</StyledTableCell>
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
                    onClick={() => handleInvoiceDetail(data)}
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

                  <PDFDownloadLink
                    document={<InvoicePDF data={data} />}
                    fileName={`${data.number} ${moment(new Date(data.createdAt * 1000)).format(
                      'MMM DD YYYY'
                    )}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Box
                      sx={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#1699D7',
                        color: 'white',
                        borderRadius: '8px',
                        border: '2px solid white',
                        boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.24)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <SvgColor src="/assets/icons/branch/Download.svg" />
                    </Box>
                  </PDFDownloadLink>
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          );
        })
      ) : (
        <NoResultFound />
      )}
    </CustomizedTables>
  );
}

export default InvoiceTable;
