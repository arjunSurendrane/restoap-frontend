// @mui
import { styled, alpha } from '@mui/material/styles';
// utils
import { bgGradient } from '../../utils/cssStyles';

// ----------------------------------------------------------------------

export const StyledRoot = styled('main')(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  position: 'relative',
  backgroundImage: 'linear-gradient(167deg,  #EEF3F9 0%, #FFFFFD 100%)',
}));

export const StyledSection = styled('div')(({ theme }) => ({
  display: 'none',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    display: 'flex',
    width: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    background: '#FFFFFF',
  },
}));

export const StyledSectionBg = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  top: 0,
  left: 0,
  zIndex: -1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  transform: 'scaleX(-1)',
}));

export const StyledContent = styled('div')(({ theme }) => ({
  width: '100%',
  margin: 'auto',
  display: 'flex',
  minHeight: '100%',
  justifyContent: 'center',
  padding: theme.spacing(15, 2),
  [theme.breakpoints.up('md')]: {
    flexShrink: 0,
    padding: theme.spacing(20, 8, 10, 8),
  },
  // backgroundImage: 'linear-gradient(167deg,  #EEF3F9 0%, #FFFFFD 100%)',
}));
