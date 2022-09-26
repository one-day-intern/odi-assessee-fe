import React, { forwardRef, Ref, useId, useState } from "react";
import { motion } from "framer-motion";
import styles from "./PasswordField.module.css";
import { EyeOpen } from "./EyeOpen";
import { EyeClosed } from "./EyeClosed";

const inputFieldVariant = {
  focus: {
    boxShadow: "0px 0px 0px 2px #9076C0",
  },
  blur: {
    boxShadow: "1px 1px 1px 1px rgba(255,255,255,0.01)",
  },
};

const PasswordField = forwardRef(({
  label,
  placeholder,
  onChange,
  value,
  error,
}: InputFieldProps, ref: Ref<HTMLInputElement>) => {
  const inputId = useId();

  const [passwordShown, setPasswordShown] = useState(false);
  const [focus, setFocus] = useState(false);

  return (
    <div className={styles["form__control"]}>
      <label className={styles["form__label"]} htmlFor={inputId}>
        {label}
      </label>
      <motion.div
        variants={inputFieldVariant}
        animate={focus ? "focus" : "blur"}
        className={styles["form__group"]}
        tabIndex={0}
        data-testid="password-wrapper"
      >
        <input
          data-testid="password-input"
          className={styles["form__input-text"]}
          value={value}
          id={inputId}
          ref={ref}
          type={passwordShown ? "text" : "password"}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={placeholder ?? ""}
        />
        {passwordShown ? (
          <EyeClosed
            height={22}
            width={22}
            onClick={() => setPasswordShown(false)}
          />
        ) : (
          <EyeOpen
            height={22}
            width={22}
            onClick={() => setPasswordShown(true)}
          />
        )}
      </motion.div>
      <div className={styles["form__error"]}>{error}</div>
    </div>
  );
});

PasswordField.displayName = "PasswordField";



export { PasswordField };
