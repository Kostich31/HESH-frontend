import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageType } from '../../interfaces/types';

type ChatSliceType = {
  activeDiaryId: number;
  commentList: Array<MessageType>;
};

const initialState: ChatSliceType = {
  activeDiaryId: -1,
  commentList: new Array<MessageType>(),
};

const chatSlice = createSlice({
  name: 'journalChat',
  initialState,
  reducers: {
    setActiveDiaryId(state, action: PayloadAction<{ id: number }>) {
      state.activeDiaryId = action.payload.id;
    },
    setMessagesList(state, action) {
      state.commentList = action.payload;
    },
    updateCommentsList(state, action: PayloadAction<MessageType>) {
      state.commentList.push(action.payload);
    },
  },
});

export const selectActiveDiaryId = (state) => state.chat.activeDiaryId;
export const selectCommentList = (state) => state.chat.commentList;

export const { setActiveDiaryId, updateCommentsList, setMessagesList } =
  chatSlice.actions;

export default chatSlice.reducer;
