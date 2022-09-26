import React from "react";
import { motion } from "framer-motion";
import styles from "./SignupChoiceCheck.module.css";

const circleVariants = {
  selected: {
    fill: "#9076C0",
    stroke: "#9076C0",
    strokeWidth: 2,
  },
  unselected: {
    fill: "#FFFFFF",
    stroke: "rgba(0, 0, 0, 0.5)",
    strokeWidth: 1,
  },
};

const tickVariants = {
  selected: {
    pathLength: 1,
    transition: {
      duration: 0.35
    }
  },
  unselected: {
    pathLength: 0,
    transition: {
      duuration: 0.35
    }
  },
};

const SignupChoiceCheck = ({ isSelected }: SignupChoiceCheckProps) => {
  return (
    <motion.svg
      initial={isSelected ? "selected" : "unselected"}
      animate={isSelected ? "selected" : "unselected"}
      className={`${styles["checkbox"]}`}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="signupChoiceCheck"
    >
      <motion.circle
        variants={circleVariants}
        cx="20"
        cy="20"
        r="19"
        fill="#9076C0"
        stroke="#9076C0"
        strokeWidth="2"
      />
      <motion.path
        variants={ tickVariants }
        d="M9 21.0456L15.9544 28L31.9544 12"
        stroke="white"
        strokeWidth="2.82067"
      />
    </motion.svg>
  );
};

export { SignupChoiceCheck };
