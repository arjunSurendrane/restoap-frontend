import PropTypes from 'prop-types';
// @mui
import { Box, Switch, TablePagination, FormControlLabel, Pagination } from '@mui/material';

// ----------------------------------------------------------------------

TablePaginationCustom.propTypes = {
  dense: PropTypes.bool,
  onChangeDense: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  sx: PropTypes.object,
};

export default function TablePaginationCustom({
  dense,
  onChangeDense,
  rowsPerPageOptions = [5, 10, 25],
  sx,
  ...other
}) {
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <TablePagination rowsPerPageOptions={rowsPerPageOptions} component="div" {...other} />
      {/* <Pagination
        count={rowsPerPageOptions}
        page={rowsPerPageOptions}
        // color="primary"
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'black', // Text color for inactive pages
            backgroundColor: 'transparent', // Background color for inactive pages
            '&.Mui-selected': {
              color: 'white', // Text color for the active page
              backgroundColor: '#BB3138', // Background color for the active page
            },
          },
        }}
        // onChange={(event, pag) => fun(parseInt(pag, 10))}
        variant="outlined"
        shape="rounded"
      /> */}
      {/* {onChangeDense && (
        <FormControlLabel
          label="Dense"
          control={<Switch checked={dense} onChange={onChangeDense} />}
          sx={{
            pl: 2,
            py: 1.5,
            top: 0,
            position: {
              md: 'absolute',
            },
          }}
        />
      )} */}
    </Box>
  );
}
