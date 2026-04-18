import HeroSection from "@/components/home/HeroSection";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import PlatformIntro from "@/components/home/PlatformIntro";
import SojourStories from "@/components/home/SojourStories";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedDestinations />
      <FeaturedProperties />
      <PlatformIntro />
      <SojourStories />
      <CTASection />
    </>
  );
}
