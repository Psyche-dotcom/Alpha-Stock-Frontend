"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const ImageBackground: React.FC = () => {
  const pathname = usePathname();

  // Determine if the image should be shown based on the pathname
  const showImage = pathname === "/user";

  // If the image shouldn't be shown, return null
  if (!showImage) {
    return null;
  }

  // Otherwise, render the Image component
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