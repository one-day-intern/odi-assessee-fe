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
import { Loader } from "@components/shared/elements/Loader";
import useGetRequest from "@hooks/shared/useGetRequest";

const LOGIN_URL = "/users/api/token/";

interface TokenReturnType {
  access: string;
  refresh: string;
}

const Login = () => {
  const { data, errors, setDataValue, setErrorValue } = useLoginHandler();
  const { email, password, remember } = data;
  const { postData, status } = usePostRequest<LoginDetails, TokenReturnType>(
    LOGIN_URL,
    {
      requiresToken: false,
    }
  );
  const { dispatch } = useAuthContext();
  const { fetchData } = useGetRequest<AuthUser>("/users/get-info/", {
    disableFetchOnMount: true,
    requiresToken: true,
  });

  const validate = (): boolean => {
    const [isEmailValid, emailError] = emailValidator(email);
    setErrorValue("email", emailError);

    const [isPasswordValid, passwordError] = emptyValidator(password);
    setErrorValue("password", passwordError);

    return isEmailValid && isPasswordValid;
  };

  const submitForm: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event?.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const loginData = data;
    const response = await postData(loginData);
    if (response instanceof Error) {
      toast.error(response.message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        containerId: "root-toast",
        autoClose: 2000,
      });
      return;
    }
    const { access, refresh } = response;
    const requestUser = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/get-info/`,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    const user = await requestUser.json();
    if (!requestUser.ok) {
      toast.error((requestUser as any).message, {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
        containerId: "root-toast",
        autoClose: 2000,
      });
      return;
    }
    dispatch({
      type: AuthDispatchTypes.LOGIN,
      payload: {
        user,
        accessToken: access,
        refreshToken: refresh,
        remember: data.remember,
      },
    });
    toast.success("Login successful!", {
      position: toast.POSITION.TOP_CENTER,
      theme: "colored",
      containerId: "root-toast",
      autoClose: 2000,
    });
    return;
  };

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
          <Button
            variant="primary"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? <Loader /> : <h2>Login</h2>}
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
          <p className={styles["glassmorph__body"]}>
            Dont have an account?{" "}
            <Link href="/accounts/signup/assessee">
              <span className={styles["glassmorph__forgot"]}>Sign up</span>
            </Link>
            .
          </p>
        </form>
      </div>
    </Backdrop>
  );
};

export { Login };
