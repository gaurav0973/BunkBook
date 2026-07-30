import HeroSection from "@/app/components/HeroSection";
import DemoSection from "@/app/components/DemoSection";
import SupportedResourcesSection from "@/app/components/SupportedResourcesSection";
import FeaturesSection from "@/app/components/FeaturesSection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />

      {/* Dashed divider */}
      <div className="max-w-3xl mx-auto border-t-2 border-dashed border-pencil/20" />

      <DemoSection />

      {/* Dashed divider */}
      <div className="max-w-3xl mx-auto border-t-2 border-dashed border-pencil/20" />

      <SupportedResourcesSection />

      {/* Dashed divider */}
      <div className="max-w-3xl mx-auto border-t-2 border-dashed border-pencil/20" />

      <FeaturesSection />
    </>
  );
}
