import React from "react";
import useVirtualDesktop from "../../../../hooks/Dashboard/useVirtualDesktop";
import NotificationViewer, { compareNotificationPriority } from "./NotificationViewer";
import { fireEvent, render, renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

interface DashboardNotification {
  id: string;
  message: string;
  priority: "high" | "normal" | "low";
}

interface Application {
  appId: string;
  appName: string;
  app: () => JSX.Element;
  icon: () => JSX.Element;
  width: number;
  height: number;
  currentX: number;
  currentY: number;
  fullscreen: boolean;
  minimized: boolean;
  zIndex: number;
}

interface AssesseeNotification extends DashboardNotification {
  id: string;
  app: Application;
}

const testNotificationHigh: AssesseeNotification = {
  id: "test-notification",
  message: "test-high",
  priority: "high",
  app: {
    appId: "response-test",
    appName: "Response Test App",
    app: () => <></>,
    icon: () => <></>,
    width: 600,
    height: 800,
    currentX: 200,
    currentY: 100,
    fullscreen: false,
    minimized: false,
    zIndex: 0,
  },
};
const testNotificationNormal: AssesseeNotification = {
  id: "test-notification",
  message: "test-normal",
  priority: "normal",
  app: {
    appId: "interactive-quiz",
    appName: "Interactive Quiz App",
    app: () => <></>,
    icon: () => <></>,
    width: 600,
    height: 800,
    currentX: 200,
    currentY: 100,
    fullscreen: false,
    minimized: false,
    zIndex: 0,
  },
};
const testNotificationLow: AssesseeNotification = {
  id: "test-notification",
  message: "test-low",
  priority: "low",
  app: {
    appId: "video-conference",
    appName: "Video Conference App",
    app: () => <></>,
    icon: () => <></>,
    width: 600,
    height: 800,
    currentX: 200,
    currentY: 100,
    fullscreen: false,
    minimized: false,
    zIndex: 0,
  },
};

let notifications: AssesseeNotification[] = [];

let closedNotifications: string[] = [];

describe("Notification Viewer component test suite", () => {
  beforeEach(() => {
    notifications = [];
    closedNotifications = [];
  });

  test("testing render notification viewer", () => {
    const { result } = renderHook(() => useVirtualDesktop());
    const { getByText } = render(
      <NotificationViewer
        notifications={notifications}
        taskbarHeight={50}
        onNotificationClose={(notification) =>
          closedNotifications.push(notification.id)
        }
        virtualDesktop={result.current}
      />
    );

    getByText("You have no new notifications.");
  });

  test("testing render notification", () => {
    notifications.push(testNotificationHigh);
    const { result } = renderHook(() => useVirtualDesktop());
    const { getByTestId } = render(
      <NotificationViewer
        notifications={notifications}
        taskbarHeight={50}
        onNotificationClose={(notification) =>
          closedNotifications.push(notification.id)
        }
        virtualDesktop={result.current}
      />
    );

    const notifViewer = getByTestId("NotificationViewer");

    expect(notifViewer.children.length).toBeTruthy()
  })

  test("testing sort notification priority", () => {
    const highAndLow = compareNotificationPriority(testNotificationHigh, testNotificationLow);
    const highAndNormal = compareNotificationPriority(testNotificationHigh, testNotificationNormal);
    const normalAndLow = compareNotificationPriority(testNotificationNormal, testNotificationLow);

    expect(highAndLow).toBe(-1);
    expect(highAndNormal).toBe(-1);
    expect(normalAndLow).toBe(-1);
  })

  test("testing sort notification priority in DOM", () => {
    notifications.push(testNotificationHigh);
    notifications.push(testNotificationNormal);
    notifications.push(testNotificationLow);
    const { result } = renderHook(() => useVirtualDesktop());
    const { getByTestId } = render(
      <NotificationViewer
        notifications={notifications}
        taskbarHeight={50}
        onNotificationClose={(notification) =>
          closedNotifications.push(notification.id)
        }
        virtualDesktop={result.current}
      />
    );

    const notifViewer = getByTestId("NotificationViewer");
    const firstNotif = notifViewer.children[0].querySelector(".notification-body");
    const secondNotif = notifViewer.children[1].querySelector(".notification-body");
    const thirdNotif = notifViewer.children[2].querySelector(".notification-body");

    expect(firstNotif?.textContent).toBe("test-high")
    expect(secondNotif?.textContent).toBe("test-normal")
    expect(thirdNotif?.textContent).toBe("test-low")
  })

  test("testing onClick notification to open app", () => {
    notifications.push(testNotificationHigh);
    const { result } = renderHook(() => useVirtualDesktop());
    const { getByTestId } = render(
      <NotificationViewer
        notifications={notifications}
        taskbarHeight={50}
        onNotificationClose={(notification) =>
          closedNotifications.push(notification.id)
        }
        virtualDesktop={result.current}
      />
    );

    const notificationElement = getByTestId("NotificationViewer").firstElementChild;

    expect(result.current.openedApps.length).toBe(0);

    act(() => {
      fireEvent.click(notificationElement!);
    })

    expect(result.current.openedApps.length).toBe(1);
  })

  test("testing onClick notification to unminimize app", () => {
    const { result } = renderHook(() => useVirtualDesktop());
    
    act(() => {
      result.current.openApp(testNotificationHigh.app);
      result.current.toggleMinimize(testNotificationHigh.app, true);
    })

    notifications.push(testNotificationHigh);
    const { getByTestId } = render(
      <NotificationViewer
        notifications={notifications}
        taskbarHeight={50}
        onNotificationClose={(notification) =>
          closedNotifications.push(notification.id)
        }
        virtualDesktop={result.current}
      />
    );

    expect(result.current.openedApps[0].minimized).toBe(true);

    const notificationElement = getByTestId("NotificationViewer").firstElementChild;

    act(() => {
      fireEvent.click(notificationElement!);
    })

    expect(result.current.openedApps[0].minimized).toBe(false);
  })
});
