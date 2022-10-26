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
  type
}: ButtonProps) => {
  const buttonVariant = `button--${variant}`;
  return (
    <motion.button
      data-testid="button"
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled ?? false}
      onClick={onClick}
      style={style}
      className={`${styles["button"]} ${styles[buttonVariant]} ${disabled ? styles["button--disabled"] : ""}`}
      type={type}
    >
      {children}
    </motion.button>
  );
};

export { Button };
