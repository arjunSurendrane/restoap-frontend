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
  kitchens: [],
};

const slice = createSlice({
  name: 'kitchen',
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
    getKitchensSuccess(state, action) {
      state.isLoading = false;
      state.kitchens = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------
export function getKitchens(store) {
  return async (dispatch) => {
    try {
      const response = await API.get(`/kitchen?store=${store}`);
      console.log('response in data', response.data);
      dispatch(slice.actions.getKitchensSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createKitchen(data) {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.post(`/kitchen`, data);
      console.log('response in kitchen', response);
      // dispatch(slice.actions.getStoreSuccess(response.data));
      dispatch(getKitchens(data.store));
      return response;
    } catch (error) {
      console.log('response in kitchen', error.response);
      dispatch(slice.actions.hasError(error));
      return error.response;
    }
  };
}

export function updateKitchen(data) {
  return async (dispatch) => {
    // dispatch(slice.actions.startLoading());
    try {
      console.log('enter in kitchen slice');
      const response = await API.put(`/kitchen`, data);
      console.log('response in update kitchen', response);
      dispatch(getKitchens(data.store));
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

export function deleteKitchen(id, storeId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.delete(`/kitchen?id=${id}`);
      console.log('delete response in kitchen', response);
      dispatch(getKitchens(storeId));
      console.log('response in revenue', response);
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      console.log('delete response in kitchen erroe', error.response);
      return error.response;
    }
  };
}

export function kitchenStatus(id, data, storeId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.put(`/kitchen/kitchen-status?id=${id}`, data);
      console.log('response in kitchen status', response);
      dispatch(getKitchens(storeId));
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error.response;
    }
  };
}


export function deleteAllKitchenItems(id, storeId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.delete(`/kitchen/kitchen-status?id=${id}`);
      console.log('delete response in kitchen', response);
      dispatch(getKitchens(storeId));
      console.log('response in revenue', response);
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      console.log('delete response in kitchen erroe', error.response);
      return error.response;
    }
  };
}

export function assignItemsToKitchen(id, data) {
  console.log(id, data,"asdkjkahsjdhkjashk")
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.put(`/kitchen/assign-items?itemId=${id}`, data);
      
      console.log('response in kitchen status', response);
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error.response;
    }
  };
}