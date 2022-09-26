import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

export default (
  app: Application,
  toggleFullscreen: (app: Application, fullscreen: boolean) => void,
  fullScreenBounds: string,
  rndRef: React.ElementRef<typeof Rnd>
) => {
  const [isPreviouslyFullscreen, setIsPreviouslyFullscreen] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);
  const [bounds, setBounds] = useState(() => {
    return document
      .querySelector(`.${fullScreenBounds}`)
      ?.getBoundingClientRect();
  });

  useEffect(() => {
    function handleResize() {
      setBounds(() => {
        return document
          .querySelector(`.${fullScreenBounds}`)
          ?.getBoundingClientRect();
      });
      if (innerWidth <= 1024 && !mobileMode) {
        setMobileMode(true);
        fullscreen();
      } else if (innerWidth > 1024 && mobileMode) {
        setMobileMode(false);
        setToNormalMode();
      }
    }
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [
    mobileMode,
    isPreviouslyFullscreen,
    app,
    rndRef,
    setBounds,
    setMobileMode,
  ]);

  const fullscreen = () => {
    if (!app.fullscreen) {
      rndRef?.updatePosition({
        x: 0,
        y: 0,
      });
      toggleFullscreen(app, true);
    } else if (!isPreviouslyFullscreen) {
      setIsPreviouslyFullscreen(true);
    }
  };

  const setToNormalMode = () => {
    if (!isPreviouslyFullscreen) {
      rndRef?.updatePosition({
        x: app.currentX,
        y: app.currentY,
      });

      rndRef?.updateSize({
        width: app.width,
        height: app.height,
      });

      toggleFullscreen(app, false);
    }
  };

  const setToOriginalSize = (e: React.MouseEvent) => {
    if (app.fullscreen && !mobileMode) {
      const mouseToFullscreenRatio = e.clientX / bounds!.width;

      rndRef?.updatePosition({
        x: e.clientX - app.width * mouseToFullscreenRatio,
        y: e.clientY - 10,
      });

      rndRef?.updateSize({
        width: app.width,
        height: app.height,
      });

      toggleFullscreen(app, false);
      setIsPreviouslyFullscreen(false);
    }
  };

  const setToOriginalSizeMobile = (e: React.TouchEvent) => {
    if (app.fullscreen && !mobileMode) {
      const mouseToFullscreenRatio = e.touches[0].clientX / bounds!.width;

      rndRef?.updatePosition({
        x: e.touches[0].clientX - app.width * mouseToFullscreenRatio,
        y: e.touches[0].clientY - 10,
      });

      rndRef?.updateSize({
        width: app.width,
        height: app.height,
      });

      toggleFullscreen(app, false);
      setIsPreviouslyFullscreen(false);
    }
  };

  return {
    bounds,
    mobileMode,
    isPreviouslyFullscreen,
    fullscreen,
    setToNormalMode,
    setToOriginalSize,
    setToOriginalSizeMobile,
  };
};
