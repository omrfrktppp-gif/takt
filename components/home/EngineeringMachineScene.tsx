"use client";

import {
  LazyMotion,
  m,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import {
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import styles from "./EngineeringMachineScene.module.css";

const finePointerQuery =
  "(hover: hover) and (pointer: fine) and (min-width: 1024px)";
const desktopMotionQuery =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function subscribeToFinePointer(onStoreChange: () => void) {
  const query = window.matchMedia(finePointerQuery);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getFinePointerSnapshot() {
  return window.matchMedia(finePointerQuery).matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

function subscribeToDesktopMotion(onStoreChange: () => void) {
  const query = window.matchMedia(desktopMotionQuery);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getDesktopMotionSnapshot() {
  return window.matchMedia(desktopMotionQuery).matches;
}

function getDesktopMotionServerSnapshot() {
  return false;
}

function getSceneStep(progress: number) {
  if (progress < 0.24) return 0;
  if (progress < 0.49) return 1;
  if (progress < 0.74) return 2;
  return 3;
}

type SceneMotionStyle = MotionStyle &
  Record<`--${string}`, MotionValue<number> | number>;

export function EngineeringMachineScene({
  children,
}: {
  children: ReactNode;
}) {
  const sceneRef = useRef<HTMLElement>(null);
  const visualBoundsRef = useRef<DOMRect | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribeToFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  );
  const desktopMotion = useSyncExternalStore(
    subscribeToDesktopMotion,
    getDesktopMotionSnapshot,
    getDesktopMotionServerSnapshot,
  );
  const [activeStep, setActiveStep] = useState(3);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { stiffness: 120, damping: 24 });
  const parallaxY = useSpring(pointerY, { stiffness: 120, damping: 24 });
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const traceOffset = useTransform(scrollYProgress, [0, 0.2], [210, 0]);
  const blueprintOpacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.24],
    [1, 1, 0],
  );
  const explodedOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.22, 0.54, 0.64],
    [0, 1, 1, 0],
  );
  const assembledOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.68],
    [0, 1],
  );
  const outputsOpacity = useTransform(
    scrollYProgress,
    [0.69, 0.84],
    [0, 1],
  );
  const outputsX = useTransform(scrollYProgress, [0.69, 0.85], [34, 0]);
  const baseY = useTransform(scrollYProgress, [0.22, 0.56], [52, 0]);
  const leftPostX = useTransform(scrollYProgress, [0.22, 0.56], [-56, 0]);
  const rightPostX = useTransform(scrollYProgress, [0.22, 0.56], [56, 0]);
  const headY = useTransform(scrollYProgress, [0.26, 0.6], [-58, 0]);
  const motorX = useTransform(scrollYProgress, [0.28, 0.62], [76, 0]);
  const toolY = useTransform(scrollYProgress, [0.3, 0.64], [-82, 0]);
  const stepOne = useTransform(scrollYProgress, [0, 0.17, 0.3], [1, 1, 0.35]);
  const stepTwo = useTransform(
    scrollYProgress,
    [0.14, 0.34, 0.51],
    [0.35, 1, 0.35],
  );
  const stepThree = useTransform(
    scrollYProgress,
    [0.39, 0.59, 0.76],
    [0.35, 1, 0.35],
  );
  const stepFour = useTransform(
    scrollYProgress,
    [0.64, 0.82, 1],
    [0.35, 1, 1],
  );

  const scrollActive = desktopMotion && shouldReduceMotion === false;
  const parallaxActive = scrollActive && finePointer;

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setActiveStep(scrollActive ? getSceneStep(progress) : 3);
  });

  const motionStyle: SceneMotionStyle = {
    "--trace-offset": scrollActive ? traceOffset : 0,
    "--blueprint-opacity": scrollActive ? blueprintOpacity : 0,
    "--exploded-opacity": scrollActive ? explodedOpacity : 0,
    "--assembled-opacity": scrollActive ? assembledOpacity : 1,
    "--outputs-opacity": scrollActive ? outputsOpacity : 1,
    "--outputs-x": scrollActive ? outputsX : 0,
    "--base-y": scrollActive ? baseY : 0,
    "--left-post-x": scrollActive ? leftPostX : 0,
    "--right-post-x": scrollActive ? rightPostX : 0,
    "--head-y": scrollActive ? headY : 0,
    "--motor-x": scrollActive ? motorX : 0,
    "--tool-y": scrollActive ? toolY : 0,
    "--step-one-opacity": scrollActive ? stepOne : 1,
    "--step-two-opacity": scrollActive ? stepTwo : 1,
    "--step-three-opacity": scrollActive ? stepThree : 1,
    "--step-four-opacity": scrollActive ? stepFour : 1,
    "--parallax-x": parallaxActive ? parallaxX : 0,
    "--parallax-y": parallaxActive ? parallaxY : 0,
  };

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (!parallaxActive) return;
    const bounds = visualBoundsRef.current;
    if (!bounds) return;
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      resetPointer();
      return;
    }
    const clamp = (value: number) => Math.max(-6, Math.min(6, value));
    pointerX.set(clamp(((event.clientX - bounds.left) / bounds.width - 0.5) * 12));
    pointerY.set(clamp(((event.clientY - bounds.top) / bounds.height - 0.5) * 12));
  }

  function cacheVisualBounds(event: ReactPointerEvent<HTMLElement>) {
    if (!parallaxActive) return;
    const visual = event.currentTarget.querySelector<HTMLElement>(
      `.${styles.visual}`,
    );
    visualBoundsRef.current = visual?.getBoundingClientRect() ?? null;
  }

  function resetPointer() {
    visualBoundsRef.current = null;
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <LazyMotion
      features={() =>
        import("./motion-features").then((module) => module.default)
      }
    >
      <m.section
        ref={sceneRef}
        className={styles.scene}
        style={motionStyle}
        aria-labelledby="engineering-scene-title"
        data-scene-step={activeStep}
        onPointerEnter={cacheVisualBounds}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        {children}
      </m.section>
    </LazyMotion>
  );
}
