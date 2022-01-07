import React from "react";
import styles from "./card.module.css";

export const Card = ({ title }) => {
  return <div className={styles.main}>{title}</div>;
};
