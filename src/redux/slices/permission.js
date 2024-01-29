import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from '../../auth/utils';
import API from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: null,
  Permissionss: [],
};

const slice = createSlice({
  name: 'permission',
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
    // GET Permissions
    getPermissionSuccess(state, action) {
      state.isLoading = false;
      state.Permission = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

export function getPermissions() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.get('/permissions');
      dispatch(slice.actions.getPermissionSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function assignPermision(data) {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.put('/roles/assign-permission', data);
      console.log('response sdfdjsdd', response);
      return response;
      // dispatch(getRoles(storeId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error;
    }
  };
}
