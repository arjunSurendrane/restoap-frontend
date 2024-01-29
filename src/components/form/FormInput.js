import React from 'react';
import PropTypes from 'prop-types';
import { RHFTextField } from '../hook-form';

FormInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

function FormInput({ name, label, ...rest }) {
  return <RHFTextField name={name} label={label} {...rest} />;
}

export default FormInput;
