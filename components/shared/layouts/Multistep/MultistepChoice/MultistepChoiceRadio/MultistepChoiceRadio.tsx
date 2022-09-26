import { motion } from "framer-motion";
import React from "react";
import styles from "./MultistepChoiceRadio.module.css";



const MultistepChoiceRadio = ({ disabled, isSelected } : MultistepChoiceRadioProps) => {
  return (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={ styles["choice__radio"] }
    >
      <motion.circle
      cx="24"
      cy="24"
      r="23"
      stroke="#3D65D8"
      strokeWidth="2"
      initial={{
         stroke: disabled ? "#808080" : "#3D65D8"
      }}
      animate={{
        stroke: disabled ? "#808080" : "#3D65D8"
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
          stroke: disabled ? "#808080": "#3D65D8",
          r: isSelected ? 11 : 0
        }}
        animate={{
          stroke: disabled ? "#808080": "#3D65D8",
          r: isSelected ? 11 : 0
        }}
        data-testid="inner-circle"
      />
    </motion.svg>
  );
};

export { MultistepChoiceRadio };
