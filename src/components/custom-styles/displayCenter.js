import React from 'react';
import { Box } from '@mui/material';

// eslint-disable-next-line react/prop-types
const CenteredContent = ({ children }) => (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Ensures the content takes up the entire viewport height
    >
      {children}
    </Box>
  )

export default CenteredContent;