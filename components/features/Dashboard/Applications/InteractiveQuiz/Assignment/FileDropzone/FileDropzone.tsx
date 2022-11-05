import React, { useState, useEffect } from "react";
import styles from "./FileDropzone.module.css";
import { useDropzone } from "react-dropzone";
import useUpload from "@hooks/Dashboard/useUpload";
import FileUploadIcon from "@components/shared/svg/FileUploadIcon";
import FileIcon from "@components/shared/svg/FileIcon";
import { motion, AnimatePresence } from "framer-motion";
import {
  ConfirmationCaption,
  InitialCaption,
  SubmittedCaption,
  UploadingCaption,
} from "./Captions";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useGetRequest from "@hooks/shared/useGetRequest";
import { Loader } from "@components/shared/elements/Loader";

interface Props {
  assignment: AssignmentObject;
}

const FileDropzone: React.FC<Props> = ({ assignment }) => {
  const [fileSubmitted, setFileSubmitted] = useState<File>();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();
  const assessmentEventId = router.query["assessment-event-id"];
  const { data, fetchData } = useGetRequest<Response>(
    `/assessment/assessment-event/?assessment-event-id=${assessmentEventId}&assignment-tool-id=${assignment.id}`,
    { requiresToken: true, disableFetchOnMount: true, returnRawResponse: true }
  );
  const {
    getInputProps,
    getRootProps,
    acceptedFiles,
    isDragActive,
    isFileDialogActive,
  } = useDropzone({
    disabled: showConfirmation,
    maxFiles: 1,
    onDropAccepted() {
      setShowConfirmation(true);
    },
    onDropRejected() {
      toast.error("File format is incorrect");
    },
  });
  const [uploadAssignment, uploadState, uploadProgress] = useUpload(
    `/assessment/assessment-event/submit-assignments/`,
    {
      onUploadError(error) {
        toast.error(error.message);
      },
      onUploadSuccess: async function () {
        await fetchCurrentAttempt();
      },
    }
  );

  const fetchCurrentAttempt = async () => {
    const response = await fetchData();
    if (response instanceof Error) {
      toast.error("This assignment has been closed", {
        toastId: "attempt-fetch-error",
      });
      return;
    }
    try {
      const file = await getFileFromResponse(response);
      setFileSubmitted(file);
    } catch (e) {
      const error = e as Error;
      if (error.name === "SERVER_ERROR") {
        toast.error("Server error, file name could not be parsed", {
          toastId: "attempt-fetch-error",
        });
      } else {
        toast.info("Good luck with your assignment!");
      }
    }
  };

  const getFileFromResponse = async (response: Response): Promise<File> => {
    const blob = await response.blob();
    const contentDisposition = response.headers.get("content-disposition");
    const fileName = contentDisposition
      ?.split("=")[1]
      .replace('"', "")
      .split(".")[0];
    if (!fileName) {
      const error = new Error("file name was not received");
      error.cause = "file name was not received";
      error.name = "SERVER_ERROR";
      throw error;
    }
    const file = new File([blob], fileName);
    return file;
  };

  const upload = () => {
    const files = acceptedFiles[0];
    const body = {
      file: files,
      "assessment-tool-id": assignment.id,
      "assessment-event-id": assessmentEventId,
    };
    uploadAssignment(body);
    setShowConfirmation(false);
  };

  useEffect(() => {
    fetchCurrentAttempt();
    // fetch on mount
    // eslint-disable-next-line
  }, []);

  const isOverwritingFile = fileSubmitted && uploadState.inProgress;
  const isNoOperation = !uploadState.inProgress && !showConfirmation;
  const showFileUploadIcon =
    !fileSubmitted || showConfirmation || isOverwritingFile;
  const showFileIcon = fileSubmitted && isNoOperation;
  const showInitialCaption = !fileSubmitted && isNoOperation;
  const showSubmittedCaption = fileSubmitted && isNoOperation;
  const showUploadingCaption = uploadState.inProgress && !showConfirmation;

  const showCaption = () => {
    if (showInitialCaption)
      return (
        <InitialCaption
          key="initial-caption"
          expectedFileType={assignment.additional_info.expected_file_format}
        />
      );
    if (showSubmittedCaption)
      return (
        <SubmittedCaption
          key="submitted-caption"
          fileName={fileSubmitted.name}
          onDownload={(e) => {
            e.stopPropagation();
          }}
        />
      );
    if (showUploadingCaption)
      return (
        <UploadingCaption
          key="confirmation-caption"
          fileName={acceptedFiles[0].name}
          progress={uploadProgress}
        />
      );
    if (showConfirmation)
      return (
        <ConfirmationCaption
          key="confirmation-caption"
          fileName={acceptedFiles[0].name}
          onCancel={() => setShowConfirmation(false)}
          onContinue={() => upload()}
        />
      );
  };

  if (!data) {
    return (
      <div
        style={{
          height: 316,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--primary)",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`${styles.dropzone}${
        showConfirmation ? " " + styles.disabled : ""
      }${isDragActive || isFileDialogActive ? " " + styles.accepted : ""}
      `}
    >
      <input {...getInputProps()} />
      <AnimatePresence mode="wait">
        {showFileIcon && (
          <motion.div
            key={"file-icon"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <FileIcon color="var(--primary)" />
          </motion.div>
        )}
        {showFileUploadIcon && (
          <motion.div
            key={"upload-file-icon"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <FileUploadIcon color="var(--secondary)" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles["dropzone-captions_container"]}>
        <AnimatePresence>{showCaption()}</AnimatePresence>
      </div>
    </div>
  );
};

export default FileDropzone;
