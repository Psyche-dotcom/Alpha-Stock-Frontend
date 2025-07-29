"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface FreePlanFloaterProps {
  isSubActive: boolean;
  freePlanEndDate: string; // Assuming this is a string in a format like 'YYYY-MM-DD' or ISO string
}

const FreePlanFloater: React.FC<FreePlanFloaterProps> = ({ isSubActive, freePlanEndDate }) => {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const floaterRef = useRef<HTMLDivElement>(null);

  // Calculate days left
  useEffect(() => {
    if (!isSubActive && freePlanEndDate) {
      const endDate = new Date(freePlanEndDate);
      const today = new Date();
      // Set hours, minutes, seconds, milliseconds to 0 for accurate day difference
      endDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      const timeDiff = endDate.getTime() - today.getTime();
      const calculatedDaysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setDaysLeft(calculatedDaysLeft);
      console.log("FreePlanFloater: Calculated days left:", calculatedDaysLeft); // Debugging
    } else {
      setDaysLeft(null); // Hide if subscribed or no end date
      console.log("FreePlanFloater: Not showing floater. isSubActive:", isSubActive, "freePlanEndDate:", freePlanEndDate); // Debugging
    }
  }, [isSubActive, freePlanEndDate]);

  // Initialize position on mount (top right, under assumed navbar height)
  useEffect(() => {
    if (floaterRef.current) {
      const floaterWidth = floaterRef.current.offsetWidth;
      // Adjusted initial position: more aggressive top-right placement
      // You might need to fine-tune these 'top' and 'right' values based on your actual navbar height and page layout
      const initialX = window.innerWidth - floaterWidth - 30; // 30px from right edge
      const initialY = 90; // 90px from top, assuming a navbar height
      setPosition({ x: initialX, y: initialY });
      console.log("FreePlanFloater: Initial position set to", { x: initialX, y: initialY }); // Debugging
    }
  }, []);

  // Handle mouse down to start dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (floaterRef.current) {
      setIsDragging(true);
      offset.current = {
        x: e.clientX - floaterRef.current.getBoundingClientRect().left,
        y: e.clientY - floaterRef.current.getBoundingClientRect().top,
      };
      floaterRef.current.style.cursor = 'grabbing'; // Change cursor to grabbing
      console.log("FreePlanFloater: Dragging started."); // Debugging
    }
  }, []);

  // Handle mouse move to update position
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    // Calculate new position, clamping to window boundaries
    const newX = Math.max(0, Math.min(e.clientX - offset.current.x, window.innerWidth - (floaterRef.current?.offsetWidth || 0)));
    const newY = Math.max(0, Math.min(e.clientY - offset.current.y, window.innerHeight - (floaterRef.current?.offsetHeight || 0)));

    setPosition({ x: newX, y: newY });
  }, [isDragging]);

  // Handle mouse up to stop dragging
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (floaterRef.current) {
      floaterRef.current.style.cursor = 'grab'; // Change cursor back to grab
      console.log("FreePlanFloater: Dragging stopped."); // Debugging
    }
  }, []);

  // Add and remove global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Do not render if subscribed or no days left
  if (isSubActive || daysLeft === null || daysLeft <= 0) {
    return null;
  }

  return (
    <div
      ref={floaterRef}
      onMouseDown={handleMouseDown}
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        zIndex: 1000, // Ensure it's above most content
        cursor: isDragging ? 'grabbing' : 'grab', // Change cursor dynamically
        touchAction: 'none', // Prevent default touch actions like scrolling
      }}
      className="bg-[#351F05] text-white rounded-xl px-4 py-2 shadow-lg flex items-center justify-center text-sm font-semibold whitespace-nowrap"
    >
      {`${daysLeft} day${daysLeft === 1 ? '' : 's'} left of Free Plan`}
    </div>
  );
};

export default FreePlanFloater;
