import { useAuthContext } from "@context/Authentication";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();


  useEffect(() => {
    if (!isLoading && !user) {
        router.push("/accounts/login/assessee")
    }
  }, [router, isLoading, user]);


  if (!isLoading && user) {
    return <>{children}</>;
  }

  return <h1>Loading</h1>;
};

export default ProtectedRoute;
