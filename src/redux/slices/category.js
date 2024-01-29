import { createSlice } from '@reduxjs/toolkit';
import API from '../../utils/axios';

const initialState = {
  isLoadingCategory: false,
  error: null,
  categories: [],
  menuCategoriesByStore: [],
};

const slice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoadingCategory = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoadingCategory = false;
      state.error = action.payload;
    },
    // GET MENUS
    getCategoriesSuccess(state, action) {
      state.isLoadingCategory = false;
      state.categories = action.payload;
    },
    // GET MENU CATEGORIES BY STORE ID
    requestGetMenuCategoriesByStore(state) {
      state.isLoadingCategory = true;
    },
    getMenuCategoriesByStoreFail(state, action) {
      state.isLoadingCategory = false;
      state.error = action.payload;
    },
    getMenuCategoriesByStoreSuccess(state, action) {
      state.isLoadingCategory = false;
      state.menuCategoriesByStore = action.payload;
    },
  },
});
// Reducer
export default slice.reducer;

// Actions

export function createCategory(data) {
  console.log('enter in redux categoires', data);
  const branch = '';
  const limit = '5';
  const page = '1';
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.post('/categories', data);
      console.log('category response:', response.data);
      dispatch(getCategories(data.store, branch, page, limit));

      return response;
    } catch (error) {
      console.log('error', error);
      return error.response;
    }
  };
}

export function getCategories(defaultBranch, branch, page, limit) {
  console.log('enter in redux categoires', limit);
  const store = branch || defaultBranch;
  console.log('branchId', store);
  const sortLatest = 'createdAt:desc';
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    try {
      if (store) {
        const response = await API.get(
          `/categories/category-list/${store}?populate=store&page=${page}&limit=${limit}&sortBy=createdAt:desc`
        );
        console.log('category response:', response.data);
        dispatch(slice.actions.getCategoriesSuccess(response.data));
      }
    } catch (error) {
      console.log('error', error);
    }
  };
}

// GET MENU CATEGORIES BY STORE ID
export function getMenuCategoriesByStoreId(storeId) {
  return async (dispatch) => {
    dispatch(slice.actions.requestGetMenuCategoriesByStore());
    try {
      const response = await API.get(`/categories/by-store?store=${storeId}`);
      dispatch(slice.actions.getMenuCategoriesByStoreSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getMenuCategoriesByStoreFail(error));
      console.log('error', error);
    }
  };
}

export function deleteCategory(categoryId, store) {
  console.log('enter in redux categoires', categoryId);

  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    try {
      const response = await API.delete(`/categories?categoryId=${categoryId}`);
      console.log('category response:', response.data);
      const branch = '';
      const page = '1';
      const limit = '5';
      dispatch(getCategories(store, branch, page, limit));
      return response;
    } catch (error) {
      console.log('error', error);
      return error.response;
    }
  };
}

export function updateCategory(categoryId, data, page, limit) {
  console.log('enter in redux categoires', categoryId);
  // const branchId = branch || '';

  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    try {
      const response = await API.patch(`/categories/${categoryId}`, data);
      console.log('category response:', response.data);
      const branch = data.store;

      // dispatch(slice.actions.getCategoriesSuccess(response.data.results));
      dispatch(getCategories(data.store, branch, page, limit));
      return response;
    } catch (error) {
      console.log('error', error);
      return error.response;
    }
  };
}
