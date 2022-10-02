import React, { useEffect, useMemo, useRef } from "react";

import { OdiLogo } from "@components/shared/elements/svg/OdiLogo";
import styles from "./CompanyPassword.module.css";
import { Button } from "@components/shared/elements/Button";
import { PasswordField } from "@components/shared/forms/PasswordField";
import { passwordValidator } from "@utils/validators/passwordValidator";
import { confirmPasswordValidator } from "@utils/validators/confirmPasswordValidator";
import { SigninNotice } from "@components/shared/forms/SigninNotice";
import { useCompanySignupStoreContext } from "@context/Signup/CompanySignupStoreContext";
import { InputField } from "@components/shared/forms/InputField";
import { emailValidator } from "@utils/validators/emailValidator";

const CompanyPassword = () => {
  const { data, errors, setValue, setError, postResult } = useCompanySignupStoreContext();
  const { password, confirmed_password: confirmedPassword, email } = data;

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmedPasswordRef = useRef<HTMLInputElement>(null);

  const inputRefs = useMemo(() => ({
    email: emailRef,
    password: passwordRef,
    confirmed_password: confirmedPasswordRef
  }), [])

  useEffect(() => {
    for (let field of Object.keys(inputRefs)) {
      const error = errors[field as keyof CompanySignupStoreElements];
      if (error) {
        const elementRef = inputRefs[field as keyof typeof inputRefs];
        elementRef?.current?.focus();
        return;
      }

    }
  }, [errors, inputRefs])

  const handleSubmit = () => {
    const [isEmailValid, emailError] = emailValidator(email);
    setError("email", emailError);
    
    const [isPasswordValid, passwordError] = passwordValidator(password);
    setError("password", passwordError);

    const [isConfirmedPasswordValid, confirmedPasswordError] = confirmPasswordValidator(password, confirmedPassword);
    setError("confirmed_password", confirmedPasswordError);

    const isValid = isEmailValid && isPasswordValid && isConfirmedPasswordValid;
    if (!isValid) return;
    postResult();
  }

  return (

    <>
      <OdiLogo />

      <h2 className={styles["window__text--heading"]}>Your Password</h2>
      <div className={styles["window__form"]} data-testid="form">
      <InputField
          ref={inputRefs.email}
          label="Email Address *"
          value={email}
          onChange={(e) => setValue("email", e.target.value)}
          error={errors.email}
        />
        <PasswordField ref={ passwordRef } label="Password *" value={ password } onChange={ (e) => setValue("password", e.target.value) } error={ errors.password }/> 
        <PasswordField ref={ confirmedPasswordRef } label="Confirm password *" value={ confirmedPassword } onChange={ (e) => setValue("confirmed_password", e.target.value) } error={ errors.confirmed_password }/> 
        <Button variant="primary" onClick={ handleSubmit }>
          <h2>Submit</h2>
        </Button>
      </div>
      <SigninNotice />
    </>
  );
};

export { CompanyPassword };
