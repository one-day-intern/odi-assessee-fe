import React from "react";
import { render } from "@testing-library/react";
import Assignment from "./Assignment";

describe("Assignment component test suite", () => {
    test("testing render component", () => {
        render(<Assignment />)
    })
})