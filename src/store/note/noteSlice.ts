import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  NoteMedicBasicInfo,
  NotePatientBasicInfo,
  RecordMedicResponse,
  RecordPatientResponse,
} from '../../interfaces/types';

export type TemporaryNotePhoto = {
  images: [];
  categories: [];
};

export type TemporaryNoteInfo = NoteMedicBasicInfo & NotePatientBasicInfo;

type Note = {
  note: RecordPatientResponse & RecordMedicResponse;
  temporaryNoteInfo: TemporaryNoteInfo;
  temporaryNotePhoto: TemporaryNotePhoto;
  temporaryNoteAudio: File;
  diarisationsList: [];
};

const initialState: Note = {
  note: {} as RecordPatientResponse & RecordMedicResponse,
  temporaryNoteInfo: {
    title: '',
    details: '',
    treatment: '',
    complaints: '',
    recommendations: '',
    feelings: 1,
  },
  temporaryNotePhoto: {
    images: [],
    categories: [],
  },
  temporaryNoteAudio: {} as File,
  diarisationsList: [],
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote(
      state,
      action: PayloadAction<RecordPatientResponse | RecordMedicResponse>
    ) {
      state.note = action.payload;
    },
    addTemporaryNoteInfo(state, action: PayloadAction<TemporaryNoteInfo>) {
      state.temporaryNoteInfo = action.payload;
    },
    removeTemporaryNoteInfo(state) {
      state.temporaryNoteInfo = {
        title: '',
        details: '',
        treatment: '',
        complaints: '',
        recommendations: '',
        feelings: 1,
      };
    },
    removeAudio(state) {
      state.temporaryNoteAudio = {} as File;
    },
    addTemporaryNotePhoto(state, action: PayloadAction<TemporaryNotePhoto>) {
      state.temporaryNotePhoto = action.payload;
    },
    addTemporaryNoteAudio(state, action: PayloadAction<File>) {
      state.temporaryNoteAudio = action.payload;
    },
    setDiarisationsList(state, action) {
      state.diarisationsList = action.payload ? action.payload : [];
    },
  },
});

export const {
  addNote,
  addTemporaryNoteInfo,
  addTemporaryNotePhoto,
  removeTemporaryNoteInfo,
  addTemporaryNoteAudio,
  removeAudio,
  setDiarisationsList,
} = noteSlice.actions;

export default noteSlice.reducer;
