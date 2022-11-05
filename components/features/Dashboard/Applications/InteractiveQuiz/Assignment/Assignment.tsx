import usePostRequest from "@hooks/shared/usePostRequest";
import { useRouter } from "next/router";
import React from "react";
import AssignmentTimer from "../AssignmentTimer";
import styles from "./Assignment.module.css";
import FileDropzone from "./FileDropzone";

interface Props {
  assignment: AssignmentObject;
  setCurrentActiveAssignment: React.Dispatch<React.SetStateAction<AssignmentObject | null>>;
}

const getSecondsRemaining = (time: string) => {
  const today = new Date();
  const todayStr = today.toISOString();
  const endIdx = todayStr.indexOf("T");
  const todayDate = todayStr.substring(0, endIdx + 1);
  const endWorkingTimeStr = todayDate.concat(time);
  const nowWorkingTimeStr = todayDate.concat(today.toLocaleTimeString());
  const endDate = new Date(endWorkingTimeStr);
  const startDate = new Date(nowWorkingTimeStr);
  const diffMs = endDate.getTime() - startDate.getTime();
  const differenceInSeconds = Math.floor(diffMs / 1000);
  return differenceInSeconds;
};

const Assignment: React.FC<Props> = ({ assignment, setCurrentActiveAssignment }) => {
  const durationInSeconds = getSecondsRemaining(assignment.end_working_time);
  return (
    <main className={styles["assignment-body"]}>
      <button className={styles["back-button"]} onClick={() => setCurrentActiveAssignment(null)}>
          &larr; Back to Assignments
      </button>
      <section className={styles["assignment-container"]}>
        <div className={styles["assignment-head"]}>
          <h1 className={styles["assignment-title"]}>{assignment.name}</h1>
          <AssignmentTimer onTimerEnd={() => setCurrentActiveAssignment(null)} durationInSeconds={durationInSeconds} />
        </div>
        <p className={styles["assignment-task"]}>{assignment.description}</p>
        <h3>Your submission:</h3>
        <div className={styles["assignment-dropzone_container"]}>
          <FileDropzone assignment={assignment} />
        </div>
      </section>
    </main>
  );
};

export default Assignment;
