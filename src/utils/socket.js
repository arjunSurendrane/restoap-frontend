import { io } from 'socket.io-client';
import { HOST_API_KEY } from '../config-global';

export const socket = io(`${HOST_API_KEY.split('v1')[0]}`, {
  auth: { token: localStorage.getItem('accessToken') },
});
