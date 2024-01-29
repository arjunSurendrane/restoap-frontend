import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import BackgroundIllustration from './BackgroundIllustration';

// ----------------------------------------------------------------------

function PageNotFoundIllustration({ ...other }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  const PRIMARY_DARKER = theme.palette.primary.darker;

  return (
    <Box {...other}>
      <img src="/assets/illustrations/characters/404.svg" alt="" />
    </Box>
  );
}

export default memo(PageNotFoundIllustration);
