import React from "react";
import ResponseTest from "./ResponseTest";
import { render } from "@testing-library/react";

describe("Response Test component test suite", () => {
    test("test render component", () => {
        render(<ResponseTest />)
    })
})