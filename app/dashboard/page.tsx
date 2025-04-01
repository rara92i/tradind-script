"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, LogOut } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Script {
  id: string;
  title: string;
  description: string;
  code: string;
}

export default function DashboardPage() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Récupération des tokens dans l'URL
  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");

  useEffect(() => {
    const checkAuth = async () => {
      if (accessToken && refreshToken) {
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        // Nettoyage de l'URL
        router.replace("/dashboard");
      }

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!session || error) {
        router.push("/login");
      } else {
        fetchScripts();
      }
    };

    checkAuth();
  }, [accessToken, refreshToken]);

  const fetchScripts = async () => {
    try {
      const { data, error } = await supabase
        .from("scripts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setScripts(data || []);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les scripts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyScript = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Copié !",
        description: "Le script a été copié dans le presse-papier",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le script",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Mes Scripts Pine</h1>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>

        {scripts.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              Aucun script disponible pour le moment.
            </p>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {scripts.map((script) => (
              <Card key={script.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{script.title}</h2>
                    <p className="text-muted-foreground mt-1">
                      {script.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopyScript(script.code)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">
                    {script.code.slice(0, 100)}...
                  </code>
                </pre>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
