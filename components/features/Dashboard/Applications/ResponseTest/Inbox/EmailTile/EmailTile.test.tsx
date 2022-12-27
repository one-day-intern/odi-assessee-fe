import React from "react";
import EmailTile from "./EmailTile";
import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Email tile component test suite", () => {
  test("test onTap handler", () => {
    let clicked = false;
    const { getByTestId } = render(
      <EmailTile
        email={{
          id: "8312903-2819381290-9031829032",
          additional_info: {
            sender: "mock@server.com",
            subject: "hey this is a mocked response",
            prompt: "hello this is a mocked response body",
          },
          released_time: "2022-12-05T16:40:00",
          receivedOn: new Date("2022-12-05T16:40:00"),
        }}
        onClick={() => {
          clicked = true;
        }}
      />
    );
    const tile = getByTestId(`EmailTile-8312903-2819381290-9031829032`);

    act(() => {
        fireEvent.mouseDown(tile);
        fireEvent.mouseUp(tile);
    })

    expect(clicked).toBe(true);
  });
});
