import React from "react";
import styles from "./MultistepChoice.module.css";
import { MultistepChoiceRadio } from "./MultistepChoiceRadio";
import { motion } from "framer-motion";

const nameVariants = {
  enabled: {
    color: "#3d65d8",
  },
  disabled: {
    color: "gray",
  },
};

const descriptionVariants = {
  enabled: {
    color: "rgba(49, 81, 173, 0.7)",
  },
  disabled: {
    color: "gray",
  },
};

const MultistepChoice = ({
  name,
  description,
  onClick,
  disabled,
  isSelected,
}: MultistepForm) => {
  const isDisabled = disabled ? -1 : 0;
  const tabbable = isSelected ? -1 : isDisabled;
  const stylingIfDisabled = disabled ? styles["choice--disabled"] : "";
  return (
    <button
      data-testid="choice-element"
      className={`${styles["choice"]} ${styles["button"]} ${
        isSelected ? styles["choice--selected"] : stylingIfDisabled
      }`}
      onClick={onClick}
      tabIndex={tabbable}
    >
      <MultistepChoiceRadio disabled={disabled} isSelected={isSelected} />
      <motion.p
        data-testid="choice-name"
        variants={nameVariants}
        initial={disabled ? "disabled" : "enabled"}
        animate={disabled ? "disabled" : "enabled"}
        className={`${styles["choice__text"]} ${styles["choice__text--name"]}`}
      >
        {name}
      </motion.p>
      <motion.p
        data-testid="choice-desc"
        variants={descriptionVariants}
        initial={disabled ? "disabled" : "enabled"}
        animate={disabled ? "disabled" : "enabled"}
        className={`${styles["choice__text"]} ${styles["choice__text--description"]}`}
      >
        {description}
      </motion.p>
    </button>
  );
};

export { MultistepChoice };
