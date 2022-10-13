import { emptyValidator } from "@utils/validators/emptyValidator";
import React, { createContext, useState } from "react";
import { useAssesseeSignupStepContext } from "../AssesseeSignupStepContext";
import { useCompanySignupStepContext } from "../CompanySignupStepContext";
import { AssesseeSignupStoreProps } from "./AsseesseeSignupStoreProps";

const initialValue: AssesseeSignupStoreElements = {
  first_name: "",
  last_name: "",
  phone_number: "",
  date_of_birth: "",
  email: "",
  password: "",
  confirmed_password: ""
};

const initialErrors: AssesseeSignupStoreElements = {
  first_name: "",
  last_name: "",
  phone_number: "",
  date_of_birth: "",
  email: "",
  password: "",
  confirmed_password: ""
};

const AssesseeSignupStoreContext = createContext(
  {} as AssesseeSignupStoreState
);

const AssesseeSignupStoreProvider = ({
  children,
}: AssesseeSignupStoreProps) => {

  const { selectStep } = useAssesseeSignupStepContext();

  const [storeState, setStoreState] = useState(initialValue);

  const [storeErrors, setStoreErrors] = useState(initialErrors);

  const setValue = (name: string, value: string) =>
    setStoreState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  const setError = (name: string, error: string) =>
    setStoreErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));

  const postResult = () => {
    const [_, firstNameError] = emptyValidator(storeState.first_name);
    setError("first_name", firstNameError);

    const [__, lastNameError] = emptyValidator(storeState.last_name);
    setError("last_name", lastNameError);

    const [___, phoneNumberError] = emptyValidator(storeState.phone_number);
    setError("phone_number", phoneNumberError);

    const [_a, dateOfBirthError] = emptyValidator(storeState.date_of_birth);
    setError("date_of_birth", dateOfBirthError);

    const indexOfFirstError = Object.values(storeErrors).findIndex(
      (error) => error !== ""
    );

    if (indexOfFirstError >= 0) {
      selectStep(indexOfFirstError < 4 ? 1 : 2);
    }
  };

  return (
    <AssesseeSignupStoreContext.Provider
      value={{
        data: storeState,
        errors: storeErrors,
        setValue,
        setError,
        postResult,
      }}
    >
      {children}
    </AssesseeSignupStoreContext.Provider>
  );
};

export { AssesseeSignupStoreProvider, AssesseeSignupStoreContext };
