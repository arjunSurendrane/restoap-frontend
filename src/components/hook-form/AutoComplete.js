import PropTypes from 'prop-types';
// form
import { useFormContext, Controller, useForm } from 'react-hook-form';
// @mui
import { Autocomplete, TextField } from '@mui/material';

// ----------------------------------------------------------------------

MUIAutocomplete.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
};

export default function MUIAutocomplete({ id, name, label, helperText, ...other }) {
  console.log({ id, name, label, helperText, ...other });
  const { control, setValue } = useFormContext();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log('control, setValue', control, setValue);

  return (
    <Controller
      name="store"
      control={control}
      rules={{ required: 'Store is required' }} // Add required validation rule
      render={({ field }) => (
        <Autocomplete
          {...field}
          value={field.value || ''}
          onChange={(event, newValue) => field.onChange(newValue)}
          renderInput={(params) => (
            <TextField
              label="Select Store"
              error={!!errors.store}
              helperText={errors.store?.message}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
