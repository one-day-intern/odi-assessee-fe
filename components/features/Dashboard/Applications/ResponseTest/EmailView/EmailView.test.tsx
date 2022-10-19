import React from "react";
import EmailView from "./EmailView";
import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("EmailView component test suite", () => {
  test("test render component", () => {
    render(
      <EmailView
        email={{
          id: "email-1",
          subject: "test",
          sender: "testing",
          body: "test",
          receivedOn: new Date(Date.now()),
        }}
        onCloseView={() => {}}
      />
    );
  });
  it("test show reply section", async () => {
    const { getByText, getByTestId } = render(
      <EmailView
        email={{
          id: "email-1",
          subject: "test",
          sender: "testing",
          body: "test",
          receivedOn: new Date(Date.now()),
        }}
        onCloseView={() => {}}
      />
    );

    const reply = getByText("Reply");

    act(() => {
        fireEvent.click(reply);
    })

    let replyGone = false;

    try {
        getByText("Reply");
    } catch {
        replyGone = true;
    }

    expect(replyGone).toBe(true);
  });
});
