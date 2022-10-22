import usePostRequest from "@hooks/shared/usePostRequest";
import { confirmPasswordValidator } from "@utils/validators/confirmPasswordValidator";
import { emailValidator } from "@utils/validators/emailValidator";
import { emptyValidator } from "@utils/validators/emptyValidator";
import React, { createContext, useEffect, useRef, useState } from "react";
import { AssesseeSignupStoreProps } from "./AsseesseeSignupStoreProps";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { phoneParser } from "@utils/formatters/phoneParser";
import { phoneNumberValidator } from "@utils/validators/phoneNumberValidator";

const initialValue: AssesseeSignupStoreElements = {
  first_name: "",
  last_name: "",
  phone_number: "",
  date_of_birth: "",
  email: "",
  password: "",
  confirmed_password: "",
};

const initialErrors: AssesseeSignupStoreElements = {
  first_name: "",
  last_name: "",
  phone_number: "",
  date_of_birth: "",
  email: "",
  password: "",
  confirmed_password: "",
};

const AssesseeSignupStoreContext = createContext(
  {} as AssesseeSignupStoreState
);

const ASSESSEE_SIGNUP_URL = "/users/register-assessee/";

const AssesseeSignupStoreProvider = ({
  children,
}: AssesseeSignupStoreProps) => {
  const [storeState, setStoreState] = useState(initialValue);

  const [storeErrors, setStoreErrors] = useState(initialErrors);

  const isFirstMount = useRef(false);

  const router = useRouter();

  const {
    data: responseData,
    error: responseError,
    postData,
    status
  } = usePostRequest<
    AssesseeSignupStoreElements,
    AssesseeSignupStoreElements
  >(
    ASSESSEE_SIGNUP_URL,
    {
      requiresToken: false
    }
  );

  useEffect(() => {
    if (!isFirstMount.current) {
      isFirstMount.current = true;
      return;
    }

    if (status === "loading") return;

    if (responseData != null) {
      toast.success("Your new account has been created", {
        containerId: "root-toast",
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        autoClose: 2000
      });

      router.push("/accounts/login/assessee");
      return;
    }

    if (responseError != null) {
      toast.error(responseError.message, {
        containerId: "root-toast",
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        autoClose: 2000
      });
      return;
    }
  }, [responseData, responseError, status, router]);

  const setValue = (name: string, value: string) =>
    setStoreState((prevState) => {
      return ({
      ...prevState,
      [name]: value,
    })});

  const setError = (name: string, error: string) =>
    setStoreErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));

  const validate = (): [boolean, AssesseeSignupStoreElements] => {

    const [isFirstNameValid, firstNameError] = emptyValidator(storeState.first_name);
    setError("first_name", firstNameError);

    const [isLastNameValid, lastNameError] = emptyValidator(storeState.last_name);
    setError("last_name", lastNameError);

    const [isDateOfBirthValid, dateOfBirthError] = emptyValidator(storeState.date_of_birth);
    setError("date_of_birth", dateOfBirthError);

    const parsedPhoneNumber = phoneParser(storeState.phone_number);
    const [isPhoneNumberValid, phoneNumberError] = phoneNumberValidator(parsedPhoneNumber);
    setError("phone_number", phoneNumberError);
    
    const [isEmailValid, emailError] = emailValidator(storeState.email);
    setError("email", emailError);

    const [isPasswordValid, passwordError] = emptyValidator(storeState.password);
    setError("password", passwordError);

    const [isConfirmedPasswordValid, confirmedPasswordError] = confirmPasswordValidator(storeState.password, storeState.confirmed_password);
    setError("confirmed_password", confirmedPasswordError);

    const postedObject = {
      ...storeState,
      phone_number: parsedPhoneNumber
    }

    
    
    
    return [isFirstNameValid && isPhoneNumberValid && isLastNameValid && isDateOfBirthValid && isEmailValid && isPasswordValid && isConfirmedPasswordValid, postedObject];
  }
  
  const postResult = () => {
    const [isValid, postedObject] = validate();
    if (!isValid) return;

    postData!(postedObject);
  };

  return (
    <AssesseeSignupStoreContext.Provider
      value={{
        data: storeState,
        errors: storeErrors,
        setValue,
        setError,
        postResult,
        loadingStatus: status
      }}
    >
      {children}
    </AssesseeSignupStoreContext.Provider>
  );
};

export { AssesseeSignupStoreProvider, AssesseeSignupStoreContext };
