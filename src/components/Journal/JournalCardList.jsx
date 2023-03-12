import { Spinner } from "@vkontakte/vkui";
import { useEffect, useState } from "react";
import styles from "./JournalCardList.module.css";

import JournalCard from "./JournalCard";

const JournalCardList = ({ onClick }) => {
  const [cardList, setCardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/v1/diary/get"
      );
      const json = await response.json();
      setCardList(json);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      {isLoading && (
        <Spinner size="large" className={styles.spinner} style={{}} />
      )}
      {cardList &&
        cardList.map((card) => {
          return (
            <JournalCard
              onClick={onClick}
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
            ></JournalCard>
          );
        })}
    </div>
  );
};

export default JournalCardList;
