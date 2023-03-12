export const PanelTypes = {
  JOURNALS: "JOURNALS",
  JOURNAL: "JOURNAL",
  NOTES: "ADDNOTE",
  ADDJOURNAL: "ADDJOURNAL",
  ADDNOTE: "ADDNOTE",
  PROFILE: "PROFILE",
  MYDOCTORS: "MYDOCTORS",
  MYPATIENTS: "MYPATIENTS",
};

export const structure = [
  {
    id: PanelTypes.JOURNALS,
    hash: "",
    panels: [
      {
        id: PanelTypes.JOURNALS,
        hash: "journals",
      },
    ],
  },
  {
    id: PanelTypes.NOTES,
    hash: "",
    panels: [
      {
        id: PanelTypes.NOTES,
        hash: "notes",
      },
    ],
  },
  {
    id: PanelTypes.ADDJOURNAL,
    hash: "",
    panels: [
      {
        id: PanelTypes.ADDJOURNAL,
        hash: "newJournal",
      },
    ],
  },
  {
    id: PanelTypes.ADDNOTE,
    hash: "",
    panels: [
      {
        id: PanelTypes.ADDNOTE,
        hash: "newNote",
      },
    ],
  },
  {
    id: PanelTypes.PROFILE,
    hash: "",
    panels: [
      {
        id: PanelTypes.PROFILE,
        hash: "profile",
      },
    ],
  },
  {
    id: PanelTypes.MYDOCTORS,
    hash: "",
    panels: [
      {
        id: PanelTypes.MYDOCTORS,
        hash: "mydoctors",
      },
    ],
  },
  {
    id: PanelTypes.MYPATIENTS,
    hash: "",
    panels: [
      {
        id: PanelTypes.MYPATIENTS,
        hash: "mypatients",
      },
    ],
  },
];
