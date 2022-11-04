import { motion } from "framer-motion";
import React from "react";
import styles from "../FileDropzone.module.css";

export const InitialCaption = () => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles["dropzone-captions"]}
    >
      <h2 className={styles["main-caption"]}>
        Drag &apos;n&apos; drop your files here!
      </h2>
      <div className={styles["divider"]}>or</div>
      <p className={styles["sub-caption"]}>click to browse your files</p>
    </motion.div>
  );
};
