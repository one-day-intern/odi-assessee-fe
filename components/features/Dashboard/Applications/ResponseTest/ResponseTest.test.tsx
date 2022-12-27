import React from "react";
import ResponseTest from "./ResponseTest";
import { fireEvent, render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../../mocks/createMockRouter";
import { act } from "react-dom/test-utils";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Response Test component test suite", () => {
  test("test render component", () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <ResponseTest />
      </RouterContext.Provider>
    );
  });
  test("test response test integration no submission", async () => {
    const { getByTestId } = render(
      <RouterContext.Provider value={createMockRouter({})}>
        <ResponseTest />
      </RouterContext.Provider>
    );

    await sleep(150);

    const responseTestBody = getByTestId("ResponseTestBody");
    const firstEmail = responseTestBody.querySelector(
      ".window-body__inbox"
    )?.firstElementChild;
    act(() => {
      fireEvent.mouseDown(firstEmail!);
      fireEvent.mouseUp(firstEmail!);
    });
    getByTestId("EmailView-8312903-2819381290-9031829032");
  });
  test("test response test integration with submission", async () => {
    const { getByTestId, getByText } = render(
      <RouterContext.Provider
        value={createMockRouter({
          query: { "assessment-event-id": "withSubmission" },
        })}
      >
        <ResponseTest />
      </RouterContext.Provider>
    );

    await sleep(100);

    const responseTestBody = getByTestId("ResponseTestBody");
    const firstEmail = responseTestBody.querySelector(
      ".window-body__inbox"
    )?.firstElementChild;
    act(() => {
      fireEvent.mouseDown(firstEmail!);
      fireEvent.mouseUp(firstEmail!);
    });

    await sleep(100);

    getByText("This is my subject");
    getByText("This is my response");
  });

  test("test response test integration reply fail", async () => {
    const { getByTestId, getByText } = render(
      <RouterContext.Provider value={createMockRouter({})}>
        <ResponseTest />
      </RouterContext.Provider>
    );

    await sleep(100);

    const responseTestBody = getByTestId("ResponseTestBody");
    const firstEmail = responseTestBody.querySelector(
      ".window-body__inbox"
    )?.firstElementChild;
    act(() => {
      fireEvent.mouseDown(firstEmail!);
      fireEvent.mouseUp(firstEmail!);
    });

    await sleep(100);

    const replyButton = getByText("Reply");

    act(() => {
      fireEvent.click(replyButton);
    });

    await screen.findByTestId("ReplySection");
    const submitButton = await screen.findByText("Send Reply");

    act(() => {
      fireEvent.click(submitButton!);
    });
  });
  test("test response test integration reply success", async () => {
    const { getByTestId, getByText } = render(
      <RouterContext.Provider
        value={createMockRouter({
          query: { "assessment-event-id": "withReply" },
        })}
      >
        <ResponseTest />
      </RouterContext.Provider>
    );

    await sleep(100);

    const responseTestBody = getByTestId("ResponseTestBody");
    const firstEmail = responseTestBody.querySelector(
      ".window-body__inbox"
    )?.firstElementChild;
    act(() => {
      fireEvent.mouseDown(firstEmail!);
      fireEvent.mouseUp(firstEmail!);
    });

    await sleep(100);

    const replyButton = getByText("Reply");

    act(() => {
      fireEvent.click(replyButton);
    });

    await screen.findByTestId("ReplySection");
    const submitButton = await screen.findByText("Send Reply");

    act(() => {
      fireEvent.click(submitButton!);
    });
  });
});
