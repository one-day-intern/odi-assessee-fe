import React, { useEffect, useRef, useState } from "react";
import styles from "./Resizers.module.css";

interface Position {
  x: number | null;
  y: number | null
}

interface Dimensions extends Position {
  width: number | null;
  height: number | null;
}

interface Props extends React.PropsWithChildren {
  onResizeStart?: () => void;
  onResize?: (data: Dimensions) => void;
  onResizeEnd?: (data: Dimensions) => void;
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>;
  isResizing: boolean;
  parentRef: React.RefObject<HTMLDivElement>;
  minWidth: number;
  minHeight: number;
}

const Resizers: React.FC<Props> = ({
  onResizeStart,
  onResizeEnd,
  setIsResizing,
  isResizing,
  parentRef,
  minWidth,
  minHeight,
}) => {
  const [startMousePos, setStartMousePos] = useState<Position>({ x: null, y: null });
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const newDimensionRef = useRef<Dimensions>({
    width: null,
    height: null,
    x: null,
    y: null,
  });

  const handleResize = (side: string) => (e: React.MouseEvent) => {
    setIsResizing(true);
    setResizeDirection(side);
    setStartMousePos({ x: e.clientX, y: e.clientY });
    onResizeStart && onResizeStart();
  };

  const handleResizeEnd = (e: React.MouseEvent) => {
    setIsResizing(false);
    setResizeDirection(null);
    onResizeEnd && onResizeEnd(newDimensionRef.current);
  };

  useEffect(() => {
    const { width: parentWidth, height: parentHeight } =
      parentRef.current!.getBoundingClientRect();
    newDimensionRef.current.width = parentWidth;
    newDimensionRef.current.height = parentHeight;

    const style = window.getComputedStyle(parentRef.current!);
    const matrix = new window.WebKitCSSMatrix(style.transform);
    const parentX = matrix.m41;
    const parentY = matrix.m42;

    newDimensionRef.current.x = parentX;
    newDimensionRef.current.y = parentY;

    const handleResizing = (e: MouseEvent) => {
      if (isResizing) {
        const deltaX = startMousePos.x! - e.clientX;
        const deltaY = startMousePos.y! - e.clientY;
        if (
          resizeDirection === "east" ||
          resizeDirection === "north-east" ||
          resizeDirection === "south-east"
        ) {
          if (!(parentWidth - deltaX <= minWidth)) {
            parentRef.current!.style.width = `${parentWidth - deltaX}px`;
            newDimensionRef.current.width = parentWidth - deltaX;
          }
        }
        if (
          resizeDirection === "west" ||
          resizeDirection === "north-west" ||
          resizeDirection === "south-west"
        ) {
          if (!(parentWidth + deltaX <= minWidth)) {
            parentRef.current!.style.transform = `translate(${
              parentX - deltaX
            }px, ${newDimensionRef.current.y}px)`;
            parentRef.current!.style.width = `${parentWidth + deltaX}px`;
            newDimensionRef.current.width = parentWidth + deltaX;
            newDimensionRef.current.x = parentX - deltaX;
          }
        }
        if (
          resizeDirection === "north" ||
          resizeDirection === "north-east" ||
          resizeDirection === "north-west"
        ) {
          if (!(parentHeight + deltaY <= minHeight)) {
            parentRef.current!.style.transform = `translate(${
              newDimensionRef.current.x
            }px, ${parentY - deltaY}px)`;
            parentRef.current!.style.height = `${parentHeight + deltaY}px`;
            newDimensionRef.current.height = parentHeight + deltaY;
            newDimensionRef.current.y = parentY - deltaY;
          }
        }
        if (
          resizeDirection === "south" ||
          resizeDirection === "south-east" ||
          resizeDirection === "south-west"
        ) {
          if (!(parentHeight - deltaY <= minHeight)) {
            parentRef.current!.style.height = `${parentHeight - deltaY}px`;
            newDimensionRef.current.height = parentHeight - deltaY;
          }
        }
      }
    };

    const handleResizingEnd = () => {
      setResizeDirection(null);
      setIsResizing(false);
    };

    window.addEventListener("mouseup", handleResizingEnd);
    window.addEventListener("mousemove", handleResizing);
    
    return () => {
      window.removeEventListener("mousemove", handleResizing);
      window.removeEventListener("mouseup", handleResizingEnd);
    };

    // eslint-disable-next-line
  }, [startMousePos, resizeDirection, isResizing, parentRef]);

  return (
    <>
      <div
        onMouseDown={handleResize("north")}
        onMouseUp={handleResizeEnd}
        className={`${styles.resizer} ${styles["top-and-bottom"]} ${styles.north}`}
      />
      <div
        onMouseDown={handleResize("south")}
        onMouseUp={handleResizeEnd}
        className={`${styles.resizer} ${styles["top-and-bottom"]} ${styles.south}`}
      />
      <div
        onMouseDown={handleResize("east")}
        onMouseUp={handleResizeEnd}
        className={`${styles.resizer} ${styles["left-and-right"]} ${styles.east}`}
      />
      <div
        onMouseDown={handleResize("west")}
        onMouseUp={handleResizeEnd}
        className={`${styles.resizer} ${styles["left-and-right"]} ${styles.west}`}
      />
      <div
        onMouseDown={handleResize("north-east")}
        onMouseUp={handleResizeEnd}
        className={`${styles.resizer} ${styles.corners} ${styles.ne}`}
      />
      <div
        onMouseDown={handleResize("south-east")}
        onMouseUp={handleResizeEnd}
        className={`${styles.resizer} ${styles.corners} ${styles.se}`}
      />
      <div
        onMouseDown={handleResize("south-west")}
        onMouseUp={handleResizeEnd}
        className={`${styles.resizer} ${styles.corners} ${styles.sw}`}
      />
      <div
        onMouseDown={handleResize("north-west")}
        onMouseUp={handleResizeEnd}
        className={`${styles.resizer} ${styles.corners} ${styles.nw}`}
      />
    </>
  );
};

export default React.memo(Resizers);
