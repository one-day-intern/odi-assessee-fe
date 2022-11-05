import React, { forwardRef, Ref, useId } from "react";
import { motion } from "framer-motion";
import styles from "./TextAreaField.module.css";

const TextAreaField = forwardRef(({
  label,
  placeholder,
  onChange,
  value,
  rows,
  error
}: TextAreaFieldProps, ref: Ref<HTMLTextAreaElement>) => {
  const textAreaId = useId();

  return (
    <div className={styles["form__control"]}>
      <label className={styles["form__label"]} htmlFor={textAreaId}>
        {label}
      </label>
      <motion.textarea
        whileFocus={{ boxShadow: "0px 0px 0px 2px #9076C0" }}
        ref={ ref }
        rows={rows}
        id={textAreaId}
        className={styles["form__input-textarea"]}
        placeholder={placeholder ?? ""}
        onChange={onChange}
        defaultValue={value}
        data-testid="textAreaField"
      ></motion.textarea>
      <div className={styles["form__error"]}>{error}</div>
    </div>
  );
});

TextAreaField.displayName = "TextAreaField"

export { TextAreaField };
