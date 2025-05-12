"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { pageview } from "@/lib/gtag";

const GA_TRACKING_ID = "G-DY9K928ZNX";

const GoogleAnalytics = () => {
  const pathname = usePathname(); // Get current path safely

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      const url = `${pathname}`
      pageview(url);
    }
  }, [pathname]);

  return (
    <>
      {/* Load Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
