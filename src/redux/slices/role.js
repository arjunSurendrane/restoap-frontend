import { createSlice } from '@reduxjs/toolkit';
// import { fullName } from 'src/_mock/assets';
// import { jwtDecode } from '../../auth/utils';
import API from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: null,
  roles: [],
  role: [],
};

const slice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // GET ROLES
    getRoleSuccess(state, action) {
      state.isLoading = false;
      state.role = action.payload;
    },
    // GET ROLES
    getRolesSuccess(state, action) {
      state.isLoading = false;
      state.roles = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

export function addRole(data) {
  console.log('data in redux', data);
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await API.post(`/roles`, { ...data });
      console.log(' response-role', response);
      dispatch(getRoles(data.store));
      return response;
    } catch (error) {
      console.log(' response-role', error);

      dispatch(slice.actions.hasError(error));
      return error.response;
    }
  };
}

export function getRoles(dropdownValue) {
  // const accessToken = localStorage.getItem('accessToken');
  // const userId = jwtDecode(accessToken);
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.get(`/roles?storeId=${dropdownValue}`);
      dispatch(slice.actions.getRolesSuccess(response.data));
      return response.data.results;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getRoleById(roleId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.get(`/roles/roleId?roleId=${roleId}`);
      dispatch(slice.actions.getRoleSuccess(response.data));
      console.log('role response', response);
      return response.data.results;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}

export function deleteRole(id, storeId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.delete(`/roles?id=${id}`);
      console.log('response', response);
      dispatch(getRoles(storeId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateRole(data) {
  console.log('data in redux', data);
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await API.put(`/roles`, { ...data });
      console.log(' response-role', response);
      dispatch(getRoles(data.store));
      return response;
    } catch (error) {
      console.log(' response-role', error);

      dispatch(slice.actions.hasError(error));
      return error.response;
    }
  };
}
