import moment from 'moment';
import API from '../../utils/axios';
import { HOST_API_KEY } from '../../config-global';

const { createSlice } = require('@reduxjs/toolkit');
const { get } = require('lodash');

const initialState = {
  isLoadingSummary: true,
  isLoadingOrderData: true,
  reportSummaryDate: {},
  selectedStoreId:'',
  reportData: [],
  hasError: '',
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setReportSummaryDate(state, action) {
      console.log(action.payload);
      state.reportSummaryDate = action.payload;
      state.isLoadingSummary = false;
    },
    setLoadingSummary(state) {
      state.isLoadingSummary = true;
    },
    setLoadingOrderData(state) {
      state.isLoadingOrderData = true;
    },
    setReportData(state, action) {
      state.reportData = action.payload;
      state.isLoadingOrderData = false;
    },
    setError(state, action) {
      state.hasError = action.payload;
      state.isLoadingSummary = false;
      state.isLoadingOrderData = false;
    },
    setSelectedStoreId(state,action){
      state.selectedStoreId = action.payload
    }
  },
});

export default reportSlice.reducer;

export const {setSelectedStoreId} = reportSlice.actions

export function getReportSummary(storeId) {
  return async (dispatch) => {
    dispatch(reportSlice.actions.setLoadingSummary());
    const { data } = await API.get(`/report/super-admin/${storeId}/summary`);
    console.log({ data });
    const summaryDate = data[0];
    dispatch(reportSlice.actions.setReportSummaryDate(summaryDate));
  };
}

export function getReportData({
  storeId,
  startDate = '',
  endDate = '',
  paymentStatus = '',
  search = '',
  page = 1,
  limit = 5,
  customDate,
}) {
  return async (dispatch) => {
    console.log({ storeId, startDate, endDate, search });
    dispatch(reportSlice.actions.setLoadingOrderData());
    const { data } = await API.get(
      `/report/super-admin/${storeId}?startDate=${startDate}&endDate=${endDate}&paymentStatus=${paymentStatus}&search=${search}&page=${page}&limit=${limit}&customDate=${customDate}`
    );
    dispatch(reportSlice.actions.setReportData(data));
  };
}

export function downloadReportData({
  storeId,
  startDate = '',
  endDate = '',
  paymentStatus = '',
  search = '',
  customDate,
}) {
  return async (dispatch) => {
    console.log({ storeId, startDate, endDate, search });
    const currentDate = moment(endDate);
    const newEndDate = currentDate.add(1, 'days');
    // window.location.href = `${HOST_API_KEY}/report/download/${storeId}?startDate=${startDate}&endDate=${newEndDate}&paymentStatus=${paymentStatus}&search=${search}&customDate=${customDate}`
    const response = await API.get(
      `/report/download/${storeId}?startDate=${startDate}&endDate=${newEndDate}&paymentStatus=${paymentStatus}&search=${search}&customDate=${customDate}`,
      { responseType: 'blob' }
    );

    console.log('get response from downloads');
    // Create a Blob object from the response data
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Create a URL for the Blob object
    const url = window.URL.createObjectURL(blob);

    // Open a new tab and navigate to the URL to trigger the download
    window.open(url);

    // Clean up by revoking the URL after the download is complete
    window.URL.revokeObjectURL(url);
  };
}
