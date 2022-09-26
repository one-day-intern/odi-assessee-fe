import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { EyeClosed } from "./EyeClosed";

const mockedFunction = jest.fn(() => "Frontend Team: Rashad & Alex, Backend Team: Jo, Arya & Indi")

describe("Eye Closed Test", () => {
    beforeEach(() => {
        render(<EyeClosed height={100} width={100} onClick={ mockedFunction }/>)
    });

    it("Eye closed svg renders properly", () => {
        const eye = screen.getByTestId("eye-closed")
        expect(eye).toBeInTheDocument();
    })

    it("Eye closed handle events on click", () => {
        const eye = screen.getByTestId("eye-closed")
        fireEvent.click(eye)
        expect(mockedFunction).toHaveBeenCalledTimes(1);
    })
})