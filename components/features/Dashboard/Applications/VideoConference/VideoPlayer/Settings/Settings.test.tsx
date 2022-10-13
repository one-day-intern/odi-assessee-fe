import React from "react";
import Settings from "./Settings";
import { act, fireEvent, render } from "@testing-library/react";

describe("Settings component test suite", () => {
    test("testing render settings", () => {
        render(<Settings />)
    })
    test("test open settings modal", () => {
        const { getByTestId } = render(<Settings />);
        const button = getByTestId("VideoSettings");
        act(() => {
            fireEvent.mouseDown(button);
            fireEvent.mouseUp(button);
        })
        getByTestId("SettingsModal");
    })
})