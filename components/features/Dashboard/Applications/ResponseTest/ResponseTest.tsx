import React, { useEffect, useRef, useState } from "react";
import styles from "./ResponseTest.module.css";
import { OdiLogo } from "@components/shared/svg/OdiLogo";
import { AnimatePresence, motion } from "framer-motion";
import ResponseTestIcon from "./ResponseTestIcon";
import Searchbar from "./Searchbar";
import EmailTile from "./Inbox/EmailTile";
import RefreshIcon from "@components/shared/svg/RefreshIcon";
import EmailPaginator from "./EmailPaginator";
import EmailView from "./EmailView";
import Inbox from "./Inbox";

const ResponseTest = () => {
  const emailsPerPage = 20;
  const [emailOpened, setEmailOpened] = useState<Email>();
  const [emails, setEmails] = useState<Email[]>([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const openEmail = (email: Email): void => {
    setEmailOpened(email);
  };

  const closeEmail = (): void => {
    setEmailOpened(undefined);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [filter]);

  return (
    <div className={`${styles["app-container"]}`}>
      <AnimatePresence initial={false}>
        {!emailOpened && (
          <motion.div
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
                onClick={() => {}}
                className={`${styles.refresh}`}
                style={{ rotate: 180 }}
                whileTap={{ rotate: 360 }}
              >
                <RefreshIcon color={"grey"} />
              </motion.button>
              <EmailPaginator
                filter={filter}
                emails={emails}
                emailsPerPage={emailsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
            <Inbox
              emails={emails}
              currentPage={currentPage}
              emailsPerPage={emailsPerPage}
              filter={filter}
              openEmail={openEmail}
            />
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
