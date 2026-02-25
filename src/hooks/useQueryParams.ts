"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { parseURLSearchParams } from "@/utils";

const useQueryParams = () => {
  const searchParams = useSearchParams();

  const parsedQuery = useMemo(
    () => parseURLSearchParams(searchParams),
    [searchParams],
  );

  return parsedQuery;
};

export default useQueryParams;
