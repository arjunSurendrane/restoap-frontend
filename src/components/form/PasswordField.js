import React, { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';
import { RHFTextField } from '../hook-form';
import Iconify from '../iconify';

PasswordField.propTypes = {
  showPassword: PropTypes.string,
  toggleShowPassword: PropTypes.string,
};

function PasswordField({ showPassword, toggleShowPassword, ...rest }) {
  return (
    <RHFTextField
      name="password"
      label="Password"
      type={showPassword ? 'text' : 'password'}
      size="small"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleShowPassword} edge="end">
              <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
}

export default PasswordField;
