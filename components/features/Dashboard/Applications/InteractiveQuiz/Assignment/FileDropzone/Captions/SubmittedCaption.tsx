import React from "react";
import { Button } from "@components/shared/elements/Button";
import styles from "../FileDropzone.module.css";
import { motion } from "framer-motion";

const buttonStyles: React.CSSProperties = {
  margin: 10,
  fontWeight: "bold",
  maxWidth: 150,
  fontSize: "1rem",
};

export const SubmittedCaption: React.FC<{
  isAssignmentEnd?: boolean;
  fileName: string;
  onDownload: React.MouseEventHandler;
}> = ({ isAssignmentEnd, fileName, onDownload }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles["dropzone-captions"]}
    >
      <h2 className={styles["main-caption"]}>{fileName}</h2>
      <Button
        onClick={onDownload}
        style={{ ...buttonStyles }}
        variant="primary"
      >
        Download
      </Button>
      {!isAssignmentEnd && <div className={styles["divider"]}>or</div>}
      {!isAssignmentEnd && (
        <p className={styles["sub-caption"]}>make a new submission!</p>
      )}
    </motion.div>
  );
};
