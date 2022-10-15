import React from "react";
import styles from "./Inbox.module.css";
import EmailTile from "./EmailTile";
// will list all the emails

interface Props {
  emails: Email[];
  filter: string;
  currentPage: number;
  emailsPerPage: number;
  openEmail: (email: Email) => void;
}


const Inbox: React.FC<React.PropsWithChildren<Props>> = ({ emails, filter, currentPage, emailsPerPage, openEmail }) => {
  return (
    <div className={`${styles["window-body__inbox"]}`}>
      {emails
        .filter(
          (email) =>
            email.subject.toLowerCase().includes(filter.toLowerCase()) ||
            email.sender.toLowerCase().includes(filter.toLowerCase())
        )
        // sort from most recent to least recent email
        .sort((a, b) => b.receivedOn.getTime() - a.receivedOn.getTime())
        .slice(
          // pagination
          currentPage * emailsPerPage,
          (currentPage + 1) * emailsPerPage
        )
        .map((email) => (
          <EmailTile key={email.id} email={email} onClick={openEmail} />
        ))}
      {emails.length === 0 && (
        <h1
          date-testid="InboxEmpty"
          style={{
            textAlign: "center",
            color: "grey",
            userSelect: "none",
          }}
        >
          You inbox is empty.
        </h1>
      )}
    </div>
  );
};

export default Inbox;
