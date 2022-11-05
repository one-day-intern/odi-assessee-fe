import useResizeObserver from "@react-hook/resize-observer";
import React, { useContext, createContext, useState } from "react";

interface Props {
  children?: React.ReactNode;
  parentRef: React.RefObject<HTMLDivElement>;
  onPushNotification: (notification: DashboardNotification) => void;
}

const DashboardAPIContext = createContext<DashboardAPIContextType>({} as DashboardAPIContextType);

export const useDashboardAPI = () => useContext(DashboardAPIContext);

const DashboardAPIProvider = ({ children, parentRef, onPushNotification }: Props) => {
  const pushNotification = (notification: DashboardNotification) => {
    onPushNotification(notification);
  };
  const [window, setWindow] = useState<DOMRect>(parentRef.current!.getBoundingClientRect());
  useResizeObserver(parentRef, (entry) => setWindow(entry.contentRect));

  const data = {
    window,
    pushNotification,
  };

  return (
    <DashboardAPIContext.Provider value={data}>{children}</DashboardAPIContext.Provider>
  );
};

export default DashboardAPIProvider