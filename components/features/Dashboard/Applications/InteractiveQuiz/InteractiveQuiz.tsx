import React from "react";
import styles from "./InteractiveQuiz.module.css";
import Quiz from "./Quiz";

const InteractiveQuiz = () => {
  return (
    <div data-testid="InteractiveQuiz" className={`${styles["app-container"]}`}>
      <div id="quiz-root" className={`${styles["window-body"]}`}>
        <Quiz />
      </div>
    </div>
  );
};

export default InteractiveQuiz;
