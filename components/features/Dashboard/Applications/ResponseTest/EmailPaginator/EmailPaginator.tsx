import React from "react";
import styles from "./EmailPaginator.module.css";
import { motion } from "framer-motion";

interface Props {
  filter: string;
  emails: Email[];
  emailsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const EmailPaginator: React.FC<React.PropsWithChildren<Props>> = ({
  filter,
  emails,
  emailsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages =
    emails.length > 0
      ? Math.ceil(
          emails.filter(
            (email) =>
              email.subject.toLowerCase().includes(filter.toLowerCase()) ||
              email.sender.toLowerCase().includes(filter.toLowerCase())
          ).length / emailsPerPage
        )
      : 1;
  return (
    <div className={`${styles.paginator}`}>
      <p>Page</p>
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => {
          if (currentPage > 0) setCurrentPage(currentPage - 1);
        }}
      >
        &#9664;
      </motion.button>
      <p>{currentPage + 1}</p>
      <p>of {totalPages}</p>
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => {
          if (currentPage + 1 < totalPages) setCurrentPage(currentPage + 1);
        }}
      >
        &#9654;
      </motion.button>
    </div>
  );
};

export default EmailPaginator;
