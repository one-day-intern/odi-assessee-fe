import { Loader } from "@components/shared/elements/Loader";
import { useAuthContext } from "@context/Authentication";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";

interface LoggedOutOnlyRouteProps {
  children: ReactNode;
}

const loaderContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "var(--primary)",
};

const LoggedOutOnlyRoute = ({ children }: LoggedOutOnlyRouteProps) => {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [router, isLoading, user]);

  if (!isLoading && !user) {
    return <>{children}</>;
  }

  return (
    <div style={loaderContainerStyle}>
      <Loader />
    </div>
  );
};

export default LoggedOutOnlyRoute;
