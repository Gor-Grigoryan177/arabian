import { Hero } from "@/components/home/Hero";
import { BrandTicker } from "@/components/home/BrandTicker";
import { BestSellers } from "@/components/home/BestSellers";
import { NewArrivals } from "@/components/home/NewArrivals";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FragranceQuiz } from "@/components/home/FragranceQuiz";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandTicker />
      <BestSellers />
      <NewArrivals />
      <CategoryGrid />
      <WhyChooseUs />
      <FragranceQuiz />
    </>
  );
}
