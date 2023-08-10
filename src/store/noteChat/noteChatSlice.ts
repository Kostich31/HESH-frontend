import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoteMessageType } from '../../interfaces/types';

type NoteChatSliceType = {
  activeNoteId: number;
  isMedicRecord: boolean;
  noteList: Array<NoteMessageType>;
};

const initialState: NoteChatSliceType = {
  activeNoteId: -1,
  isMedicRecord: false,
  noteList: [],
};

const chatSlice = createSlice({
  name: 'noteChat',
  initialState,
  reducers: {
    setActiveNoteId(state, action: PayloadAction<{ id: number }>) {
      state.activeNoteId = action.payload.id;
    },
    setNoteList(state, action) {
      state.noteList = action.payload;
    },
    updateNotesList(state, action: PayloadAction<NoteMessageType[]>) {
      state.noteList = [...state.noteList, ...action.payload];
    },
    setIsMedicRecord(state, action: PayloadAction<boolean>) {
      state.isMedicRecord = action.payload;
    },
  },
});

export const selectActiveDiaryId = (state) => state.chat.activeDiaryId;
export const selectCommentList = (state) => state.chat.commentList;

export const {
  setActiveNoteId,
  updateNotesList,
  setIsMedicRecord,
  setNoteList,
} = chatSlice.actions;

export default chatSlice.reducer;
