import { Loader } from "@components/shared/elements/Loader";
import useGetRequest from "@hooks/shared/useGetRequest";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Assignment from "./Assignment";
import styles from "./InteractiveQuiz.module.css";
import DashboardEvent from "../../DashboardEvents";
import { motion } from "framer-motion";

const InteractiveQuiz = () => {
  const router = useRouter();
  const [currentActiveAssignment, setCurrentActiveAssignment] =
    useState<AssignmentObject | null>(null);
  const { data, error, fetchData } = useGetRequest<AssignmentObject[]>(
    `/assessment/assessment-event/released-assignments/?assessment-event-id=${router.query["assessment-event-id"]}`,
    {
      requiresToken: true,
    }
  );

  useEffect(() => {
    const refreshAssignments = () => fetchData();
    addEventListener(DashboardEvent.REFRESH_ASSIGNMENTS, refreshAssignments);
    return () =>
      removeEventListener(
        DashboardEvent.REFRESH_ASSIGNMENTS,
        refreshAssignments
      );
  }, [fetchData]);

  if (error) {
    return <div>Something went wrong, please restart the app</div>;
  }

  const showAssignmentList = !currentActiveAssignment && data;

  return (
    <div data-testid="InteractiveQuiz" className={`${styles["app-container"]}`}>
      <div id="quiz-root" className={`${styles["window-body"]}`}>
        {showAssignmentList && (
          <div className={`${styles["container"]}`}>
            <h1 style={{ marginTop: 0 }}>My Assignments</h1>
            <div className={`${styles["assignment-list"]}`}>
              {data.map((assignment, i) => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentActiveAssignment(assignment)}
                  key={`${assignment.id}-${i}`}
                  className={`${styles["task-item"]}`}
                >
                  <div className={`${styles.name}`}>{assignment.name}</div>
                  <div className={`${styles.arrow}`}>&rarr;</div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
        {!data && (
          <div className={`${styles["loader-container"]}`}>
            <Loader />
          </div>
        )}
        {currentActiveAssignment && (
          <Assignment
            setCurrentActiveAssignment={setCurrentActiveAssignment}
            assignment={currentActiveAssignment}
          />
        )}
      </div>
    </div>
  );
};

export default InteractiveQuiz;
