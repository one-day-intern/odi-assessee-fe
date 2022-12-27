import React, { Suspense, useState, useEffect } from "react";
import styles from "./EmailView.module.css";
import { motion, Variants } from "framer-motion";
import "react-quill/dist/quill.snow.css";
import Avatar from "@components/shared/svg/Avatar";
import { Button } from "@components/shared/elements/Button";
import TrashIcon from "@components/shared/svg/TrashIcon";
import useGetRequest from "@hooks/shared/useGetRequest";
import { useRouter } from "next/router";
import usePostRequest from "@hooks/shared/usePostRequest";
import { toast } from "react-toastify";
import { InputField } from "@components/shared/forms/InputField";
import { Loader } from "@components/shared/elements/Loader";

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
  const router = useRouter();
  const [response, setResponse] = useState("");
  const [responseSubject, setResponseSubject] = useState("");
  const [showReplySection, setShowReplySection] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<EmailResponse>();
  const [submittingResponse, setSubmittingResponse] = useState(false);
  const { data, fetchData } = useGetRequest<EmailResponse>(
    `/assessment/assessment-event/get-submitted-response-test/?assessment-event-id=${router.query["assessment-event-id"]}&assessment-tool-id=${email.id}`,
    { requiresToken: true, disableFetchOnMount: true }
  );
  const { postData } = usePostRequest<EmailPost, any>(
    `/assessment/assessment-event/submit-response-test/?assessment-event-id=${router.query["assessment-event-id"]}`,
    { requiresToken: true }
  );

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

  const fetchCurrentResponse = async () => {
    const response = await fetchData();
    if (response instanceof Error) {
      toast.error(response.message);
      return;
    }
    const currentResponse = response;
    if (currentResponse.tool_attempt_id) {
      setSubmittedResponse({
        ...currentResponse,
        responseTime: new Date(currentResponse.submitted_time),
      });
    }
  };

  useEffect(() => {
    fetchCurrentResponse();
    // eslint-disable-next-line
  }, []);

  const submitResponseTest = async () => {
    setSubmittingResponse(true);
    const apiResponse = await postData({
      "assessment-event-id": router.query["assessment-event-id"] as string,
      "assessment-tool-id": email.id,
      subject: responseSubject,
      response,
    });
    if (apiResponse instanceof Error) {
      toast.error(apiResponse.message);
      setSubmittingResponse(false);
      return;
    }
    await fetchCurrentResponse();
    setSubmittingResponse(false);
  };

  const hideReplyButton =
    !data || showReplySection || submittedResponse?.tool_attempt_id;

  return (
    <motion.div
      data-testid={`EmailView-${email.id}`}
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
          <h1>{email.additional_info.subject}</h1>
          <div className={`${styles["email-meta_sender"]}`}>
            <div className={`${styles["avatar-wrapper"]}`}>
              <Avatar />
            </div>
            <div className={`${styles["sender-info_wrapper"]}`}>
              <div className={`${styles.sender}`}>
                {email.additional_info.sender}
              </div>
              <div className={`${styles.receiver}`}>to me</div>
            </div>
          </div>
        </div>
        <p
          className={`${styles["email-body"]}`}
          dangerouslySetInnerHTML={{ __html: email.additional_info.prompt }}
        />
        {!hideReplyButton && (
          <Button
            onClick={() => setShowReplySection(true)}
            variant="secondary"
            style={{ maxWidth: 150 }}
          >
            Reply
          </Button>
        )}
        {data &&
          (!submittedResponse?.tool_attempt_id ? (
            <Suspense fallback={<Fallback />}>
              {showReplySection && (
                <>
                  <hr />
                  <div style={{ margin: "1rem 0" }}>
                    <span style={{ fontSize: "1.2rem" }}>Subject:</span>
                    <InputField
                      placeholder="Optional subject.."
                      label=""
                      onChange={(e) => setResponseSubject(e.target.value)}
                      value={responseSubject}
                    />
                  </div>
                  <div
                    data-testid="ReplySection"
                    className={`${styles.editor}`}
                  >
                    <span
                      style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}
                    >
                      Your Reply:
                    </span>
                    <ReactQuill
                      theme="snow"
                      value={response}
                      onChange={setResponse}
                    />
                    <div className={`${styles["editor-actions"]}`}>
                      <Button
                        onClick={submitResponseTest}
                        variant="primary"
                        disabled={submittingResponse}
                        style={{ margin: 0, maxWidth: 150 }}
                      >
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
                </>
              )}
            </Suspense>
          ) : (
            <>
              <hr />
              <div className={`${styles["email-meta"]}`}>
                <h2>{submittedResponse.subject ?? "Your Reply"}</h2>
                <div className={`${styles["email-meta_sender"]}`}>
                  <div className={`${styles["avatar-wrapper"]}`}>
                    <Avatar />
                  </div>
                  <div className={`${styles["sender-info_wrapper"]}`}>
                    <div className={`${styles.sender}`}>Me</div>
                    <div className={`${styles.receiver}`}>
                      to {email.additional_info.sender}
                    </div>
                  </div>
                </div>
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: submittedResponse.response }}
                className={`${styles["email-body"]}`}
              />
            </>
          ))}
        {!data && (
          <div style={{ width: "100%", display: "grid", placeItems: "center", color: "var(--primary)" }}>
            <Loader />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EmailView;
