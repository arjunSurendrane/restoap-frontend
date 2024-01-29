const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  notifications: JSON.parse(localStorage.getItem('notification')) || [],
  unreadMessage: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      console.log(action.payload);
      const newArray = new Set([action.payload, ...state.notifications]);
      state.notifications = [...newArray];
      localStorage.setItem('notification', JSON.stringify(state.notifications));
      state.unreadMessage += 1;
    },
    removeNotification(state, action) {
      state.unreadMessage = 0;
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
