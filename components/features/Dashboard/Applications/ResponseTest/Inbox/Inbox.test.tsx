import React from "react";
import Inbox from "./Inbox";
import { render } from "@testing-library/react";

describe("Inbox component test suite", () => {
  test("test render component", () => {
    render(
      <Inbox
        emails={[
          {
            id: "8312903-2819381290-9031829032",
            additional_info: {
              sender: "mock@server.com",
              subject: "hey this is a mocked response",
              prompt: "hello this is a mocked response body",
            },
            released_time: "2022-12-05T16:40:00",
            receivedOn: new Date("2022-12-05T16:40:00"),
          }
        ]}
        currentPage={0}
        emailsPerPage={20}
        filter={""}
        openEmail={(email) => {}}
      />
    );
  });
});
