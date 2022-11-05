import React from "react";
import { render } from "@testing-library/react";
import Assignment from "./Assignment";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../../../../mocks/createMockRouter";

describe("Assignment component test suite", () => {
  test("testing render component", async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Assignment
          setCurrentActiveAssignment={() => {}}
          assignment={{
            id: "id",
            type: "assignment",
            name: "Your assignment",
            description: "do this assessment",
            additional_info: {},
            released_time: "22:00:00",
            end_working_time: "22:00:00",
          }}
        />
      </RouterContext.Provider>
    );

    await new Promise(resolve => setTimeout(resolve, 500));
  });
});
