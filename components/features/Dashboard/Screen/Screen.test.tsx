import React from "react";
import Screen from "./Screen";
import { render } from "@testing-library/react";

describe("Dashboard Screen component test suite", () => {
    test("testing screen render", () => {
        const { getByTestId } = render(<Screen />)
        getByTestId("MainScreen");
    })
})
