import React from "react";
import Inbox from "./Inbox";
import { render } from "@testing-library/react";

describe("Inbox component test suite", () => {
  test("test render component", () => {
    render(
      <Inbox
        emails={[
          {
            id: "email-1",
            subject: "test",
            sender: "testing",
            body: "test",
            receivedOn: new Date(Date.now()),
          },
        ]}
        currentPage={0}
        emailsPerPage={20}
        filter={""}
        openEmail={(email) => {}}
      />
    );
  });
});
