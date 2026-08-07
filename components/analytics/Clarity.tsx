"use client";

import Script from "next/script";

/**
 * Microsoft Clarity — visitor analytics and anonymised session replay.
 *
 * The project ID is NEXT_PUBLIC_ on purpose: analytics scripts run in the
 * browser, so the ID is public by design (it appears in the page source of
 * every site using Clarity). It is an identifier, not a secret — unlike
 * our webhook URLs and API keys, which stay server-side.
 *
 * Skipped in development so local testing never pollutes real data.
 */
export function Clarity() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_ID;

  if (!projectId || process.env.NODE_ENV !== "production") return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${projectId}");`}
    </Script>
  );
}
