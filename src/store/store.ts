import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import journalSlice from './journal/journalSlice';
import noteSlice from './note/noteSlice';
import userSlice from './user/userSlice';
import chatSlice from './chat/chatSlice';
import noteChatSlice from './noteChat/noteChatSlice';

const store = configureStore({
  reducer: {
    journal: journalSlice,
    note: noteSlice,
    user: userSlice,
    chat: chatSlice,
    noteChat: noteChatSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
