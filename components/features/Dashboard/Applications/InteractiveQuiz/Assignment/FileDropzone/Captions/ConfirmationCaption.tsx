import React from "react";
import styles from "../FileDropzone.module.css";
import { Button } from "@components/shared/elements/Button";
import { motion } from "framer-motion";

const buttonStyles: React.CSSProperties = {
  margin: 10,
  fontWeight: "bold",
  maxWidth: 150,
  fontSize: "1rem",
};

export const ConfirmationCaption: React.FC<{
  fileName: string;
  onCancel: React.MouseEventHandler;
  onContinue: React.MouseEventHandler;
}> = ({ fileName, onCancel, onContinue }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles["dropzone-captions"]}
    >
      <h2 className={styles["main-caption"]}>{fileName}</h2>
      <p className={styles["sub-caption"]}>
        Are you sure you want to upload this file?
      </p>
      <div className={styles["confirmation-buttons"]}>
        <Button
          onClick={onCancel}
          style={{
            ...buttonStyles,
            background: "transparent",
            border: "2px solid var(--secondary)",
            color: "var(--secondary)",
          }}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={onContinue}
          style={{ ...buttonStyles }}
          variant="secondary"
        >
          Upload
        </Button>
      </div>
    </motion.div>
  );
};
