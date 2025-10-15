import { Button } from "./ui/button";
import { ArrowDown, ShoppingBag } from "lucide-react";
import { track } from "../lib/analytics";
import heroImage from "../assets/mallorca-hero.jpg";

export const Hero = () => {
  const purchaseCourse = () => {
    // Implement your purchase logic here, e.g., redirect to checkout
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
            Šajā sarunā saņemsi teorētisku bāzi zināšanām, kas ir vardarbība un tās esošās vai potenciālās izpausmes partnerattiecībās. Izpildot testu nonāksi tuvāk atbildei, vai tavās attiecībās ir reāli draudi vardarbībai. Dalīšos ar savu pieredzi, kas ļāva man saprast, ka esmu upuris, cik igu laiku tas var aizņemt, kā arī to, kas mani mudināja no šīs lomas atteikties. 
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="xl"
              onClick={() => {
                track("CTA Clicked", { location: "Hero", cta: "Watch Our Story" });
                purchaseCourse();
              }}
              className="group hover:bg-primary-glow  bg-primary  transition duration-500"
            >
              <ShoppingBag className="ml-2" />
              Iegādāties kursu
            </Button>
            <Button
              variant="glass"
              size="xl"
              onClick={() => {
                track("CTA Clicked", { location: "Hero", cta: "Learn More" });
                document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Par projektu
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div> */}
    </header>
  );
};
