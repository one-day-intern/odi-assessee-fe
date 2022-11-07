import { motion } from "framer-motion";
import React from "react";
import styles from "./MultistepChoiceRadio.module.css";

const MultistepChoiceRadio = ({
  disabled,
  isSelected,
}: MultistepChoiceRadioProps) => {
  const enabledPathLength = isSelected ? 0 : 1;
  const enabledCircle = isSelected ? 11 : 23;
  return (
    <div className={ styles["choice__radio"]}>
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={ styles["choice__radio--button"]}
      >
        <motion.circle
          cx="24"
          cy="24"
          r="23"
          stroke="#3D65D8"
          strokeWidth="2"
          initial={{
            stroke: disabled ? "#808080" : "#3D65D8",
          }}
          animate={{
            stroke: disabled ? "#808080" : "#3D65D8",
          }}
          data-testid="border-circle"
        />
        <motion.circle
          cx="24"
          cy="24"
          r="11"
          fill="#3D65D8"
          stroke="#3D65D8"
          strokeWidth="2"
          initial={{
            stroke: disabled ? "#808080" : "#3D65D8",
            r: isSelected ? 11 : 0,
          }}
          animate={{
            stroke: disabled ? "#808080" : "#3D65D8",
            r: disabled ? 0 : enabledCircle
          }}
          data-testid="inner-circle"
        />
      </motion.svg>
      <motion.svg
        width="25"
        height="19"
        viewBox="0 0 25 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles["choice__radio--check"]}
      >
        <motion.path
          d="M1 10.0456L7.95441 17L23.9544 1"
          stroke="white"
          strokeWidth="2.82067"
          animate={{
            pathLength: disabled ? 0 : enabledPathLength
          }}
          transition={{
            duration: 0.3
          }}
        />
      </motion.svg>
    </div>
  );
};

export { MultistepChoiceRadio };
