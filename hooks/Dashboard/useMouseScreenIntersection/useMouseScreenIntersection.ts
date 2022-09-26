import React, { useState, useEffect } from "react";

type Intersections = "right" | "left" | "top" | "bottom";

export default () => {
  const [intersecting, setIntersecting] = useState<Intersections[]>([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number | null, y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const mouseObserverEnd = () => {
      setIntersecting([]);
      setMouseDown(false);
      setMousePos({ x: null, y: null });
    };

    const mouseObserver = (e: MouseEvent) => {
      if (mouseDown) {
        const hits: Intersections[] = [];
        if (e.clientX >= innerWidth) {
          hits.push("right");
        }
        if (e.clientX <= 0) {
          hits.push("left");
        }
        if (e.clientY >= innerHeight) {
          hits.push("bottom");
        }
        if (e.clientY <= 0) {
          hits.push("top");
        }
        setIntersecting(hits);
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    const mouseDownObserver = (e: MouseEvent) => {
      setMouseDown(true);
    };

    addEventListener("mousedown", mouseDownObserver);
    addEventListener("mousemove", mouseObserver);
    addEventListener("mouseup", mouseObserverEnd);

    return () => {
      removeEventListener("mousedown", mouseDownObserver);
      removeEventListener("mousemove", mouseObserver);
      removeEventListener("mouseup", mouseObserverEnd);
    };
  }, [setIntersecting, setMouseDown, mouseDown]);

  return { intersecting, mousePos, mouseDown };
};
