import type { MetadataRoute } from "next";

/**
 * This is currently a portfolio / concept build, so search engines are
 * blocked to avoid it being indexed as a real storefront.
 *
 * WHEN GOING LIVE FOR REAL: change `rule` to
 *   { userAgent: "*", allow: "/", disallow: "/wishlist" }
 * and re-enable the sitemap line below.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
