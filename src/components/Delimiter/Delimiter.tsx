import { Div } from '@vkontakte/vkui';
import React from 'react';
import styles from './Delimiter.module.css';
export const Delimiter = ({ text }: { text: string }) => {
  return <Div className={styles.delimiter}>{text}</Div>;
};
