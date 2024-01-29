import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from '../../auth/utils';
import API from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  tables: [],
  table: {},
};

const slice = createSlice({
  name: 'table',
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
    getTablesSuccess(state, action) {
      state.isLoading = false;
      state.tables = action.payload;
    },
    getTableSuccess(state, action) {
      state.isLoading = false;
      state.table = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function createTable(tables) {
  console.log('tables[0]', tables);
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log('tablessdfsdfsdf', tables);
      const response = await API.post(`/table`, tables);
      console.log('dssdfsdfsdfs', response);
      await dispatch(slice.actions.getTablesSuccess(response.data));
      await dispatch(getTables(tables.tables[0]?.storeId));
      return response;
    } catch (error) {
      console.log('dssdfsdfsdfs', error);
      dispatch(slice.actions.hasError(error));
      return error.response.data;
    }
  };
}

export function getTables(storeId) {
  console.log('store in gettables', storeId);
  const accessToken = localStorage.getItem('accessToken');
  const userId = jwtDecode(accessToken);
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const sortLatest = 'createdAt:desc';
      const response = await API.get(
        `/table/${storeId}?populate=dineCategory&sortBy=${sortLatest}`,
        {
          params: {
            user: userId.sub,
          },
        }
      );
      dispatch(slice.actions.getTablesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateTable(data) {
  console.log('sdsdfsdfsdfs', data);
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.put(`/table/singleTable/${data.tables[0]?.tableId}`, data);
      dispatch(slice.actions.getTablesSuccess(response.data));
      await dispatch(getTables(data.tables[0]?.storeId));
      console.log('response in edit table', response.data);
      return response;
    } catch (error) {
      console.log('response in edit table', error);
      dispatch(slice.actions.hasError(error));
      return error.response;
    }
  };
}

export function deleteTable(tableId, storeId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.delete(`/table/singleTable/${tableId}`);
      console.log('response in delete table', response);
      await dispatch(getTables(storeId));
      dispatch(slice.actions.getTableSuccess(response.data));
      return response.data
    } catch (error) {
      console.log('response in delete table', error.response);
      dispatch(slice.actions.hasError(error));
      return error.response
    }
  };
}

export function getTablesByCategory(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.post(`/table`, data);
      dispatch(slice.actions.getTablesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export const selectTableById = (state, itemId) =>
  state.table.tables.results?.find((tab) => tab.id === itemId);
