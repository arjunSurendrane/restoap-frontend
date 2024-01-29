import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  Box,
  Typography,
  LinearProgress,
} from '@mui/material';

// utils
import { bgBlur } from '../../../utils/cssStyles';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// config
import { HEADER, NAV } from '../../../config-global';
// components
import Logo from '../../../components/logo';
import Iconify from '../../../components/iconify';
import { useSettingsContext } from '../../../components/settings';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import ContactsPopover from './ContactsPopover';
import NotificationsPopover from './NotificationsPopover';
import BasicSelect from './SelectBranch';
import HasPermission from '../../../auth/RightGuard';
import { useAuthContext } from '../../../auth/useAuthContext';

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const { themeLayout } = useSettingsContext();
  const isNavHorizontal = themeLayout === 'horizontal';
  const isNavMini = themeLayout === 'mini';
  const isDesktop = useResponsive('up', 'lg');
  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { user } = useAuthContext();
  const { plan: { status, current_period_end } = {} } = user || {};
  const trialEndDate = new Date(current_period_end);
  const currentDate = new Date();
  const timeDifference = trialEndDate - currentDate;
  const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) ;
  const trianEndDaysInPercentage = (daysRemaining / 14) * 100;

  const trialEndIndication = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography
        variant="body2"
        sx={{
          color: 'error.main', // You can customize the color
          fontWeight: 'bold',
          mr: 1,
        }}
      >
        Trial Period Ends in {daysRemaining} Days
      </Typography>
      <LinearProgress
        variant="determinate"
        value={trianEndDaysInPercentage} // Adjust the value based on the progress (e.g., percentage completed)
        sx={{
          height: 5,
          borderRadius: 10,
          width: '100px', // Adjust the width as needed
        }}
      />
    </Box>
  );

  const renderContent = (
    <>
      {isDesktop && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Searchbar />

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1.5, lg: 3 }}
        // height={20}
      >
        {status === 'trialing' && trialEndIndication}
        <NotificationsPopover />

        {/* <ContactsPopover /> */}

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: 'fit-content',
          boxShadow: '0px 4px 4px 2px rgba(0, 0, 0, 0.05)',

          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
