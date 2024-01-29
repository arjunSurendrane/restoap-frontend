import { Switch, styled } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const MaterialUISwitch = styled(Switch)(({ bg }) => ({
  width: 61,
  height: 25,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    marginTop: 5,
    transform: 'translateX(5px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(36px)',
      '& .MuiSwitch-thumb:before': {
        padding: '2px',
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundColor: bg, // Your circle color
        borderRadius: '50%',
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: bg,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    // backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 20,
    height: 20,
    padding: '5px',
    borderRadius: '6px',
    border: `2px solid ${bg}`,
    margin: '-3px',

    '&:before': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundColor: bg, // Your circle color
      borderRadius: '50%',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: 'grey',
    borderRadius: 20 / 2,
  },
}));

function VegNonVeg({ color, checked }) {
  return <MaterialUISwitch bg={color} checked={checked} />;
}

VegNonVeg.propTypes = {
  color: PropTypes.string,
  checked: PropTypes.bool,
};

export default VegNonVeg;
