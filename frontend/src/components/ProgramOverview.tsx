import { Heart, Users, Palmtree, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Heart,
    title: "Expert Psychological Support",
    description: "One-on-one therapy sessions with trauma-specialized psychologists who understand your journey and provide personalized healing strategies.",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Community Connection",
    description: "Guided group discussions where you'll share experiences, build lasting bonds, and discover strength through collective support.",
    color: "text-secondary"
  },
  {
    icon: Palmtree,
    title: "4-Week Mallorca Retreat",
    description: "Immerse yourself in a transformative escape on the serene Mediterranean coast, designed to rebuild self-esteem and unlock new possibilities.",
    color: "text-accent"
  },
  {
    icon: Sparkles,
    title: "Holistic Transformation",
    description: "A comprehensive approach combining therapy, mindfulness, wellness activities, and personal development to restore your whole self.",
    color: "text-primary"
  }
];

export const ProgramOverview = () => {
  return (
    <section id="program" className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold">
              A Complete Path to{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Recovery & Renewal
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our holistic program blends expert care, community support, and transformative experiences 
              to help you reclaim your strength and rediscover your worth.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-8 bg-gradient-to-br from-card to-card/50 border-border/50 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-strong)] hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-border/50 shadow-[var(--shadow-soft)]">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">Turning Pain Into Power</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                At EmpowerHer Revival, we believe every woman deserves to reclaim her story. 
                Our unique approach provides not just the psychological tools for healing, but creates 
                a nurturing environment where survivors share their journeys, rebuild confidence, and 
                step into a future defined by resilience and empowerment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
