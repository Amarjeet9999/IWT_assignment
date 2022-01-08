import React from "react";
import styles from "./card.module.css";

export const Card = ({ data }) => {
  return (
    <>
      <div className={styles.main}>
        <div>{data.title}</div>
        <div className={styles.date}>{data.date}</div>
      </div>
    </>
  );
};
