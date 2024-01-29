import { Autocomplete, Box, InputAdornment, Typography } from '@mui/material';
import { parse } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paramCase } from 'change-case';
import { useNavigate } from 'react-router';
import { match } from 'stylis';
import { CustomTextField } from '../../../components/custom-input';
import Iconify from '../../../components/iconify';
import Image from '../../../components/image';
import Link from '../../../theme/overrides/Link';
import { getMainOrder } from '../../../redux/slices/order';

OrderSearch.propTypes = {
  search: PropTypes.func,
};

function OrderSearch({ search }) {
  const dispatch = useDispatch();
  const { branch } = useSelector((state) => state.branch);
  const handleKeyUp = (e) => {
    console.log('handle key up');
    console.log(e.target.value);
    dispatch(getMainOrder({ storeId: branch.id, status: 'open', search: e.target.value }));
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <CustomTextField
        width={220}
        size="small"
        placeholder="Search Table..."
        onKeyUp={handleKeyUp}
        autoComplete={false}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        inputProps={{
          name: Math.random().toString(36).substring(7),
        }}
      />
    </Box>
  );
}

export default OrderSearch;
