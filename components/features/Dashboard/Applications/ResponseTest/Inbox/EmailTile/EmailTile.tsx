import React from "react";
import styles from "./EmailTile.module.css";
import { motion } from "framer-motion";
import { dateFormatter } from "@utils/formatters/dateFormatter";

interface Props {
  email: Email;
  onClick: (email: Email) => void;
}

const EmailTile: React.FC<React.PropsWithChildren<Props>> = ({
  email,
  onClick,
}) => {
  return (
    <motion.button
      data-testid={`EmailTile-${email.id}`}
      initial={{ y: "-50%" }}
      animate={{ y: 0 }}
      className={`${styles.tile}`}
      whileTap={{ scale: 0.995 }}
      onTap={() => onClick(email)}
    >
      <div className={`${styles.sender}`}>{email.additional_info.sender.split('@').at(0)}</div>
      <div className={`${styles["email-content"]}`}>
        <div className={`${styles.subject}`}>{email.additional_info.subject}</div>
        <div className={`${styles.body}`}>{email.additional_info.prompt}</div>
        <div className={`${styles.date}`}>
          {dateFormatter(email.receivedOn)}
        </div>
      </div>
    </motion.button>
  );
};

export default EmailTile;
