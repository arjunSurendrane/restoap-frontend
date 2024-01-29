import { Autocomplete, InputAdornment, TextField, Typography } from '@mui/material';
import { parse } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { paramCase } from 'change-case';
import { useNavigate } from 'react-router';
import { match } from 'stylis';
import SearchIcon from '@mui/icons-material/Search';
import { CustomTextField } from '../../../components/custom-input';
import Iconify from '../../../components/iconify';
import Image from '../../../components/image';
import Link from '../../../theme/overrides/Link';

OrderSearch.propTypes = {
  setFilteredOrders: PropTypes.func,
  orders: PropTypes.array,

};

function OrderSearch({ setFilteredOrders, orders }) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  // Function to handle search
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchText(searchTerm);
  };
  // Useffect to handle search
  useEffect(() => {
    if (!searchText) {
      setFilteredOrders(orders);
    } else {
      const result = orders.filter((order) => order.tableNo === searchText);
      setFilteredOrders(result);
      // setOrderStatus([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, orders]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      placeholder="Search tables..."
      value={searchText}
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ width: '300px' }}
    />
  );
}

export default OrderSearch;
