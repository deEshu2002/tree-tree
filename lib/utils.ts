import { useState, useEffect } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: undefined | number;
    height: undefined | number;
    isSmall: undefined | boolean;
    isClamp: undefined | boolean;
  }>({
    width: undefined,
    height: undefined,
    isSmall: undefined,
    isClamp: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isSmall: window.innerWidth <= 640,
        isClamp: window.innerWidth >= 640 && window.innerWidth <= 1066,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
