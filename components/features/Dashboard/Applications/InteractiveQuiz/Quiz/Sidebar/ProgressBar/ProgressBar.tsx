import React, { useState } from "react";
import styles from "./ProgressBar.module.css";
import ProgressIndicator from "./ProgressIndicator";
import { motion } from "framer-motion";

interface Props {}

const ProgressBar: React.FC<React.PropsWithChildren<Props>> = () => {
  const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <div
      className={`${styles["progress-bar_container"]} ${
        questions.length > 10 ? styles["progress-bar_container-overflow"] : ""
      }`}
    >
      <div
        style={{ height: questions.length * 50 }}
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
          isCurrentQuestion={i === currentQuestion}
          questionCompleted={i === 3}
          onClick={(e) => setCurrentQuestion(i)}
          key={question}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
