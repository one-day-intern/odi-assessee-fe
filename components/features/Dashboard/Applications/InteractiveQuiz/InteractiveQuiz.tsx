import { Loader } from "@components/shared/elements/Loader";
import useGetRequest from "@hooks/shared/useGetRequest";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Assignment from "./Assignment";
import styles from "./InteractiveQuiz.module.css";
import DashboardEvent from "../../DashboardEvents";
import { motion } from "framer-motion";
import Tabs from "./Tabs";

const InteractiveQuiz = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("quiz");
  const [currentActiveAssignment, setCurrentActiveAssignment] =
    useState<AssignmentObject | null>(null);
  // const [currentActiveQuiz, setCurrentActiveQuiz] =
  const {
    data: assignments,
    error,
    fetchData: fetchAssignments,
  } = useGetRequest<AssignmentObject[]>(
    `/assessment/assessment-event/released-assignments/?assessment-event-id=${router.query["assessment-event-id"]}`,
    {
      requiresToken: true,
    }
  );

  useEffect(() => {
    const refreshAssignments = () => {
      fetchAssignments();
      setCurrentTab("assignment");
    };
    const refreshQuizzes = () => {
      setCurrentTab('quiz');
    };
    addEventListener(DashboardEvent.REFRESH_ASSIGNMENTS, refreshAssignments);
    addEventListener(DashboardEvent.REFRESH_QUIZZES, refreshQuizzes);
    return () => {
      removeEventListener(
        DashboardEvent.REFRESH_ASSIGNMENTS,
        refreshAssignments
      );
      removeEventListener(
        DashboardEvent.REFRESH_QUIZZES,
        refreshQuizzes
      );
    };
  }, [fetchAssignments]);

  if (error) {
    return <div>Something went wrong, please restart the app</div>;
  }

  const showAssignmentList =
    !currentActiveAssignment && assignments && currentTab === "assignment";
  const showQuizList = currentTab === "quiz";

  return (
    <div data-testid="InteractiveQuiz" className={`${styles["app-container"]}`}>
      <div id="quiz-root" className={`${styles["window-body"]}`}>
        {!(currentActiveAssignment) && <div style={{ marginTop: "2rem", marginBottom: '1rem' }}>
          <Tabs
            onChange={(tab) => setCurrentTab(tab)}
            currentTab={currentTab}
            tabs={["quiz", "assignment"]}
          />
        </div>}
        {showAssignmentList && (
          <div className={`${styles["container"]}`}>
            <h1 style={{ marginTop: 0 }}>My Assignments</h1>
            <div className={`${styles["assignment-list"]}`}>
              {assignments.map((assignment, i) => (
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
        {showQuizList && (
          <div className={`${styles["container"]}`}>
            <h1 style={{ marginTop: 0 }}>My Quizzes</h1>
            <div className={`${styles["assignment-list"]}`}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`${styles["task-item"]}`}
              >
                <div className={`${styles.name}`}>test</div>
                <div className={`${styles.arrow}`}>&rarr;</div>
              </motion.button>
            </div>
          </div>
        )}
        {!assignments && (
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
