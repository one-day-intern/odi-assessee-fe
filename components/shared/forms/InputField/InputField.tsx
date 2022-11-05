import React, { forwardRef, Ref, useId } from "react";
import { motion } from "framer-motion";
import styles from "./InputField.module.css";

const InputField = forwardRef(
  (
    { label, placeholder, onChange, value, error }: InputFieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const inputId = useId();

    return (
      <div className={styles["form__control"]}>
        <label className={styles["form__label"]} htmlFor={inputId}>
          {label}
        </label>
        <motion.input
          whileFocus={{
            boxShadow: "0px 0px 0px 2px #9076C0",
          }}
          ref={ref}
          id={inputId}
          data-testid="inputField"
          type="text"
          className={styles["form__input-text"]}
          value={value}
          placeholder={placeholder ?? ""}
          onChange={onChange}
        />
        <div className={styles["form__error"]}>{error ?? ""}</div>
      </div>
    );
  }
);

InputField.displayName = "InputField";

export { InputField };
