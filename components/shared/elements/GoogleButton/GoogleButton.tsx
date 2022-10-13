import { motion } from "framer-motion";
import React from "react";
import { GoogleLogo } from "./GoogleLogo";
import styles from "./GoogleButton.module.css";

interface GoogleButtonProps {
  onClick: () => void;
}

const GoogleButton = ({ onClick }: GoogleButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      data-testid="google-btn"
      onClick={onClick}
      className={styles["button--google"]}
    >
      <GoogleLogo />
      <h2 className={styles["button--google__text"]}>Log In with Google</h2>
    </motion.button>
  );
};

export { GoogleButton };
