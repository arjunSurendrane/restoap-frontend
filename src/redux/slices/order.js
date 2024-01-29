import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/axios'; // Import your API utility

const initialState = {
  isLoading: false,
  error: null,
  orders: [],
  mainOrders: [],
  totalMainOrders: null,
  previousOrders:null,
  isPaid: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getOrdersSuccess(state, action) {
      state.isLoading = false;
      state.orders = action.payload;
    },
    setMainOrderData(state, action) {
      state.isLoading = false;
      state.mainOrders = action.payload.orders;
      state.totalMainOrders = action.payload.totalCount;
    },
    updatePaymentSuccess(state) {
      state.isPaid = true;
    },
    getPreviousOrderSuccess(state,action){
      state.isLoading=false;
      state.previousOrders=action.payload;
      
    }
    // setMainOrderData(state, action) {
    //   state.isLoading = false;
    //   state.orders = action.payload;
    // },
  },
  extraReducers: (buider) => {},
});

// Thunk for fetching orders
// eslint-disable-next-line consistent-return
export const getOrders = createAsyncThunk(
  'order/fetchOrders',
  // eslint-disable-next-line consistent-return
  async ({ storeId, suborderStatus, status }, thunkAPI) => {
    try {
      console.log('called get orders...........', storeId);
      thunkAPI.dispatch(orderSlice.actions.startLoading());
      const response = await API.get(
        `/order/store/${storeId}/live?suborderStatus=${suborderStatus || ''}&&status=${
          status || ''
        }`
      );
      // TODO: store live order in an object with 
      const order = response.data;
      thunkAPI.dispatch(orderSlice.actions.getOrdersSuccess(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// eslint-disable-next-line consistent-return
export const getMainOrder = createAsyncThunk(
  'order/getMainOrder',
  async (
    { storeId, status = 'open', limit = 5, page = 1, orderType = '', search = '' },
    thunkAPI
  ) => {
    console.log(storeId, status);
    try {
      thunkAPI.dispatch(orderSlice.actions.startLoading());
      const response = await API.get(
        `/order/store/${storeId}?status=${status}&limit=${limit}&page=${page}&orderType=${orderType}&search=${search}`
      );
      thunkAPI.dispatch(orderSlice.actions.setMainOrderData(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const filteredOrders = createAsyncThunk(
  'order/getMainOrder',
  async ({ storeId }, thunkAPI) => {
    try {
      thunkAPI.dispatch(orderSlice.actions.startLoading());
      const response = await API.get(`/order/store/${storeId}`);
      thunkAPI.dispatch(orderSlice.actions.setMainOrderData(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const lastThreeDaysOrder = createAsyncThunk(
  'order/getPreviousOrder',
  async ({ storeId }, thunkAPI) => {
    try {
      thunkAPI.dispatch(orderSlice.actions.startLoading());
      const response = await API.get(`/order/store/${storeId}/previous-order`);
      console.log({response});
      thunkAPI.dispatch(orderSlice.actions.getPreviousOrderSuccess(response.data));
      console.log({ response });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk for updating order status
export const updateOrderStatus = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ status, orderId, suborderId }, thunkAPI) => {
    console.log({ status });
    try {
      thunkAPI.dispatch(orderSlice.actions.startLoading());
      const response = await API.patch(`/order/${orderId}/sub-order/${suborderId}`, { status });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Thunk for updating order payment status
export const updateOrderPaymentStatus = createAsyncThunk(
  'order/updateOrderPaymentStatus',
  // eslint-disable-next-line consistent-return
  async ({ orderId, paymentMethod }, thunkAPI) => {
    try {
      thunkAPI.dispatch(orderSlice.actions.startLoading());
      const response = await API.patch(`order/${orderId}/payment`, { paymentMethod });
      if (response.data) {
        thunkAPI.dispatch(orderSlice.actions.updatePaymentSuccess());
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAllItemStatus = createAsyncThunk(
  'order/updateOrderAllItemStatus',
  async ({ status, orderId }, thunkAPI) => {
    try {
      thunkAPI.dispatch(orderSlice.actions.startLoading());
      const response = await API.patch(`/order/${orderId}/update-all`, { status });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateItemStatus = createAsyncThunk(
  'order/updateItemStatus',
  async ({ status, orderId, suborderId, itemIds }, thunkAPI) => {
    try {
      thunkAPI.dispatch(orderSlice.actions.startLoading());
      const response = await API.patch(`/order/${orderId}/sub-order/${suborderId}/items`, {
        status,
        itemIds,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCompletedOrder = createAsyncThunk(
  'order/completedOrders',
  async ({ storeId, from, to }, thunkAPI) => {
    try {
      // if (from.getDate() === to.getDate()) {
      //   console.log('both are equal');
      //   const newToDate = new Date(to);
      //   newToDate.setDate(newToDate.getDate() + 1);
      //   from = newToDate;
      // } else {
      //   to += 1;
      // }
      // console.log(to, 'todata');
      // console.log('---------------------------');
      // console.log({ string: `${to}` });
      // const splitedTo = to.toString().split(' ')[4];
      // let endData;
      // console.log('splitedto', splitedTo.startsWith('00'));
      // if (splitedTo.startsWith('00')) {
      //   endData = to.setDate(to.getDate() + 1);
      //   endData = new Date(endData);
      // }

      thunkAPI.dispatch(orderSlice.actions.startLoading());
      const response = await API.get(
        `/order/store/order-history/?store=${storeId}&orderStatus=completed&limit=10&populate=customer&sortBy=createdAt:desc&from=${from}&to=${to}&page=1&pageSize=10`
      );
      if (response.data) {
        thunkAPI.dispatch(orderSlice.actions.getOrdersSuccess(response.data));
      }
      console.log('completed oreder', response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getStoresRevenueUnderAdmin = createAsyncThunk(
  'order/getAllRevenue',
  async ({ userId }, thunkAPI) => {
    try {
      console.log('ssdasdasda', { userId });
      thunkAPI.dispatch(orderSlice.actions.startLoading());
      const response = await API.get(`/order/get-all-revenue?userId=${userId}`);
      console.log('completed oreder', response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const settlePayment = async ({ orderId, paymentMethod, card, cash, upi, totalAmount }) => {
  const response = await API.patch(`/order/${orderId}/payment`, {
    paymentMethod,
    card,
    cash,
    upi,
    totalAmount,
  });
  return response.data;
};

export const placeOrderByWaiter = async (order) => {
  try {
    const response = await API.post('/order', order);
    console.log(response.date);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const placeAdditionalOrder = async (orderId, order) => {
  try {
    const response = await API.patch(`/order/${orderId}`, order);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// export const getMainOrder = createAsyncThunk(
//   'order/getMainOrder',

//   async ({ storeId, status = 'open' }, thunkAPI) => {
//     console.log('storeid', storeId);
//     try {
//       thunkAPI.dispatch(orderSlice.actions.startLoading());

//       const response = await API.get(`/order/store/${storeId}?status=${status}`);
//       console.log({ response });

//       thunkAPI.dispatch(orderSlice.actions.setMainOrderData(response.data));

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export default orderSlice.reducer;
