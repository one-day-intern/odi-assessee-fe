import React from "react";
import EmailView from "./EmailView";
import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../../../mocks/createMockRouter";

describe("EmailView component test suite", () => {
  test("test render component", () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <EmailView
          email={{
            id: "8312903-2819381290-9031829032",
            additional_info: {
              sender: "mock@server.com",
              subject: "hey this is a mocked response",
              prompt: "hello this is a mocked response body",
            },
            released_time: "2022-12-05T16:40:00",
            receivedOn: null,
          }}
          onCloseView={() => {}}
        />
      </RouterContext.Provider>
    );
  });
  it("test show reply section", async () => {
    const { getByText, getByTestId } = render(
      <RouterContext.Provider value={createMockRouter({})}>
        <EmailView
          email={{
            id: "8312903-2819381290-9031829032",
            additional_info: {
              sender: "mock@server.com",
              subject: "hey this is a mocked response",
              prompt: "hello this is a mocked response body",
            },
            released_time: "2022-12-05T16:40:00",
            receivedOn: null,
          }}
          onCloseView={() => {}}
        />
      </RouterContext.Provider>
    );
  });
});
