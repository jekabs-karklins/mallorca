import { Footer } from "@/components/Footer";
import Promo from "@/components/Promo";
import { TopBar } from "@/components/TopBar";

const Index = () => {
  return (
    <main className="min-h-screen">
        <TopBar user="" />
      {/* <VideoSection />
      <ProgramOverview />
      <MallorcaSection /> */}
      <Promo />
      <Footer />
    </main>
  );
};

export default Index;
