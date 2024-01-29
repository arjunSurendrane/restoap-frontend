/* eslint-disable react/jsx-no-duplicate-props */
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, FormControlLabel, Switch } from '@mui/material';
import SvgColor from '../svg-color/SvgColor';

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

CustomizedTables.propTypes = {
  tableLabels: PropTypes.array,
  children: PropTypes.element,
  border: PropTypes.number,
};

export default function CustomizedTables({ tableLabels, children, border }) {
  return (
    <TableContainer component={Paper} sx={{ border: `2px solid #BB3138` }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" border={border}>
        <TableHead>
          <TableRow>
            {tableLabels.map((label) => (
              <StyledTableCell>{label.label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
