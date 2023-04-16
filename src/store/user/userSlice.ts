import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/types';

const initialState: User = {
  vkID: null,
  role: null,
  name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser(state, action: PayloadAction<User>) {
      console.log(action.payload);
      state = action.payload;
      console.log(state);
    },
  },
});

export const { initUser } = userSlice.actions;

export default userSlice.reducer;
