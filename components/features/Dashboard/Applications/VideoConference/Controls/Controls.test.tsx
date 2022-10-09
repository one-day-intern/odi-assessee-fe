import React from "react";
import Controls from "./Controls";
import { render } from "@testing-library/react";
import { HMSRoomProvider } from "@100mslive/react-sdk";

describe("Controls component test suite", () => {
  test("testing render controls", () => {
    render(
      <HMSRoomProvider>
        <Controls onLeave={() => {}} />
      </HMSRoomProvider>
    );
  });
});
