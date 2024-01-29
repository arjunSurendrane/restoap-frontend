import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  InputAdornment,
  Fab,
  Button,
  Chip,
  TextField,
  FormHelperText,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  useMediaQuery,
} from '@mui/material';

InvoiceWidget.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.string,
};

function InvoiceWidget({ icon, title, data }) {
  const isTablet = useMediaQuery('(min-width: 768px)');
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        backgroundColor: '#FEE',
        border: '2px solid #FFF',
        boxShadow: '0px 4px 4px 2px rgba(0, 0, 0, 0.05)',
        borderRadius: '8px',
        maxHeight: '120px',
      }}
    >
      <div>
        <Typography
          variant="subtitle2"
          sx={{ color: '#212B36', fontSize: '16px', fontWeight: '400' }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: '14px', fontWeight: '500', color: '#212B36' }}>
          {data}
        </Typography>
      </div>

      <Box
        sx={{
          width: 90,
          lineHeight: 0,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          //   bgcolor: 'background.neutral',
        }}
      >
        <img
          src={icon}
          // src="/assets/illustrations/invoiceAmount.png"
          alt=""
        />
      </Box>
    </Card>
  );
}

export default InvoiceWidget;
