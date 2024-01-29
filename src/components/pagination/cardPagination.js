import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from '@mui/system';
import { Box, MenuItem, TablePagination, Select } from '@mui/material';

const StyledSelect = styled(Select)(() => ({
  [`& .MuiSelect-select`]: {
    padding: '5px',
    borderRadius: '1px',
  },
}));
// eslint-disable-next-line react/no-typos
CardPagination.PropTypes = {
  count: PropTypes.string,
  page1: PropTypes.string,
  fun: PropTypes.func,
  setLimit: PropTypes.func,
  rowPerpage:PropTypes.number
};

// eslint-disable-next-line react/prop-types
export default function CardPagination({ count, page, fun, setLimit,rowPerpage }) {
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value, setValue] = useState(rowPerpage||8);
  const handleChange = (e) => {
    console.log('limit', e.target.value);
    setValue(e.target.value);
    // setRowsPerPage(e.target.value);
    setLimit(e.target.value);
    fun(1);
    // rowsPerFun(e.target.value.toString());
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
      <Stack spacing={2}>
        <Box sx={{ width: '100%', marginRight: '15px' }}>
          <span>Rows per page: </span>
          <StyledSelect value={value.toString()} onChange={(e) => handleChange(e)}>
            <MenuItem value={rowPerpage||8}>{rowPerpage||8}</MenuItem>
            <MenuItem value={rowPerpage*2||16}>{rowPerpage*2||16}</MenuItem>
            <MenuItem value={rowPerpage*3||32}>{rowPerpage*3||32}</MenuItem>
          </StyledSelect>
        </Box>
      </Stack>
      <Stack spacing={2}>
        <Pagination
          count={count}
          page={page}
          color="primary"
          onChange={(event, pag) => fun(parseInt(pag, 10))}
          variant="outlined"
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              color: 'black !important',
              backgroundColor: 'transparent !important',
              '&.Mui-selected': {
                color: 'white !important',
                backgroundColor: '#BB3138 !important',
              },
            },
          }}
        />
      </Stack>
    </Box>
  );
}
