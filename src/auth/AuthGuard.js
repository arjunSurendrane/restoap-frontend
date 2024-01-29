import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// components
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../components/loading-screen';
//
import Login from '../pages/auth/LoginPage';
import { useAuthContext } from './useAuthContext';
// import { socket } from '../utils/socket';
import { HOST_API_KEY } from '../config-global';
import { getOrders } from '../redux/slices/order';
import { addNotification } from '../redux/slices/notification';
import PricingPage from '../pages/subscriptions/subscriptions';
import { getCurrentCountryCode } from '../redux/slices/countryCode';
import { getStore } from '../redux/slices/branch';
import WarningPopUp from '../components/PopUp/WarningPopUp';
import InactiveStorePopup from '../pages/InactiveStorePopup';
import notificationSound from '../assets/sounds/notification.mp3'

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  // Logs the children prop to the console.

  // Gets the dispatch function from the Redux store.
  const dispatch = useDispatch();

  // Gets the isAuthenticated, isInitialized, and user properties from the AuthContext.
  const { isAuthenticated, isInitialized, user } = useAuthContext();

  // Gets the branch property from the Redux store.
  const { branch } = useSelector((state) => state.branch);

  // Gets the pathname property from the useLocation hook.
  const { pathname } = useLocation();

  // Effect hook to dispatch the getStore action when the user.storeId property changes.
  useEffect(() => {
    if (user?.storeId) {
      dispatch(getStore(user.storeId));
    }
  }, [dispatch, user]);

  // Effect hook to connect to the WebSocket server and listen for orderChanged events.
  useEffect(() => {
    console.log('here in socket function');
    const socket = io(`${HOST_API_KEY.split('v1')[0]}`, {
      auth: { token: localStorage.getItem('accessToken') },
    });

  const connectHandler = () => {
    console.log('connected to websocket');
  };

  const orderChangedHandler = (data) => {
    const { storeId } = data;
    dispatch(getOrders({ storeId }));
  };

  const notificationHandler = (data) => {
    dispatch(addNotification(data));
    const sound = new Audio(notificationSound);
    sound.play();
  };

  socket.on('connect', connectHandler);
  socket.on('orderChanged', orderChangedHandler);
  socket.on('notification', notificationHandler);

  dispatch(getCurrentCountryCode());

  // Cleanup: Remove event listeners when the component unmounts
  return () => {
    socket.off('connect', connectHandler);
    socket.off('orderChanged', orderChangedHandler);
    socket.off('notification', notificationHandler);
    socket.disconnect();
  };
  }, [dispatch]);

  // State variable to store the requested location.
  const [requestedLocation, setRequestedLocation] = useState(null);

  // If the isInitialized property is false, return a LoadingScreen component.
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  // If the isAuthenticated property is false, return a Login component.
  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  // Gets the plan and roles properties from the user object.
  const { plan, roles } = user;

  // If the first role in the roles array is superAdmin and the plan does not have a planId property, return a PricingPage component.
  if (roles[0].name === 'superAdmin') {
    if (!plan?.planId) {
      return <PricingPage />;
    }
  } else if (branch && branch.isActive === false) {
    return <InactiveStorePopup />;
  }

  // If the requestedLocation is not null and the pathname is not equal to the requestedLocation, navigate to the requestedLocation.
  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  // Return the children prop.
  return <> {children} </>;
}
