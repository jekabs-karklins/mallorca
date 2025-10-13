import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export const VideoSection = () => {
  return (
    <section id="video-section" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">
              Tavs ceļojums uz {" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                atveseļošanos sākas šeit.
              </span>

            </h2>
          </div>

          {/* Video Placeholder */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-[var(--shadow-strong)] hover:shadow-[var(--shadow-strong)] hover:scale-[1.02] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/80 flex items-center justify-center mx-auto cursor-pointer hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-primary-foreground ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-color-accent-foreground">
                  Video: Transform Your Life
                </p>
                <p className="text-sm text-muted-foreground">
                  [Add your video URL to embed here]
                </p>
              </div>
            </div>
          </div>

          {/* CTA Below Video */}
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-2xl font-semibold">Gatava pieteikties kursam?</p>
              <p className="text-muted-foreground">
                Tev būs tūlītēja piekļuve pilnam pašvadītajam video kursam, un varēsi apgūt pārbaudītus rīkus 30 dienas savā tempā.

              </p>


            </div>

            <Button
              size="xl"
              className="group"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            >
              <ShoppingCart className="mr-2 group-hover:scale-110 transition-transform" />
              Gatava uzsākt pārmaiņu ceļu?
            </Button>

            <p className="text-sm text-muted-foreground">
              Ieguldījums sevī: sazinies ar mums, lai uzzinātu programmas detaļas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
