import React from "react";
import { ButtonProps } from "./ButtonProps";
import styles from "./Button.module.css";
import { motion } from "framer-motion";

const Button = ({
  children,
  variant,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <motion.button
      data-testid="button"
      whileTap={{ scale: 0.98 }}
      disabled={disabled ?? false}
      onClick={onClick}
      className={`${styles["button"]} ${styles[`button--${variant}`]}`}
    >
      {children}
    </motion.button>
  );
};

export { Button };
