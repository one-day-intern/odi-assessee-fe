import React from "react";
import styles from "./Taskbar.module.css";
import TaskbarShortcut from "./TaskbarShortcut";

interface Props {
  children?: React.ReactNode;
  virtualDesktop: VirtualDesktop;
}

const Taskbar: React.FC<Props> = ({ virtualDesktop }) => {
  return (
    <div>
      Taskbar
    </div>
  );
};

export default Taskbar;
