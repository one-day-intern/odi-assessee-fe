import React from "react";
import { render } from "@testing-library/react";
import Notification from "./Notification";

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

describe("Notification component test suite", () => {
  test("testing render notification", () => {
    const { getByTestId } = render(
      <Notification
        notification={testNotificationHigh}
        onClick={() => {}}
        onNotificationClose={() => {}}
      />
    );

    const notifElement = getByTestId(`Notification-${testNotificationHigh.id}`);

    expect(notifElement.querySelector(".notification-body")).toHaveTextContent(testNotificationHigh.message);
  });
});
