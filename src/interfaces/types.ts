export type DiariesResponse = {
  diarylist: Diary[];
};

export type DiaryBasicInfo = {
  title: string;
  complaints: string;
  anamnesis: string;
  objectively: string;
  diagnosis: string;
};

export type NoteMedicBasicInfo = {
  title: string;
  treatment: string;
  recommendations: string;
  details: string;
};

export type NotePatientBasicInfo = {
  title: string;
  treatment: string;
  complaints: string;
  details: string;
};

export type DiaryUpdateResponse = {
  id: number;
  medicid: number;
  patientid: number;
  creatingdate: string;
  diarybasicinfo: DiaryBasicInfo;
};

export type DiaryCreateResponse = {
  id: number;
  medicid: number;
  creatingdate: string;
  diarybasicinfo: DiaryBasicInfo;
};
export type DiaryResponse = {
  patientname: string;
  diary: {
    // Надо исправить на бэкенде нейминг
    id: number;
    medicid: number;
    medicname: string;
    patientid: number;
    creatingdate: string;
    diarybasicinfo: DiaryBasicInfo;
  };
  records: {
    medicrecordlist: MedicRecord[];
    patientrecordlist: PatientRecord[];
  };
};
export type MedicRecord = {
  creatingdate: string;
  title: string;
  details: string;
  id: number;
};
export type PatientRecord = {
  creatingdate: string;
  title: string;
  details: string;
  id: number;
};

export type RecordMedicResponse = {
  basicinfo: NoteMedicBasicInfo;
  creatingdate: string;
  diaryid: number;
  id: number;
  imagelist: ImageState[];
  diarisation: string;
};
export type RecordPatientResponse = {
  basicinfo: NotePatientBasicInfo;
  creatingdate: string;
  diaryid: number;
  id: number;
  imagelist: ImageState[];
};

export type ImageState = {
  imagename: string;
  tags: string[];
};

export type Diary = {
  id: number;
  title: string;
  medicid: string;
  medicname: string;
  patientid: string;
  patientname: string;
  creatingdate: string;
  objectively: string;
};

export type Record = {
  id: number;
  diaryid: number;
  creatingdate: string;
  description: string;
  title: string;
  area: number;
  characteristics: Characteristics;
  imagelist?: NoteImage[];
};

export type Characteristics = {
  dryness: number;
  edema: number;
  itching: number;
  pain: number;
  peeling: number;
  redness: number;
};

type NoteImage = {
  id: number;
  recordid: number;
  name: string;
  area: number;
};

export enum TypesOfSliders {
  dryness = 'Сухость',
  edema = 'Отек',
  itching = 'Зуд',
  pain = 'Боль',
  peeling = 'Шелушение',
  redness = 'Покраснение',
}

export enum Roles {
  MEDIC = 'MEDIC',
  PATIENT = 'PATIENT',
  NOTHING = 'NOTHING',
}

export type User = {
  vkID: number | null;
  role: Roles | null;
  name: string;
};

export type MessageType = {
  id: number;
  basiccommentinfo: {
    text: string;
  };
  authorIsMedic: boolean;
  isreaded: boolean;
  creatingdate: string;
};
