import { motion } from "framer-motion";
import React, { useState } from "react";
import styles from "./Tabs.module.css";

interface Props {
  currentTab: string;
  tabs: string[];
  onChange: (tab: string) => void;
}

const Tabs: React.FC<Props> = ({ currentTab: currentSelected, tabs, onChange }) => {
  const [currentTab, setCurrentTab] = useState(currentSelected);

  const handleClick = (tab: string) => {
    if (currentTab !== tab) {
      setCurrentTab(tab);
      onChange(tab);
    }
  };

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => {
        const selected = currentTab === tab;
        const selectedStyle = selected ? " " + styles.selected : "";
        return (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(tab)}
            className={`${styles.tab}${selectedStyle}`}
            key={tab}
          >
            {
              // @ts-ignore
              tab.at(0).toUpperCase() + tab.substring(1)
            }
          </motion.button>
        );
      })}
    </div>
  );
};

export default Tabs;
