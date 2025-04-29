// components/MouseMoveEffect.tsx

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MouseMoveEffectProps {
  color?: string;
  size?: number;
  opacity?: number;
}

export const MouseMoveEffect = ({
  color = "#3b82f6", // Tailwind blue-500
  size = 100,
  opacity = 0.2,
}: MouseMoveEffectProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveHandler);

    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  return (
    <motion.div
      //class="pointer-events-none fixed top-0 left-0 z-50"
      animate={{
        x: position.x - size / 2,
        y: position.y - size / 2,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        opacity: opacity,
        filter: "blur(20px)",
      }}
    />
  );
};
