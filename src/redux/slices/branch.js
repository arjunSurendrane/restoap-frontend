// import sum from 'lodash/sum';
// import uniq from 'lodash/uniq';
// import uniqBy from 'lodash/uniqBy';
import { createSlice } from '@reduxjs/toolkit';
// utils
import { jwtDecode } from '../../auth/utils';
import API from '../../utils/axios';
// import { func } from 'prop-types';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  branches: [],
  branch: {},
  revenue: [],
};

const slice = createSlice({
  name: 'branch',
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

    // GET BRANCHES
    getBranchesSuccess(state, action) {
      state.isLoading = false;
      state.branches = action.payload;
    },
    addBranchSuccess(state, action) {
      state.branch = action.payload;
      state.isLoading = false;
    },
    getStoreSuccess(state, action) {
      state.branch = action.payload;
      state.isLoading = false;
    },
    getRevenueSuccess(state, action) {
      state.revenue = action.payload;
    },
    revenueReset(state, action) {
      state.revenue = [];
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------
export function getBranches(limit, page, status) {
  console.log('inside get branches', limit, page, status);
  const accessToken = localStorage.getItem('accessToken');

  const userId = jwtDecode(accessToken);

  return async (dispatch) => {
    if (!status) {
      dispatch(slice.actions.startLoading());
    }

    try {
      const response = await API.get(`/stores/?limit=${limit || '6'}&page=${page || '1'}`, {
        params: {
          user: userId.sub,
        },
      });
      dispatch(slice.actions.getBranchesSuccess(response.data));
      status = false;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getStore(storeId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log('call get store action..............');
      const response = await API.get(`/stores/${storeId}`);
      console.log('dsdsdfsdfsd', response);
      dispatch(slice.actions.getStoreSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createBranch(data) {
  console.log('redux-data ', data);
  const accessToken = localStorage.getItem('accessToken');

  const userId = jwtDecode(accessToken);
  console.log(userId);
  data.user = userId.sub;
  return async (dispatch) => {
    // dispatch(slice.actions.startLoading());
    try {
      const response = await API.post(`/stores`, data, {
        params: {
          user: userId.sub,
        },
      });

      // dispatch(slice.actions.getBranchesSuccess(response.data.results));
      dispatch(getBranches());
      return response;
      // if(response)
    } catch (error) {
      // console.log("error",error)
      console.log('error', error.response.data.message);
      dispatch(slice.actions.hasError(error.response.data.message));
      return error.response;
    }
  };
}
export const clearBranchError = async (data, dispatch) => {
  // console.log('redux sec', data);
  try {
    dispatch(slice.actions.hasError(data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

// eslint-disable-next-line consistent-return
export const updateBranches = async (data, dispatch, page) => {
  console.log('redux page count', page);
  const accessToken = localStorage.getItem('accessToken');

  const userId = jwtDecode(accessToken);
  console.log(userId);
  data.user = userId.sub;
  const limit = 6;
  const status = true;
  try {
    const response = await API.put(`/stores?storeId=${data.storeId}`, {
      data,
    });
    dispatch(getBranches(limit, page, status));
    return response;
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const addBranch = async (data, dispatch) => {
  console.log('get single branch', data);
  try {
    dispatch(slice.actions.addBranchSuccess(data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

// eslint-disable-next-line consistent-return
export const deleteBranch = async (storeId, dispatch) => {
  console.log('redux sec', storeId);

  try {
    const response = await API.delete(`/stores?storeId=${storeId}`);
    dispatch(getBranches());
    console.log('responsesdfsdfsdsd', response);
    return response;
  } catch (error) {
    console.log('sdfsddf', error);
    dispatch(slice.actions.hasError(error));
    return error.response;
  }
};

export const getStoresRevenueUnderAdmin = async (userId, storeId, dispatch) => {
  console.log('redux sec', userId);

  try {
    const response = await API.get(`/order/get-all-revenue?userId=${userId}`);
    dispatch(slice.actions.getRevenueSuccess(response.data));
    console.log('responsesdfsdfsdsd', response);
    return response;
  } catch (error) {
    console.log('sdfsddf', error);
    dispatch(slice.actions.hasError(error));
    return error.response;
  }
};

export const getMyStoresRevenue = async (storeId, dispatch, startDate, endDate) => {
  console.log('redux sec skjhaskjhfk', storeId, dispatch, startDate);

  try {
    const response = await API.get(`/order/get-mystore-revenue?storeId=${storeId}`);
    dispatch(slice.actions.getRevenueSuccess(response.data));
    console.log('response in revenue', response);
    return response;
  } catch (error) {
    console.log('response in revenue', error);
    console.log('sdfsddf', error);
    dispatch(slice.actions.hasError(error));
    return error.response;
  }
};

export const updateSettings = async (storeId, payload, dispatch) => {
  const response = await API.patch(`stores/settings/${storeId}`, payload);
};

export const resetRevenue = async (dispatch) => {
  dispatch(slice.actions.revenueReset());
};
