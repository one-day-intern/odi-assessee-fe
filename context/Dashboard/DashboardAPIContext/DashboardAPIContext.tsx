import React, { useContext, createContext } from "react";

interface Props {
  children?: React.ReactNode;
  onPushNotification: (notification: DashboardNotification) => void;
}

const DashboardAPIContext = createContext<DashboardAPIContextType>({} as DashboardAPIContextType);

export const useDashboardAPI = () => useContext(DashboardAPIContext);

const DashboardAPIProvider = ({ children, onPushNotification }: Props) => {
  const pushNotification = (notification: DashboardNotification) => {
    onPushNotification(notification);
  };

  const data = {
    pushNotification,
  };

  return (
    <DashboardAPIContext.Provider value={data}>{children}</DashboardAPIContext.Provider>
  );
};

export default DashboardAPIProvider