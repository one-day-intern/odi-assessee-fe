import React, { useEffect, useState } from "react";
import CounterApp, {
  CounterAppIcon,
} from "@components/features/Dashboard/Applications/CounterApp";

const applications: Application[] = [
  {
    appId: "counter",
    app: CounterApp,
    icon: CounterAppIcon,
    initialWidth: 300,
    initialHeight: 400,
  },
];

export default (): VirtualDesktop => {
  const [openedApps, setOpenedApps] = useState<Application[]>([]);

  // append app to openedApps array
  const openApp = (app: Application) => {};
  // remove app from openedApps array
  const closeApp = (app: Application) => {};

  // place app at the end of openedApps array, so it will be rendered last
  const focusApp = (app: Application) => {};

  return { applications, openedApps, openApp, closeApp, focusApp };
};
