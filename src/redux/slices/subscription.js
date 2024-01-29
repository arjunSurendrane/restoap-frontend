import API from '../../utils/axios';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isLoading: false,
  isError: false,
  plans: [],
  checkoutData: {},
  pricingPage: false,
};

const subscriptionSlice = createSlice({
  name: 'subscription plan',
  initialState,
  reducers: {
    changeLoadingStatus: (state) => {
      state.isLoading = !state.isLoading;
    },
    hasError: (state) => {
      state.isError = true;
    },
    isSuccess: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.plans = action.payload;
    },
    setPricingPageForInitialUser: (state, action) => {
      state.pricingPage = action.payload;
    },
  },
});

export const { setPricingPageForInitialUser } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;

// Fetch all subscripiton plans
export const fetchPlans = () => async (dispatch) => {
  try {
    dispatch(subscriptionSlice.actions.changeLoadingStatus());
    const response = await API.get('/subscriptions');
    dispatch(subscriptionSlice.actions.isSuccess(response.data));
  } catch (error) {
    dispatch(subscriptionSlice.actions.hasError(error));
  }
};

// create subscripiton checkout session
export const createSubscription = (priceId) => async () =>
  API.post('/stripe/checkout-session', { priceId });

export const updateSubscription = (priceId, planId) => async () =>
  API.patch('/subscriptions', { priceId, planId });
