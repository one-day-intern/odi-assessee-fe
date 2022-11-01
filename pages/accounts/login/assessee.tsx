import { Login } from "@components/features/Login/Login";
import LoggedOutOnlyRoute from "@components/shared/layouts/LoggedOutOnlyRoute";
import React from "react";

const LoginPage = () => {
  return (
    <LoggedOutOnlyRoute>
      <Login />
    </LoggedOutOnlyRoute>
  );
};

export default LoginPage;
