import { Button } from "@components/shared/elements/Button";
import { OdiLogo } from "@components/shared/elements/svg/OdiLogo";
import { InputField } from "@components/shared/forms/InputField";
import { PasswordField } from "@components/shared/forms/PasswordField";
import { Backdrop } from "@components/shared/layouts/Backdrop";
import React, { useState } from "react";
import Link from "next/link";

import styles from "./Login.module.css";
import { Checkbox } from "@components/shared/forms/Checkbox/Checkbox";
import { LoginDivider } from "./LoginDivider";
import { GoogleButton } from "@components/shared/elements/GoogleButton";
import { emailValidator } from "@utils/validators/emailValidator";
import { emptyValidator } from "@utils/validators/emptyValidator";
import { useLoginHandler } from "@hooks/Login/useLoginHandler";

const Login = () => {
  const { data, errors, setDataValue, setErrorValue } = useLoginHandler();
  const { email, password, remember } = data;

  const validate = (): boolean => {
    const [isEmailValid, emailError] = emailValidator(email);
    setErrorValue("email", emailError);

    const [isPasswordValid, passwordError] = emptyValidator(password);
    setErrorValue("password", passwordError);

    return isEmailValid && isPasswordValid;
  };

  const submitForm = () => {
    const isValid = validate();
    if (isValid) return;
  }

  return (
    <Backdrop>
      <div className={styles["backdrop__center"]}>
        <div className={styles["glassmorph"]}>
          <OdiLogo height={130} />
          <h2 className={styles["glassmorph__heading"]}>Welcome back!</h2>
          <InputField
            value={email}
            label="E-mail address"
            onChange={(e) => setDataValue("email", e.target?.value)}
            error={errors.email}
          />
          <PasswordField
            value={password}
            label="Password"
            onChange={(e) => setDataValue("password", e.target?.value)}
            error={errors.password}
          />
          <Button onClick={submitForm} variant="primary">
            <h2>Login</h2>
          </Button>
          <div className={styles["glassmorph__column"]}>
            <Checkbox
              label="Remember me"
              isChecked={remember}
              setIsChecked={(e) => setDataValue("remember", e.target?.checked)}
            />
            <Link href="/accounts/forget">
              <h5 className={styles["glassmorph__forgot"]}>Forgot password</h5>
            </Link>
          </div>
          <LoginDivider />
          <GoogleButton onClick={() => {}} />
          <p className={ styles["glassmorph__body"] }>Dont have an account? <Link href="/accounts/signup/assessee"><span className={styles["glassmorph__forgot"]}>Sign up</span></Link>.</p>
        </div>
      </div>
    </Backdrop>
  );
};

export { Login };
