import React from "react";
import { motion } from "framer-motion";

import styles from "./SignupChoice.module.css";
import { SignupChoiceCheck } from "./SignupChoiceCheck";

const signupChoiceVariants = {
  selected: {
    boxShadow: "0px 0px 0px 2px #9076C0",
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
  unselected: {
    boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.5)",
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
};

const SignupChoice = ({
  mainAction,
  description,
  isSelected,
  onClick,
}: SignupChoiceProps) => {
  return (

      <motion.button
        variants={signupChoiceVariants}
        initial={isSelected ? "selected" : "unselected"}
        animate={isSelected ? "selected" : "unselected"}
        className={styles["signup-choice"]}
        onClick={onClick}
        data-testid="signupChoice"
      >
        <h5
          className={`${styles["signup-choice__text"]} ${styles["signup-choice__text--heading"]}`}
        >
          {mainAction}
        </h5>
        <p
          className={`${styles["signup-choice__text"]} ${styles["signup-choice__text--subheading"]}`}
        >
          {description}
        </p>
        <SignupChoiceCheck isSelected={isSelected} />
      </motion.button>

  );
};

export { SignupChoice };
