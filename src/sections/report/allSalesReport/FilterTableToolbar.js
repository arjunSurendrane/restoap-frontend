import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Stack, InputAdornment, TextField, MenuItem, Button, styled, Box, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

const CustomDatePicker = styled(DatePicker)`
  .MuiInputBase-root {
    height: 40px; /* Adjust the height as needed */
    overflow: hidden; /* Hide overflow */
  }
  .MuiInput-input::placeholder {
    text-align: center; /* Center-align the placeholder text */
  }

  .MuiPickersPopper-container {
    height: auto; /* Adjust the calendar pop-up height as needed */
    overflow: hidden; /* Hide overflow */
  }
`;

FilterTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onResetFilter: PropTypes.func,
  filterService: PropTypes.string,
  onFilterEndDate: PropTypes.func,
  onFilterService: PropTypes.func,
  onFilterStartDate: PropTypes.func,
  filterEndDate: PropTypes.instanceOf(Date),
  filterStartDate: PropTypes.instanceOf(Date),
  optionsService: PropTypes.arrayOf(PropTypes.string),
};

export default function FilterTableToolbar({
  isFiltered,
  filterName,
  onFilterName,
  filterEndDate,
  filterService,
  onResetFilter,
  optionsService,
  filterStartDate,
  onFilterService,
  onFilterEndDate,
  onFilterStartDate,
}) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
        <TextField
          fullWidth
          select
          label="Service types"
          value={filterService}
          onChange={onFilterService}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: { maxHeight: 220 },
              },
            },
          }}
          sx={{
            maxWidth: { md: INPUT_WIDTH },
            textTransform: 'capitalize',
          }}
        >
          {optionsService.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                mx: 1,
                borderRadius: 0.75,
                typography: 'body2',
                textTransform: 'capitalize',
              }}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>

        {' '}
        <Grid>
          {' '}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Start date"
                value={filterStartDate}
                onChange={onFilterStartDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{
                      maxWidth: { md: INPUT_WIDTH },
                    }}
                  />
                )}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="End date"
            value={filterEndDate}
            onChange={onFilterEndDate}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{
                  maxWidth: { md: INPUT_WIDTH },
                }}
              />
            )}
          />
        </LocalizationProvider>

        <TextField
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Search client or invoice number..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />

        {isFiltered && (
          <Button
            color="error"
            sx={{ flexShrink: 0 }}
            onClick={onResetFilter}
            startIcon={<Iconify icon="eva:trash-2-outline" />}
          >
            Clear
          </Button>
        )}
    </Stack>
  );
}
