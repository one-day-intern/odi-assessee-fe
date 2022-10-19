import React, { useState } from "react";
import styles from "./Settings.module.css";
import { motion } from "framer-motion";
import SettingsIcon from "./SettingsIcon";
import SettingsModal from "./SettingsModal";
import { AnimatePresence } from "framer-motion";

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
      <AnimatePresence>
        {settingsOpened && (
          <SettingsModal setSettingsOpened={setSettingsOpened} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Settings;
