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
          id: "email-1",
          subject: "test",
          sender: "testing",
          body: "test",
          receivedOn: new Date(Date.now()),
        }}
        onClick={() => {
          clicked = true;
        }}
      />
    );
    const tile = getByTestId(`EmailTile-email-1`);

    act(() => {
        fireEvent.mouseDown(tile);
        fireEvent.mouseUp(tile);
    })

    expect(clicked).toBe(true);
  });
});
