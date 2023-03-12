import { Panel, PanelHeader } from "@vkontakte/vkui";
import PhotoPicker from "../components/PhotoPicker/PhotoPicker";
import { PanelTypes } from "../routing/structure";

const NewNote = () => {
  return (
    <>
      <PanelHeader>Новая запись</PanelHeader>
      <PhotoPicker></PhotoPicker>
    </>
  );
};

export default NewNote;
