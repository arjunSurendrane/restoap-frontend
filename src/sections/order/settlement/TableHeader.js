import { Box, InputBase, alpha, styled, Button, Grid } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import DineInIcon from '../../../assets/icons/DineInIcon';
import DineInGreenIcon from '../../../assets/icons/DineInGreen';
import TakeAwayIcon from '../../../assets/icons/TakeAwayOrange';
import OrderSearch from './OrderSearch';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: 280,
  minWidth: 280,
  marginTop: 0,
  border: '1px solid #212B36',
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(1),
    border: '1px solid #212B36',
    width: '280px',
    minWidth: 280,
    marginTop: '15px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

TableHeader.propTypes = {
  setFilterContent: PropTypes.func,
  filterContent: PropTypes.string,
};

function TableHeader({ setFilterContent, filterContent }) {
  return (
    <Box width="100%" height="40px" display="flex" justifyContent="space-between" mb="15px">
      <Box height="100%">
        <OrderSearch />
      </Box>
      <Box height="100%" display="flex" justifyContent="end" gap={2}>
        <Button
          sx={{
            minWidth: '150px',
            border: '2px solid #FFF',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
          }}
          variant={filterContent === 'allOrders' ? 'contained' : 'outlined'}
          onClick={() => setFilterContent('allOrders')}
        >
          All Orders
        </Button>

        <Button
          startIcon={<TakeAwayIcon sx={{ color: '#F57C24' }} />}
          sx={
            !filterContent === 'take_away'
              ? { minWidth: '150px', border: '2px solid #F57C24', color: '#F57C24' }
              : { border: '2px solid #F57C24', minWidth: '150px' }
          }
          variant={filterContent === 'take_away' ? 'contained' : 'outlined'}
          onClick={() => setFilterContent('take_away')}
        >
          Take Away
        </Button>
      </Box>
    </Box>
  );
}

export default TableHeader;
