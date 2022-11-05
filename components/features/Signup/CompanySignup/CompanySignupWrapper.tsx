import { CompanySignupStepProvider } from "@context/Signup/CompanySignupStepContext";
import { CompanySignupStoreProvider } from "@context/Signup/CompanySignupStoreContext";
import React from "react";
import { CompanySignup } from "./CompanySignup";

const CompanySignupWrapper = () => {
  return (
    <CompanySignupStepProvider>
      <CompanySignupStoreProvider>
        <CompanySignup />
      </CompanySignupStoreProvider>
    </CompanySignupStepProvider>
  );
};

export { CompanySignupWrapper };
