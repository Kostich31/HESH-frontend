import { Input } from "@vkontakte/vkui";
import { Icon16SearchOutline } from "@vkontakte/icons";
import styles from "./SearchInput.module.css";
const SearchInput = () => {
  return (
    <>
      <Input
        className={styles.input}
        before={<Icon16SearchOutline></Icon16SearchOutline>}
        placeholder="Введите название дневника"
      ></Input>
    </>
  );
};

export default SearchInput;
