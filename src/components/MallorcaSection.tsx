import { MapPin, Sun, Waves, Mountain } from "lucide-react";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/mallorca-hero.jpg";

const highlights = [
  {
    icon: Sun,
    title: "Serene Mediterranean Climate",
    description: "Bask in year-round sunshine and gentle sea breezes"
  },
  {
    icon: Waves,
    title: "Pristine Beaches",
    description: "Crystal-clear turquoise waters for reflection and renewal"
  },
  {
    icon: Mountain,
    title: "Majestic Landscapes",
    description: "Dramatic cliffs and lush valleys for soul-stirring walks"
  },
  {
    icon: MapPin,
    title: "Private Retreat Center",
    description: "Luxurious, safe sanctuary designed for your comfort"
  }
];

export const MallorcaSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Heal in Paradise:{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Mallorca Awaits
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience transformation in one of Europe's most breathtaking destinations, 
              where natural beauty meets purposeful healing.
            </p>
          </div>

          {/* Image & Highlights Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-strong)] hover:scale-[1.02] transition-transform duration-300">
              <img 
                src={heroImage} 
                alt="Beautiful Mallorca retreat location with turquoise Mediterranean waters and dramatic coastal cliffs"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Highlights */}
            <div className="space-y-6">
              {highlights.map((item, index) => (
                <Card 
                  key={index}
                  className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-[var(--shadow-medium)] hover:translate-x-2 transition-all duration-300"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* What to Expect */}
          <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-border/50">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-center">
                Your 4-Week Retreat Experience
              </h3>
              <div className="grid md:grid-cols-3 gap-8 pt-4">
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">Week 1-2</div>
                  <div className="font-semibold">Foundation & Connection</div>
                  <p className="text-sm text-muted-foreground">
                    Intensive therapy sessions, meet your support group, establish routines, 
                    and begin processing your journey in a safe environment.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-secondary">Week 3</div>
                  <div className="font-semibold">Growth & Discovery</div>
                  <p className="text-sm text-muted-foreground">
                    Deeper healing work, outdoor activities, creative workshops, 
                    and building confidence through supported challenges.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-accent">Week 4</div>
                  <div className="font-semibold">Integration & Future</div>
                  <p className="text-sm text-muted-foreground">
                    Create your post-retreat action plan, celebrate progress, 
                    and prepare to carry your newfound strength into your future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
