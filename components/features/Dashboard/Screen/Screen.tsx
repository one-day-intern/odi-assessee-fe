import React from "react";
import styles from "./Screen.module.css";
import { OdiLogo } from "@components/shared/svg/OdiLogo";

interface Props {
  children?: React.ReactNode;
  onMouseDown?: (e: React.MouseEvent) => void;
}

// this component handles desktop misc. logic (background, etc.)
const Screen: React.FC<Props> = ({ children, onMouseDown }) => {
  return (
    <div
      data-testid="MainScreen"
      onMouseDown={onMouseDown}
      className={`${styles.screen}`}
    >
      <div className={styles["screen-logo"]}>
        <OdiLogo width={250} height={250} />
      </div>
      {children}
    </div>
  );
};

export default Screen;
