import { motion } from "framer-motion";
import React from "react";
import styles from "../FileDropzone.module.css";

export const NoSubmissionCaption = () => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles["dropzone-captions"]}
    >
      <h2 className={styles["main-caption"]}>
        You have no file submissions.
      </h2>
    </motion.div>
  );
};
