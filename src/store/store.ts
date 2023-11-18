import {
  AnyAction,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import walletServiceProvider from '../features/walletService/walletService';
import notificationPopupSlice from '../features/dialogs/notificationPopupSlice';
import authWorldSlice from '../features/auth/authWorldSlice';

const combinedReducer = combineReducers({
  walletServiceProvider: walletServiceProvider,
  notificationPopupManager: notificationPopupSlice,
  authWorldManager: authWorldSlice,
});

export type RootState = ReturnType<typeof combinedReducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default configureStore({
  reducer: combinedReducer,
});
