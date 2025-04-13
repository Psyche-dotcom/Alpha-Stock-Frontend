"use client";

import { useEffect, useState } from "react";

const useMediaSize = (breakpoint: number) => {
  const [isGreaterThan, setIsGreaterThan] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsGreaterThan(window.innerWidth > breakpoint);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  return isGreaterThan;
};

export default useMediaSize;
