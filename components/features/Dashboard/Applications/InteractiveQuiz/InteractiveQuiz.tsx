import { Loader } from "@components/shared/elements/Loader";
import useGetRequest from "@hooks/shared/useGetRequest";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Assignment from "./Assignment";
import styles from "./InteractiveQuiz.module.css";
import DashboardEvent from "../../DashboardEvents";
import { motion } from "framer-motion";
import Tabs from "./Tabs";
import Quiz from "./Quiz";
import InteractiveQuizIcon from "./InteractiveQuizIcon";
import { AiOutlineArrowRight, AiOutlineClockCircle } from "react-icons/ai";
import { OdiLogo } from "@components/shared/svg/OdiLogo";

const InteractiveQuiz = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("quiz");
  const [currentActiveAssignment, setCurrentActiveAssignment] =
    useState<AssignmentObject | null>(null);
  const [currentActiveQuiz, setCurrentActiveQuiz] =
    useState<AssignmentObject | null>(null);
  const {
    data: assignments,
    error: assignmentFetchError,
    fetchData: fetchAssignments,
  } = useGetRequest<AssignmentObject[]>(
    `/assessment/assessment-event/released-assignments/?assessment-event-id=${router.query["assessment-event-id"]}`,
    {
      requiresToken: true,
    }
  );
  const {
    data: quizzes,
    error: quizFetchError,
    fetchData: fetchQuizzes,
  } = useGetRequest<AssignmentObject[]>(
    `/assessment/assessment-event/released-interactive-quizzes/?assessment-event-id=${router.query["assessment-event-id"]}`,
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
      fetchQuizzes();
      setCurrentTab("quiz");
    };
    addEventListener(DashboardEvent.REFRESH_ASSIGNMENTS, refreshAssignments);
    addEventListener(DashboardEvent.REFRESH_QUIZZES, refreshQuizzes);
    return () => {
      removeEventListener(
        DashboardEvent.REFRESH_ASSIGNMENTS,
        refreshAssignments
      );
      removeEventListener(DashboardEvent.REFRESH_QUIZZES, refreshQuizzes);
    };
  }, [fetchAssignments, fetchQuizzes]);

  if (assignmentFetchError || quizFetchError) {
    return <div>Something went wrong, please restart the app</div>;
  }

  const isCurrentlyWorking = currentActiveAssignment || currentActiveQuiz;
  const showAssignmentList =
    !isCurrentlyWorking && assignments && currentTab === "assignment";
  const showQuizList = !isCurrentlyWorking && quizzes && currentTab === "quiz";

  return (
    <div data-testid="InteractiveQuiz" className={`${styles["app-container"]}`}>
      <div id="quiz-root" className={`${styles["window-body"]}`}>
        {!isCurrentlyWorking && (
          <div className={`${styles["window-background"]}`}>
            <OdiLogo width={200} height={200} />
          </div>
        )}
        {!isCurrentlyWorking && (
          <div style={{ marginTop: "2rem", marginBottom: "1rem" }}>
            <Tabs
              onChange={(tab) => setCurrentTab(tab)}
              currentTab={currentTab}
              tabs={["quiz", "assignment"]}
            />
          </div>
        )}
        {showAssignmentList && (
          <div className={`${styles["container"]}`}>
            <h1
              style={{
                marginTop: 0,
                color: "rgba(144, 118, 192, 0.8)",
                textDecoration: "underline",
              }}
            >
              My Assignments
            </h1>
            <div className={`${styles["assignment-list"]}`}>
              {assignments.map((assignment, i) => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentActiveAssignment(assignment)}
                  key={`${assignment.id}-${i}`}
                  className={`${styles["task-item"]}`}
                >
                  <div className={`${styles["icon-container"]}`}>
                    <InteractiveQuizIcon width={40} height={40} />
                  </div>
                  <div className={`${styles["task-description"]}`}>
                    <div className={`${styles.name}`}>
                      [ASSIGNMENT] {assignment.name}
                    </div>
                    <div className={`${styles.duration}`}>
                      <div>
                        <AiOutlineClockCircle />
                      </div>
                      <p>
                        {assignment.additional_info.duration_in_minutes} minutes
                      </p>
                    </div>
                  </div>
                  <div className={`${styles.arrow}`}>
                    <p>start working</p>
                    <AiOutlineArrowRight />
                  </div>
                </motion.button>
              ))}
              {assignments.length === 0 && <p>You have no assignments.</p>}
            </div>
          </div>
        )}
        {showQuizList && (
          <div className={`${styles["container"]}`}>
            <h1
              style={{
                marginTop: 0,
                color: "rgba(144, 118, 192, 0.8)",
                textDecoration: "underline",
              }}
            >
              My Quizzes
            </h1>
            <div className={`${styles["assignment-list"]}`}>
              {quizzes.map((quiz, i) => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentActiveQuiz(quiz)}
                  key={`${quiz.id}-${i}`}
                  className={`${styles["task-item"]}`}
                >
                  <div className={`${styles["icon-container"]}`}>
                    <InteractiveQuizIcon width={40} height={40} />
                  </div>
                  <div className={`${styles["task-description"]}`}>
                    <div className={`${styles.name}`}>[QUIZ] {quiz.name}</div>
                    <div className={`${styles.duration}`}>
                      <div>
                        <AiOutlineClockCircle />
                      </div>
                      <p>{quiz.additional_info.duration_in_minutes} minutes</p>
                    </div>
                  </div>
                  <div className={`${styles.arrow}`}>
                    <p>start working</p>
                    <AiOutlineArrowRight />
                  </div>
                </motion.button>
              ))}
              {quizzes.length === 0 && <p>You have no quizzes.</p>}
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
        {currentActiveQuiz && (
          <div className={`${styles["quiz-window-body"]}`}>
            <Quiz
              setCurrentActiveQuiz={setCurrentActiveQuiz}
              quiz={currentActiveQuiz}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveQuiz;
