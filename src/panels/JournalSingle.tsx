import { Icon28AddSquareOutline } from "@vkontakte/icons";
import {
  Alert,
  Div,
  FixedLayout,
  IconButton,
  Spinner,
  SplitCol,
  SplitLayout,
  Text,
} from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import { useRouterActions } from "react-router-vkminiapps-updated";
import JournalCardDetailed from "../components/Journal/JournalCardDetailed";
import NoteCard from "../components/Note/NoteCard";
import { DiaryResponse } from "../interfaces/types";
import { PanelTypes } from "../router/structure";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  addCreatingDate,
  addJournalId,
  addJournalInfo,
  addName,
  addNotesList,
  removeJournal,
  setJournalComplete,
} from "../store/journal/journalSlice";
import { addNote } from "../store/note/noteSlice";
import BackendService from "../service/BackendService";
import { DropdownJournal } from "../components/Dropdown/DropdownJournal";
import { ChartPatient } from "../components/Chart/Chart";
import { setActiveDiaryId, setMessagesList } from "../store/chat/chatSlice";

export default function JournalSingle() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const journalId = useAppSelector((state) => state.journal.id) as number;
  const isCompleted = useAppSelector(
    (state) => state.journal.activeJournalComplete
  );
  const isMedic = BackendService.getRole();
  const records = useAppSelector((state) => state.journal.recordsList);
  const recordsMedicState = records.medicrecordlist;
  const recordsPatientState = records.patientrecordlist;
  const dispatch = useAppDispatch();
  const { toPanel } = useRouterActions();

  useEffect(() => {
    const fetchData = async () => {
      const journal: DiaryResponse = await BackendService.getDiary(
        journalId as number
      );

      dispatch(addJournalInfo(journal.diary.diarybasicinfo));
      dispatch(
        addName(isMedic ? journal.patientname : journal.diary.medicname)
      );
      dispatch(addCreatingDate(journal.diary.creatingdate));
      dispatch(addNotesList(journal.records));
      setIsLoading(false);
    };
    fetchData();
  }, []);
  const onEditClick = async () => {
    const diary: DiaryResponse = await BackendService.getDiary(journalId);
    dispatch(addJournalInfo(diary.diary.diarybasicinfo));
    dispatch(addJournalId(journalId));
    toPanel(PanelTypes.JOURNAL_EDIT);
  };
  const onDeleteClick = async () => {
    await BackendService.deleteDiary(journalId);
    dispatch(removeJournal(journalId));
    toPanel(PanelTypes.JOURNALS);
  };
  const onDetailedClick = () => {
    toPanel(PanelTypes.JOURNAL_SINGLE_DETAILED);
  };
  const createNoteHandler = () => {
    toPanel(PanelTypes.NOTE_CREATE_INFO);
  };
  const noteClickHandler = async (id: number, type: string) => {
    let response;
    if (type === "medic") {
      response = await BackendService.getNote(id, type);
    } else {
      response = await BackendService.getNote(id, type);
    }
    dispatch(addNote(response));
    toPanel(PanelTypes.NOTE_SINGLE);
  };
  const onChatClick = async () => {
    dispatch(setActiveDiaryId({ id: journalId }));
    const data = await BackendService.getComment(journalId);
    dispatch(setMessagesList(data.CommentList ? data.CommentList : []));
    toPanel(PanelTypes.DOCTOR_WITH_PATIENT_CHAT);
  };
  const onCompleteClick = async () => {
    await BackendService.completeDiary(journalId);
    dispatch(setJournalComplete(false));
    toPanel(PanelTypes.JOURNALS);
  };
  const [popout, setPopout] = useState(null);
  const openConfirmBox = (
    isDeleteJournal = false,
    isNotePopout = false,
    callback: any
  ) => {
    if (isNotePopout) {
      setPopout(
        (
          <Alert
            actions={[
              {
                title: "Отмена",
                autoClose: true,
                mode: "cancel",
              },
              {
                title: "Удалить",
                autoClose: true,
                mode: "destructive",
                action: callback,
              },
            ]}
            actionsLayout="horizontal"
            onClose={() => setPopout(null)}
            header="Удаление"
            text="Вы уверены, что хотите
               удалить запись?"
          />
        ) as any
      );
    } else {
      setPopout(
        (
          <Alert
            actions={[
              {
                title: "Отмена",
                autoClose: true,
                mode: "cancel",
              },
              {
                title: isDeleteJournal ? "Удалить" : "Завершить",
                autoClose: true,
                mode: "destructive",
                action: isDeleteJournal ? onDeleteClick : onCompleteClick,
              },
            ]}
            actionsLayout="horizontal"
            onClose={() => setPopout(null)}
            header={`${isDeleteJournal ? "Удаление" : "Завершение"} дневника`}
            text={`Вы уверены, что хотите ${
              isDeleteJournal ? "удалить" : "завершить"
            } дневник?`}
          />
        ) as any
      );
    }
  };
  return (
    <SplitLayout popout={popout}>
      <SplitCol width="100%">
        {isLoading && <Spinner size="large" />}
        {!isLoading && (
          <>
            <JournalCardDetailed
              DropdownJournal={
                !isCompleted && isMedic ? (
                  <DropdownJournal
                    isMedic={isMedic}
                    onEditClick={onEditClick}
                    onDeleteClick={() => openConfirmBox(true, false, null)}
                    onMoreClick={onDetailedClick}
                    onChatClick={onChatClick}
                    onCompleteClick={() => openConfirmBox(false, false, null)}
                  ></DropdownJournal>
                ) : null
              }
            ></JournalCardDetailed>
            {isMedic && (
              <ChartPatient
                recordsList={recordsPatientState}
                onPointClick={noteClickHandler}
              ></ChartPatient>
            )}
            <Text
              weight="1"
              style={{
                marginBottom: "5px",
                marginTop: "10px",
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              Записи
            </Text>
            {recordsMedicState.length !== 0 ||
            recordsPatientState.length !== 0 ? (
              <Div style={{ marginBottom: "10px" }}>
                {recordsMedicState.map((note, index) => {
                  return (
                    <NoteCard
                      isMedicRecord
                      onNoteClick={noteClickHandler}
                      key={index}
                      {...note}
                      creatingDate={note.creatingdate}
                      isCompletedJournal={isCompleted}
                      confirmBoxCallback={openConfirmBox}
                    ></NoteCard>
                  );
                })}
                {recordsPatientState.map((note, index) => {
                  return (
                    <NoteCard
                      onNoteClick={noteClickHandler}
                      key={index}
                      {...note.recordindiarybasicinfo}
                      creatingDate={note.recordindiarybasicinfo.creatingdate}
                      isCompletedJournal={isCompleted}
                      confirmBoxCallback={openConfirmBox}
                    ></NoteCard>
                  );
                })}
              </Div>
            ) : (
              <Text style={{ textAlign: "center", marginBottom: "36px" }}>
                Записей нет
              </Text>
            )}
          </>
        )}
        {!isCompleted && (
          <FixedLayout
            vertical="bottom"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              style={{
                marginBottom: "10px",
                marginRight: "10px",
              }}
              onClick={createNoteHandler}
            >
              <Icon28AddSquareOutline fill={"#2688EB"} width={48} height={48} />
            </IconButton>
          </FixedLayout>
        )}
      </SplitCol>
    </SplitLayout>
  );
}
