'use client';

import { useEffect, useRef } from 'react';
import './StarLayer.css';

type StarLayerProps = {
  count: number;
  size: number;
};

const generateBoxShadows = (
  width: number,
  height: number,
  count: number,
  opacityMin = 0.3,
  opacityMax = 1
): string => {
  const shadows: string[] = [];

  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const opacity = opacityMin + Math.random() * (opacityMax - opacityMin);

    shadows.push(`${x}px ${y}px rgba(255,255,255,${opacity})`);
  }

  return shadows.join(',');
};

const StarLayer = ({ count, size }: StarLayerProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;

    const update = () => {
      if (!el || !el.parentElement) return;

      const { width, height } = el.parentElement.getBoundingClientRect();
      el.style.boxShadow = generateBoxShadows(width, height, count);
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    if (el?.parentElement) {
      resizeObserver.observe(el.parentElement);
    }

    return () => resizeObserver.disconnect();
  }, [count]);

  return (
    <div
      ref={ref}
      className="star-layer"
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default StarLayer;