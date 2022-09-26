import React from "react";

import { OdiLogo } from "@components/shared/elements/svg/OdiLogo";
import styles from "./CompanyDescription.module.css";
import { TextAreaField } from "@components/shared/forms/TextAreaField";
import { Button } from "@components/shared/elements/Button";
import { useCompanySignupStepContext } from "@context/Signup/CompanySignupStepContext";
import { SigninNotice } from "@components/shared/forms/SigninNotice";
import { useCompanySignupStoreContext } from "@context/Signup/CompanySignupStoreContext";

const CompanyDescription = () => {
  const { selectStep, selectedId } = useCompanySignupStepContext();
  const { data, setValue } = useCompanySignupStoreContext();
  
  const { company_description: companyDescription } = data;

  const continueNext = () => {
    selectStep(selectedId + 1);
  };

  return (
    <>
      <OdiLogo />

      <h2 className={styles["window__text--heading"]}>Your Description</h2>
      <div className={styles["window__form"]} data-testid="descform">
        <TextAreaField
          label="Company Description"
          value={companyDescription}
          onChange={(e) => setValue("company_description", e.target.value)}
          rows={5}
        />
        <Button variant="primary" onClick={continueNext}>
          <h2 data-testid="buttonheading">{companyDescription === "" ? "Skip" : "Next"}</h2>
        </Button>
      </div>
      <SigninNotice />
    </>
  );
};

export { CompanyDescription };
