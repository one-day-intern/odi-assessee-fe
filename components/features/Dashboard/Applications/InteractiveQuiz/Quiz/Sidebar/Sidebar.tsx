import React from "react";
import styles from "./Sidebar.module.css";
import ProgressBar from "./ProgressBar";
import { OdiLogo } from "@components/shared/svg/OdiLogo";
import ProgressCircle from "./ProgressCircle";
import QuestionMenu from "./QuestionMenu";
import { useDashboardAPI } from "@context/Dashboard/DashboardAPIContext";

interface Props {
  questions: Array<TextQuestionAttempt | MultipleChoiceQuestionAttempt>;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
}

const Sidebar: React.FC<Props> = (props) => {
  const { window } = useDashboardAPI();
  const numAnsweredQuestions = props.questions.filter(
    (question: QuestionAttempt) => question["is-answered"]
  ).length;
  return (
    <div
      id="quiz-sidebar"
      data-testid="QuizSidebar"
      className={`${styles["sidebar"]}`}
      style={{ minHeight: window.height - 32 }}
    >
      <ProgressBar {...props} />
      <div className={`${styles["sidebar-quiz_info"]}`}>
        <div className={`${styles["info-container"]}`}>
          <ProgressCircle
            currentProgress={numAnsweredQuestions / props.questions.length}
          />
        </div>
        <div className={`${styles["info-container"]}`}>
          <QuestionMenu {...props} />
        </div>
      </div>
      <div className={`${styles["sidebar-logo_container"]}`}>
        <OdiLogo />
      </div>
    </div>
  );
};

export default Sidebar;
