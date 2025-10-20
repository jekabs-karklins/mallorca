import { Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border">
      {/* Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Nuvia
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
 Veltīts spēka un cerības atjaunošanai sievietēm, kuras izkļūst no vardarbīgām attiecībām, caur holistisku dziedināšanu un pārveidojošām pieredzēm.            </p>
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
            <h4 className="font-semibold text-lg">Saites</h4>
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
