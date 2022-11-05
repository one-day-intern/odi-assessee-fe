import React, { Suspense, useState } from "react";
import styles from "./EmailView.module.css";
import { motion, Variants } from "framer-motion";
import "react-quill/dist/quill.snow.css";
import Avatar from "@components/shared/svg/Avatar";
import { Button } from "@components/shared/elements/Button";
import TrashIcon from "@components/shared/svg/TrashIcon";

const ReactQuill = React.lazy(() => import("react-quill"));

interface Props {
  onCloseView: () => void;
  email: Email;
}

const Fallback = () => {
  const dotStyle: React.CSSProperties = {
    width: 10,
    height: 10,
    background: "#ccc",
    borderRadius: "50%",
    margin: 5,
  };

  const dotAnimate = {
    y: [0, -5, 5, 0],
  };

  return (
    <div className={styles.fallback}>
      <motion.div
        style={dotStyle}
        animate={dotAnimate}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        style={dotStyle}
        animate={dotAnimate}
        transition={{
          duration: 0.8,
          delay: 0.4,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <motion.div
        style={dotStyle}
        animate={dotAnimate}
        transition={{
          duration: 0.8,
          delay: 0.8,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
    </div>
  );
};

const EmailView: React.FC<React.PropsWithChildren<Props>> = ({
  email,
  onCloseView,
}) => {
  const [value, setValue] = useState("");
  const [showReplySection, setShowReplySection] = useState(false);

  const buttonVariants: Variants = {
    hover: {
      x: -10,
      transition: {
        repeat: Infinity,
        duration: 0.3,
        repeatType: "reverse",
      },
    },
  };

  return (
    <motion.div
      className={`${styles["view-body"]}`}
      initial={{ x: "100%" }}
      animate={{ x: 0, position: "absolute" }}
      exit={{ x: "100%" }}
      transition={{ type: "ease", duration: 0.5 }}
    >
      <motion.button
        whileHover={"hover"}
        className={`${styles.back}`}
        onTap={() => onCloseView()}
      >
        <motion.span
          style={{ position: "absolute" }}
          initial={{ x: 0 }}
          variants={buttonVariants}
        >
          &#10229;
        </motion.span>
        <span
          style={{ marginLeft: 30, whiteSpace: "nowrap", fontSize: "0.8em" }}
        >
          Back to inbox
        </span>
      </motion.button>
      <div className={`${styles["view-content"]}`}>
        <div className={`${styles["email-meta"]}`}>
          <h1>{email.subject}</h1>
          <div className={`${styles["email-meta_sender"]}`}>
            <div className={`${styles["avatar-wrapper"]}`}>
              <Avatar />
            </div>
            <div className={`${styles["sender-info_wrapper"]}`}>
              <div className={`${styles.sender}`}>{email.sender}</div>
              <div className={`${styles.receiver}`}>to me</div>
            </div>
          </div>
        </div>
        <p className={`${styles["email-body"]}`}>{email.body}</p>
        {!showReplySection && (
          <Button
            onClick={() => setShowReplySection(true)}
            variant="secondary"
            style={{ maxWidth: 150 }}
          >
            Reply
          </Button>
        )}
        <Suspense fallback={<Fallback />}>
          {showReplySection && (
            <div data-testid="ReplySection" className={`${styles.editor}`}>
              <ReactQuill theme="snow" value={value} onChange={setValue} />
              <div className={`${styles["editor-actions"]}`}>
                <Button variant="primary" style={{ margin: 0, maxWidth: 150 }}>
                  Send Reply
                </Button>
                <button
                  onClick={() => setShowReplySection(false)}
                  className={`${styles.discard}`}
                >
                  <TrashIcon color="grey" />
                </button>
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </motion.div>
  );
};

export default EmailView;
