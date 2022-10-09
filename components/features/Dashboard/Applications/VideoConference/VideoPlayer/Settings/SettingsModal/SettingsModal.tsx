import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const DeviceSettings = () => {
    return <></>
}

const SettingsModal = () => {
  const [inBrowser, setInBrowser] = useState(false);

  useEffect(() => {
    setInBrowser(true);
  }, []);

  if (inBrowser) {
    return <></>
  }

  return null;
};

export default SettingsModal;
