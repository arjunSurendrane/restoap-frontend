import PropTypes from 'prop-types';

import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';

import axios from 'axios';

// utils
import API from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, setSession } from './utils';
import { PATH_AUTH } from '../routes/paths';
import { HOST_API_KEY } from '../config-global';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  errorMessage: null,
  isRegisterSuccess: false,
  accessToken: null,
  permissions: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
      permissions: action.payload.user && action.payload.user.roles.map((role) => role.permissions),
    };
  }
  if (action.type === 'LOGIN') {
    console.log('LOGIN');
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      permissions: action.payload.user && action.payload.user.roles.map((role) => role.permissions),
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      isAuthenticated: false,
      user: action.payload.user,
      isRegisterSuccess: action.payload.isRegisterSuccess,
      errorMessage: action.payload.message,
      accessToken: action.payload.accessToken,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      permissions: [],
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const navigate = useNavigate();
  const storageAvailable = localStorageAvailable();
  console.log('initialState', state);

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
      const refreshToken = storageAvailable ? localStorage.getItem('refreshToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken, refreshToken);

        const response = await API.get('/auth/me');

        const user = response.data;
        const permissionKeys = user.roles.map((role) => role.permissions);
        console.log('permissionKeys', permissionKeys);

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user,
            permissions: permissionKeys,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const response = await API.post('/auth/login', {
      email,
      password,
    });

    const { user } = response.data;
    console.log('authUser', user);
    const accessToken = response.data.tokens.access.token;
    const refreshToken = response.data.tokens.refresh.token;

    setSession(accessToken, refreshToken);

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  }, []);

  // REGISTER
  // const register = useCallback(async (firstName, lastName, email, phone, password, roles) => {
  //   try {
  //     const response = await API.post('/auth/register', {
  //       firstName,
  //       lastName,
  //       email,
  //       phone,
  //       password,
  //       roles,
  //     });
  //     console.log('response', response);
  //     const { user, message } = response.data;
  //     const accessToken = response.data.tokens.access.token;
  //     const refreshToken = response.data.tokens.refresh.token;
  //     dispatch({
  //       type: 'REGISTER',
  //       payload: {
  //         user,
  //         accessToken,
  //       },
  //     });
  //     if (response.status === 201) {
  //       // window.location.href = '/email-verification';
  //       // setSession(accessToken, refreshToken);
  //       // await API.post('/auth/send-verification-email');
  //       // dispatch({
  //       //   type: 'REGISTER',
  //       //   payload: {
  //       //     user,
  //       //   },
  //       // });
  //       const apiUrl = `${HOST_API_KEY}/auth/send-verification-email`;
  //       const access = `Bearer ${accessToken}`;
  //       console.log('access', access);
  //       axios
  //         .post(apiUrl, null, {
  //           headers: {
  //             Authorization: access,
  //             'Content-Type': 'application/json',
  //           },
  //         })
  //         .then((res) => {
  //           console.log(res.data);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //     dispatch({
  //       type: 'REGISTER',
  //       payload: {
  //         isRegisterSuccess: false,
  //         message: error.response.data.message,
  //       },
  //     });
  //   }
  //   console.log('initialState', initialState);
  //   // const { accessToken, user } = response.data;
  //   // console.log('RegisterResponse', response);

  //   // localStorage.setItem('accessToken', accessToken);
  //   // if (response.status === 201) {
  //   //   console.log('registerRes', true);
  //   //   dispatch({
  //   //     type: 'REGISTER',
  //   //     payload: {
  //   //       // user,
  //   //       isRegisterSuccess: true,
  //   //     },
  //   //   });
  //   // }
  // }, []);

  // verify email
  const verifyToken = async (token) => {
    const { data } = await axios.patch(
      `${HOST_API_KEY}/auth/verify-email?token=${token}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  };

  const register = useCallback(async (firstName, lastName, email, phone, password, storeName) => {
    const response = await API.post('/auth/register', {
      firstName,
      lastName,
      email,
      phone,
      password,
      storeName,
    });

    const { user, message } = response.data;
    const accessToken = response.data.tokens.access.token;

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
        accessToken,
      },
    });
    console.log({ firstName, lastName, email, phone, password, storeName });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    const res = await API.post('/auth/logout', {
      refreshToken: localStorage.getItem('refreshToken'),
    });
    if (res.status === 204) {
      await localStorage.removeItem('refreshToken');
      await localStorage.removeItem('accessToken');
    }
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      register,
      logout,
      verifyToken,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
