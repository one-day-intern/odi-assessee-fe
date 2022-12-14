import React from 'react';
import EmailPaginator from "./EmailPaginator";
import { fireEvent, render } from "@testing-library/react";

describe("EmailPaginator component test suite", () => {
  test("render email paginator with emails", () => {
    render(
      <EmailPaginator
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
          },
        ]}
        emailsPerPage={10}
        currentPage={0}
        filter={'hey'}
        setCurrentPage={() => {}}
      />
    );
  });
});
