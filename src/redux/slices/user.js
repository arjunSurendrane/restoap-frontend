/* eslint-disable no-shadow */
import sum from 'lodash/sum';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import { createSlice } from '@reduxjs/toolkit';
// utils
import { jwtDecode } from '../../auth/utils';
import API from '../../utils/axios';
// eslint-disable-next-line import/no-cycle
import { dispatch } from '../store';
// import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  user: [],
  users: [],
  allUsers: [],
  createUserSuccess: null,
  // branchUser: {}
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //
    resetState(state) {
      state.user = initialState.user;
    },

    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // GET USER
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },
    // GET USER
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    addUserSuccess(state, action) {
      state.createUserSuccess = null;
      state.isLoading = false;
      state.user = action.payload;
    },
    editUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },
    deleteUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },
    getAllUserSuccess(state, action) {
      state.isLoading = false;
      state.allUsers = action.payload;
    },
  },
});
// Reducer
export default slice.reducer;

// Actions

// ---------------------------------------------

export function getUser() {
  const accessToken = localStorage.getItem('accessToken');
  console.log('accessTocken', accessToken);
  const userId = jwtDecode(accessToken);
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.get(`/users`, {
        params: {
          user: userId,
        },
      });
      dispatch(slice.actions.getUserSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getUserById(userId) {
  dispatch(slice.actions.resetState());
  console.log(userId, 'id inside slice');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.get(`/users/user?userId=${userId}`);
      console.log(response.data, 'results');
      dispatch(slice.actions.getUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserByStore(id) {
  dispatch(slice.actions.resetState());

  console.log(id, 'id inside slice');
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.get(`/users/store?storeId=${id}`);
      console.log('response', response);
      console.log(response.data, 'results');
      dispatch(slice.actions.getUsersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createUser(data) {
  console.log('create user fn called');
  console.log('clg');
  // const accessTocken = localStorage.getItem(`accesTocken`);

  // const userId = jwtDecode(accessTocken);
  // data.user = userId
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.post(`/users`, data);
      dispatch(slice.actions.addUserSuccess(response.data));
      // console.log("clg at slice for data", data)
      // dispatch(slice.actions.getUserSuccess(response.data.results));
      dispatch(getUserByStore(data?.storeId));

      return response;
    } catch (error) {
      console.log('error', error.response.data.message);
      dispatch(slice.actions.hasError(error.message));
      return error.response;
    }
  };
}
export function deleteUserById(userId, storeId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.delete(`/users/${userId}`);
      dispatch(slice.actions.deleteUserSuccess(response.data.results));
      dispatch(getUserByStore(storeId));
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      return error.response;
    }
  };
}

export function editUser(id, data) {
  console.log('user data in redux', id);
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    // dispatch(slice.actions.startLoading());
    try {
      const response = await API.put(`/users/${id}`, data);
      // dispatch(slice.actions.editUserSuccess(response.data.results));

      console.log('response in edit', response);
      // dispatch(slice.actions.getMenusSuccess(response.data));
      return response;
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
      return error.response;
    }
  };
}
export function getAllUsersUnderStore(storeId) {
  console.log('data in rdsd', storeId);
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    // dispatch(slice.actions.startLoading());
    try {
      const response = await API.get(`/users/AllUsers?storeId=${storeId}`);
      // dispatch(slice.actions.editUserSuccess(response.data.results));

      console.log('response insdh', response);
      dispatch(slice.actions.getAllUserSuccess(response.data));
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return 400;
    }
  };
}

// eslint-disable-next-line no-shadow
// export const clearUserError = async (data, dispatch) => {
//   try {
//     dispatch(slice.actions.hasError(data));
//   } catch (error) {
//     dispatch(slice.actions.hasError(error));
//   }
// };
