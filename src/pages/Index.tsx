import { Hero } from "@/components/Hero";
import { VideoSection } from "@/components/VideoSection";
import { ProgramOverview } from "@/components/ProgramOverview";
import { MallorcaSection } from "@/components/MallorcaSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <VideoSection />
      {/* <ProgramOverview /> */}
      {/* <MallorcaSection /> */}
      <Footer />
    </main>
  );
};

export default Index;
