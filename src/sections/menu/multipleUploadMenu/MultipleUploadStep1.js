import { Box, Typography } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import React from 'react';
import { saveAs } from 'file-saver';

function MultipleUploadStep1() {
  const saveFile = () => {
    console.log('file downloading');
    saveAs('https://restoap-assets.s3.ap-south-1.amazonaws.com/MenuItem.xlsx');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingInline: '20px',
      }}
    >
      <img src="/assets/icons/Menu/backgoundImageBulkUpload.svg" alt="background" />

      <Typography variant="h4">
        Please download the sample sheet below and fill it with your items.
      </Typography>
      <Typography>You may skip if you already have the sample sheet.</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FileDownloadOutlinedIcon
          sx={{ color: '#BB3138', width: '22px', height: '24px', cursor: 'pointer' }}
          onClick={saveFile}
        />
        <Typography sx={{ color: '#BB3138' }}>Sample spreadsheet for menu imports.</Typography>
      </Box>
    </Box>
  );
}

export default MultipleUploadStep1;
