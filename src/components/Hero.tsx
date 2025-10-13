import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import { track } from "../lib/analytics";
import heroImage from "../assets/mallorca-hero.jpg";

export const Hero = () => {
  const scrollToVideo = () => {
    document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.5)' }}
        />
        <div className="absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
            NO SĀPĒM UZ {""}
            <span className="text-primary text-accent">SPĒKU</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
            Pašmācību kurss sievietēm, kas vēlas noskaidrot, vai viņu attiecībās ir emocionāla un/vai fiziska vardarbība. Praktiski vingrinājumi, skaidri signāli un reāli piemēri palīdzēs atpazīt manipulācijas, kontroli un personīgo robežu pārkāpumus.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="xl"
              onClick={() => {
                track("CTA Clicked", { location: "Hero", cta: "Watch Our Story" });
                scrollToVideo();
              }}
              className="group"
            >
              Noskaties mūsu stāstu
              <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button
              variant="glass"
              size="xl"
              onClick={() => {
                track("CTA Clicked", { location: "Hero", cta: "Learn More" });
                document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Uzzināt vairāk
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </header>
  );
};
