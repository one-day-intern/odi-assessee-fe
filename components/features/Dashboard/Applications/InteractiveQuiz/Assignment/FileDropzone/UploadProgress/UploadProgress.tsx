import React from "react";
import styles from "./UploadProgress.module.css";

interface Props {
  progress: number;
}

const UploadProgress: React.FC<Props> = ({ progress }) => {
  return (
    <div className={styles.outer}>
      <div style={{ width: `${progress * 100}%` }} className={styles.inner} />
    </div>
  );
};

export default UploadProgress;
