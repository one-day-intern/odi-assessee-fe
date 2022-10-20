import { Button } from "@components/shared/elements/Button";
import { OdiLogo } from "@components/shared/elements/svg/OdiLogo";
import { InputField } from "@components/shared/forms/InputField";
import { PasswordField } from "@components/shared/forms/PasswordField";
import { Backdrop } from "@components/shared/layouts/Backdrop";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

import styles from "./Login.module.css";
import { Checkbox } from "@components/shared/forms/Checkbox/Checkbox";
import { LoginDivider } from "./LoginDivider";
import { GoogleButton } from "@components/shared/elements/GoogleButton";
import { emailValidator } from "@utils/validators/emailValidator";
import { emptyValidator } from "@utils/validators/emptyValidator";
import { useLoginHandler } from "@hooks/Login/useLoginHandler";
import { toast } from "react-toastify";
import { useAuthContext } from "@context/Authentication";
import { AuthDispatchTypes } from "@context/Authentication/AuthDispatchTypes";
import usePostRequest from "@hooks/shared/usePostRequest";
import { useRouter } from "next/router";


const LOGIN_URL = "/users/api/token/";

interface TokenReturnType {
  access: string;
  refresh: string;
}

const Login = () => {
  const { data, errors, setDataValue, setErrorValue } = useLoginHandler();
  const { email, password, remember } = data;
  const isMounted = useRef(false);

  const { data: responseData, error: responseError, postData, status } = usePostRequest<LoginDetails, TokenReturnType>(LOGIN_URL, data, {
    requiresToken: false
  })

  const { user, dispatch } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    // In the case when first loaded, status is initial. When status is login, we also don't need to dispatch any action.
    if (status === "loading" || status === "initial") {
      return;
    }

    if (responseData != null) {
      const { access, refresh } = responseData! as TokenReturnType;
      dispatch({
        type: AuthDispatchTypes.LOGIN,
        payload: {
          user,
          accessToken: access,
          refreshToken: refresh,
          remember: data.remember
        }
      });
      toast.success("Login successful!", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        containerId: "root-toast",
        autoClose: 2000
      });
      router.push("/")
      return;
    }

    if (responseError != null) {
      console.log("Here")
      toast.error(responseError.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        containerId: "root-toast",
        autoClose: 2000
      });
      return;
    }


  }, [responseData, responseError, dispatch, user, data.remember, status, router])

  const validate = (): boolean => {
    const [isEmailValid, emailError] = emailValidator(email);
    setErrorValue("email", emailError);

    const [isPasswordValid, passwordError] = emptyValidator(password);
    setErrorValue("password", passwordError);

    return isEmailValid && isPasswordValid;
  };

  const submitForm: React.FormEventHandler<HTMLFormElement> = (event) => {
    event?.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    postData!();

  }

  return (
    <Backdrop>
      <div className={styles["backdrop__center"]}>
        <form className={styles["glassmorph"]} onSubmit={submitForm}>
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
          <Button variant="primary" type="submit">
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
        </form>
      </div>
    </Backdrop>
  );
};

export { Login };
