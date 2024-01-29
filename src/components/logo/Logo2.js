import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
const Logo2 = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // eslint-disable-next-line no-shadow
  const Logo2 = (
    <Box
      component="img"
      src="/logo/logo_single.png"
      sx={{
        width: '100%',
        height: 40,
        cursor: 'pointer',
        backgroundColor:"#f3f3f4",
        // backgroundColor:"#F7F8F9",


        // boxShadow: '0px 4px 4px 2px rgba(0, 0, 0, 0.05)',
        ...sx,
      }}
    />
  );

  if (disabledLink) {
    return Logo2;
  }

  return (
    <Link component={RouterLink} to="/" sx={{ display: 'contents' }}>
      {Logo2}
    </Link>
  );
});

// eslint-disable-next-line no-undef
Logo2.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

// eslint-disable-next-line no-undef
export default Logo2;
