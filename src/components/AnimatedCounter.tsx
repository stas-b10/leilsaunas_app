import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
}

export default function AnimatedCounter({
  target,
  duration = 2000,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(1);
  const [started, setStarted] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );
      const value = Math.floor(1 + (target - 1) * progress);
      setCount(value);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return <div ref={ref}>{count}+</div>;
}