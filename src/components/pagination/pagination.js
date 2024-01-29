import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from '@mui/system';
import { Box, MenuItem, TablePagination, Select, Typography } from '@mui/material';

const StyledSelect = styled(Select)`
  & .MuiOutlinedInput-root {
    border: none;
    outline: none;
  }

  & .MuiSelect-select {
    padding: 5px;
  }
`;

const StyledPagination = styled(Pagination)`
  & .MuiPaginationItem-root {
    color: black !important;
    background-color: transparent !important;
  }

  & .Mui-selected {
    color: white !important;
    background-color: #bb3138 !important;
  }
`;
// eslint-disable-next-line react/no-typos
BasicPagination.PropTypes = {
  count: PropTypes.string,
  page1: PropTypes.string,
  fun: PropTypes.func,
  setLimit: PropTypes.func,
  totalResults: PropTypes.number,
};

// eslint-disable-next-line react/prop-types
export default function BasicPagination({ count, page, fun, setLimit, totalResults, limit }) {
  console.log({ count, page, fun, setLimit, totalResults });
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value, setValue] = useState(5);
  const handleChange = (e) => {
    console.log('limit in pagination', e.target.value);
    setValue(e.target.value);
    // setRowsPerPage(e.target.value);
    setLimit(e.target.value);
    fun(1);
    // rowsPerFun(e.target.value.toString());
  };

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, totalResults);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            width: '100%',
            marginRight: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span>Rows per page</span>
          <StyledSelect value={value} onChange={(e) => handleChange(e)} sx={{ marginLeft: '10px' }}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </StyledSelect>
          {endIndex ? (
            <Typography variant="body1" sx={{ marginLeft: '10px' }}>
              {startIndex}-{endIndex} of {totalResults}
            </Typography>
          ) : (
            ''
          )}
        </Box>
      </Stack>
      <Stack spacing={2}>
        <StyledPagination
          count={count}
          page={page}
          onChange={(event, pag) => fun(parseInt(pag, 10))}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}
