import React from "react";
import styles from "../FileDropzone.module.css";
import UploadProgress from "../UploadProgress";
import { motion } from "framer-motion";

export const UploadingCaption: React.FC<{
  fileName: string;
  progress: number;
}> = ({ fileName, progress }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles["dropzone-captions"]}
    >
      <h2 className={styles["main-caption"]}>{fileName}</h2>
      <div>
        <UploadProgress progress={progress} />
      </div>
      <p className={styles["sub-caption"]}>
        hold on! we&apos;re uploading your file
      </p>
    </motion.div>
  );
};
