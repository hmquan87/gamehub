"use client";

import { useEffect, useState } from "react";

const useNow = (timeout = 15000, isSucceeded?: boolean, aimDate?: number) => {
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (interval && isSucceeded) {
      clearInterval(interval);
      return;
    }
    if (aimDate === undefined || Date.now() <= aimDate) {
      interval = setInterval(() => {
        setNow(Date.now());
      }, timeout);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timeout, isSucceeded, aimDate]);

  return now;
};

export default useNow;
