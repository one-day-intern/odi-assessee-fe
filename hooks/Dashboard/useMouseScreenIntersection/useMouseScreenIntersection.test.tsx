import React from "react";
import useMouseScreenIntersection from "./useMouseScreenIntersection";
import { renderHook, act } from "@testing-library/react";


describe("useMouseScreenIntersection hook test suite", () => {
    beforeEach(() => {
        global.innerWidth = 1920;
        global.innerHeight = 1080;
    })

    test("testing use mouse screen intersection", () => {
        const { result } = renderHook(() => useMouseScreenIntersection());
        
        expect(result.current.intersecting.length).toBe(0);
        expect(result.current.mouseDown).toBe(false);
        expect(result.current.mousePos.x).toBe(null);
        expect(result.current.mousePos.y).toBe(null);
    })

    test("testing mouse down handler", () => {
        const { result } = renderHook(() => useMouseScreenIntersection());

        act(() => {
            global.dispatchEvent(new MouseEvent("mousedown", { clientX: 10, clientY: 10 }));
        })

        expect(result.current.mouseDown).toBe(true);
    })

    test("testing mouse up handler", () => {
        const { result } = renderHook(() => useMouseScreenIntersection());

        act(() => {
            global.dispatchEvent(new MouseEvent("mousedown", { clientX: 10, clientY: 10 }));
        })

        expect(result.current.mouseDown).toBe(true);

        act(() => {
            global.dispatchEvent(new MouseEvent("mouseup"));
        })

        expect(result.current.mouseDown).toBe(false);
    })

    test("testing mouse pos handler", () => {
        const { result } = renderHook(() => useMouseScreenIntersection());

        act(() => {
            global.dispatchEvent(new MouseEvent("mousedown", { clientX: 10, clientY: 10 }));
        })
        
        expect(result.current.mouseDown).toBe(true);

        act(() => {
            global.dispatchEvent(new MouseEvent("mousemove", { clientX: 10, clientY: 10 }));
        })

        expect(result.current.mouseDown).toBe(true);
        expect(result.current.mousePos.x).toBe(10);
        expect(result.current.mousePos.y).toBe(10);
    })

    test("testing mouse screen intersection right", () => {
        const { result } = renderHook(() => useMouseScreenIntersection());

        act(() => {
            global.dispatchEvent(new MouseEvent("mousedown"));
        })
        
        expect(result.current.mouseDown).toBe(true);

        act(() => {
            global.dispatchEvent(new MouseEvent("mousemove", { clientX: 1920, clientY: 10 }));
        })

        expect(result.current.mouseDown).toBe(true);
        expect(result.current.mousePos.x).toBe(1920);
        expect(result.current.mousePos.y).toBe(10);
        expect(result.current.intersecting).toContain("right");
    })

    test("testing mouse screen intersection left", () => {
        const { result } = renderHook(() => useMouseScreenIntersection());

        act(() => {
            global.dispatchEvent(new MouseEvent("mousedown"));
        })
        
        expect(result.current.mouseDown).toBe(true);

        act(() => {
            global.dispatchEvent(new MouseEvent("mousemove", { clientX: -1920, clientY: 10 }));
        })

        expect(result.current.mouseDown).toBe(true);
        expect(result.current.mousePos.x).toBe(-1920);
        expect(result.current.mousePos.y).toBe(10);
        expect(result.current.intersecting).toContain("left");
    })

    test("testing mouse screen intersection bottom", () => {
        const { result } = renderHook(() => useMouseScreenIntersection());

        act(() => {
            global.dispatchEvent(new MouseEvent("mousedown"));
        })
        
        expect(result.current.mouseDown).toBe(true);

        act(() => {
            global.dispatchEvent(new MouseEvent("mousemove", { clientX: 10, clientY: 1080 }));
        })

        expect(result.current.mouseDown).toBe(true);
        expect(result.current.mousePos.x).toBe(10);
        expect(result.current.mousePos.y).toBe(1080);
        expect(result.current.intersecting).toContain("bottom");
    })

    test("testing mouse screen intersection top", () => {
        const { result } = renderHook(() => useMouseScreenIntersection());

        act(() => {
            global.dispatchEvent(new MouseEvent("mousedown"));
        })
        
        expect(result.current.mouseDown).toBe(true);

        act(() => {
            global.dispatchEvent(new MouseEvent("mousemove", { clientX: 10, clientY: -1080 }));
        })

        expect(result.current.mouseDown).toBe(true);
        expect(result.current.mousePos.x).toBe(10);
        expect(result.current.mousePos.y).toBe(-1080);
        expect(result.current.intersecting).toContain("top");
    })

    test("testing mouse screen intersecting top left corner", () => {
        const { result } = renderHook(() => useMouseScreenIntersection());

        act(() => {
            global.dispatchEvent(new MouseEvent("mousedown"));
        })
        
        expect(result.current.mouseDown).toBe(true);

        act(() => {
            global.dispatchEvent(new MouseEvent("mousemove", { clientX: -1920, clientY: -1080 }));
        })

        expect(result.current.mouseDown).toBe(true);
        expect(result.current.mousePos.x).toBe(-1920);
        expect(result.current.mousePos.y).toBe(-1080);
        expect(result.current.intersecting).toContain("top");
        expect(result.current.intersecting).toContain("left");
    })

    test("testing mouse screen intersecting top right corner", () => {
        const { result } = renderHook(() => useMouseScreenIntersection());

        act(() => {
            global.dispatchEvent(new MouseEvent("mousedown"));
        })
        
        expect(result.current.mouseDown).toBe(true);

        act(() => {
            global.dispatchEvent(new MouseEvent("mousemove", { clientX: 1920, clientY: -1080 }));
        })

        expect(result.current.mouseDown).toBe(true);
        expect(result.current.mousePos.x).toBe(1920);
        expect(result.current.mousePos.y).toBe(-1080);
        expect(result.current.intersecting).toContain("top");
        expect(result.current.intersecting).toContain("right");
    })

    test("testing mouse screen intersecting bottom left corner", () => {
        const { result } = renderHook(() => useMouseScreenIntersection());

        act(() => {
            global.dispatchEvent(new MouseEvent("mousedown"));
        })
        
        expect(result.current.mouseDown).toBe(true);

        act(() => {
            global.dispatchEvent(new MouseEvent("mousemove", { clientX: -1920, clientY: 1080 }));
        })

        expect(result.current.mouseDown).toBe(true);
        expect(result.current.mousePos.x).toBe(-1920);
        expect(result.current.mousePos.y).toBe(1080);
        expect(result.current.intersecting).toContain("bottom");
        expect(result.current.intersecting).toContain("left");
    })

    test("testing mouse screen intersecting bottom right corner", () => {
        const { result } = renderHook(() => useMouseScreenIntersection());

        act(() => {
            global.dispatchEvent(new MouseEvent("mousedown"));
        })
        
        expect(result.current.mouseDown).toBe(true);

        act(() => {
            global.dispatchEvent(new MouseEvent("mousemove", { clientX: 1920, clientY: 1080 }));
        })

        expect(result.current.mouseDown).toBe(true);
        expect(result.current.mousePos.x).toBe(1920);
        expect(result.current.mousePos.y).toBe(1080);
        expect(result.current.intersecting).toContain("bottom");
        expect(result.current.intersecting).toContain("right");
    })
})