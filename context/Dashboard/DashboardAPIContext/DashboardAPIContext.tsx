import React, { useContext, createContext } from "react";

interface Props {
  children?: React.ReactNode;
  app: Application;
  onPushNotification: (notification: DashboardNotification) => void;
}

const DashboardAPIContext = createContext<DashboardAPIContextType>({} as DashboardAPIContextType);

export const useDashboardAPI = () => useContext(DashboardAPIContext);

const DashboardAPIProvider = ({ children, app, onPushNotification }: Props) => {
  const pushNotification = (notification: DashboardNotification) => {
    onPushNotification(notification);
  };

  const data = {
    app,
    pushNotification,
  };

  return (
    <DashboardAPIContext.Provider value={data}>{children}</DashboardAPIContext.Provider>
  );
};

export default DashboardAPIProvider