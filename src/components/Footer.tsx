import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border">
      {/* Final CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Laiks atgūt {" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                savu dzīvi!
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Esmu sagatavojusi šo kursu, lai palīdzētu sievietēm kā tu atpazīt un pārvarēt vardarbīgas attiecības.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                variant="hero" 
                size="xl"
                className="group"
              >
                <Heart className="mr-2 group-hover:scale-110 transition-transform" />
                Iegādāties kursu
              </Button>
              <Button 
                variant="glass" 
                size="xl"
              >
                Sarunāt konsultāciju
              </Button>
            </div>
            <p className="text-sm text-muted-foreground pt-4">
              Vietu skaits ierobežots • Nākamais retrīts sāksies drīzumā • Pieejami maksājumu plāni
            </p>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EmpowerHer Revival
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dedicated to restoring strength and hope for women emerging from abusive relationships 
              through holistic healing and transformative experiences.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Sazinies</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@empowerherrevival.com">hello@nosaukums.com</a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                <a href="tel:+34123456789">+371 29511111</a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Mallorca, Spain</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Svar</h4>
            <div className="space-y-2 text-sm">
              <div>
                <a href="#program" className="text-muted-foreground hover:text-foreground transition-colors">
                  Program Overview
                </a>
              </div>
              <div>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy & Safety
                </a>
              </div>
              <div>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQs
                </a>
              </div>
              <div>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Crisis Resources
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 EmpowerHer Revival. All rights reserved. • Your safety and privacy are our priority.</p>
        </div>
      </div>
    </footer>
  );
};
