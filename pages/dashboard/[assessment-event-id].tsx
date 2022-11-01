import type { NextPage } from "next";
import Dashboard from "@components/features/Dashboard";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";

const AssessmentEvent: NextPage = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
};

export default AssessmentEvent;
