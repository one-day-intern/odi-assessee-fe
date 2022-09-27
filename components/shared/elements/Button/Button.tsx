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
  const buttonVariant = `button--${variant}`
  return (
    <motion.button
      data-testid="button"
      whileTap={{ scale: 0.98 }}
      disabled={disabled ?? false}
      onClick={onClick}
      className={`${styles["button"]} ${styles[buttonVariant]}`}
    >
      {children}
    </motion.button>
  );
};

export { Button };
