import PropTypes from 'prop-types';
// @mui
import {
  Stack,
  InputAdornment,
  TextField,
  MenuItem,
  Button,
  Box,
  useMediaQuery,
} from '@mui/material';
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

TableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  filterRole: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterRole: PropTypes.func,
  onResetFilter: PropTypes.func,
  optionsRole: PropTypes.arrayOf(PropTypes.string),
};

export default function TableToolbar({
  isFiltered,
  filterName,
  filterRole,
  optionsRole,
  onFilterName,
  onFilterRole,
  onResetFilter,
}) {
  console.log('filterName', filterName, filterRole);
  const isMobileScreen = useMediaQuery('(max-width:475px)');
  return (
    <Box
      spacing={2}
      // alignItems="center"
      // direction={{
      //   xs: 'column',
      //   sm: 'row',
      // }}
      sx={{ px: 2.5, py: 3 }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: isMobileScreen ? 'column' : 'row',
          gap: isMobileScreen ? '10px' : '',
        }}
      >
        <TextField
          size="small"
          fullWidth
          select
          label="Category"
          value={filterRole}
          onChange={onFilterRole}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  maxHeight: 260,
                },
              },
            },
          }}
          sx={{
            maxWidth: { sm: 240 },
            textTransform: 'capitalize',
          }}
        >
          {optionsRole?.map((option) => (
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
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            // fullWidth
            size="small"
            sx={{ width: '445px' }}
            value={filterName}
            onChange={onFilterName}
            placeholder="Search..."
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
        </Box>
      </Box>
    </Box>
  );
}
