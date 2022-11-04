import React, { useState } from "react";
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

const FileDropzone = () => {
  const [fileSubmitted, setFileSubmitted] = useState<File>();
  const [showConfirmation, setShowConfirmation] = useState(false);
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
    "/main/upload/",
    {
      onUploadError(error) {
        toast.error(error.message);
      },
      onUploadSuccess: async function () {
        setFileSubmitted(acceptedFiles[0]);
      },
    }
  );

  const upload = () => {
    const files = acceptedFiles[0];
    uploadAssignment({ file: files });
    setShowConfirmation(false);
  };

  const download = async () => {};

  const showFileUploadIcon =
    !fileSubmitted ||
    (fileSubmitted && uploadState.inProgress) ||
    showConfirmation;
  const showFileIcon =
    fileSubmitted && !uploadState.inProgress && !showConfirmation;
  const showInitialCaption =
    !fileSubmitted && !uploadState.inProgress && !showConfirmation;
  const showSubmittedCaption =
    fileSubmitted && !uploadState.inProgress && !showConfirmation;
  const showUploadingCaption = uploadState.inProgress && !showConfirmation;

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
        <AnimatePresence>
          {showInitialCaption && <InitialCaption key="initial-caption" />}
          {showSubmittedCaption && (
            <SubmittedCaption
              key="submitted-caption"
              fileName={fileSubmitted.name}
              onDownload={(e) => {
                e.stopPropagation();
                download();
              }}
            />
          )}
          {showUploadingCaption && (
            <UploadingCaption
              key="uploading-caption"
              fileName={acceptedFiles[0].name}
              progress={uploadProgress}
            />
          )}
          {showConfirmation && (
            <ConfirmationCaption
              key="confirmation-caption"
              fileName={acceptedFiles[0].name}
              onCancel={() => setShowConfirmation(false)}
              onContinue={() => upload()}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FileDropzone;
