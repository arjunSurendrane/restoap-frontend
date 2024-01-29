import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';

function Footer() {
  const isMobileScreen = useMediaQuery('(max-width:475)');
  const year = new Date().getFullYear();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderTopWidth: '3px',
        borderTopStyle: 'solid',
        borderTopColor: '#BB3138',
        fontSize: isMobileScreen ? '5px' : '',
        height: '50px',
        width: '-webkit-fill-available',
        paddingInline: '20px',
        zIndex: '1000',
      }}
    >
      <Box>
        <Typography
          sx={{ fontSize: '12px', fontWeight: 400, color: '#212b36' }}
          variant="subtitle2"
        >
          Copyright © {year}. All Rights reserved RestoAp
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: '12px', fontWeight: 400, color: '#212b36' }}
        >
          Designed & Developed By{' '}
          <a
            style={{ textDecoration: 'none' }}
            href="https://b-jelt.com/"
            target="_blank"
            rel="noreferrer"
          >
            <span style={{ color: '#BB3138', fontSize: '12px', fontWeight: 400 }}>
              B-JeLT Technologies Pvt Ltd
            </span>
          </a>
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
