import { createSlice } from '@reduxjs/toolkit';
import { ALERT_TYPE } from '../../constants/AlertTypes';

const initialNotificationState = {
  show: false,
  alertType: ALERT_TYPE.SUCCESS,
  title: null,
  caption: null,
};

export const notificationPopupSlice = createSlice({
  name: 'NotificationPopup',
  initialState: initialNotificationState,
  reducers: {
    showNotifaction: (state, action) => {
      if (action.payload.caption === null) {
        return;
      }
      state.show = true;
      state.alertType = action.payload.alertType;
      state.title = action.payload.title;
      state.caption =
        typeof action.payload.caption == 'string'
          ? action.payload.caption
          : JSON.stringify(action.payload.caption);
    },
    closeNotification: state => {
      state.show = false;
      state.alertType = ALERT_TYPE.SUCCESS;
      state.title = null;
      state.caption = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showNotifaction, closeNotification } =
  notificationPopupSlice.actions;

export default notificationPopupSlice.reducer;
