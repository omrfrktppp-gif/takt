/** Google Tag Manager — container ID (Vercel: NEXT_PUBLIC_GTM_ID) */
export const gtmConfig = {
  id: process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-PB25P347",
} as const;

export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") return;
  (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
    event: name,
    ...params,
  });
}
