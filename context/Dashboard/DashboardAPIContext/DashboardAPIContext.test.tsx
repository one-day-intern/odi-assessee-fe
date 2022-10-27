import React from "react";
import { fireEvent, render } from "@testing-library/react";
import DashboardAPIProvider, { useDashboardAPI } from "./DashboardAPIContext";

interface DashboardNotification {
  id: string;
  message: string;
  priority: "high" | "normal" | "low";
}

const DummyConsumer = () => {
  const { pushNotification } = useDashboardAPI();

  return (
    <button
      data-testid="notification-pusher"
      onClick={() =>
        pushNotification({
          id: "test-notification",
          message: "test",
          priority: "high",
        })
      }
    >
      Push Notification!
    </button>
  );
};

const dummyRef = {
  current: document.createElement("div")
}

describe("Dashboard API Context test suite", () => {
  test("testing push notification from consumer", () => {
    let notification: DashboardNotification | null = null;
    const { getByTestId } = render(
      <DashboardAPIProvider
        parentRef={dummyRef}
        onPushNotification={(receivedNotification) => {
          notification = receivedNotification;
        }}
      >
        <DummyConsumer />
      </DashboardAPIProvider>
    );

    const pushNotification = getByTestId("notification-pusher");
    fireEvent.click(pushNotification);

    expect(notification).toBeTruthy();
    expect(notification!.id).toBe("test-notification");
    expect(notification!.message).toBe("test");
    expect(notification!.priority).toBe("high");
  });
});
