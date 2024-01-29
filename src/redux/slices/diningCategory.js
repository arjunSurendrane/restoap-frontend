import sum from 'lodash/sum';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import { createSlice } from '@reduxjs/toolkit';
// utils
import { jwtDecode } from '../../auth/utils';
import API from '../../utils/axios';
// import { func } from 'prop-types';

// ----------------------------------------------------------------------

const initialState = {
  isLoadingDiningCategories: false,
  error: null,
  diningCategories: [],
  diningCategory: {},
};

const slice = createSlice({
  name: 'diningCategories',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoadingDiningCategories = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoadingDiningCategories = false;
      state.error = action.payload;
    },

    // GET DINING CATEGORIES
    getDiningCategoriesSuccess(state, action) {
      state.isLoadingDiningCategories = false;
      state.diningCategories = action.payload;
    },
    getDiningCategorySuccess(state, action) {
      state.isLoadingDiningCategories = false;
      state.diningCategory = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------
export function getDiningCategories(storeId) {
  const accessToken = localStorage.getItem('accessToken');
  console.log('storeId in api call', storeId);
  const userId = jwtDecode(accessToken);

  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.get(`/dining-categories/category/${storeId}`, {
        // params: {
        //   user: userId.sub,
        // },
      });
      console.log('response from dispatch', response?.data);
      console.log('response from dispatch RESPONSE ONLY', response);
      dispatch(slice.actions.getDiningCategoriesSuccess(response?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createDiningCategory(data) {
  return async (dispatch) => {
    // dispatch(slice.actions.startLoading());
    try {
      const response = await API.post(`/dining-categories`, data);
      dispatch(slice.actions.getDiningCategorySuccess(response.data));
      await dispatch(getDiningCategories(data.store));

      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error.response;
    }
  };
}

export function deleteDiningCategory(diningCategoryId, storeId) {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.delete(`/dining-categories/${diningCategoryId}`);
      dispatch(slice.actions.getDiningCategorySuccess(response.data));
      await dispatch(getDiningCategories(storeId));
      console.log('delete in category', response);
      return response;
    } catch (error) {
      console.log('delete in category', error.response.data);
      dispatch(slice.actions.hasError(error));
      return error.response.data;
    }
  };
}
export function updateDiningCategory(diningCategoryId, data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.put(`/dining-categories/${diningCategoryId}`, data);
      dispatch(slice.actions.getDiningCategorySuccess(response.data));
      await dispatch(getDiningCategories(data.store));
      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error.response.data;
    }
  };
}
