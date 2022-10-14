import { emptyValidator } from "@utils/validators/emptyValidator";
import React, { createContext, useState } from "react";
import { useCompanySignupStepContext } from "../CompanySignupStepContext";
import { CompanySignupStoreProps } from "./CompanySignupStoreProps";

import { postCompany } from "@services/Signup/CompanySignup";

const POST_COMPANY_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register-company/`;

const initialValue: CompanySignupStoreElements = {
  company_address: "",
  company_description: "",
  company_name: "",
  email: "",
  password: "",
  confirmed_password: "",
};

const initialErrors: CompanySignupStoreElements = {
  company_address: "",
  company_description: "",
  company_name: "",
  email: "",
  password: "",
  confirmed_password: ""
}

const CompanySignupStoreContext = createContext({} as CompanySignupStoreState);

const CompanySignupStoreProvider = ({ children }: CompanySignupStoreProps) => {
  
  const { selectStep } = useCompanySignupStepContext();
  
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

  const postResult = async () => {
    const [_, companyNameError] = emptyValidator(storeState.company_name);
    setError("company_name", companyNameError);

    const [__, companyAddressError] = emptyValidator(storeState.company_address);
    setError("company_address", companyAddressError);

    const indexOfFirstError = Object.values(storeErrors).findIndex(error => error !== "");
    
    if (indexOfFirstError >= 0) {
      selectStep(indexOfFirstError < 3 ? 1 : 2);
      return;
    }

    const registeredCompany = await postCompany(POST_COMPANY_URL, storeState);


  };

  return (
    <CompanySignupStoreContext.Provider value={{ data: storeState, errors: storeErrors, setValue, setError, postResult }}>
      {children}
    </CompanySignupStoreContext.Provider>
  );
};

export { CompanySignupStoreProvider, CompanySignupStoreContext };
