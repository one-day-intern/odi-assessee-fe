import React, { useEffect, useRef } from "react";
import styles from "./EssayQuestion.module.css";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  onChange?: (answer: string, attemptId: string) => void;
  isQuizEnded: boolean;
  question: TextQuestionAttempt;
}

const DEBOUNCE_MS = 200;

const EssayQuestion: React.FC<Props> = ({ question, isQuizEnded, onChange }) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // if there is a scheduled onChange then clear it first
    // and schedule another one
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange?.(e.target.value, question["question-attempt-id"]);
    }, DEBOUNCE_MS);
  };

  useEffect(() => {
    const currTimeout = debounceRef.current;
    if (currTimeout) {
      // prevent memory leak
      return () => clearTimeout(currTimeout);
    }
  }, []);

  return (
    <div className={`${styles["question-body"]}`}>
      <p className={`${styles["question"]}`}>{question.prompt}</p>
      <div className={`${styles["question-answers"]}`}>
        <TextareaAutosize
          disabled={isQuizEnded}
          defaultValue={question.answer}
          style={{
            width: "100%",
            padding: "1rem",
            font: "inherit",
            resize: "none",
          }}
          placeholder={"Type your answer..."}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default EssayQuestion;
