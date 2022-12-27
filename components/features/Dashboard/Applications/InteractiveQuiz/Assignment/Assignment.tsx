import React, { useState } from "react";
import AssignmentTimer from "../AssignmentTimer";
import styles from "./Assignment.module.css";
import FileDropzone from "./FileDropzone";
import { dateStringToSeconds } from "@utils/formatters/dateFormatter";

interface Props {
  assignment: AssignmentObject;
  setCurrentActiveAssignment: React.Dispatch<
    React.SetStateAction<AssignmentObject | null>
  >;
}


const Assignment: React.FC<Props> = ({
  assignment,
  setCurrentActiveAssignment,
}) => {
  const durationInSeconds = dateStringToSeconds(assignment.end_working_time);
  const [isAssignmentEnd, setIsAssignmentEnd] = useState(durationInSeconds <= 0);

  return (
    <main className={styles["assignment-body"]}>
      <button
        className={styles["back-button"]}
        onClick={() => setCurrentActiveAssignment(null)}
      >
        &larr; Back to Assignments
      </button>
      <section className={styles["assignment-container"]}>
        <div className={styles["assignment-head"]}>
          <h1 className={styles["assignment-title"]}>{assignment.name}</h1>
          {!isAssignmentEnd && (
            <AssignmentTimer
              durationInSeconds={durationInSeconds}
              onTimerEnd={() => setIsAssignmentEnd(true)}
            />
          )}
        </div>
        <p className={styles["assignment-task"]}>{assignment.description}</p>
        <h3>Your submission:</h3>
        <div className={styles["assignment-dropzone_container"]}>
          <FileDropzone
            assignment={assignment}
            isAssignmentEnd={isAssignmentEnd}
          />
        </div>
      </section>
    </main>
  );
};

export default Assignment;
