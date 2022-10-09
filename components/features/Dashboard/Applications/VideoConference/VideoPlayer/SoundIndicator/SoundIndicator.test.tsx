import React from "react";
import SoundIndicator from "./SoundIndicator";
import { render } from "@testing-library/react";

describe("Sound indicator component test suite", () => {
    test("testing render sound indicator component", () => {
        render(<SoundIndicator micDisabled={true} audioLevel={0} />)
    })
    test("testing sound indicator mic enabled", () => {
        render(<SoundIndicator micDisabled={false} audioLevel={0} />)
    })
    test("testing sound indicator mic enabled with audio", () => {
        render(<SoundIndicator micDisabled={false} audioLevel={1} />)
    })
})
