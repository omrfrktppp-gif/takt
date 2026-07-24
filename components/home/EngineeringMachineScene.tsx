"use client";

import {
  LazyMotion,
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import {
  useRef,
  useSyncExternalStore,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import styles from "./EngineeringMachineScene.module.css";

const finePointerQuery =
  "(hover: hover) and (pointer: fine) and (min-width: 1024px)";

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
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { stiffness: 120, damping: 24 });
  const parallaxY = useSpring(pointerY, { stiffness: 120, damping: 24 });
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const blueprintOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.3],
    [1, 1, 0],
  );
  const explodedOpacity = useTransform(
    scrollYProgress,
    [0.14, 0.25, 0.61, 0.73],
    [0, 1, 1, 0],
  );
  const assembledOpacity = useTransform(
    scrollYProgress,
    [0.56, 0.72],
    [0, 1],
  );
  const outputsOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.84],
    [0, 1],
  );
  const outputsX = useTransform(scrollYProgress, [0.7, 0.86], [34, 0]);
  const baseY = useTransform(scrollYProgress, [0.26, 0.58], [52, 0]);
  const leftPostX = useTransform(scrollYProgress, [0.26, 0.58], [-56, 0]);
  const rightPostX = useTransform(scrollYProgress, [0.26, 0.58], [56, 0]);
  const headY = useTransform(scrollYProgress, [0.3, 0.62], [-58, 0]);
  const motorX = useTransform(scrollYProgress, [0.32, 0.65], [76, 0]);
  const toolY = useTransform(scrollYProgress, [0.34, 0.67], [-82, 0]);
  const stepOne = useTransform(scrollYProgress, [0, 0.2, 0.32], [1, 1, 0.35]);
  const stepTwo = useTransform(
    scrollYProgress,
    [0.16, 0.31, 0.49],
    [0.35, 1, 0.35],
  );
  const stepThree = useTransform(
    scrollYProgress,
    [0.4, 0.57, 0.72],
    [0.35, 1, 0.35],
  );
  const stepFour = useTransform(
    scrollYProgress,
    [0.64, 0.8, 1],
    [0.35, 1, 1],
  );

  const interactive = finePointer && shouldReduceMotion === false;
  const motionStyle: SceneMotionStyle = {
    "--blueprint-opacity": interactive ? blueprintOpacity : 0,
    "--exploded-opacity": interactive ? explodedOpacity : 0,
    "--assembled-opacity": interactive ? assembledOpacity : 1,
    "--outputs-opacity": interactive ? outputsOpacity : 1,
    "--outputs-x": interactive ? outputsX : 0,
    "--base-y": interactive ? baseY : 0,
    "--left-post-x": interactive ? leftPostX : 0,
    "--right-post-x": interactive ? rightPostX : 0,
    "--head-y": interactive ? headY : 0,
    "--motor-x": interactive ? motorX : 0,
    "--tool-y": interactive ? toolY : 0,
    "--step-one-opacity": interactive ? stepOne : 1,
    "--step-two-opacity": interactive ? stepTwo : 1,
    "--step-three-opacity": interactive ? stepThree : 1,
    "--step-four-opacity": interactive ? stepFour : 1,
    "--parallax-x": interactive ? parallaxX : 0,
    "--parallax-y": interactive ? parallaxY : 0,
  };

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (!interactive) return;
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
    const clamp = (value: number) => Math.max(-4, Math.min(4, value));
    pointerX.set(clamp(((event.clientX - bounds.left) / bounds.width - 0.5) * 8));
    pointerY.set(clamp(((event.clientY - bounds.top) / bounds.height - 0.5) * 8));
  }

  function cacheVisualBounds(event: ReactPointerEvent<HTMLElement>) {
    if (!interactive) return;
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
        onPointerEnter={cacheVisualBounds}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        {children}
      </m.section>
    </LazyMotion>
  );
}
