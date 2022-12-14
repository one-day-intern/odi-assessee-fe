import React, { useState } from "react";
import styles from "./ProgressBar.module.css";
import ProgressIndicator from "./ProgressIndicator";

interface Props {
  questions: Array<TextQuestionAttempt | MultipleChoiceQuestionAttempt>;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
}

const ProgressBar: React.FC<React.PropsWithChildren<Props>> = ({ questions, currentQuestion, setCurrentQuestion }) => {
  return (
    <div
      className={`${styles["progress-bar_container"]} ${
        questions.length > 10 ? styles["progress-bar_container-overflow"] : ""
      }`}
    >
      <div
        style={{ height: (questions.length - 1) * 50 }}
        className={`${styles["progress-bar"]} ${
          questions.length > 10 ? styles["progress-bar_overflow"] : ""
        }`}
      >
        <div
          className={`${styles.bar}`}
          style={{ height: currentQuestion * 50 }}
        />
      </div>
      {questions.map((question, i) => (
        <ProgressIndicator
          key={question["question-attempt-id"]}
          isCurrentQuestion={i === currentQuestion}
          questionCompleted={questions[i]["is-answered"]}
          questionNumber={i + 1}
          onClick={(e) => setCurrentQuestion(i)}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
