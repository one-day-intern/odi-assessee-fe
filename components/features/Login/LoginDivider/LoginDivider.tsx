import React from "react";
import styles from "./LoginDivider.module.css";

const LoginDivider = () => {
  return (
    <div className={styles["login-divider"]} data-testid="login-divider">
      <div className={styles["login-divider__line"]}></div>
      <div className={styles["login-divider__center"]}>
        <h2 className={styles["login-divider__text"]}> or </h2>
      </div>
      <div className={styles["login-divider__line"]}></div>
    </div>
  );
};

export { LoginDivider };
