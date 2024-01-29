import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from '@mui/system';
import { Box, MenuItem, TablePagination, Select, Typography } from '@mui/material';

const StyledSelect = styled(Select)(() => ({
  [`& .MuiSelect-select`]: {
    padding: '5px',
    borderRadius: '1px',
  },
}));
// eslint-disable-next-line react/no-typos
StoreCardPagination.PropTypes = {
  count: PropTypes.string,
  page1: PropTypes.string,
  fun: PropTypes.func,
  setLimit: PropTypes.func,
};

// eslint-disable-next-line react/prop-types
export default function StoreCardPagination({ count, page, fun, setLimit, totalResults }) {
  console.log('pagination in card', count, page, fun, setLimit);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value, setValue] = useState(6);
  const handleChange = (e) => {
    console.log('limit', e.target.value);
    setValue(e.target.value);
    // setRowsPerPage(e.target.value);
    setLimit(e.target.value);
    // fun(e.target.value);
    // rowsPerFun(e.target.value.toString());
  };

  const startIndex = (page - 1) * 6 + 1;
  const endIndex = Math.min(page * 6, totalResults);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
      <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          sx={{
            width: '100%',
            marginRight: '15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* <span>Rows per page: </span>
          // <StyledSelect value={value.toString()} onChange={(e) => handleChange(e)}>
          //   <MenuItem value="6">6</MenuItem>
          //   <MenuItem value="12">12</MenuItem>
          //   <MenuItem value="18">18</MenuItem>
          // </StyledSelect> */}
          <Typography variant="body1">
            {startIndex}-{endIndex} of {totalResults}
          </Typography>
        </Box>
      </Stack>
      <Stack spacing={2}>
        <Pagination
          count={count}
          page={page}
          // color="primary"
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
          onChange={(event, pag) => fun(parseInt(pag, 10))}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}
