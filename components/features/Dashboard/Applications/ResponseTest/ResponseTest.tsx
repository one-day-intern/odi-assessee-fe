import React, { useCallback, useEffect, useState } from "react";
import styles from "./ResponseTest.module.css";
import { OdiLogo } from "@components/shared/svg/OdiLogo";
import { AnimatePresence, motion } from "framer-motion";
import ResponseTestIcon from "./ResponseTestIcon";
import Searchbar from "./Searchbar";
import RefreshIcon from "@components/shared/svg/RefreshIcon";
import EmailPaginator from "./EmailPaginator";
import EmailView from "./EmailView";
import Inbox from "./Inbox";
import useGetRequest from "@hooks/shared/useGetRequest";
import { useRouter } from "next/router";
import { Loader } from "@components/shared/elements/Loader";
import { toast } from "react-toastify";
import DashboardEvent from "../../DashboardEvents";

const ResponseTest = () => {
  const emailsPerPage = 20;
  const router = useRouter();
  const [emailOpened, setEmailOpened] = useState<Email>();
  const { fetchData } = useGetRequest<Email[]>(
    `/assessment/assessment-event/released-response-tests/?assessment-event-id=${router.query["assessment-event-id"]}`,
    { requiresToken: true, disableFetchOnMount: true }
  );
  const [emails, setEmails] = useState<Email[]>();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const openEmail = (email: Email): void => {
    setEmailOpened(email);
  };

  const closeEmail = (): void => {
    setEmailOpened(undefined);
  };
  const fetchEmails = useCallback(async () => {
    const response = await fetchData();
    if (response instanceof Error) {
      toast.error("Error fetching emails, please restart the app");
      return;
    }
    const emails = response.map((email) => ({
      ...email,
      receivedOn: new Date(email.released_time),
    }));
    setEmails(emails);
  }, [fetchData]);

  useEffect(() => {
    fetchEmails();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    addEventListener(DashboardEvent.REFRESH_EMAILS, fetchEmails);
    return () =>
      removeEventListener(DashboardEvent.REFRESH_EMAILS, fetchEmails);
  }, [fetchEmails]);

  useEffect(() => {
    setCurrentPage(0);
  }, [filter]);

  return (
    <div className={`${styles["app-container"]}`}>
      <AnimatePresence initial={false}>
        {!emailOpened && (
          <motion.div
            data-testid="ResponseTestBody"
            className={`${styles["window-body"]}`}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "ease", duration: 0.5 }}
          >
            <div className={`${styles["window-background"]}`}>
              <OdiLogo width={300} height={300} />
            </div>
            <div className={`${styles["window-body__head"]}`}>
              <ResponseTestIcon width={60} height={35} />
              <Searchbar filter={filter} setFilter={setFilter} />
              <motion.button
                onClick={() => fetchEmails()}
                className={`${styles.refresh}`}
                style={{ rotate: 180 }}
                whileTap={{ rotate: 360 }}
              >
                <RefreshIcon color={"grey"} />
              </motion.button>
              {emails && (
                <EmailPaginator
                  filter={filter}
                  emails={emails}
                  emailsPerPage={emailsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
            {emails && (
              <Inbox
                emails={emails}
                currentPage={currentPage}
                emailsPerPage={emailsPerPage}
                filter={filter}
                openEmail={openEmail}
              />
            )}
            <div color="var(--primary)">
              {!emails && <Loader />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {emailOpened && (
          <EmailView email={emailOpened} onCloseView={closeEmail} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResponseTest;
