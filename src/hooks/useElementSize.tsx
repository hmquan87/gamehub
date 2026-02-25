import { Size } from "@/constant/types";
import { useCallback, useEffect, useState } from "react";

const useElementSize = (currentRef) => {
  const [size, setSize] = useState<Size>({});

  const onResize = useCallback(() => {
    if (!currentRef) return;
    setSize({
      width: currentRef.offsetWidth,
      height: currentRef.offsetHeight,
    });
  }, [currentRef]);

  useEffect(() => {
    if (!currentRef) return;

    let timeout: NodeJS.Timeout | null = null;
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      onResize();
    }, 250);

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [currentRef, onResize]);

  return size;
};

export default useElementSize;
