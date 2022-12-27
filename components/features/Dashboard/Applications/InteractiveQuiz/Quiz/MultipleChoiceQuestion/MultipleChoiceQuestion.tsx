import React from "react";
import styles from "./MultipleChoiceQuestion.module.css";
import { motion } from "framer-motion";

interface MultipleChoiceProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
  value?: string;
}

const MultipleChoice: React.FC<
  React.PropsWithChildren<MultipleChoiceProps>
> = ({ value, selected, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.99 }}
      animate={{ scale: selected ? 1.015 : 1 }}
      className={`${styles["choice"]} ${selected ? styles.selected : ""}`}
    >
      <div className={`${styles["indicator-outer"]}`}>
        <div className={`${styles["indicator-inner"]}`} />
      </div>
      <p>{value}</p>
    </motion.button>
  );
};

interface Props {
  onChange?: (optionId: string, attemptId: string) => void;
  question: MultipleChoiceQuestionAttempt;
}

const MultipleChoiceQuestion: React.FC<Props> = ({ question, onChange }) => {
  const handleChoiceClick = (optionId: string) => {
    // if user answer changed
    if (optionId !== question["selected-answer-option-id"]) {
      onChange?.(optionId, question["question-attempt-id"]);
    }
  }

  return (
    <div className={`${styles["question-body"]}`}>
      <p className={`${styles["question"]}`}>
        {question.prompt}
      </p>
      <div className={`${styles["question-answers"]}`}>
        {question["answer-options"].map((option, i) => (
          <MultipleChoice
            key={option["answer-option-id"]}
            value={option.content}
            onClick={() => handleChoiceClick(option["answer-option-id"])}
            selected={option["answer-option-id"] === question["selected-answer-option-id"]}
          />
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
