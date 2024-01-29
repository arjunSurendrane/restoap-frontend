import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { Box, Paper, TableCell, TableRow, Typography, tableCellClasses } from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import CustumPagination from '../../../components/custom-pagination/Pagination';
import SkeletonTableLayout from '../../../components/skeleton/SkeletonTableLayout';
import ReportTableSkelton from '../../../components/skeleton/ReportTableSkelton';
import { useSalesReportTableData } from './hooks/useSalesReportTableData';
import { columns } from './constant';
import { StyledDataGrid, StyledTableCell, StyledTableRow } from './customStyles';


DataTable.propTypes = {
  currentPage: PropTypes.number,
  rowsPerPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  setRowsPerPage: PropTypes.func,
};

const EmptyMessage = () => (
  <Paper style={{ padding: '16px', textAlign: 'center', width: '100%' }}>
    <Typography variant="h6" color="textSecondary">
      No data to display
    </Typography>
  </Paper>
);

export default function DataTable({ currentPage, rowsPerPage, setCurrentPage, setRowsPerPage }) {
  const { count, reportUpdatedData, reportData, isLoadingOrderData } =
    useSalesReportTableData(rowsPerPage);

  if (isLoadingOrderData) return <ReportTableSkelton />;
  if (!reportData[0]?.orders?.length && !isLoadingOrderData) return <EmptyMessage />;

  return (
    <>
      {' '}
      <div>
        <StyledDataGrid rows={reportUpdatedData} columns={columns} getRowId={(row) => row._id} />
      </div>
      <div>
        <StyledTableRow sx={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
          <StyledTableCell sx={{ color: '#BB3138', fontSize: 15, fontWeight: 600 }}>
            Total Sale
          </StyledTableCell>
          <StyledTableCell sx={{ color: '#BB3138', fontSize: 15, fontWeight: 600 }}>
            :
          </StyledTableCell>
          <StyledTableCell sx={{ color: '#BB3138', fontSize: 15, fontWeight: 600 }}>
            ₹{reportData[0]?.totalOrderAmount?.totalAmount.toLocaleString()}{' '}
          </StyledTableCell>
        </StyledTableRow>
        <CustumPagination
          count={count}
          page={currentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}
