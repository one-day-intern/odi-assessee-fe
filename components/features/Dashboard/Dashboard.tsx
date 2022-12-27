import React, { useRef, useState, useCallback, useEffect } from "react";
import useVirtualDesktop from "@hooks/Dashboard/useVirtualDesktop";
import Screen from "./Screen";
import Taskbar from "./Taskbar";
import Window from "./Window";
import styles from "./Dashboard.module.css";
import NotificationViewer from "./NotificationViewer";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { applications } from "@hooks/Dashboard/useVirtualDesktop/useVirtualDesktop";
import { useRouter } from "next/router";
import useSSE from "@hooks/shared/useSSE";
import DashboardEvent from "./DashboardEvents";
import useGetRequest from "@hooks/shared/useGetRequest";
import { toast } from "react-toastify";

const Dashboard = () => {
  const TASKBAR_HEIGHT = 50;
  const router = useRouter();
  const fullscreenBoundRef = useRef<HTMLDivElement>(null);
  const virtualDesktop = useVirtualDesktop();
  const { data } = useGetRequest<any>(
    `/assessment/assessment-event/get-data/?assessment-event-id=${router.query["assessment-event-id"]}`,
    {
      requiresToken: true,
    }
  );
  const [isNotificationViewerOpened, setIsNotificationViewerOpened] =
    useState(false);
  const [notifications, setNotifications] = useState<AssesseeNotification[]>(
    []
  );

  useEffect(() => {
    if (process.env.NODE_ENV === "test") return;

    if (data) {
      const nowTime = new Date();
      const endTime = new Date(data.end_date_time);
      const difference = endTime.getTime() - nowTime.getTime();
      const kickTimeout = setTimeout(() => {
        router.replace("/dashboard");
        toast.info("Assessment Event has ended!");
      }, difference);

      return () => clearTimeout(kickTimeout);
    }
  }, [data, router]);

  const onNotification = useCallback(
    (app: Application, notification: DashboardNotification) => {
      if (
        !notifications.find(
          (_notification) =>
            _notification.id === `${notification.id}-${app.appId}`
        )
      ) {
        setNotifications((prev) => [
          ...prev,
          { app: app, ...notification, id: `${notification.id}-${app.appId}` },
        ]);
      }
    },
    [notifications]
  );

  const onNotificationClose = (notification: AssesseeNotification) => {
    setNotifications((prev) =>
      prev.filter((_notification) => _notification.id !== notification.id)
    );
  };

  const handleServerNotification = useCallback(
    (serverNotificationRaw: any) => {
      let serverNotification: ServerNotification;
      try {
        serverNotification = JSON.parse(serverNotificationRaw);
      } catch (e) {
        return;
      }
      // will refactor applications in the future so that we won't need to manually find
      let app: Application | undefined;
      const vidconApp = applications.find(
        (_app) => _app.appId === "video-conference"
      );
      const responseTestApp = applications.find(
        (_app) => _app.appId === "response-test"
      );
      const interactiveQuizApp = applications.find(
        (_app) => _app.appId === "interactive-quiz"
      );
      switch (serverNotification.type) {
        case "interactivequiz":
        case "assignment":
          app = interactiveQuizApp;
          break;
        case "responsetest":
          app = responseTestApp;
          break;
        case "videoconference":
          app = vidconApp;
          break;
        default:
          app = undefined;
          break;
      }
      if (app) {
        let notification: DashboardNotification = {
          id: serverNotification.id,
          title: "",
          message: "",
          priority: "high",
        };
        switch (serverNotification.type) {
          case "interactivequiz":
            notification = {
              ...notification,
              title: `[QUIZ] ${serverNotification.name}`,
              message: `${serverNotification.description}`,
            };
            break;
          case "assignment":
            notification = {
              ...notification,
              title: `[ASSIGNMENT] ${serverNotification.name}`,
              message: `${serverNotification.description}`,
            };
            break;
          case "responsetest":
            notification = {
              ...notification,
              title: `${serverNotification.additional_info.sender}`,
              message: `${serverNotification.additional_info.prompt}`,
            };
            break;
          case "videoconference":
            notification = {
              ...notification,
              title: "Video Conference with your Assessor",
              message:
                "Open your video conference application! It's time for your video assessment.",
            };
            break;
          default:
        }
        onNotification(app, notification);
        switch (app.appId) {
          case "response-test":
            dispatchEvent(new Event(DashboardEvent.REFRESH_EMAILS));
            break;
          case "interactive-quiz":
            dispatchEvent(new Event(DashboardEvent.REFRESH_QUIZZES));
            dispatchEvent(new Event(DashboardEvent.REFRESH_ASSIGNMENTS));
            break;
          case "video-conference":
            dispatchEvent(new Event(DashboardEvent.REFRESH_VIDCON));
            break;
          default:
            break;
        }
      }
    },
    [onNotification]
  );

  useSSE(
    `/assessment/assessment-event/subscribe/?assessment-event-id=${router.query["assessment-event-id"]}`,
    { onMessage: handleServerNotification }
  );

  return (
    <MotionConfig reducedMotion="user">
      <Screen onMouseDown={(e) => setIsNotificationViewerOpened(false)}>
        <div
          id="FullscreenBounds"
          data-testid="FullscreenBounds"
          ref={fullscreenBoundRef}
          className={styles["screen__fullscreen--bounds"]}
          style={{ height: `calc(100vh - ${TASKBAR_HEIGHT}px)` }}
        >
          <div id="shadow-container"></div>
          <AnimatePresence>
            {virtualDesktop.openedApps.map((app) => (
              <Window
                key={app.appId}
                app={app}
                fullscreenParentRef={fullscreenBoundRef}
                onFocus={(_app) => {
                  virtualDesktop.focusApp(_app);
                  setIsNotificationViewerOpened(false);
                }}
                onClose={(_app) => virtualDesktop.closeApp(_app)}
                onNotification={(_app, notification) =>
                  onNotification(_app, notification)
                }
                onUpdatePos={(_app, pos) =>
                  virtualDesktop.updateAppPosition(_app, pos)
                }
                onUpdateSize={(_app, size) =>
                  virtualDesktop.updateAppSize(_app, size)
                }
                toggleFullscreen={(_app, fullscreen) =>
                  virtualDesktop.toggleFullscreen(_app, fullscreen)
                }
                toggleMinimize={(_app, minimize) =>
                  virtualDesktop.toggleMinimize(_app, minimize)
                }
              />
            ))}
          </AnimatePresence>
        </div>
        <Taskbar
          height={TASKBAR_HEIGHT}
          isNotificationViewerOpen={isNotificationViewerOpened}
          notificationCount={notifications.length}
          onNotificationViewerOpen={() =>
            setIsNotificationViewerOpened(!isNotificationViewerOpened)
          }
          virtualDesktop={virtualDesktop}
        />
        <AnimatePresence>
          {isNotificationViewerOpened && (
            <NotificationViewer
              virtualDesktop={virtualDesktop}
              onNotificationClose={(notification, closeViewer) => {
                onNotificationClose(notification);
                if (closeViewer) {
                  setIsNotificationViewerOpened(false);
                }
              }}
              notifications={notifications}
              taskbarHeight={TASKBAR_HEIGHT}
            />
          )}
        </AnimatePresence>
      </Screen>
    </MotionConfig>
  );
};

export default Dashboard;
