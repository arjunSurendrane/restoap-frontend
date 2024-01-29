// routes
import { PATH_AUTH } from '../routes/paths';
// utils
import API from '../utils/axios';

// ----------------------------------------------------------------------

export const jwtDecode = (token) => {
  console.log(token, 'token');
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
};

// ----------------------------------------------------------------------

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(async () => {
    localStorage.removeItem('accessToken');
    const res = await API.post('/auth/refresh-tokens', {
      refreshToken: localStorage.getItem('refreshToken'),
    });
    const newAccess = res.data.access.token;
    const newRefresh = res.data.refresh.token;
    setSession(newAccess, newRefresh);
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (accessToken, refreshToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    console.log({ accessToken, refreshToken });

    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
    tokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');

    delete API.defaults.headers.common.Authorization;
  }
};
