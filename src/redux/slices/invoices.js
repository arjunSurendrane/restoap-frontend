import sum from 'lodash/sum';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import { createSlice } from '@reduxjs/toolkit';
// utils
import { jwtDecode } from '../../auth/utils';
import API from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: null,
  limit: 5,
  skip: null,
  invoices: [],
  paginatedInvoice: [],
  invoice: {},
};

const slice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET DINING CATEGORIES
    getsubsInvoicesSuccess(state, action) {
      state.invoices = action.payload;
      const invoices = action.payload
      // state.paginatedInvoice = invoices.splice(0, 5)
    },

    getsubsInvoiceSuccess(state, action) {
      state.invoice = action.payload;
    },

    setLoadingfalse(state) {
      state.isLoading = false
    },
    paginateInvoices(state, action) {
      const { limit, skip } = action.payload;
      state.paginatedInvoice = state.invoices.splice(skip, limit)
    }
  },
});

// Reducer
export default slice.reducer;

export const { paginateInvoices } = slice.actions

// ACTIONS
export function getsubsInvoices(customerId, limit = 5, skip = 0) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await API.get(`/invoices?limit=${limit}&skip=${skip}&customerId=${customerId}`);
      console.log('invoice response', response);
      dispatch(slice.actions.getsubsInvoicesSuccess(response.data));
      return response;
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      return error.response;
    } finally {
      dispatch(slice.actions.setLoadingfalse())
    }
  };
}


