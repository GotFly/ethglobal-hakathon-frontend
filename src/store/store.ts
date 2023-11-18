import { AnyAction, ThunkDispatch, combineReducers, configureStore } from '@reduxjs/toolkit';
import walletServiceProvider from '../features/walletService/walletService';
import notificationPopupSlice from '../features/dialogs/notificationPopupSlice';

const combinedReducer = combineReducers({
  walletServiceProvider: walletServiceProvider,
  notificationPopupManager: notificationPopupSlice,
});

export type RootState = ReturnType<typeof combinedReducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default configureStore({
  reducer: combinedReducer,
});
