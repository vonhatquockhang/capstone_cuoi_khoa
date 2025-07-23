import BackToTopButton from "@/components/common/BackToTopButton";
import ExploreCategories from "@/components/home/ExploreCategories";
import FeatureSection from "@/components/home/FeatureSection";
import FiverrGuides from "@/components/home/FiverrGuides";
import HeroSection from "@/components/home/HeroSection";
import LogoMakerBanner from "@/components/home/LogoMakerBanner";
import PopularServices from "@/components/home/PopularServices";
import Testimonials from "@/components/home/Testimonials";
import React from "react";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PopularServices />
      <Testimonials />
      <FeatureSection />
      <LogoMakerBanner />
      <FiverrGuides />
      <ExploreCategories />
      <BackToTopButton />
    </main>
  );
}
