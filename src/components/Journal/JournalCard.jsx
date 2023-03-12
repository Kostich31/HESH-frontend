import { Card, Title, Text } from "@vkontakte/vkui";
import styles from "./JournalCard.module.css";
import PropTypes from "prop-types";
import { PanelTypes } from "../../routing/structure";

const JournalCard = ({ id, title, onClick, description, category }) => {
  const cardClickHandler = () => {
    onClick(PanelTypes.JOURNAL, title);
    console.log("clicked");
  };
  return (
    <>
      <Card className={styles.card} mode="outline" onClick={cardClickHandler}>
        <Title level="3">{title}</Title>
        <Text level="3">{description}</Text>
      </Card>
    </>
  );
};

JournalCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default JournalCard;
