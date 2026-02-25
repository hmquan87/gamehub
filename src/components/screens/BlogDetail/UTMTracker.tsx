"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { analytics } from "@/utils/firebase";

export default function UTMTracker() {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!analytics) return;

        const params = Object.fromEntries(searchParams.entries());
        const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

        const utmParams = Object.keys(params)
            .filter((key) => utmKeys.includes(key))
            .reduce((obj, key) => {
                obj[key] = params[key];
                return obj;
            }, {} as Record<string, string>);

        if (Object.keys(utmParams).length > 0) {
            Object.entries(utmParams).forEach(([key, value]) => {
                if (value) sessionStorage.setItem(key, value);
            });
        }
    }, [searchParams]);

    return null;
}