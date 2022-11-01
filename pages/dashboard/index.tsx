import type { NextPage } from "next";
import ProtectedRoute from "@components/shared/layouts/ProtectedRoute";
import styles from "../../styles/AssesseeDashboard.module.css";
import { Button } from "@components/shared/elements/Button";
import { useAuthContext } from "@context/Authentication";
import { AuthDispatchTypes } from "@context/Authentication/AuthDispatchTypes";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useGetRequest from "@hooks/shared/useGetRequest";
import { Loader } from "@components/shared/elements/Loader";

const buttonStyles: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: "1rem",
  maxWidth: 100,
  padding: "0.5rem",
  position: "absolute",
  right: "1rem",
  top: "1rem",
  background: "red",
  margin: 0,
};

const enterButtonStyles: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: "1rem",
  maxWidth: 200,
  padding: "0.5rem",
  margin: 0,
};

interface AssessmentEvent {
  name: string;
  event_id: string;
}

const AssessmentEventCard: React.FC<AssessmentEvent> = ({ name, event_id }) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      layout
      className={styles["assessment-event-card"]}
    >
      <h2 className={styles["assessment-event-card_header"]}>{name}</h2>
      <Button
        onClick={() => router.push(`/dashboard/${event_id}`)}
        style={enterButtonStyles}
        variant="secondary"
      >
        Enter Dashboard &rarr;
      </Button>
    </motion.div>
  );
};

const AssessmentEventList: NextPage = () => {
  const { dispatch } = useAuthContext();
  const { data } = useGetRequest<AssessmentEvent[]>(
    "/assessee/assessment-events/",
    {
      requiresToken: true,
    }
  );

  if (!data) {
    return (
      <ProtectedRoute>
        <div className={styles["loader-container"]}>
          <Loader />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles["main-header"]}>Your Assessments</h1>
          <div className={styles["assessment-list"]}>
            {data &&
              data.map((event) => (
                <AssessmentEventCard
                  key={event.event_id}
                  name={event.name}
                  event_id={event.event_id}
                />
              ))}
          </div>
        </div>
        <Button
          style={buttonStyles}
          variant="primary"
          onClick={() => dispatch({ type: AuthDispatchTypes.LOGOUT })}
        >
          Logout
        </Button>
      </main>
    </ProtectedRoute>
  );
};

export default AssessmentEventList;
