import React from "react";
import { ButtonProps } from "./ButtonProps";
import styles from "./Button.module.css";
import { motion } from "framer-motion";

const Button = ({
  children,
  variant,
  onClick,
  disabled,
  style,
}: ButtonProps) => {
  const buttonVariant = `button--${variant}`;
  return (
    <motion.button
      data-testid="button"
      whileTap={{ scale: 0.98 }}
      disabled={disabled ?? false}
      onClick={onClick}
      style={style}
      className={`${styles["button"]} ${styles[buttonVariant]}`}
    >
      {children}
    </motion.button>
  );
};

export { Button };
