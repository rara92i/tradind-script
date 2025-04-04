import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Code2, Lock, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Bibliothèque exclusive de Pine Script
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Accédez à une collection sélectionnée d'indicateurs et de stratégies
            professionnelles pour TradingView. Inscrivez-vous uniquement avec
            votre e-mail – aucun mot de passe requis !
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/login">
                Accéder maintenant <ChevronRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6">
            <Code2 className="w-12 h-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Scripts Premium</h2>
            <p className="text-muted-foreground">
              Accédez à des indicateurs et stratégies Pine Script conçus par des
              professionnels.
            </p>
          </Card>

          <Card className="p-6">
            <Lock className="w-12 h-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Accès Sécurisé</h2>
            <p className="text-muted-foreground">
              Connexion simple et sécurisée uniquement avec votre e-mail. Aucun
              mot de passe à retenir.
            </p>
          </Card>

          <Card className="p-6">
            <Zap className="w-12 h-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Facile à Utiliser</h2>
            <p className="text-muted-foreground">
              Fonction de copie en un clic pour utiliser facilement les scripts
              dans TradingView.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
