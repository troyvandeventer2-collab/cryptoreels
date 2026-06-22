import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Settings, BarChart } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      title: "Create a Series",
      description: "Tell us what your niche is. We'll handle the script, voiceover, and visuals.",
      icon: <Sparkles className="w-6 h-6 text-btc" />,
    },
    {
      title: "Customize",
      description: "Review the AI-generated content and make any tweaks you want before posting.",
      icon: <Settings className="w-6 h-6 text-eth" />,
    },
    {
      title: "Watch it Grow",
      description: "Our system auto-posts to TikTok, Instagram, and YouTube. Watch your views climb.",
      icon: <BarChart className="w-6 h-6 text-green-500" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How it Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform takes care of the entire video creation and distribution process.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <Card key={i} className="bg-white/5 border-white/10 hover:border-btc/30 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
