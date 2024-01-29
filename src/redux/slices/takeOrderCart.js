import { createSlice } from '@reduxjs/toolkit';
import API from '../../utils/axios';

const initialState = {
  orderId: null,
  isLoading: false,
  error: null,
  table: '',
  orderType: '',
  cartItems: [],
  addOns: [],
};

const takeOrderSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setTableAndOrderId(state, action) {
      state.table = action.payload.table;
      state.orderId = action.payload.orderId;
    },
    setOrderType(state, action) {
      state.orderType = action.payload;
    },
    addToCart(state, action) {
      state.cartItems = [...state.cartItems, action.payload];
    },
    addAddOnsToCart(state, action) {
      state.addOns = [...state.addOns, action.payload];
    },
    incrementCount(state, action) {
      state.cartItems.map((cart) => {
        if (action.payload === cart.itemId) {
          cart.qty += 1;
        }
        return cart;
      });
    },
    incrementAddOnsCount(state, action) {
      state.addOns.map((cart) => {
        if (action.payload === cart.itemId) {
          cart.qty += 1;
        }
        return cart;
      });
    },
    changeVariant(state, action) {
      const { id, price } = action.payload;
      state.cartItems.map((cart) => {
        if (id === cart.itemId) {
          cart.price = price;
        }
        return cart;
      });
    },
    decrementCount(state, action) {
      const cart = state.cartItems.map((item) => {
        if (action.payload === item.itemId) {
          item.qty -= 1;
        }
        return item;
      });
      state.cartItems = cart.filter((item) => item.qty > 0);
    },
    decrementAddOnsCount(state, action) {
      console.log('ddd');
      const cart = state.addOns.map((item) => {
        if (action.payload === item.itemId) {
          item.qty -= 1;
        }
        return item;
      });
      state.addOns = cart.filter((item) => item.qty > 0);
    },
    clearCartItems(state, action) {
      const additionalOrder  = action.payload;
      state.cartItems = [];
      state.addOns = [];
      if (!additionalOrder) state.orderId = '';
    },
    addNote(state, action) {
      const { variant, note, itemId } = action.payload;
      const updatedCartItems = state.cartItems.map((item) => {
        // Adding note
        if (item.itemId === itemId && (!variant || item.variant?.name === variant.name)) {
          return {
            ...item,
            note,
          };
        }
        return item;
      });

      state.cartItems = updatedCartItems;
    },

    incrementQtyByVariant(state, action) {
      const { id, variant, quantity } = action.payload;
      state.cartItems?.map((item) => {
        if (id === item.itemId && variant?.name === item.variant.name) {
          item.qty += quantity || 1;
          item.price = variant?.value;
        }
        return item;
      });
    },
    incrementAddOnQtyByVariant(state, action) {
      const { id, variant, quantity } = action.payload;
      state.addOns?.map((item) => {
        if (id === item.itemId && variant?.name === item.variant.name) {
          item.qty += quantity || 1;
          item.price = variant?.value;
        }
        return item;
      });
    },
    decrementQtyByVariant(state, action) {
      const { id, variant, quantity } = action.payload;
      const cart = state.cartItems?.map((item) => {
        if (id === item.itemId && variant?.name === item.variant.name) {
          item.qty -= quantity || 1;
          item.price = variant?.value;
        }
        return item;
      });
      state.cartItems = cart.filter((item) => item.qty > 0);
    },
    decrementAddOnQtyByVariant(state, action) {
      const { id, variant, quantity } = action.payload;
      const cart = state.addOns?.map((item) => {
        if (id === item.itemId && variant?.name === item.variant.name) {
          item.qty -= quantity || 1;
          item.price = variant?.value;
        }
        return item;
      });
      state.addOns = cart.filter((item) => item.qty > 0);
    },
  },
});

export const selectCartById = (state, itemId) =>
  state.cart.cartItems?.find((cartitem) => cartitem.itemId === itemId);

export const selectAddOnCartById = (state, itemId) =>
  state.cart.addOns?.find((cartitem) => cartitem.itemId === itemId);

export const {
  setTableAndOrderId,
  setOrderType,
  addToCart,
  incrementCount,
  decrementCount,
  changeVariant,
  clearCartItems,
  addNote,
  incrementQtyByVariant,
  decrementQtyByVariant,
  addAddOnsToCart,
  incrementAddOnsCount,
  incrementAddOnQtyByVariant,
  decrementAddOnQtyByVariant,
  decrementAddOnsCount,
} = takeOrderSlice.actions;
export default takeOrderSlice.reducer;
