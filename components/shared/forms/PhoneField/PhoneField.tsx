import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./PhoneField.module.css";

const PhoneField = ({
  label,
  placeholder,
  onChange,
  value,
  error,
}: InputFieldProps) => {
  return (
    <div className={styles["form__control"]}>
      <label className={styles["form__label"]}>{label}</label>
      <div className={styles["form__error"]}>{error ?? ""}</div>
      <PhoneInput
        inputClass={`${styles["form__input-text"]} ${styles["form__input--phone"]}`}
        value={value}
        onChange={onChange}
        buttonClass={`${styles["country-options"]} ${styles["input--phone"]}`}
        disableDropdown
      />
    </div>
  );
};
PhoneField.displayName = "InputField";

export { PhoneField };
