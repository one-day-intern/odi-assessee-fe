import { AssesseeSignup } from "@components/features/Signup/AssesseeSignup";
import LoggedOutOnlyRoute from "@components/shared/layouts/LoggedOutOnlyRoute";
import { NextPage } from "next";
import React from "react";

const AssesseeSignupPage: NextPage = () => {
  return (
    <LoggedOutOnlyRoute>
      <AssesseeSignup />
    </LoggedOutOnlyRoute>
  );
};

export default AssesseeSignupPage;
