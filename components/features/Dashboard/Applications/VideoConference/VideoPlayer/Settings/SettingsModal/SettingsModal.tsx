import React, { useEffect, useState } from "react";
import styles from "./SettingsModal.module.css";
import Select from "react-select";
import { Button } from "@components/shared/elements/Button";
import { useDevices, DeviceType, useHMSActions } from "@100mslive/react-sdk";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

interface SettingsProps {
  setSettingsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeviceSettings: React.FC<React.PropsWithChildren<SettingsProps>> = ({
  setSettingsOpened,
}) => {
  const { allDevices, selectedDeviceIDs, updateDevice } = useDevices();
  const { videoInput, audioInput, audioOutput } = allDevices;
  const actions = useHMSActions();

  const deviceOptionMapper = (device?: MediaDeviceInfo) => {
    if (!device) {
      return;
    }
    return {
      label: device.label,
      value: { id: device.deviceId, type: device.kind },
    };
  };

  const devicesOptionMapper = (devices?: MediaDeviceInfo[]) => {
    if (!devices) {
      return;
    }
    return devices.map((device) => deviceOptionMapper(device)!);
  };

  return (
    <div style={{ overflow: "auto" }} data-testid="SettingsModal">
      <motion.div
        className={`${styles.backdrop}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => {
          setSettingsOpened(false);
          actions.setLocalAudioEnabled(true);
        }}
      />
      <motion.div
        className={`${styles.modal}`}
        style={{ left: "50%" }}
        initial={{ opacity: 0, top: 0 }}
        animate={{ opacity: 1, top: "50%" }}
        exit={{ opacity: 0, top: "-100%" }}
      >
        <h1 className={`${styles["modal-header"]}`}>Settings</h1>
        <div className={`${styles.devices}`}>
          <div className={`${styles["device-dropdown-group"]}`}>
            <h2>Camera</h2>
            <Select
              data-label="Audio Input"
              className={`${styles["device-dropdown"]}`}
              defaultValue={deviceOptionMapper(
                videoInput?.find(
                  (device) => device.deviceId === selectedDeviceIDs.videoInput
                )
              )}
              options={devicesOptionMapper(videoInput)}
              onChange={(device) => {
                updateDevice({
                  deviceType: DeviceType.videoInput,
                  deviceId: device?.value.id!,
                });
                toast.success(`Video input changed to ${device?.label}`);
              }}
            />
          </div>
          <div className={`${styles["device-dropdown-group"]}`}>
            <h2>Audio Input</h2>
            <Select
              data-label="Audio Input"
              className={`${styles["device-dropdown"]}`}
              defaultValue={deviceOptionMapper(
                audioInput?.find(
                  (device) => device.deviceId === selectedDeviceIDs.audioInput
                )
              )}
              options={devicesOptionMapper(audioInput)}
              onChange={(device) => {
                updateDevice({
                  deviceType: DeviceType.audioInput,
                  deviceId: device?.value.id!,
                });
                toast.success(`Audio input changed to ${device?.label}`);
              }}
            />
          </div>
          <div className={`${styles["device-dropdown-group"]}`}>
            <h2>Audio Output</h2>
            <Select
              data-label="Audio Input"
              className={`${styles["device-dropdown"]}`}
              defaultValue={deviceOptionMapper(
                audioOutput?.find(
                  (device) => device.deviceId === selectedDeviceIDs.audioOutput
                )
              )}
              options={devicesOptionMapper(audioOutput)}
              onChange={(device) => {
                updateDevice({
                  deviceType: DeviceType.audioOutput,
                  deviceId: device?.value.id!,
                });
                toast.success(`Audio output changed to ${device?.label}`);
              }}
            />
          </div>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "end" }}
          >
            <Button
              onClick={() => {
                setSettingsOpened(false);
                actions.setLocalAudioEnabled(true);
              }}
              variant="secondary"
              style={{ margin: 0, maxWidth: "100px", fontWeight: "bold" }}
            >
              close
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SettingsModal: React.FC<React.PropsWithChildren<SettingsProps>> = ({
  setSettingsOpened,
}) => {
  const [inBrowser, setInBrowser] = useState(false);

  useEffect(() => {
    setInBrowser(true);
  }, []);

  if (inBrowser) {
    return createPortal(
      <DeviceSettings setSettingsOpened={setSettingsOpened} />,
      document.getElementById("video-conference-modal")!
    );
  }

  return null;
};

export default SettingsModal;
