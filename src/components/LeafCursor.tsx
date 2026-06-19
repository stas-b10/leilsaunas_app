import { useEffect, useRef } from "react";

export default function LeafCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      cursor.style.setProperty("--cursor-x", `${e.clientX - 8}px`);
      cursor.style.setProperty("--cursor-y", `${e.clientY - 8}px`);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
        pointer-events-none 
        fixed 
        left-0 
        top-0 
        z-[9999] 
        h-4 
        w-4 
        bg-[#707F4F]
        will-change-transform
      "
      style={{
        transform: "translate3d(var(--cursor-x, -100px), var(--cursor-y, -100px), 0)",
        borderRadius: "100% 0% 100% 100% / 100% 0% 100% 100%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
      }}
    />
  );
}