import { Multistep } from "@components/shared/layouts/Multistep";
import { useAssesseeSignupStepContext } from "@context/Signup/AssesseeSignupStepContext";

import React from "react";



const AssesseeSignup = () => {
  const { forms, selectStep, selectedId } = useAssesseeSignupStepContext();
  return (
    <Multistep
      elements={forms}
      selectedId={selectedId}
      selectStep={selectStep}
    />
  );
};

export { AssesseeSignup };