import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

BreadcrumbsStyle.propTypes = {
  children: PropTypes.element,
};
function BreadcrumbsStyle({ children }) {
  return (
    <Box
      sx={{
        backgroundColor: '#BB3138',
        marginInline: '0px',
        color: 'white',
        paddingInline: '20px',
        paddingTop: '5px',
        borderRadius: '10px',
      }}
    >
      {children}
    </Box>
  );
}

export default BreadcrumbsStyle;
