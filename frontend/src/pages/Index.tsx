import { Footer } from "@/components/Footer";
import { MallorcaSection } from "@/components/MallorcaSection";
import { ProgramOverview } from "@/components/ProgramOverview";
import Promo from "@/components/Promo";
import TopBar from "@/components/TopBar";
import { VideoSection } from "@/components/VideoSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <TopBar />
      <VideoSection />
      {/* <ProgramOverview />
      <MallorcaSection />
      <Promo /> */}
      <Footer />
    </main>
  );
};

export default Index;
