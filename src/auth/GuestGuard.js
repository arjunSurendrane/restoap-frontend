import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// components
import LoadingScreen from '../components/loading-screen';
//
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized, user } = useAuthContext();

  if (isAuthenticated && user?.isEmailVerified) {
    return <Navigate to="/dashboard" />;
  }
  <Navigate to="/email-verification" />;

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
