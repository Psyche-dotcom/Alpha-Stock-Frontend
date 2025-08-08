"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface FreeSubscriptionFloaterProps {
  freeSubscriptionEndDate: string; // Assuming a 'YYYY-MM-DD' or ISO string format
}

const FreeSubscriptionFloater: React.FC<FreeSubscriptionFloaterProps> = ({
  freeSubscriptionEndDate,
}) => {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const floaterRef = useRef<HTMLDivElement>(null);

  // Calculate days left
  useEffect(() => {
    if (freeSubscriptionEndDate) {
      const endDate = new Date(freeSubscriptionEndDate);
      const today = new Date();
      endDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      const timeDiff = endDate.getTime() - today.getTime();
      const calculatedDaysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      if (calculatedDaysLeft >= 0) {
        setDaysLeft(calculatedDaysLeft);
      } else {
        setDaysLeft(null);
      }
    } else {
      setDaysLeft(null);
    }
  }, [freeSubscriptionEndDate]);

  // Set the initial position after the component mounts and the ref is available
  useEffect(() => {
    if (floaterRef.current) {
      const floaterWidth = floaterRef.current.offsetWidth;
      const initialX = window.innerWidth - floaterWidth - 10; // 10px from right edge
      const initialY = window.innerHeight * 0.2; // 20% from the top
      setPosition({ x: initialX, y: initialY });
    }
  }, [floaterRef.current]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (floaterRef.current) {
      setIsDragging(true);
      offset.current = {
        x: e.clientX - floaterRef.current.getBoundingClientRect().left,
        y: e.clientY - floaterRef.current.getBoundingClientRect().top,
      };
      floaterRef.current.style.cursor = "grabbing";
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = Math.max(
        0,
        Math.min(
          e.clientX - offset.current.x,
          window.innerWidth - (floaterRef.current?.offsetWidth || 0)
        )
      );
      const newY = Math.max(
        0,
        Math.min(
          e.clientY - offset.current.y,
          window.innerHeight - (floaterRef.current?.offsetHeight || 0)
        )
      );
      setPosition({ x: newX, y: newY });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (floaterRef.current) {
      floaterRef.current.style.cursor = "grab";
    }
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (daysLeft === null) {
    return null;
  }

  return (
    <div
      ref={floaterRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        zIndex: 1000,
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
      }}
      className="bg-[#351F05] text-white rounded-xl px-6 py-2 shadow-lg flex items-center justify-center text-sm font-semibold whitespace-nowrap"
    >
      {`${daysLeft} day${daysLeft === 1 ? "" : "s"} left of Free Plan`}
    </div>
  );
};

export default FreeSubscriptionFloater;
