import { Button } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

CustomButton.propTypes = {
  value: PropTypes.object,
  path: PropTypes.string,
  icon: PropTypes.node,
  fun: PropTypes.object,
  widthValue:PropTypes.string
};

function CustomButton({ value, path, icon, fun,widthValue }) {
  return (
    <Button
      variant="contained"
      onClick={fun}
      
      sx={{
        width:widthValue,
        backgroundColor: '#BB3138',
        borderRadius: '5px',
        color: '#White',
        fontSize:"14px !important",
        fontWeight:500,
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
        border: '#fff 2px solid',
        '&:hover': {
          backgroundColor: '#212b36',
          color: 'white',
        },
      }}
    >
      {value}
    </Button>
  );
}

export default CustomButton;
