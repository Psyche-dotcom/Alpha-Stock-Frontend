"use client"; // This component needs to be a client component

import { usePathname } from "next/navigation";
import React from "react";

const VideoBackground: React.FC = () => {
  const pathname = usePathname();

  // Show video only if the pathname is exactly "/user"
  const showVideo = pathname === "/user";

  if (!showVideo) {
    return null; // Don't render anything if the video shouldn't be shown
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
    >
      <source src="/assets/wave-bg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;