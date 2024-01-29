import PropTypes from 'prop-types';
import { Page, View, Image, Document } from '@react-pdf/renderer';
import { Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

InvoicePrint.propTypes = {
  data: PropTypes.object,
};

export default function InvoicePrint({ data }) {
  const StyledRowResult = styled(TableRow)(({ theme }) => ({
    '& td': {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  }));
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const styles = {
    page: {
      padding: '40px 24px 0 24px',
      fontSize: 9,
      lineHeight: 1.6,
      fontFamily: 'Roboto',
      backgroundColor: '#fff',
      textTransform: 'capitalize',
    },
    gridContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    col4: { width: '25%' },
    col8: { width: '75%' },
    col6: { width: '50%' },
    mb8: { marginBottom: 8 },
    mb40: { marginBottom: 40 },
    overline: {
      fontSize: 8,
      marginBottom: 8,
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    h3: { fontSize: 10, fontWeight: 500, color: data.status === 'paid' ? 'green' : '#BB3138' },
    h4: { fontSize: 13, fontWeight: 700 },
    body1: { fontSize: 15 },
    subtitle2: { fontSize: 9, fontWeight: 700 },
    alignRight: { textAlign: 'right' },
    footer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: 24,
      margin: 'auto',
      borderTopWidth: 1,
      borderStyle: 'solid',
      borderColor: '#DFE3E8',
    },
    table: { display: 'flex', width: 'auto' },
    tableHeader: {},
    tableBody: {},
    tableRow: {
      padding: '8px 0',
      display: 'flex',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: '#DFE3E8',
    },
    noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
    tableCell_1: { width: '5%' },
    tableCell_2: { width: '50%', paddingRight: 16 },
    tableCell_3: { width: '15%' },
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Box sx={{ padding: '25px' }}>
          <Box
            sx={{
              display: 'flex',
              marginBottom: '60px',
              justifyContent: 'space-between',
              alignItems: 'center',

              // alignContent: 'center',
            }}
          >
            <Box>
              <img src="/logo/logo_single.png" alt="" style={{ height: '32px' }} />
            </Box>
            <Box
              sx={
                {
                  //   alignItems: 'flex-end',
                  //   flexDirection: 'column',
                  //   textAlign: 'right',
                }
              }
            >
              <Typography variant="h3" sx={styles.h3}>
                {data?.status}
              </Typography>
              <Typography>{data?.number}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              marginBottom: '60px',
              justifyContent: 'space-between',
              alignItems: 'center',
              //   marginLeft: '30px',
              width: '100%',
              gap: '200px',
            }}
          >
            <Box sx={styles.col6}>
              <Typography variant="overline" sx={styles.mb8}>
                Invoice from
              </Typography>
              <Typography sx={styles.body1}>Restoap</Typography>
              <Typography sx={styles.body1}>First Floor, Adamstar Building, Kakkanad</Typography>
              <Typography sx={styles.body1}>Phone: 95447 77388</Typography>
            </Box>

            <Box sx={styles.col6}>
              <Typography variant="overline" sx={styles.mb8}>
                Invoice to
              </Typography>
              <Typography sx={styles.body1}>{data.email}</Typography>
              <Typography sx={styles.body1}>
                {/* Seaport Airport Road, Kakkanad, Kochi (Cochin) 682037 India */}
              </Typography>
              {/* <Typography sx={styles.body1}>Phone: +91 484 297 2974</Typography> */}
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              marginBottom: '60px',
              justifyContent: 'space-between',
              alignItems: 'center',
              //   marginLeft: '30px',
              width: '100%',
              gap: '200px',
            }}
          >
            <Box sx={styles.col6}>
              <Typography variant="overline" sx={styles.mb8}>
                Date create
              </Typography>
              <Typography sx={styles.body1}>
                {' '}
                {moment(new Date(data.createdAt * 1000)).format('MMM DD YYYY')}
              </Typography>
            </Box>
            <Box sx={styles.col6}>
              <Typography variant="overline" sx={styles.mb8}>
                Due date
              </Typography>
              <Typography sx={styles.body1}>
                {' '}
                {moment(new Date(data.dueDate * 1000)).format('MMM DD YYYY')}
              </Typography>
            </Box>
          </Box>

          <Typography variant="overline" sx={{ marginBottom: '8px' }}>
            Invoice Details
          </Typography>

          <div>
            {/* <Box sx={styles.table}>
              <Box sx={styles.tableHeader}>
                <Box sx={styles.tableRow}>
                  <Box sx={styles.tableCell_1}>
                    <Typography variant="subtitle2">#</Typography>
                  </Box>

                  <Box sx={styles.tableCell_2}>
                    <Typography variant="subtitle2">Description</Typography>
                  </Box>

                  <Box sx={styles.tableCell_3}>
                    <Typography variant="subtitle2">Qty</Typography>
                  </Box>

                  <Box sx={styles.tableCell_3}>
                    <Typography variant="subtitle2">Unit price</Typography>
                  </Box>

                  <Box sx={{ ...styles.tableCell_3, ...styles.alignRight }}>
                    <Typography variant="subtitle2">Total</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={styles.tableBody}>
                {/* Example table row */}
            {/* <Box sx={styles.tableRow}>
                  <Box sx={styles.tableCell_1}>
                    <Typography>1</Typography>
                  </Box>

                  <Box sx={styles.tableCell_2}>
                    <Typography variant="subtitle2">Basic</Typography>
                  </Box>

                  <Box sx={styles.tableCell_3}>
                    <Typography>1</Typography>
                  </Box>

                  <Box sx={styles.tableCell_3}>
                    <Typography>1300</Typography>
                  </Box>

                  <Box sx={{ ...styles.tableCell_3, ...styles.alignRight }}>
                    <Typography>1300</Typography>
                  </Box>
                </Box>
              

            
            {/* </Box> */}
            {/* </Box> */}
            <TableContainer>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{ backgroundColor: '#BB3138' }}>#</StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: '#BB3138' }} align="right">
                      Description
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: '#BB3138' }} align="right">
                      Qty
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: '#BB3138' }} align="right">
                      Unit Price
                    </StyledTableCell>
                    <StyledTableCell style={{ backgroundColor: '#BB3138' }} align="right">
                      Total
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {data.index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {' '}
                      {data.plan} ({data.planInterval}ly)
                    </StyledTableCell>
                    <StyledTableCell align="right">{data?.quantity}</StyledTableCell>
                    <StyledTableCell align="right">{data.unitPrice / 100}</StyledTableCell>
                    <StyledTableCell align="right">
                      {data.quantity * (data.unitPrice / 100)}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />

          <StyledRowResult>
            <TableCell colSpan={8} sx={{ width: '75%' }} />

            <TableCell align="right" sx={{ typography: 'body1' }}>
              <Box sx={{ mt: 2 }} />
              Subtotal
            </TableCell>

            <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
              <Box sx={{ mt: 2 }} />
              {data.subTotal / 100}
            </TableCell>
          </StyledRowResult>

          {!data?.discounts?.length === 0 && (
            <StyledRowResult>
              <TableCell colSpan={8} sx={{ width: '75%' }} />

              <TableCell align="right" sx={{ typography: 'body1' }}>
                Discount
              </TableCell>

              <TableCell
                align="right"
                width={120}
                sx={{ color: 'error.main', typography: 'body1' }}
              >
                1100
              </TableCell>
            </StyledRowResult>
          )}
          {!data?.tax?.length === 0 && (
            <StyledRowResult>
              <TableCell colSpan={8} sx={{ width: '75%' }} />
              <TableCell align="right" sx={{ typography: 'body1' }}>
                Taxes
              </TableCell>

              <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                10%
              </TableCell>
            </StyledRowResult>
          )}

          <StyledRowResult>
            <TableCell colSpan={8} sx={{ width: '75%' }} />

            <TableCell align="right" sx={{ typography: 'h6' }}>
              Total
            </TableCell>

            <TableCell align="right" width={140} sx={{ typography: 'h6' }}>
              {data.total / 100}
            </TableCell>
          </StyledRowResult>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              position: 'fixed',
              bottom: 0,
              paddingRight: '10px',
              paddingBottom: '15px',
            }}
          >
            <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} />
            <Box sx={styles.col8}>
              <Typography variant="subtitle2">NOTES</Typography>
              <Typography>
                We appreciate your business. Should you need us to add VAT or extra notes let us
                know!We appreciate your business.
              </Typography>
            </Box>
            <Box sx={{ ...styles.col4, ...styles.alignRight }}>
              <Typography variant="subtitle2">Have a Question?</Typography>
              <Typography>info@restoap.com</Typography>
            </Box>
            {/* <Divider sx={{ marginTop: '15px', marginBottom: '15px' }} /> */}
          </Box>
        </Box>
      </Page>
    </Document>
  );
}
