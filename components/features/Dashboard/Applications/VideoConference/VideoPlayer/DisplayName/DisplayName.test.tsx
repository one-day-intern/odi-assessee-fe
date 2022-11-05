import React from "react";
import DisplayName from "./DisplayName";
import { render } from "@testing-library/react";

describe("Display Name component suite", () => {
    test("testing render component", () => {
        const name = "Rashad Aziz"
        const { getByTestId } = render(<DisplayName name={name} />);
        const container = getByTestId(`DisplayName-${name}`);
        expect(container.innerHTML).toBe(name)
    })
})