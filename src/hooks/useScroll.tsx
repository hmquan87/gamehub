"use client";

import { useCallback, useEffect, useState } from "react";
import useEventListener from "./useEventListener";

const useScroll = () => {
  const [value, setValue] = useState<number>(0);

  const onScroll = useCallback(() => {
    setValue(window.scrollY);
  }, []);

  useEffect(() => {
    setValue(window.scrollY);
  }, []);

  useEventListener("scroll", onScroll);

  return value;
};

export default useScroll;
