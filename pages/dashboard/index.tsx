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
import { RxAvatar, RxClock } from "react-icons/rx";
import {
  MdAssessment,
  MdOutlineAssessment,
  MdOutlineLogout,
} from "react-icons/md";

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
  marginLeft: "auto",
  marginTop: 0,
  marginBottom: 0,

};

interface AssessmentEvent {
  name: string;
  event_id: string;
  end_date_time: string;
}

const AssessmentEventCard: React.FC<{ event: AssessmentEvent }> = ({
  event,
}) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      layout
      className={styles["assessment-event-card"]}
    >
      <MdAssessment size={50} color="var(--primary) "/>
      <div>
        <h2 className={styles["assessment-event-card_header"]}>{event.name}</h2>
        <div className={styles.time}>
          <RxClock />
          <div>Ending at: {new Date(event.end_date_time).toLocaleString()}</div>
        </div>
      </div>
      <Button
        onClick={() => router.push(`/dashboard/${event.event_id}`)}
        style={enterButtonStyles}
        variant="secondary"
      >
        Enter Dashboard &rarr;
      </Button>
    </motion.div>
  );
};

const AssessmentEventList: NextPage = () => {
  const { dispatch, user } = useAuthContext();
  const { data } = useGetRequest<AssessmentEvent[]>(
    "/assessee/assessment-events/?is-active=true",
    {
      requiresToken: true,
    }
  );
  
  if (!data || !user) {
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
        <aside className={styles.sidebar}>
          <RxAvatar color="var(--primary)" size={120} />
          <h2
            className={styles.name}
          >{`${user.first_name} ${user.last_name}`}</h2>
          <p className={styles.role}>Assessee</p>
          <hr />
          <button className={`${styles.tab} ${styles.active}`}>
            <MdOutlineAssessment size={35} color="currentColor" />
            <div>My Assessments</div>
          </button>
          <button
            onClick={() => dispatch({ type: AuthDispatchTypes.LOGOUT })}
            className={`${styles.tab} ${styles.danger}`}
          >
            <MdOutlineLogout
              style={{ transform: "scale(-1, 1)" }}
              size={35}
              color="currentColor"
            />
            <div>Logout</div>
          </button>
        </aside>
        <div className={styles["assessment-list"]}>
          {data.map((event) => (
            <AssessmentEventCard event={event} key={event.event_id} />
          ))}
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default AssessmentEventList;
