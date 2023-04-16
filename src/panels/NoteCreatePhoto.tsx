// import {
//   ActionSheetDefaultIosCloseItem,
//   ActionSheetItem,
//   ActionSheet,
//   Div,
// } from '@vkontakte/vkui';
import React from 'react';
import PhotoPicker from '../components/Note/NoteCreate/PhotoPicker/PhotoPicker';

export default function NoteCreatePhoto() {
  // const [popout, setPopout] = useState<ReactNode>(null);
  // const onAddCategory = () => {
  //   setPopout(
  //     <ActionSheet
  //       iosCloseItem={<ActionSheetDefaultIosCloseItem />}
  //       style={{
  //         position: 'relative',
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         flexDirection: 'row',
  //       }}
  //       onClose={() => {}}
  //     >
  //       <Div>
  //         <ActionSheetItem name="category" value="best" autoClose selectable>
  //           Удалить
  //         </ActionSheetItem>
  //         <ActionSheetItem name="delete" value="relatives" autoClose selectable>
  //           Добавить категорию
  //         </ActionSheetItem>
  //       </Div>
  //     </ActionSheet>
  //   );
  // };
  return <PhotoPicker></PhotoPicker>;
}
