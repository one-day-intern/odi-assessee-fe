import { CompanySignup } from "@components/features/Signup/CompanySignup";
import LoggedOutOnlyRoute from "@components/shared/layouts/LoggedOutOnlyRoute";
import { NextPage } from "next";
import React from "react";

const CompanySignupPage: NextPage = () => {
  return (
    <LoggedOutOnlyRoute>
      <CompanySignup />
    </LoggedOutOnlyRoute>
  );
};

export default CompanySignupPage;
