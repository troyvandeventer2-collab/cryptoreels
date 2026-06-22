import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Alex Rivera",
      handle: "@alex_creations",
      text: "CryptoReels has completely automated my faceless channel. I'm now posting 5 videos a day across 3 platforms without lifting a finger.",
      avatar: "AR",
    },
    {
      name: "Sarah Chen",
      handle: "@sarahai",
      text: "The quality of the AI voiceovers and visuals is top-notch. My TikTok views have tripled since I started using this service.",
      avatar: "SC",
    },
    {
      name: "Marcus Thorne",
      handle: "@mthorne_crypto",
      text: "Love the crypto payment option. It's fast, anonymous, and the service is worth every satoshi. Highly recommended!",
      avatar: "MT",
    },
  ];

  return (
    <section className="py-24 bg-black/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by Creators</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators who are scaling their faceless channels with AI.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <Card key={i} className="bg-white/5 border-white/10 hover:border-btc/30 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-btc text-btc" />
                  ))}
                </div>
                <p className="text-lg italic text-white/90">"{review.text}"</p>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <Avatar className="w-10 h-10 border border-white/10">
                  <AvatarFallback className="bg-btc/20 text-btc text-xs font-bold">{review.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-sm">{review.name}</div>
                  <div className="text-xs text-muted-foreground">{review.handle}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
