import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  MedicRecord,
  PatientRecord,
  DiaryBasicInfo,
  Diary,
} from "../../interfaces/types";

type Journal = {
  diarylist: Diary[];
  id: number | null;
  activeJournalComplete: boolean;
  name: string;
  creatingdate: string;
  journal: DiaryBasicInfo;
  recordsList: {
    medicrecordlist: MedicRecord[];
    patientrecordlist: PatientRecord[];
  };
};

const initialState: Journal = {
  diarylist: [],
  id: null,
  activeJournalComplete: false,
  name: "",
  creatingdate: "",
  journal: {
    title: "",
    complaints: "",
    anamnesis: "",
    objectively: "",
    diagnosis: "",
  },
  recordsList: {
    medicrecordlist: [],
    patientrecordlist: [],
  },
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    addJournalId(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    setJournalComplete(state, action: PayloadAction<boolean>) {
      state.activeJournalComplete = action.payload;
    },
    addJournalInfo(state, action: PayloadAction<DiaryBasicInfo>) {
      state.journal = action.payload;
    },
    addName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    addCreatingDate(state, action: PayloadAction<string>) {
      state.creatingdate = action.payload;
    },
    removeJournalId(state, action: PayloadAction<null>) {
      state.id = action.payload;
    },
    removeNote(state, action: PayloadAction<{ id: number; type: string }>) {
      if (action.payload.type === "medic") {
        state.recordsList.medicrecordlist =
          state.recordsList.medicrecordlist.filter(
            (record) => record.id !== action.payload.id
          );
      } else {
        state.recordsList.patientrecordlist =
          state.recordsList.patientrecordlist.filter(
            (record) => record.recordindiarybasicinfo.id !== action.payload.id
          );
      }
    },
    addNotesList(
      state,
      action: PayloadAction<{
        medicrecordlist: MedicRecord[];
        patientrecordlist: PatientRecord[];
      }>
    ) {
      state.recordsList = action.payload;
    },
    addNote(
      state,
      action: PayloadAction<{
        isMedic: boolean;
        record: MedicRecord | PatientRecord;
      }>
    ) {
      if (action.payload.isMedic) {
        state.recordsList.medicrecordlist.push(action.payload.record);
      } else {
        state.recordsList.patientrecordlist.push(action.payload.record);
      }
    },
    addJournals(state, action: PayloadAction<Diary[]>) {
      state.diarylist = action.payload;
    },
    removeJournal(state, action: PayloadAction<number>) {
      state.diarylist = state.diarylist.filter(
        (diary) => diary.id !== action.payload
      );
    },
  },
});

export const {
  addJournalId,
  removeJournalId,
  addNotesList,
  addNote,
  addJournalInfo,
  addJournals,
  removeJournal,
  addCreatingDate,
  addName,
  removeNote,
  setJournalComplete,
} = journalSlice.actions;

export default journalSlice.reducer;
