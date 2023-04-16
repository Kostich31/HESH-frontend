import { IStructure } from 'react-router-vkminiapps-updated';

export enum ViewTypes {
  JOURNALS = 'JOURNALS',
  MY_DOCTORS = 'MY_DOCTORS',
  MY_PATIENTS = 'MY_PATIENTS',
  PROFILE = 'PROFILE',
  REGISTER = 'REGISTER',
}

export enum PanelTypes {
  JOURNALS = 'JOURNALS',
  JOURNAL_CREATE = 'JOURNALS_CREATE',
  JOURNAL_EDIT = 'JOURNAL_EDIT',
  NOTE_CREATE_INFO = 'NOTE_CREATE_INFO',
  NOTE_CREATE_PHOTO = 'NOTE_CREATE_PHOTO',
  JOURNAL_SINGLE = 'JOURNAL_SINGLE',
  JOURNAL_SINGLE_DETAILED = 'JOURNAL_SINGLE_DETAILED',
  NOTE_SINGLE = 'NOTE_SINGLE',
  NOTE_EDIT = 'NOTE_EDIT',
  NOTE_EDIT_PHOTO = 'NOTE_EDIT_PHOTO',
  NOTE_CREATE_AUDIO = 'NOTE_CREATE_AUDIO',
  MY_DOCTORS = 'MY_DOCTORS',
  MY_PATIENTS = 'MY_PATIENTS',
  PROFILE = 'PROFILE',
  REGISTER_CHOOSE = 'REGISTER_CHOOSE',
  REGISTER_PATIENT = 'REGISTER_PATIENT',
  NOTE_AUDIO_TEXT = 'NOTE_AUDIO_TEXT',
}

const structure: IStructure = [
  {
    id: ViewTypes.JOURNALS,
    hash: 'journals',
    panels: [
      {
        id: PanelTypes.JOURNALS,
        hash: '/journals',
      },
      {
        id: PanelTypes.JOURNAL_CREATE,
        hash: '/journal/create',
      },
      {
        id: PanelTypes.JOURNAL_EDIT,
        hash: '/journal/edit',
      },
      {
        id: PanelTypes.JOURNAL_SINGLE,
        hash: '/journal',
      },
      {
        id: PanelTypes.JOURNAL_SINGLE_DETAILED,
        hash: '/journal/detauled',
      },
      {
        id: PanelTypes.NOTE_CREATE_INFO,
        hash: '/note/create/info',
      },
      {
        id: PanelTypes.NOTE_CREATE_PHOTO,
        hash: '/note/create/photo',
      },
      {
        id: PanelTypes.NOTE_SINGLE,
        hash: '/note/single',
      },
      {
        id: PanelTypes.NOTE_EDIT,
        hash: '/note/edit',
      },
      {
        id: PanelTypes.NOTE_EDIT_PHOTO,
        hash: '/note/edit/photo',
      },
      {
        id: PanelTypes.NOTE_CREATE_AUDIO,
        hash: '/note/create/audio',
      },
      {
        id: PanelTypes.NOTE_AUDIO_TEXT,
        hash: '/note/audio/text',
      },
    ],
  },
  {
    id: ViewTypes.MY_DOCTORS,
    hash: '/doctors',
    panels: [
      {
        id: PanelTypes.MY_DOCTORS,
        hash: '',
      },
    ],
  },
  {
    id: ViewTypes.MY_PATIENTS,
    hash: '/patients',
    panels: [
      {
        id: PanelTypes.MY_PATIENTS,
        hash: '',
      },
    ],
  },
  {
    id: ViewTypes.PROFILE,
    hash: '/profile',
    panels: [
      {
        id: PanelTypes.PROFILE,
        hash: '',
      },
    ],
  },
  {
    id: ViewTypes.REGISTER,
    hash: '/register',
    panels: [
      {
        id: PanelTypes.REGISTER_CHOOSE,
        hash: '/register/choose',
      },
      {
        id: PanelTypes.REGISTER_PATIENT,
        hash: '/register/choose/patient',
      },
    ],
  },
];

export default structure;
