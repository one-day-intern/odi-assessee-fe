import { Signup } from "@components/features/Signup/InitialSignup";
import LoggedOutOnlyRoute from "@components/shared/layouts/LoggedOutOnlyRoute";
import { NextPage } from "next";
import React from "react";

const SignupPage: NextPage = () => {
  return (
    <LoggedOutOnlyRoute>
      <Signup />
    </LoggedOutOnlyRoute>
  );
};

export default SignupPage;
