import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arabian Nights ARM \u2014 Premium Arabic Perfumes",
    short_name: "Arabian Nights",
    description: "Authentic Arabic perfumes delivered across Armenia.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0907",
    theme_color: "#0a0907",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
