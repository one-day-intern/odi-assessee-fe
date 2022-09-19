import useVirtualDesktop from "@hooks/Dashboard/useVirtualDesktop";
import React from "react";
import Screen from "./Screen";
import Taskbar from "./Taskbar";
import Window from "./Window";
import { AnimatePresence } from "framer-motion";
const Dashboard = () => {
  const virtualDesktop = useVirtualDesktop();

  return (
    <Screen>
      <Taskbar virtualDesktop={virtualDesktop} />
    </Screen>
  );
};

export default Dashboard;
