import React from "react";
import AssignmentTimer from "../AssignmentTimer";
import styles from "./Assignment.module.css";
import FileDropzone from "./FileDropzone";

interface Props {
  assignment: AssignmentObject;
  setCurrentActiveAssignment: React.Dispatch<
    React.SetStateAction<AssignmentObject | null>
  >;
}

const getSecondsRemaining = (time: string) => {
  const timeinList = time.split(":").map((x) => parseInt(x));
  const [hours, minutes] = timeinList;
  let seconds: number = 0;
  if (timeinList.length > 2) seconds = timeinList[2];
  const date = new Date();
  date.setUTCHours(hours);
  date.setUTCMinutes(minutes);
  date.setUTCSeconds(seconds);
  const diffMs = date.getTime() - new Date().getTime();
  const diffSeconds = Math.floor(diffMs / 1000)
  return diffSeconds;
};

const Assignment: React.FC<Props> = ({
  assignment,
  setCurrentActiveAssignment,
}) => {
  const durationInSeconds = getSecondsRemaining(assignment.end_working_time);
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
          <AssignmentTimer
            onTimerEnd={() => setCurrentActiveAssignment(null)}
            durationInSeconds={durationInSeconds}
          />
        </div>
        <p className={styles["assignment-task"]}>{assignment.description}</p>
        <h3>Your submission:</h3>
        <div className={styles["assignment-dropzone_container"]}>
          {durationInSeconds > 0 && <FileDropzone assignment={assignment} />}
        </div>
      </section>
    </main>
  );
};

export default Assignment;
