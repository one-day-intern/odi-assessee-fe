import React from "react";
import Room from "./Room";
import { render } from "@testing-library/react";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import DashboardAPIProvider from "../../../../../../context/Dashboard/DashboardAPIContext";

describe("Room component test suite", () => {
  test("testing render room", () => {
    render(
      <DashboardAPIProvider parentRef={{ current: document.createElement("div") }} onPushNotification={() => {}}>
        <HMSRoomProvider>
          <Room onLeave={() => {}} />
        </HMSRoomProvider>
      </DashboardAPIProvider>
    );
  });
});
