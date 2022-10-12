import React from "react";
import VideoConferenceLanding from "./VideoConferenceLanding"
import { render } from "@testing-library/react"

describe("Video Conference Landing component test suite", () => {
    test("testing render component", () => {
        const { getByTestId } = render(<VideoConferenceLanding onEnterConference={() => {}} />);
        getByTestId("EnterConference");
    })
})
