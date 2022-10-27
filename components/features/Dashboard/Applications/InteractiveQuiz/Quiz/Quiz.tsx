import React from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import Sidebar from "./Sidebar";
import AssignmentTimer from "../AssignmentTimer";
import styles from "./Quiz.module.css";
import { Button } from "@components/shared/elements/Button";

const buttonStyles: React.CSSProperties = {
  maxWidth: 150,
  padding: "1rem",
  fontWeight: "bold",
  fontSize: "1rem",
  boxSizing: "border-box"
};

const Quiz = () => {
  return (
    <>
      <Sidebar />
      <div className={`${styles["quiz-body"]}`}>
        <div className={`${styles["quiz-header"]}`}>
          <h1 className={`${styles["question-header"]}`}>Question X</h1>
          <AssignmentTimer
            durationInMinutes={120}
            onTimerEnd={() => console.log("hello")}
          />
        </div>
        <MultipleChoiceQuestion />
        <div className={`${styles["quiz-controls"]}`}>
          <Button
            style={{
              ...buttonStyles,
              backgroundColor: "transparent",
              color: "#3D65D8",
              border: "2px solid #3D65D8",
              padding: "0.75rem"
            }}
            variant="secondary"
          >
            Previous
          </Button>
          <Button style={buttonStyles} variant="secondary">
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
