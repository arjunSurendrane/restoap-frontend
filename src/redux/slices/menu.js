import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from '../../auth/utils';
import API from '../../utils/axios';

const initialState = {
  isLoadingMenuItems: false,
  error: null,
  menus: [],
  menu: null,
};

const slice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoadingMenuItems = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoadingMenuItems = false;
      state.error = action.payload;
    },
    // GET MENU SUCCESS
    getMenuSuccess(state, action) {
      state.isLoadingMenuItems = false;
      state.menu = action.payload;
    },
    // GET MENUS SUCCESS
    getMenusSuccess(state, action) {
      state.isLoadingMenuItems = false;
      state.menus = action.payload;
    },
    // ADD MENU SUCCESS
    addMenuSuccess(state, action) {
      state.isLoadingMenuItems = false;
      state.menu = action.payload;
    },
    // EDIT MENU SUCCESS
    editMenuSuccess(state, action) {
      state.isLoadingMenuItems = false;
      state.menu = action.payload;
    },
    // DELETE MENU
    deleteMenuSuccess(state, action) {
      state.isLoadingMenuItems = false;
      state.menu = action.payload;
    },
  },
});

// REDUCER
export default slice.reducer;

// ACTIONS

// GET MENU ACTION
export function getMenus(defaultBranchId, searchValue, branch, category, page, sortValue, limit) {
  console.log(
    'kasjdhkjashdjkahsjdk',
    defaultBranchId,
    searchValue,
    branch,
    category,
    page,
    sortValue,
    limit
  );
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.get(
        `/menuItem/${branch || defaultBranchId}/?searchValue=${searchValue || ''}&category=${
          category || ''
        }&limit=${limit}&page=${page}&sortBy=createdAt:desc`
      );
      console.log('menus-response', response.data);
      dispatch(slice.actions.getMenusSuccess(response.data));

      return response.data.results;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ADD MENU ACTION
export function addMenu(data) {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log('menu data in redux', data);
      const response = await API.post(`/menuItem`, data);

      console.log('menu add response', response);
      dispatch(slice.actions.addMenuSuccess(response.data));
      // dispatch(getMenus(data.storeId));
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// GET A MENU
export function getMenu(menuItemId) {
  console.log('menu data in redux', menuItemId);
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.get(`/menuItem?menuItemId=${menuItemId}`);

      console.log('menu add response', response);
      dispatch(slice.actions.getMenuSuccess(response.data));
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// EDIT MENU
export function editMenu(data) {
  console.log('menu data in redux', data);
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    // dispatch(slice.actions.startLoading());
    try {
      const response = await API.put(`/menuItem`, data);

      console.log('menu add response', response);
      dispatch(slice.actions.editMenuSuccess(response.data));
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return error.response;
    }
  };
}
export function deleteMenu(menuItemId, storeId) {
  console.log('menu data in redux', menuItemId);
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.delete(`/menuItem?menuItemId=${menuItemId}`);

      console.log('menu add response', response);
      dispatch(slice.actions.deleteMenuSuccess(response.data));
      dispatch(getMenus(storeId));
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function uploadMultipleMenu(menuItems, storeId) {
  console.log('menu data in redux', menuItems);
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.post('/menuItem/multiple-upload', { menuItems });

      console.log('menu multiple add response', response);
      dispatch(slice.actions.deleteMenuSuccess(response.data));
      dispatch(getMenus(storeId));
      return response;
    } catch (error) {
      console.log('menu multiple add response', error);
      dispatch(slice.actions.hasError(error));
      return error.response.data;
    }
  };
}

export function getSignedUrl(key) {
  console.log('menu data in redux', key);
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    // dispatch(slice.actions.startLoading());
    try {
      const response = await API.get(`/menuItem/get-signed-url?key=${key}`);
      console.log('response in signedurl', response);
      return response;
    } catch (error) {
      console.log('response in signedurl', error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
