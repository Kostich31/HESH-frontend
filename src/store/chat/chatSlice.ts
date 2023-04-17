import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import {
  MedicRecord,
  PatientRecord,
  DiaryBasicInfo,
  Diary,
} from '../../interfaces/types';

type ChatSliceType = {
  activeDiaryId: number;
  commentList: Array<any>;
}

const initialState: ChatSliceType = {
  activeDiaryId: -1,
  commentList: [{}]
};

const chatSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setActiveDiaryId(state, action: PayloadAction<{id: number}>) {
      state.activeDiaryId = action.payload;
    },
    updateCommentsList(state, action) {
      console.log(current(action.payload));
      state.chat.commentList = action.payload.commentlist;
    }
  },
});

export const selectActiveDiaryId = (state) => state.chat.activeDiaryId;
export const selectCommentList = (state) => state.chat.commentList;

export const {
  setActiveDiaryId,
  updateCommentsList
} = chatSlice.actions;

export default chatSlice.reducer;
