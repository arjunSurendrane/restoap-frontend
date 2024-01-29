import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

BasicTimePicker.propTypes = {
  label: PropTypes.string,
  setTime: PropTypes.func,
};
export default function BasicTimePicker({ label, setTime }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker label={label} sx={{ width: '100%' }} onChange={(e) => setTime(e.$d)} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
