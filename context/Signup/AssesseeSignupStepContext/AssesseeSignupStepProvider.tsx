import { AssesseeDetails } from "@components/features/Signup/AssesseeSignup/AssesseeDetails";
import { AssesseePassword } from "@components/features/Signup/AssesseeSignup/AssesseePassword";
import { createContext, useEffect, useState } from "react";
import { AssesseeSignupStepProps } from "./AssesseeSignupStepProps";

const multistepForm: MultistepForm[] = [
  {
    id: 1,
    name: "Your details",
    description: "Input your personal details",
    reactElement: <AssesseeDetails />,
    isSelected: true,
    disabled: false,
  },
  {
    id: 2,
    name: "Your password",
    description: "Create a password for your account",
    reactElement: <AssesseePassword />,
    isSelected: false,
    disabled: true,
  },
];

const AssesseeSignupStepContext = createContext({} as AssesseeSignupStepState);

const AssesseeSignupStepProvider = ({ children }: AssesseeSignupStepProps) => {
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
    <AssesseeSignupStepContext.Provider
      value={{ forms, selectStep, selectedId, lastEnabledInd }}
    >
      {children}
    </AssesseeSignupStepContext.Provider>
  );
};

export { AssesseeSignupStepProvider, AssesseeSignupStepContext }
