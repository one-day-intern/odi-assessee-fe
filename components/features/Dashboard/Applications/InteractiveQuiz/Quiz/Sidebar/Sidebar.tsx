import React from "react";
import styles from "./Sidebar.module.css";
import ProgressBar from "./ProgressBar";
import { OdiLogo } from "@components/shared/svg/OdiLogo";
import ProgressCircle from "./ProgressCircle";
import QuestionMenu from "./QuestionMenu";

// planned props => { questions, currentQuestion }

const Sidebar = () => {
  return (
    <div className={`${styles["sidebar"]}`}>
      <ProgressBar />
      <div className={`${styles["sidebar-quiz_info"]}`}>
        <div className={`${styles["info-container"]}`}>
          <ProgressCircle currentProgress={9/11} />
        </div>
        <div className={`${styles["info-container"]}`}>
          <QuestionMenu />
        </div>
      </div>
      <div className={`${styles["sidebar-logo_container"]}`}>
          <OdiLogo />
      </div>
    </div>
  );
};

export default Sidebar
