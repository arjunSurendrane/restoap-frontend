import { Button } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

BreadcrumbsButton.propTypes = {
  value: PropTypes.object,
  path: PropTypes.string,
  icon: PropTypes.node,
  fun: PropTypes.node,
};

function BreadcrumbsButton({ value, path, icon, fun }) {
  return (
    <Button
      // component={RouterLink}
      // to={path}
      onClick={() => fun()}
      sx={{
        backgroundColor: '#FFEEEE',
        color: '#BB3138',
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

export default BreadcrumbsButton;
