import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { getAppSettings } from "@/lib/settings";

export async function Pricing() {
  const settings = await getAppSettings();

  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      description: "Experience the power of AI videos",
      features: [
        `${settings.free_tier_video_count} videos per day`,
        `${settings.free_tier_video_duration} minutes max per video`,
        `${settings.trial_duration_days} days total`,
        "Watermark included",
        "Manual posting",
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const,
      href: "/signup",
    },
    {
      name: "Pro Creator",
      price: `$${settings.weekly_price}`,
      period: "/ week",
      description: "Scale your faceless channels",
      features: [
        `${settings.paid_tier_video_count} videos per day`,
        `${settings.paid_tier_video_duration} minutes max per video`,
        "Unlimited duration",
        "No watermarks",
        "Auto-posting UI enabled",
        "Priority AI generation",
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const,
      highlight: true,
      href: "/signup?plan=pro",
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Start for free, then upgrade for more volume and features. We accept Bitcoin and Ethereum.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-btc/10 border border-btc/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-btc" />
              <span className="text-xs font-mono text-btc">BTC: {settings.btc_address}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-eth/10 border border-eth/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-eth" />
              <span className="text-xs font-mono text-eth">ETH: {settings.eth_address}</span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <Card key={i} className={`relative flex flex-col bg-black border-white/10 ${plan.highlight ? 'ring-2 ring-btc border-btc/50' : ''}`}>
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-btc text-white px-4 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-btc" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={plan.href} className="w-full">
                  <Button 
                    className={`w-full h-12 text-lg ${plan.highlight ? 'bg-btc hover:bg-btc/90 text-white' : ''}`} 
                    variant={plan.buttonVariant}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
