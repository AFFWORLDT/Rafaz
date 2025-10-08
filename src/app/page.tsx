import HeroSection from "@/src/view/landing/hero-section";
import Feature from "@/src/view/landing/feature";
import Communities from "@/src/view/landing/Communities";
import Property from "@/src/view/landing/property";
import { InsightsInspiration } from "@/src/view/landing/blog";
import { CallToAction } from "@/src/view/landing/call-to-action";
import PartnersSection from "../view/landing/PartnersSection";
import Solutions from "../view/landing/solutions";
import GoogleMapsSection from "@/src/components/common/GoogleMapsSection";

export default function Home() {
  return (
    <div className="bg-[#fff]">
      <HeroSection />
      <PartnersSection />
      <Solutions/>
      <GoogleMapsSection />
      <Feature />
      <Communities />
      <Property />
      <InsightsInspiration />
      <CallToAction />
    </div>
  );
}
