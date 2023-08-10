import React, { useCallback, useState } from 'react';
import {
  Button,
  SplitCol,
  SplitLayout,
  Input,
  FormItem,
  Textarea,
  ButtonGroup,
  FormLayout,
  Checkbox,
  LocaleProvider,
  DateInput,
  Select,
} from '@vkontakte/vkui';

import styles from './JournalEdit.module.css';
import { DiaryBasicInfo } from '../../interfaces/types';
import { decodeHTMLEntities } from '../../helpers/decodeHTMLEntities';

interface JournalEditLayoutProps {
  onConfirmChange: (state: DiaryBasicInfo) => void;
  onCancelChange: () => void;
  journalData: DiaryBasicInfo;
}

const JournalEditLayout = ({
  onConfirmChange,
  onCancelChange,
  journalData,
}: JournalEditLayoutProps) => {
  const [changeJournalState, setChangeJournalState] = useState<DiaryBasicInfo>({
    ...journalData,
  });
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isReminder, setIsReminder] = useState<boolean>(
    journalData.reminder.frequency !== 0
  );

  const [isFreqencyValid, setIsFreqencyValid] = useState<boolean>(true);

  const onConfirmChangeHandler = () => {
    if (changeJournalState.title.trim() === '') {
      setIsValid(false);
    } else {
      onConfirmChange({
        ...changeJournalState,
        reminder: {
          variant: changeJournalState.reminder.variant,
          frequency: isReminder
            ? Number(changeJournalState.reminder.frequency)
            : 0,
          startdate: changeJournalState.reminder.startdate,
        },
      });
    }
  };
  const onChangeHandler = useCallback(() => {
    if (changeJournalState.title.trim() !== '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [changeJournalState]);
  return (
    <SplitLayout className={styles.container}>
      <SplitCol width="100%">
        <FormLayout>
          <FormItem
            onChange={onChangeHandler}
            width="100%"
            top="Название дневника"
            status={changeJournalState.title || isValid ? 'default' : 'error'}
            bottom={
              changeJournalState.title || isValid
                ? ''
                : 'Пожалуйста, введите название дневника'
            }
          >
            <Input
              maxLength={200}
              value={decodeHTMLEntities(changeJournalState.title)}
              onChange={(event) =>
                setChangeJournalState({
                  ...changeJournalState,
                  title: event.target.value,
                })
              }
            />
          </FormItem>
          <FormItem width="100%" top="Жалобы">
            <Textarea
              maxLength={1000}
              onChange={(event) =>
                setChangeJournalState({
                  ...changeJournalState,
                  complaints: event.target.value,
                })
              }
              value={decodeHTMLEntities(changeJournalState.complaints)}
            />
          </FormItem>
          <FormItem width="100%" top="Анамнез">
            <Textarea
              maxLength={1000}
              onChange={(event) =>
                setChangeJournalState({
                  ...changeJournalState,
                  anamnesis: event.target.value,
                })
              }
              value={decodeHTMLEntities(changeJournalState.anamnesis)}
            />
          </FormItem>
          <FormItem width="100%" top="Объективно">
            <Textarea
              maxLength={1000}
              onChange={(event) =>
                setChangeJournalState({
                  ...changeJournalState,
                  objectively: event.target.value,
                })
              }
              value={decodeHTMLEntities(changeJournalState.objectively)}
            />
          </FormItem>
          <FormItem width="100%" top="Диагноз">
            <Textarea
              maxLength={200}
              onChange={(event) =>
                setChangeJournalState({
                  ...changeJournalState,
                  diagnosis: event.target.value,
                })
              }
              value={decodeHTMLEntities(changeJournalState.diagnosis)}
            />
          </FormItem>
          <FormItem>
            <Checkbox
              checked={isReminder}
              onChange={(e) => setIsReminder(e.target.checked)}
            >
              Настроить напоминания о записях для пациента
            </Checkbox>
          </FormItem>
          {isReminder && (
            <>
              <FormItem top="Выберите частоту уведомлений">
                <Select
                  value={Number(changeJournalState.reminder.variant)}
                  placeholder="Не выбрана"
                  options={[
                    {
                      label: 'Х раз в день',
                      value: 0,
                    },
                    {
                      label: '1 раз в X дней',
                      value: 1,
                    },
                  ]}
                  onChange={(e) =>
                    setChangeJournalState({
                      ...changeJournalState,
                      reminder: {
                        variant: Boolean(e.target.value),
                        frequency: changeJournalState.reminder.frequency,
                        startdate: changeJournalState.reminder.startdate,
                      },
                    })
                  }
                />
              </FormItem>
              <FormItem
                top="Количество Х"
                status={isFreqencyValid ? 'default' : 'error'}
                bottom={
                  isFreqencyValid ? '' : 'Количество Х не должно быть больше 50'
                }
              >
                <Input
                  type="number"
                  value={changeJournalState.reminder.frequency}
                  placeholder="0"
                  onChange={(e) => {
                    if (Number(e.target.value) > 50) {
                      setIsFreqencyValid(false);
                    } else {
                      setIsFreqencyValid(true);
                      setChangeJournalState({
                        ...changeJournalState,
                        reminder: {
                          variant: changeJournalState.reminder.variant,
                          frequency:
                            e.target.validity.valid || !e.target.value
                              ? e.target.value
                              : changeJournalState.reminder.frequency,
                          startdate: changeJournalState.reminder.startdate,
                        },
                      });
                    }
                  }}
                ></Input>
              </FormItem>
              <FormItem top="Выберите дату начала отправки уведомлений">
                <LocaleProvider value={'ru'}>
                  <DateInput
                    value={new Date(changeJournalState.reminder.startdate)}
                    onChange={(e) =>
                      setChangeJournalState({
                        ...changeJournalState,
                        reminder: {
                          variant: changeJournalState.reminder.variant,
                          frequency: changeJournalState.reminder.frequency,
                          startdate:
                            e?.toString() ??
                            changeJournalState.reminder.startdate,
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
          <ButtonGroup
            style={{
              justifyContent: 'center',
              position: 'sticky',
              height: '60px',
              gap: '50px',
            }}
            align="center"
            mode="horizontal"
            gap="m"
            stretched
          >
            <Button
              mode="tertiary"
              appearance="negative"
              onClick={onCancelChange}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              mode="tertiary"
              onClick={onConfirmChangeHandler}
            >
              Сохранить
            </Button>
          </ButtonGroup>
        </FormLayout>
      </SplitCol>
    </SplitLayout>
  );
};

export default JournalEditLayout;
