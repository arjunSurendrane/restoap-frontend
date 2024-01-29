import { createSlice } from '@reduxjs/toolkit';
import API from '../../utils/axios';

const initialState = {
  isAddonsLoading: false,
  addonsError: null,
  addOns: [],
};

const slice = createSlice({
  name: 'addOns',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isAddonsLoading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isAddonsLoading = false;
      state.error = action.payload;
    },
    // GET MENUS
    getAddOnsSuccess(state, action) {
      state.isAddonsLoading = false;
      state.addOns = action.payload;
    },

    // GET ADDONS BY STORE
    requestGetAddonsByStore(state) {
      state.isAddonsLoading = true;
    },
    getAddonsByStoreFail(state, action) {
      state.isAddonsLoading = false;
      state.error = action.payload;
    },
    getAddonsByStoreSuccess(state, action) {
      state.isAddonsLoading = false;
      state.addOns = action.payload;
    },
  },
});
// Reducer
export default slice.reducer;

// Actions

export function createAddOn(data, storeId) {
  console.log('enter in redux categoires', data);
  // const branchId = branch || '';

  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.post('/addOn', data);
      console.log('category response:', response);
      dispatch(getAddOns(storeId));
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      console.log('error', error);
      return error.response;
    }
  };
}

export function getAddOns(defaultStore, storeId, page, limit) {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.requestGetAddonsByStore);
    try {
      const response = await API.get(
        `/addOn?storeId=${storeId || defaultStore}&populate=storeId&page=${page}&limit=${
          limit || '5'
        }&sortBy=createdAt:desc`
      );
      dispatch(slice.actions.getAddonsByStoreSuccess(response.data));
    } catch (error) {
      console.log('error', error);
      dispatch(slice.actions.getAddonsByStoreFail(error));
    }
  };
}

export function deleteAddOn(addOnId, storeId) {
  console.log('enter in redux categoires', addOnId);

  return async (dispatch) => {
    try {
      if (addOnId) {
        const response = await API.delete(`/addOn?addOnId=${addOnId}`);
        console.log('category response:', response.data);
        dispatch(getAddOns(storeId));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      console.log('error', error);
    }
  };
}

export function updateAddOn(addOnId, data, storeId) {
  console.log('enter in redux categoires', storeId);
  const sortLatest = 'createdAt:desc';
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    try {
      const response = await API.patch(`/addOn?addOnId=${addOnId}`, data);
      dispatch(getAddOns(storeId));
      console.log('category response:', response);
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      console.log('error', error);
      return error.response;
    }
  };
}
