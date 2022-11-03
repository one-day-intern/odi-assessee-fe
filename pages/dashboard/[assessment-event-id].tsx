import type { NextPage } from "next";
import Dashboard from "@components/features/Dashboard";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";
import useGetRequest from "@hooks/shared/useGetRequest";
import { useEffect } from "react";
import styles from "../../styles/AssesseeDashboard.module.css";
import { toast } from "react-toastify";
import { Loader } from "@components/shared/elements/Loader";
import { useRouter } from "next/router";

const AssessmentEvent: NextPage = () => {
  const router = useRouter();
  const { data, error } = useGetRequest(
    `/assessment/assessment-event/verify-participant/?assessment-event-id=${router.query["assessment-event-id"]}`,
    { requiresToken: true }
  );

  useEffect(() => {
    if (error && router.isReady) {
      toast.error(error.message);
      router.push("/");
    }
  }, [error, router]);

  if (!data) {
    <ProtectedRoute>
      <div className={styles["loader-container"]}>
        <Loader />
      </div>
    </ProtectedRoute>;
  }

  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
};

export default AssessmentEvent;
