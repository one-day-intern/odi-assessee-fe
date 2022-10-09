import { AssesseeSignupStepProvider } from "@context/Signup/AssesseeSignupStepContext";
import { AssesseeSignupStoreProvider } from "@context/Signup/AssesseeSignupStoreContext";
import React from "react";
import { AssesseeSignup } from "./AssesseeSignup";

const AssesseeSignupWrapper = () => {
  return (
    <AssesseeSignupStepProvider>
      <AssesseeSignupStoreProvider>
        <AssesseeSignup />
      </AssesseeSignupStoreProvider>
    </AssesseeSignupStepProvider>
  );
};

export { AssesseeSignupWrapper };
