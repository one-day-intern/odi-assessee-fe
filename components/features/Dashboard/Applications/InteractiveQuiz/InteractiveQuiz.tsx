import React from "react";
import Assignment from "./Assignment";
import styles from "./InteractiveQuiz.module.css";
import Quiz from "./Quiz";

const InteractiveQuiz = () => {
  return (
    <div data-testid="InteractiveQuiz" className={`${styles["app-container"]}`}>
      <div id="quiz-root" className={`${styles["window-body"]}`}>
        <Assignment />
      </div>
    </div>
  );
};

export default InteractiveQuiz;
