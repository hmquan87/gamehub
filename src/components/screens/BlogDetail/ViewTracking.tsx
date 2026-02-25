"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/utils/firebase";

export default function AnalyticsProvider() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!analytics) return;

        const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
        const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
        const storedUtmParams = utmKeys.reduce((obj, key) => {
            const value = sessionStorage.getItem(key);
            if (value) {
                obj[key] = value;
            }
            return obj;
        }, {} as Record<string, string>);
        logEvent(analytics, "page_view", {
            page_path: url,
            page_location: window.location.href,
            page_title: document.title,
            ...storedUtmParams,
        });
    }, [pathname, searchParams]);

    return null;
}