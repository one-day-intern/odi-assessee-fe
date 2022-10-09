import React, { useState } from "react";
import styles from "./Settings.module.css";
import { motion } from "framer-motion";
import { useDevices, DeviceType } from "@100mslive/react-sdk";
import SettingsIcon from "./SettingsIcon";
import SettingsModal from "./SettingsModal";

const Settings = () => {
  const [settingsOpened, setSettingsOpened] = useState(false);

  return (
    <>
      <motion.div
        data-testid="VideoSettings"
        onTap={() => setSettingsOpened(!settingsOpened)}
        className={`${styles.icon} ${settingsOpened ? styles.active : ""}`}
      >
        <SettingsIcon />
      </motion.div>
      {settingsOpened && <SettingsModal />}
    </>
  );
};

export default Settings;
