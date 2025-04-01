import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, Code2, Lock, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Exclusive Pine Script Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access a curated collection of professional TradingView indicators and strategies.
            Sign up with just your email - no password needed!
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/login">
                Get Access Now <ChevronRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6">
            <Code2 className="w-12 h-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Premium Scripts</h2>
            <p className="text-muted-foreground">
              Get access to professionally crafted Pine Script indicators and strategies.
            </p>
          </Card>

          <Card className="p-6">
            <Lock className="w-12 h-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Secure Access</h2>
            <p className="text-muted-foreground">
              Simple and secure login with just your email. No passwords to remember.
            </p>
          </Card>

          <Card className="p-6">
            <Zap className="w-12 h-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Easy to Use</h2>
            <p className="text-muted-foreground">
              One-click copy functionality to easily use scripts in TradingView.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}