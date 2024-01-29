import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// @mui
import { Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// config
import { HEADER, NAV } from '../../config-global';
// components
import { useSettingsContext } from '../../components/settings';
import Footer from './footer';

// ----------------------------------------------------------------------

const SPACING = 8;

Main.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
};

export default function Main({ children, sx, ...other }) {
  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const isDesktop = useResponsive('up', 'lg');
  console.log('isDesktop', isDesktop);

  

  if (isNavHorizontal) {
    return (
      <div style={{ width: '100%', height: '100%' }}>
         <ToastContainer />
        <Box
          component="main"
          sx={{
            height: '100%',

            pt: `${HEADER.H_MOBILE + SPACING}px`,
            marginBottom: '65px',
            ...(isDesktop && {
              px: 2,
              pt: `${HEADER.H_DASHBOARD_DESKTOP + 80}px`,
              // pb: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
              marginBottom: '65px',
            }),
          }}
        >
          {children}
        </Box>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', marginBottom: '65px' }}>
       <ToastContainer />
      <Box
        component="main"
        sx={{
          backgroundColor: '#F3F3F4',
          // backgroundColor: 'green',
          // padding: '12px',
          // flexGrow: 1,
          width: '100%',
          minHeight: '100%',
          marginBottom: '65px',
          px: 1,
          // height: '100%',
          py: `${HEADER.H_MOBILE + SPACING}px`,
          ...(isDesktop && {
            px: 2,
            // pt: 2,
            marginBottom: '65px',
            // backgroundColor: 'red',

            // py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
            // height: '100%',
            width: '100%',
            // width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
            ...(isNavMini && {
              // width: `calc(100% - ${NAV.W_DASHBOARD_MINI}px)`,
              width: '100%',
              marginBottom: '65px',
              // height: '100%',
            }),
          }),
          ...sx,
        }}
        {...other}
      >
        {children}
      </Box>

      {isDesktop && <Footer />}
    </div>
  );
}
