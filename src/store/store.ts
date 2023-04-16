import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import journalSlice from './journal/journalSlice';
import noteSlice from './note/noteSlice';
import userSlice from './user/userSlice';

const store = configureStore({
  reducer: {
    journal: journalSlice,
    note: noteSlice,
    user: userSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
