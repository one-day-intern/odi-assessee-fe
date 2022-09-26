import React, { createContext, useState } from "react";
import { CompanySignupStoreProps } from "./CompanySignupStoreProps";

const initialValue: CompanySignupStoreElements = {
  email: "",
  company_address: "",
  company_description: "",
  company_name: "",
  password: "",
  confirmed_password: "",
};

const initialErrors: CompanySignupStoreElements = {
  email: "",
  company_address: "",
  company_description: "",
  company_name: "",
  password: "",
  confirmed_password: ""
}

const CompanySignupStoreContext = createContext({} as CompanySignupStoreState);

const CompanySignupStoreProvider = ({ children }: CompanySignupStoreProps) => {
  const [storeState, setStoreState] =
    useState(initialValue);

  const [storeErrors, setStoreErrors] = useState(initialErrors);

  const setValue = (name: string, value: string) =>
    setStoreState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  const setError = (name: string, error: string) => setStoreErrors((prevState) => ({
    ...prevState,
    [name]: error
  }));

  return (
    <CompanySignupStoreContext.Provider value={{ data: storeState, errors: storeErrors, setValue, setError }}>
      {children}
    </CompanySignupStoreContext.Provider>
  );
};

export { CompanySignupStoreProvider, CompanySignupStoreContext };
