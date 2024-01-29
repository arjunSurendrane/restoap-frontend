// i18n
import './locales/i18n';

// scroll bar
import 'simplebar/src/simplebar.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
// redux
import { store, persistor } from './redux/store';

// routes.
import Router from './routes';
// theme
import ThemeProvider from './theme';
// locales
import ThemeLocalization from './locales';
// components
import SnackbarProvider from './components/snackbar';
import { ThemeSettings, SettingsProvider } from './components/settings';
import { MotionLazyContainer } from './components/animate';
import ScrollToTop from './components/scroll-to-top';

// Check our docs
// https://docs.minimals.cc/authentication/js-version

import { AuthProvider } from './auth/JwtContext';
import Page404 from './pages/Page404';

// ----------------------------------------------------------------------

export default function App() {
  // if (navigator.onLine) {
  //   console.log("online");
  // } else {
  //   console.log("offline");
  //   return (
  //     <div>
  //       Offline
  //     </div>
  //   )
  // }
  return (
    <AuthProvider>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SettingsProvider>
              <BrowserRouter>
                <ScrollToTop />
                <MotionLazyContainer>
                  <ThemeProvider>
                    {/* <ThemeSettings> */}
                    <ThemeLocalization>
                      <SnackbarProvider>
                        <Router />
                      </SnackbarProvider>
                    </ThemeLocalization>
                    {/* </ThemeSettings> */}
                  </ThemeProvider>
                </MotionLazyContainer>
              </BrowserRouter>
            </SettingsProvider>
          </PersistGate>
        </ReduxProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}
