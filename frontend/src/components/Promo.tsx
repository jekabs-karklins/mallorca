import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Promo = () => {
    return       <div className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
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
      </div>;
}
 
export default Promo;
