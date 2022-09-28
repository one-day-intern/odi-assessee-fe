import React, { useState } from "react";
import CounterApp, {
  CounterAppIcon,
} from "@components/features/Dashboard/Applications/CounterApp";
import VideoConference, {
  VideoConferenceIcon,
} from "@components/features/Dashboard/Applications/VideoConference";

const applications: Application[] = [
  {
    appId: "counter",
    app: CounterApp,
    icon: CounterAppIcon,
    width: 600,
    height: 800,
    currentX: 800,
    currentY: 100,
    fullscreen: false,
    reveal: false,
    minimized: false,
    zIndex: 0,
  },
  {
    appId: "video-conference",
    app: VideoConference,
    icon: VideoConferenceIcon,
    width: 600,
    height: 800,
    currentX: 500,
    currentY: 100,
    fullscreen: false,
    reveal: false,
    minimized: false,
    zIndex: 0,
  },
];

const useVirtualDesktop = (): VirtualDesktop => {
  const [openedApps, setOpenedApps] = useState<Application[]>([]);
  const [numberOfMinimizedApps, setNumberOfMinizedApps] = useState(0);

  // append app to openedApps array
  const openApp = (app: Application) => {
    if (!openedApps.find((_app) => _app.appId === app.appId)) {
      const newApp = { ...app, zIndex: openedApps.length + 1 };
      setOpenedApps((prev) => [...prev, newApp]);
    }
  };
  // remove app from openedApps array
  const closeApp = (app: Application) => {
    setOpenedApps((prev) => {
      return prev.filter((_app) => _app.appId !== app.appId);
    });
  };
  // set z-index of focused app to the amount of apps opened
  // decrease z-index of every other app by 1 so original order is maintained
  const focusApp = (app: Application) => {
    setOpenedApps((prev) => {
      if (app.zIndex === openedApps.length) {
        return prev;
      }
      const newArray = [];
      for (let _app of prev) {
        if (_app.appId === app.appId) {
          newArray.push({ ..._app, zIndex: openedApps.length });
        } else {
          newArray.push({
            ..._app,
            zIndex: _app.zIndex - (_app.zIndex > 1 ? 1 : 0),
          });
        }
      }
      return newArray;
    });
  };

  // workaround to trigger reveal 'event' in the window component
  // useEffect would then sync the state changes
  // LOGIC:
  // set 'reveal' to true => useEffect dependent on 'reveal' would fire =>
  // sync position and size of window => set reveal back to false =>
  // useEffect dependent on 'reveal' would fire again, but we will not sync
  // if 'reveal' is false
  const toggleReveal = (app: Application, reveal: boolean) => {
    setOpenedApps((prev) => {
      const newArray: Application[] = [];
      for (let _app of prev) {
        if (_app.appId === app.appId) {
          const originalApp = applications.find(
            (_app_) => _app_.appId === app.appId
          );
          newArray.push({
            ..._app,
            currentX: reveal ? originalApp!.currentX : _app.currentX,
            currentY: reveal ? originalApp!.currentY : _app.currentY,
            width: reveal ? originalApp!.width : _app.width,
            height: reveal ? originalApp!.height : _app.height,
            fullscreen: reveal ? false : _app.fullscreen,
            reveal: reveal,
          });
        } else {
          newArray.push({ ..._app });
        }
      }
      return newArray;
    });
  };

  const updateAppPosition = (
    app: Application,
    pos: { x: number; y: number }
  ) => {
    setOpenedApps((prev) => {
      const newArray: Application[] = [];
      for (let _app of prev) {
        if (_app.appId === app.appId) {
          newArray.push({ ..._app, currentX: pos.x, currentY: pos.y });
        } else {
          newArray.push({ ..._app });
        }
      }
      return newArray;
    });
  };

  const updateAppSize = (
    app: Application,
    size: { width: number; height: number }
  ) => {
    setOpenedApps((prev) => {
      const newArray: Application[] = [];
      for (let _app of prev) {
        if (_app.appId === app.appId) {
          newArray.push({ ..._app, width: size.width, height: size.height });
        } else {
          newArray.push({ ..._app });
        }
      }
      return newArray;
    });
  };

  const toggleFullscreen = (app: Application, fullscreen: boolean) => {
    setOpenedApps((prev) => {
      const newArray: Application[] = [];
      for (let _app of prev) {
        if (_app.appId === app.appId) {
          newArray.push({ ..._app, fullscreen: fullscreen });
        } else {
          newArray.push({ ..._app });
        }
      }
      return newArray;
    });
  };

  const toggleMinimize = (app: Application, minimize: boolean) => {
    setOpenedApps((prev) => {
      const newArray: Application[] = [];
      for (let _app of prev) {
        if (_app.appId === app.appId) {
          newArray.push({
            ..._app,
            minimized: minimize,
            zIndex: minimize ? 0 : _app.zIndex,
          });
        } else {
          newArray.push({
            ..._app,
          });
        }
      }
      return newArray;
    });
    setNumberOfMinizedApps(numberOfMinimizedApps + (minimize ? 1 : -1));
  };

  return {
    applications,
    openedApps,
    numberOfMinimizedApps,
    openApp,
    closeApp,
    focusApp,
    toggleReveal,
    updateAppPosition,
    updateAppSize,
    toggleFullscreen,
    toggleMinimize,
  };
};

export default useVirtualDesktop