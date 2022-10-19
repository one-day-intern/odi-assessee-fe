import { emptyValidator } from "@utils/validators/emptyValidator";
import React, { createContext, useEffect, useRef, useState } from "react";
import { CompanySignupStoreProps } from "./CompanySignupStoreProps";

import usePostRequest from "@hooks/shared/usePostRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { emailValidator } from "@utils/validators/emailValidator";
import { passwordValidator } from "@utils/validators/passwordValidator";
import { confirmPasswordValidator } from "@utils/validators/confirmPasswordValidator";

const POST_COMPANY_URL = "/users/register-company/";

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
  confirmed_password: "",
};

const CompanySignupStoreContext = createContext({} as CompanySignupStoreState);

const CompanySignupStoreProvider = ({ children }: CompanySignupStoreProps) => {
  const router = useRouter();

  const [storeState, setStoreState] = useState(initialValue);

  const { data, error, postData, status } = usePostRequest<
    CompanySignupStoreElements,
    CompanySignupStoreElements
  >(POST_COMPANY_URL, storeState, {
    requiresToken: false,
  });

  const isMounted = useRef(false);

  const [storeErrors, setStoreErrors] = useState(initialErrors);

  useEffect(() => {
    
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (status === "loading") return;

    if (error != null) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        containerId: "root-toast",
        autoClose: 2000
      });
      return;
    }

    if (data != null) {
      toast.success("Your new company has been created.", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        containerId: "root-toast",
        autoClose: 2000
      })

      router.push("/accounts/login/assessee");
      return;
    }


  }, [data, error, status, router]);

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

  const validate = () : boolean => {
    
    const [isEmailValid, emailError] = emailValidator(storeState.email);
    setError("email", emailError);
    
    const [isPasswordValid, passwordError] = passwordValidator(storeState.password);
    setError("password", passwordError);

    const [isConfirmedPasswordValid, confirmedPasswordError] = confirmPasswordValidator(storeState.password, storeState.confirmed_password);
    setError("confirmed_password", confirmedPasswordError);
    
    const [isCompanyNameValid, companyNameError] = emptyValidator(storeState.company_name);
    setError("company_name", companyNameError);

    const [isCompanyAddressValid, companyAddressError] = emptyValidator(
      storeState.company_address
    );
    setError("company_address", companyAddressError);

    return isEmailValid && isPasswordValid && isConfirmedPasswordValid && isCompanyNameValid && isCompanyAddressValid;
  } 

  const postResult  = () => {

    const isValid = validate();
    if (!isValid) return;

    postData!();
  };

  return (
    <CompanySignupStoreContext.Provider
      value={{
        data: storeState,
        errors: storeErrors,
        setValue,
        setError,
        postResult,
        loadingStatus: status,
        validate
      }}
    >
      {children}
    </CompanySignupStoreContext.Provider>
  );
};

export { CompanySignupStoreProvider, CompanySignupStoreContext };
