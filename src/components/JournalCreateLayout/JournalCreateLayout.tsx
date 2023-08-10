import React, { useCallback, useState } from "react";
import {
  Button,
  SplitCol,
  SplitLayout,
  Input,
  FormItem,
  Textarea,
  Div,
  FormLayout,
  Checkbox,
  LocaleProvider,
  Select,
  DateInput,
  Text,
  CustomSelect,
} from "@vkontakte/vkui";

import styles from "./JournalCreateLayout.module.css";
import { DiaryBasicInfo } from "../../interfaces/types";
import { decodeHTMLEntities } from "../../helpers/decodeHTMLEntities";

interface JournalCreateLayoutProps {
  onCreateClick: (state: DiaryBasicInfo) => void;
}

const JournalCreateLayout = ({ onCreateClick }: JournalCreateLayoutProps) => {
  const [createJournalState, setCreateJournalState] = useState<DiaryBasicInfo>({
    title: "",
    diagnosis: "",
    objectively: "",
    complaints: "",
    anamnesis: "",
    reminder: {
      variant: false,
      frequency: 0,
      startdate: new Date().toString(),
    },
  });
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isFreqencyValid, setIsFreqencyValid] = useState<boolean>(true);
  const [isReminder, setIsReminder] = useState<boolean>(false);
  const onCreate = useCallback(() => {
    if (createJournalState.title.trim() === "") {
      setIsValid(false);
    } else {
      onCreateClick({
        ...createJournalState,
        reminder: {
          variant: createJournalState.reminder.variant,
          frequency: isReminder
            ? Number(createJournalState.reminder.frequency)
            : 0,
          startdate: createJournalState.reminder.startdate,
        },
      });
    }
  }, [createJournalState, onCreateClick, isReminder]);
  const onChange = () => {
    if (createJournalState.title.trim() !== "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  return (
    <SplitLayout className={styles.container}>
      <SplitCol>
        <FormLayout>
          <FormItem
            onChange={onChange}
            width="100%"
            top="Название дневника"
            status={createJournalState.title || isValid ? "default" : "error"}
            bottom={
              createJournalState.title || isValid
                ? ""
                : "Пожалуйста, введите название дневника"
            }
          >
            <Input
              maxLength={200}
              value={createJournalState.title}
              onChange={(event) =>
                setCreateJournalState({
                  ...createJournalState,
                  title: decodeHTMLEntities(event.target.value),
                })
              }
            />
          </FormItem>
          <FormItem width="100%" top="Жалобы">
            <Textarea
              maxLength={1000}
              onChange={(event) =>
                setCreateJournalState({
                  ...createJournalState,
                  complaints: decodeHTMLEntities(event.target.value),
                })
              }
              value={createJournalState.complaints}
            />
          </FormItem>
          <FormItem width="100%" top="Анамнез">
            <Textarea
              maxLength={1000}
              onChange={(event) =>
                setCreateJournalState({
                  ...createJournalState,
                  anamnesis: decodeHTMLEntities(event.target.value),
                })
              }
              value={createJournalState.anamnesis}
            />
          </FormItem>
          <FormItem width="100%" top="Объективно">
            <Textarea
              maxLength={1000}
              onChange={(event) =>
                setCreateJournalState({
                  ...createJournalState,
                  objectively: decodeHTMLEntities(event.target.value),
                })
              }
              value={createJournalState.objectively}
            />
          </FormItem>
          <FormItem width="100%" top="Диагноз">
            <Textarea
              maxLength={200}
              onChange={(event) =>
                setCreateJournalState({
                  ...createJournalState,
                  diagnosis: decodeHTMLEntities(event.target.value),
                })
              }
              value={createJournalState.diagnosis}
            />
          </FormItem>
          <Checkbox
            checked={isReminder}
            onChange={(e) => setIsReminder(e.target.checked)}
          >
            <Text weight="3">Настроить напоминания о записях для пациента</Text>
          </Checkbox>
          {isReminder && (
            <>
              <FormItem top="Выберите частоту уведомлений">
                <Select
                  options={[
                    { label: "Х раз в день", value: 0 },
                    { label: "1 раз в X дней", value: 1 },
                  ]}
                  onChange={(e) => {
                    setCreateJournalState({
                      ...createJournalState,
                      reminder: {
                        variant: Number(e.target.value) === 1 ? true : false,
                        frequency: createJournalState.reminder.frequency,
                        startdate: createJournalState.reminder.startdate,
                      },
                    });
                  }}
                />
              </FormItem>
              <FormItem
                top="Количество Х"
                status={isFreqencyValid ? "default" : "error"}
                bottom={
                  isFreqencyValid ? "" : "Количество Х не должно быть больше 50"
                }
              >
                <Input
                  step="1"
                  type="text"
                  pattern="[0-9]*"
                  value={createJournalState.reminder.frequency}
                  onChange={(e) => {
                    if (Number(e.target.value) > 50) {
                      setIsFreqencyValid(false);
                    } else {
                      setIsFreqencyValid(true);
                      setCreateJournalState({
                        ...createJournalState,
                        reminder: {
                          variant: createJournalState.reminder.variant,
                          frequency:
                            e.target.validity.valid || !e.target.value
                              ? e.target.value
                              : createJournalState.reminder.frequency,
                          startdate: createJournalState.reminder.startdate,
                        },
                      });
                    }
                  }}
                ></Input>
              </FormItem>
              <FormItem top="Выберите дату начала отправки уведомлений">
                <LocaleProvider value={"ru"}>
                  <DateInput
                    value={new Date(createJournalState.reminder.startdate)}
                    onChange={(e) =>
                      setCreateJournalState({
                        ...createJournalState,
                        reminder: {
                          variant: createJournalState.reminder.variant,
                          frequency: createJournalState.reminder.frequency,
                          startdate:
                            e?.toString() ??
                            createJournalState.reminder.startdate,
                        },
                      })
                    }
                    disablePast
                    closeOnChange
                    disablePickers
                  />
                </LocaleProvider>
              </FormItem>
            </>
          )}
          <Div>
            <Button size="l" stretched type="submit" onClick={onCreate}>
              Создать
            </Button>
          </Div>
        </FormLayout>
      </SplitCol>
    </SplitLayout>
  );
};

export default JournalCreateLayout;
