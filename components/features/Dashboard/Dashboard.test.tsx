import React from "react";
import Dashboard from "."
import { fireEvent, render } from "@testing-library/react"


describe("Dashboard test suite", () => {    
    test("testing render dashboard", () => {
        const { getByTestId } = render(<Dashboard />);
        const screenEl = getByTestId("MainScreen");
        const taskbarEl = getByTestId("MainTaskbar");
    
        expect(screenEl).toHaveAttribute("class", "screen")
        expect(taskbarEl).toHaveAttribute("class", "taskbar")
    })
    test("testing open app", () => {
        const { getByTestId } = render(<Dashboard />);
        const windowContainer = getByTestId("FullscreenBounds");
        const taskbarEl = getByTestId("MainTaskbar");
        
        fireEvent.mouseDown(taskbarEl.firstElementChild?.firstElementChild!);
        fireEvent.mouseUp(taskbarEl.firstElementChild?.firstElementChild!);

        expect(windowContainer.children.length).toBeGreaterThan(0);
    })

    test("testing minimize app", async () => {
        const { getByTestId } = render(<Dashboard />);
        const windowContainer = getByTestId("FullscreenBounds");
        const taskbarEl = getByTestId("MainTaskbar");
        
        fireEvent.mouseDown(taskbarEl.firstElementChild?.firstElementChild!);
        fireEvent.mouseUp(taskbarEl.firstElementChild?.firstElementChild!);

        expect(windowContainer.children.length).toBeGreaterThan(0);

        const windowHead = getByTestId("window-head");
        const windowMinimizeBtn = windowHead.querySelector(".minimize")

        fireEvent.mouseDown(windowMinimizeBtn!);
        fireEvent.mouseUp(windowMinimizeBtn!);

        // wait for animation
        await new Promise((resolve) => setTimeout(resolve, 500))

        expect(windowContainer.children.length).toBe(1);
    })

    test("testing close app", async () => {
        const { getByTestId } = render(<Dashboard />);
        const windowContainer = getByTestId("FullscreenBounds");
        const taskbarEl = getByTestId("MainTaskbar");
        
        fireEvent.mouseDown(taskbarEl.firstElementChild?.firstElementChild!);
        fireEvent.mouseUp(taskbarEl.firstElementChild?.firstElementChild!);

        expect(windowContainer.children.length).toBeGreaterThan(0);

        const windowHead = getByTestId("window-head");
        const windowCloseBtn = windowHead.querySelector(".exit")

        fireEvent.mouseDown(windowCloseBtn!);
        fireEvent.mouseUp(windowCloseBtn!);

        // wait for animation
        await new Promise((resolve) => setTimeout(resolve, 500))

        expect(windowContainer.children.length).toBe(0);
    })
})