import React, { useEffect, useMemo, useRef } from "react";

import { OdiLogo } from "@components/shared/elements/svg/OdiLogo";
import styles from "./CompanyDetails.module.css";
import { InputField } from "@components/shared/forms/InputField";
import { Button } from "@components/shared/elements/Button";
import { SigninNotice } from "@components/shared/forms/SigninNotice";
import { TextAreaField } from "@components/shared/forms/TextAreaField";
import { useCompanySignupStepContext } from "@context/Signup/CompanySignupStepContext";
import { useCompanySignupStoreContext } from "@context/Signup/CompanySignupStoreContext";
import { emptyValidator } from "@utils/validators/emptyValidator";

const CompanyDetails = () => {
  const { selectStep, selectedId } = useCompanySignupStepContext();
  const { data, errors, setError, setValue } = useCompanySignupStoreContext();

  const emailRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const companyAddressRef = useRef<HTMLTextAreaElement>(null);
  const companyDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const inputRefs = useMemo(() => ({
    email: emailRef,
    company_name: companyNameRef,
    company_address: companyAddressRef,
    company_description: companyDescriptionRef
  }), []);

  useEffect(() => {
    for (let field of Object.keys(inputRefs)) {
      const error = errors[field as keyof CompanySignupStoreElements];
      if (error) {
        const elementRef = inputRefs[field as keyof typeof inputRefs];
        elementRef?.current?.focus();
        return;
      }
    }
  }, [errors, inputRefs])


  const {
    company_name: companyName,
    company_address: companyAddress,
    company_description: companyDescription
  } = data;

  const continueNext = () => {


    const [isCompanyNameValid, companyNameError] = emptyValidator(companyName);
    setError("company_name", companyNameError);

    const [isCompanyAddressValid, companyAddressError] =
      emptyValidator(companyAddress);
    setError("company_address", companyAddressError);

    const isValid = isCompanyNameValid && isCompanyAddressValid;

    if (!isValid) return;

    selectStep(selectedId + 1);
  };

  return (
    <>
      <OdiLogo />

      <h2 className={styles["window__text--heading"]}>Your Details</h2>

      <div className={styles["window__form"]} data-testid="form">
        <InputField
          label="Company Name *"
          ref={inputRefs.company_name}
          value={companyName}
          onChange={(e) => setValue("company_name", e.target.value)}
          error={errors.company_name}
        />
        <TextAreaField
          label="Company Address *"
          ref={inputRefs.company_address}
          value={companyAddress}
          onChange={(e) => setValue("company_address", e.target.value)}
          rows={3}
          error={errors.company_address}
        />
        <TextAreaField
          label="Company Description"
          value={companyDescription}
          onChange={(e) => setValue("company_description", e.target.value)}
          rows={5}
        />
        <Button variant="primary" onClick={continueNext}>
          <h2>Next</h2>
        </Button>
      </div>

      <SigninNotice />
    </>
  );
};

export { CompanyDetails };
