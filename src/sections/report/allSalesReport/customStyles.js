import { TableCell, TableRow, styled, tableCellClasses } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from '@mui/x-data-grid';

export const StyledDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#BB3138',
    color: 'white',
    borderBottom: 'none', // Remove the default bottom border
    borderRight: '2px solid white', // Add a right border with white color
    padding: '8px', // Add padding to cells
    fontSize: 14,
  },
  '& .MuiSvgIcon-root': {
    color: 'white',
  },
  '& .MuiDataGrid-footerContainer': {
    display: 'none',
  },
  '& .MuiDataGrid-row': {
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
  },
  '$ .MuiDataGrid-cell': {
    borderBottom: 'none',
    borderRight: '2px solid white',
  },
});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border: '2px solid #fff',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: 'none',
    borderRight: '2px solid white',
    padding: '8px',
    textAlign: 'right', // Add right alignment
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#F4F4F4;',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#E6E6E6;',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const CustomDatePicker = styled(DatePicker)`
  .MuiInputBase-root {
    height: 40px; /* Adjust the height as needed */
    overflow: hidden; /* Hide overflow */
  }
  .MuiInput-input::placeholder {
    text-align: center; /* Center-align the placeholder text */
  }

  .MuiPickersPopper-container {
    height: auto; /* Adjust the calendar pop-up height as needed */
    overflow: hidden; /* Hide overflow */
  }
`;
