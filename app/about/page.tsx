import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutStory } from "@/components/about/AboutStory";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind Arabian Nights ARM \u2014 bringing authentic Arabic perfumery to Armenia.",
};

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <AboutStats />
      <AboutStory />
    </div>
  );
}
