import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-btc/10 border border-btc/20 text-btc text-xs font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-btc opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-btc"></span>
            </span>
            NOW SUPPORTING TIKTOK, REELS & SHORTS
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
            AI Faceless Reels Generator on <span className="text-btc">Auto-Pilot</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
            Generate high-quality, engaging faceless videos for your social media channels using AI. 
            No editing skills required. No face needed. Just results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-btc hover:bg-btc/90 text-white px-8 h-14 text-lg">
                Start 7-Day Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg gap-2">
              <Play className="w-5 h-5 fill-current" /> Watch Sample
            </Button>
          </div>
          
          <div className="mt-16 relative w-full max-w-5xl">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50 hover:opacity-100 transition-opacity duration-700">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="aspect-[9/16] bg-muted rounded-xl overflow-hidden relative border border-white/5">
                   <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 italic">
                     AI Video {i}
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
