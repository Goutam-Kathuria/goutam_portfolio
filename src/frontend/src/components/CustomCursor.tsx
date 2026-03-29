import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR = [
  "[data-cursor-hover]",
  "a",
  "button",
  "[role='button']",
  "input",
  "textarea",
  "select",
  "label[for]",
  "summary",
].join(",");

type Point = {
  x: number;
  y: number;
};

function setCursorPosition(
  element: HTMLDivElement | null,
  point: Point,
  scale = 1,
) {
  if (!element) return;
  element.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) scale(${scale})`;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef<Point>({ x: 0, y: 0 });
  const ringRefPoint = useRef<Point>({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pointerQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const syncAvailability = () => {
      const active = pointerQuery.matches && !reducedMotionQuery.matches;
      setEnabled(active);
      setVisible(false);
      setHovering(false);
      setPressed(false);
      document.body.classList.toggle("custom-cursor-active", active);
    };

    syncAvailability();
    pointerQuery.addEventListener("change", syncAvailability);
    reducedMotionQuery.addEventListener("change", syncAvailability);

    return () => {
      pointerQuery.removeEventListener("change", syncAvailability);
      reducedMotionQuery.removeEventListener("change", syncAvailability);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const updateHoverState = (target: EventTarget | null) => {
      const element = target instanceof Element ? target.closest(HOVER_SELECTOR) : null;
      setHovering(Boolean(element));
    };

    const animateRing = () => {
      ringRefPoint.current.x += (targetRef.current.x - ringRefPoint.current.x) * 0.18;
      ringRefPoint.current.y += (targetRef.current.y - ringRefPoint.current.y) * 0.18;

      setCursorPosition(ringRef.current, ringRefPoint.current);
      frameRef.current = window.requestAnimationFrame(animateRing);
    };

    const handleMove = (event: MouseEvent) => {
      const point = { x: event.clientX, y: event.clientY };
      targetRef.current = point;
      setCursorPosition(dotRef.current, point, pressed ? 0.9 : 1);

      if (!visible) {
        ringRefPoint.current = point;
        setCursorPosition(ringRef.current, point);
        setVisible(true);
      }

      updateHoverState(event.target);
    };

    const handleEnter = () => setVisible(true);
    const handleLeave = () => {
      setVisible(false);
      setHovering(false);
      setPressed(false);
    };
    const handleDown = () => {
      setPressed(true);
      setCursorPosition(dotRef.current, targetRef.current, 0.9);
    };
    const handleUp = () => {
      setPressed(false);
      setCursorPosition(dotRef.current, targetRef.current, 1);
    };
    const handleOver = (event: MouseEvent) => updateHoverState(event.target);

    frameRef.current = window.requestAnimationFrame(animateRing);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseenter", handleEnter);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mouseover", handleOver);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseenter", handleEnter);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [enabled, pressed, visible]);

  if (!enabled) return null;

  const ringSize = pressed ? 28 : hovering ? 52 : 34;
  const dotOpacity = visible ? 1 : 0;
  const ringOpacity = visible ? 1 : 0;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full transition-[width,height,opacity,background-color,border-color,box-shadow] duration-200 ease-out"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          opacity: ringOpacity,
          border: "1px solid",
          borderColor: hovering
            ? "color-mix(in oklch, var(--secondary-color) 72%, white 12%)"
            : "color-mix(in oklch, var(--primary-color) 70%, white 8%)",
          background: hovering
            ? "color-mix(in oklch, var(--secondary-color) 18%, transparent)"
            : "color-mix(in oklch, var(--primary-color) 10%, transparent)",
          boxShadow: hovering
            ? "0 0 26px color-mix(in oklch, var(--secondary-color) 22%, transparent)"
            : "0 0 18px color-mix(in oklch, var(--primary-color) 16%, transparent)",
          backdropFilter: "blur(6px)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[101] h-2.5 w-2.5 rounded-full transition-[opacity,background-color,box-shadow,transform] duration-150 ease-out"
        style={{
          opacity: dotOpacity,
          backgroundColor: hovering
            ? "var(--secondary-color)"
            : "var(--primary-color)",
          boxShadow: hovering
            ? "0 0 18px color-mix(in oklch, var(--secondary-color) 45%, transparent)"
            : "0 0 16px color-mix(in oklch, var(--primary-color) 42%, transparent)",
        }}
      />
    </>
  );
}
