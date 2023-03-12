import { PanelHeader } from "@vkontakte/vkui";
import JournalCreate from "../components/JournalCreate/JournalCreate";

const NewJournal = () => {
  return (
    <>
      <PanelHeader>Новый дневник</PanelHeader>
      <JournalCreate></JournalCreate>
    </>
  );
};

export default NewJournal;
