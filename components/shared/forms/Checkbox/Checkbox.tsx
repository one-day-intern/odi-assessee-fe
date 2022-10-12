import React, { useId } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  isChecked: boolean;
  setIsChecked: (event: any) => void;
  label: string;
}

const Checkbox = ({ isChecked, setIsChecked, label }: CheckboxProps) => {
  const id = useId();
  return (
    <div className={styles["checkbox--group"]}>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onClick={setIsChecked}
        data-testid="checkbox"
      />
      <label className={styles["checkbox__label"]} htmlFor={id}>{label}</label>
    </div>
  );
};

export { Checkbox };
