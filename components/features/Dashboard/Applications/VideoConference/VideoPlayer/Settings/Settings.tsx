import React, { useState } from "react";
import styles from "./Settings.module.css";
import { motion, AnimatePresence } from "framer-motion";
import SettingsIcon from "./SettingsIcon";
import SettingsModal from "./SettingsModal";
import { useHMSActions } from "@100mslive/react-sdk";

const Settings = () => {
  const [settingsOpened, setSettingsOpened] = useState(false);
  const actions = useHMSActions();

  return (
    <>
      <motion.div
        data-testid="VideoSettings"
        onTap={() => {
          setSettingsOpened(!settingsOpened);
          actions.setLocalAudioEnabled(false);
        }}
        className={`${styles.icon} ${settingsOpened ? styles.active : ""}`}
      >
        <SettingsIcon />
      </motion.div>
      <AnimatePresence>
        {settingsOpened && (
          <SettingsModal setSettingsOpened={setSettingsOpened} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Settings;
