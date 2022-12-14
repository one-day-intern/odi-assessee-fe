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
  NoSubmissionCaption,
} from "./Captions";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useGetRequest from "@hooks/shared/useGetRequest";
import { Loader } from "@components/shared/elements/Loader";

interface Props {
  assignment: AssignmentObject;
  isAssignmentEnd: boolean;
}

const FileDropzone: React.FC<Props> = ({ assignment, isAssignmentEnd }) => {
  const [fileSubmitted, setFileSubmitted] = useState<File>();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transformingFile, setTransformingFile] = useState(false);
  const router = useRouter();
  const assessmentEventId = router.query["assessment-event-id"];
  const { data, fetchData } = useGetRequest<Response>(
    `/assessment/assessment-event/get-submitted-assignment/?assessment-event-id=${assessmentEventId}&assessment-tool-id=${assignment.id}`,
    { requiresToken: true, disableFetchOnMount: true, returnRawResponse: true }
  );
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
  const disableDropzone =
    showConfirmation || uploadState.inProgress || isAssignmentEnd;
  const {
    getInputProps,
    getRootProps,
    acceptedFiles,
    isDragActive,
    isFileDialogActive,
  } = useDropzone({
    disabled: disableDropzone,
    maxFiles: 1,
    onDropAccepted() {
      setShowConfirmation(true);
    },
    onDropRejected() {
      toast.error("File format is incorrect");
    },
  });

  const fetchCurrentAttempt = async () => {
    const response = await fetchData();
    if (response instanceof Error) {
      toast.error("This assignment has been closed", {
        toastId: "attempt-fetch-error",
      });
      return;
    }
    try {
      setTransformingFile(true);
      const file = await getFileFromResponse(response);
      setFileSubmitted(file);
      setTransformingFile(false);
    } catch (e) {
      setTransformingFile(false);
      const error = e as Error;
      if (error.name === "SERVER_ERROR") {
        toast.error("Server error, file name could not be parsed", {
          toastId: "attempt-fetch-error",
        });
      } else if (!isAssignmentEnd) {
        toast.info("Good luck with your assignment!", {
          toastId: "good-luck-assignment",
        });
      }
    }
  };

  const getFileFromResponse = async (response: Response): Promise<File> => {
    const blob = await response.blob();
    if (blob.type === "application/json") {
      throw new Error();
    }
    const contentDisposition = response.headers.get("content-disposition");
    const fileName = contentDisposition?.split("=")[1].replaceAll('"', "");
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

  const download = () => {
    if (!fileSubmitted) return;
    const url = window.URL.createObjectURL(fileSubmitted);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileSubmitted.name;
    link.click();
  };

  useEffect(() => {
    fetchCurrentAttempt();
    // fetch on mount
    // eslint-disable-next-line
  }, []);

  const isOverwritingFile = fileSubmitted && uploadState.inProgress;
  const isNoOperation =
    !uploadState.inProgress && !showConfirmation && !transformingFile;
  const showFileUploadIcon =
    !fileSubmitted || showConfirmation || isOverwritingFile;
  const showFileIcon = fileSubmitted && isNoOperation;
  const showInitialCaption = !fileSubmitted && isNoOperation;
  const showSubmittedCaption = fileSubmitted && isNoOperation;
  const showUploadingCaption = uploadState.inProgress && !showConfirmation;

  const showCaption = () => {
    if (!fileSubmitted && isAssignmentEnd)
      return <NoSubmissionCaption key="no-submission-caption" />;
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
          isAssignmentEnd={isAssignmentEnd}
          onDownload={(e) => {
            e.stopPropagation();
            download();
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

  if (!data || transformingFile) {
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
        disableDropzone ? " " + styles.disabled : ""
      }${isDragActive || isFileDialogActive ? " " + styles.accepted : ""}
      `}
    >
      <input {...getInputProps()} />
      <AnimatePresence mode="wait">
        {(showFileIcon || isAssignmentEnd) && (
          <motion.div
            key={"file-icon"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <FileIcon color="var(--primary)" />
          </motion.div>
        )}
        {showFileUploadIcon && !isAssignmentEnd && (
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
