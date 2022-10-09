import React from "react";
import VideoConference from "./VideoConference";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Video conference component test suite", () => {
    test("test render video conference", () => {
        render(<VideoConference />)
    })
})