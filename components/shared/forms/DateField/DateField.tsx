import React, { useId } from "react";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

import styles from "./DateField.module.css";

const DateField = ({ onChange, error, label, reference }: DateFieldProps) => {
  const inputId = useId();

  return (
    <div className={styles["form__control"]}>
      <label className={styles["form__label"]} htmlFor={inputId}>
          {label}
      </label>
      <Flatpickr
        id={ inputId }
        options={{
          altInput: true,
          altFormat: "F j, Y",
          maxDate: new Date()
        }}
        onChange={onChange}
        data-testid="inputField"
        ref={ reference }
      />
      <div className={styles["form__error"]}>{error ?? ""}</div>
    </div>
  );
};

export { DateField };
