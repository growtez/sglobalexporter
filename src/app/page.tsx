import HeroSection from "@/pages/HeroSection";
import TrustedWorldwide from "@/pages/TrustedWorldwide";
// import AboutUs from "@/pages/AboutUs";
import TeaCollection from "@/pages/TeaCollection";
// import WhyChooseUs from "@/pages/WhyChooseUs";
import ExportProcess from "@/pages/ExportProcess";
import GlobalPresence from "@/pages/GlobalPresence";
import Testimonials from "@/pages/Testimonials";
import FAQ from "@/pages/FAQ";
import CallToAction from "@/pages/CallToAction";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <TrustedWorldwide />
      {/* <AboutUs /> */}
      <TeaCollection />
      {/* <WhyChooseUs /> */}
      <ExportProcess />
      <GlobalPresence />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </main>
  );
}
