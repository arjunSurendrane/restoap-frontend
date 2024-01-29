// import * as React from 'react';
// import Pagination from '@mui/material/Pagination';
// import Box from '@mui/material/Box';
// import { styled } from '@mui/system';
// import { MenuItem, Select } from '@mui/material';

// const StyledPagination = styled(Pagination)(() => ({
//     [`button`]: {
//         border: '1px solid #D9D9D9',
//         backgroundColor: '#F5F5F5',
//         margin: '3px'
//     }
// }));

// const StyledSelect = styled(Select)(() => ({
//     [`& .MuiSelect-select`]: {
//         padding: '0.5em',
//         borderRadius: '1px'
//     }
// }));

// export default function CustomTablePagination({ count, rowsPerPage, onPageChange, setRowsPerPage }) {
//     const handleChange = (e) => {
//         onPageChange(0);
//         setRowsPerPage(parseInt(e.target.value));
//     };
//     console.log(Math.ceil(count / rowsPerPage));
//     return (
//         <Box display={'flex'} flexDirection={'row'} width={'100%'} marginTop={1}>
//             <Box sx={{ paddingY: '1em', width: '100%' }}>
//                 <span>Rows per page: </span>
//                 <StyledSelect value={rowsPerPage.toString()} onChange={(e) => handleChange(e)}>
//                     <MenuItem value={'5'}>5</MenuItem>
//                     <MenuItem value={'10'}>10</MenuItem>
//                     <MenuItem value={'15'}>15</MenuItem>
//                 </StyledSelect>
//             </Box>
//             <Box display={'flex'} sx={{ justifyContent: 'end', width: '100%' }}>
//                 <StyledPagination
//                     sx={{ paddingY: '1em' }}
//                     size="small"
//                     color="primary"
//                     shape="rounded"
//                     onChange={(event, page) => onPageChange(parseInt(page - 1, 10))}
//                     count={Math.ceil(count / rowsPerPage)}
//                 />
//             </Box>
//         </Box>
//     );
// }

import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box, MenuItem, styled, Select } from '@mui/material';
import PropTypes from 'prop-types';

CustumPagination.propTypes = {
  count: PropTypes.number,
  setCurrentPage: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  setRowsPerPage: PropTypes.func,
};

const StyledSelect = styled(Select)`
  & .MuiOutlinedInput-root {
    border: none;
    outline: none;
  }

  & .MuiSelect-select {
    padding: 5px;
  }
`;

export default function CustumPagination({
  count,
  setCurrentPage,
  page,
  rowsPerPage,
  setRowsPerPage,
}) {
  const handlePaginationOnchange = (e) => {
    setCurrentPage(Number(e.target.textContent));
  };
  const handleChange = (e) => {
    setCurrentPage(1);
    setRowsPerPage(e.target.value);
  };
  console.log(`----page-----${page}`);
  return (
    <Stack spacing={2} display="flex" flexDirection="row" justifyContent="end">
      <Box sx={{ paddingX: '3em', paddingY: '1em' }}>
        <span>Rows per page: </span>

        <StyledSelect value={rowsPerPage.toString()} onChange={(e) => handleChange(e)}>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="15">15</MenuItem>
        </StyledSelect>
      </Box>
      <Pagination
        count={count}
        page={Number(page)}
        variant="outlined"
        color="primary"
        shape="rounded"
        onChange={handlePaginationOnchange}
      />
    </Stack>
  );
}
