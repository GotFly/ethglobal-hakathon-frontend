import { createSlice } from '@reduxjs/toolkit';
import { AUTH_STEP } from '../../constants/AuthStep';


const authWorldState = {
  verified: false,
  authStep: AUTH_STEP.NOT_AUTHROZIED,
};

export const authWorldSlice = createSlice({
  name: 'authWorld',
  initialState: authWorldState,
  reducers: {
    changeAuthState: (state, action) => {
      state.verified = action.payload.step == AUTH_STEP.AUTHROZIED;
      state.authStep = action.payload.step;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeAuthState } = authWorldSlice.actions;

export default authWorldSlice.reducer;
