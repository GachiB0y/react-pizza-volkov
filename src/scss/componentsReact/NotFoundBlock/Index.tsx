import React from 'react';
import styles from './NotFoundBlock.module.css';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span className={styles.smile}>😕</span> <br />
        Ничего не найдено
      </h1>
      <p className={styles.dicription}>Ксожалению данная страница отсутсвует в магазине</p>
    </div>
  );
};
