"use client";

import { Size } from "@/constant/types";
import { useCallback, useEffect, useMemo, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({});

  const isVertical = useMemo(() => {
    if (!windowSize?.width || !windowSize?.height) return;
    return windowSize.width < windowSize.height;
  }, [windowSize?.height, windowSize?.width]);

  const onResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    // Run when on mount
    onResize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);

  return { ...windowSize, isVertical };
};

export default useWindowSize;
