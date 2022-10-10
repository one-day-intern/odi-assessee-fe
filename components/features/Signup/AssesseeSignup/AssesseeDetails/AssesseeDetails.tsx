import { InputField } from "@components/shared/forms/InputField";
import { OdiLogo } from "@components/shared/svg/OdiLogo";
import { useAssesseeSignupStoreContext } from "@context/Signup/AssesseeSignupStoreContext";
import styles from "./AssesseeDetails.module.css";
import Flatpickr from "react-flatpickr";

import React, { useEffect, useMemo, useRef } from "react";
import { Button } from "@components/shared/elements/Button";
import { SigninNotice } from "@components/shared/forms/SigninNotice";
import { DateField } from "@components/shared/forms/DateField";
import { emptyValidator } from "@utils/validators/emptyValidator";
import { dateValidator } from "@utils/validators/dateValidator/dateValidator";
import { PhoneField } from "@components/shared/forms/PhoneField";
import { useAssesseeSignupStepContext } from "@context/Signup/AssesseeSignupStepContext";

const AssesseeDetails = () => {
  const { selectStep, selectedId } = useAssesseeSignupStepContext();
  const { data, errors, setValue, setError } = useAssesseeSignupStoreContext();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const dateOfBirthRef = useRef<Flatpickr>(null);

  const inputRefs = useMemo(
    () => ({
      first_name: firstNameRef,
      last_name: lastNameRef,
      date_of_birth: dateOfBirthRef
    }),
    []
  );

  useEffect(() => {
    for (let field of Object.keys(inputRefs)) {
      const error = errors[field as keyof AssesseeSignupStoreElements];
      if (error) {
        const elementRef = inputRefs[field as keyof typeof inputRefs];
        if (elementRef?.current instanceof Flatpickr) {
          elementRef?.current?.flatpickr?.altInput?.focus();
          return;
        }
        elementRef?.current?.focus();
        return;
      }
    }
  }, [errors, inputRefs])

  const changeDateField = (
    selectedDate: Date[],
    dateStr: string,
    instance: Flatpickr
  ) => {
    setValue("date_of_birth", dateStr);
  };

  const continueNext = () => {
    const [isFirstNameValid, firstNameError] = emptyValidator(data.first_name);
    setError("first_name", firstNameError);

    const [isLastNameValid, lastNameError] = emptyValidator(data.last_name);
    setError("last_name", lastNameError);

    const [isDobValid, dobError] = dateValidator(data.date_of_birth);
    setError("date_of_birth", dobError);

    const isValid = isFirstNameValid && isLastNameValid && isDobValid;

    if (!isValid) return;
    
    selectStep(selectedId + 1);


  }

  return (
    <>
      <OdiLogo />

      <h2 className={styles["window__text--heading"]}>Your Details</h2>

      <div className={styles["window__form"]} data-testid="form">
        <InputField
          label="First Name *"
          ref={inputRefs.first_name}
          value={data.first_name}
          onChange={(e) => setValue("first_name", e.target.value)}
          error={errors.first_name}
        />

        <InputField
          label="Last Name *"
          ref={inputRefs.last_name}
          value={data.last_name}
          onChange={(e) => setValue("last_name", e.target.value)}
          error={errors.last_name}
        />

        <DateField
          label="Date of Birth *"
          onChange={changeDateField}
          error={errors.date_of_birth}
          reference={ dateOfBirthRef }
        />

        <PhoneField
        label="Phone Number *"
        onChange={(value) => setValue("phone_number", value)}
        value={ data.phone_number }
        />

        <Button variant="primary" onClick={ continueNext }>
          <h2>Next</h2>
        </Button>
      </div>

      <SigninNotice />
    </>
  );
};

export { AssesseeDetails };
