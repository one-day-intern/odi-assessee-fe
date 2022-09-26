import { Multistep } from "@components/shared/layouts/Multistep";
import { useCompanySignupStepContext } from "@context/Signup/CompanySignupStepContext/useCompanySignupStepContext";

import React from "react";

const CompanySignup = () => {
  const { forms, selectStep, selectedId } = useCompanySignupStepContext();

  return (
    <Multistep
      elements={forms}
      selectedId={selectedId}
      selectStep={selectStep}
    />
  );
};

export { CompanySignup };
