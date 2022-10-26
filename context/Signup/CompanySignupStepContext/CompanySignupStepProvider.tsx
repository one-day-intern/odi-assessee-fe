import { CompanyDetails } from "@components/features/Signup/CompanySignup/CompanyDetails";
import { CompanyPassword } from "@components/features/Signup/CompanySignup/CompanyPassword";
import React, { createContext, useEffect, useState } from "react";

const multistepForm: MultistepForm[] = [
  {
    id: 1,
    name: "Your details",
    description: "Input your company details",
    reactElement: <CompanyDetails />,
    isSelected: true,
    disabled: false,
  },
  {
    id: 2,
    name: "Your password",
    description: "Create a password for your account",
    reactElement: <CompanyPassword />,
    isSelected: false,
    disabled: true
  },
];

const CompanySignupStepContext = createContext({
  forms: multistepForm,
  selectedId: 1
} as CompanySignupStepsState);

const CompanySignupStepProvider = ({ children }: CompanySignupStepProps) => {
  const [forms, setForms] = useState<MultistepForm[]>(multistepForm);
  const [lastEnabledInd, setLastEnabledInd] = useState(1);
  const [selectedId, setSelectedId] = useState(1);

  useEffect(() => {
    setForms((prevState) =>
      prevState.map((form) => {
        const newForm = form;
        form.isSelected = form.id === selectedId ? true : false;
        form.disabled = form.id <= selectedId ? false : true;
        return newForm;
      })
    );
  }, [lastEnabledInd, selectedId]);

  const selectStep = (id: number) => {
    if (id > lastEnabledInd) setLastEnabledInd(id);
    setSelectedId(id);
  };

  return (
    <CompanySignupStepContext.Provider
      value={{ forms, selectStep, selectedId, lastEnabledInd }}
    >
      {children}
    </CompanySignupStepContext.Provider>
  );
};

export { CompanySignupStepProvider, CompanySignupStepContext };
