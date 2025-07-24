"use client"; // This component needs to be a client component

import Image from "next/image";
import { usePathname } from "next/navigation"; // Still imported but not used in the simplified version
import React from "react";

const ImageBackground: React.FC = () => {
  // If you want the image to only show on specific paths,
  // you can reintroduce usePathname and conditional rendering here.
  // For now, assuming it's a static background image.

  return (
    <Image
      src={"/assets/images/globe.jpg"}
      alt="background image"
      fill // Makes the image fill its parent
      className="object-cover z-0 opacity-50"
    />
  );
};

export default ImageBackground;