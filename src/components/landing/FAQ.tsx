import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAppSettings } from "@/lib/settings";

export async function FAQ() {
  const settings = await getAppSettings();

  const faqs = [
    {
      question: "Do I need to show my face?",
      answer: "No, CryptoReels is designed specifically for faceless channels. Our AI generates all the visuals or uses stock footage/AI characters so you don't have to.",
    },
    {
      question: "Which social media platforms do you support?",
      answer: "Currently, we support TikTok, Instagram Reels, and YouTube Shorts. You can connect your accounts and auto-post to all of them at once.",
    },
    {
      question: "How do I pay with crypto?",
      answer: `After your trial, you can upgrade to a Pro account by sending the equivalent of $${settings.weekly_price}/week in BTC or ETH to our wallet addresses. Once sent, you provide the transaction hash in your dashboard, and our team will verify it within 24 hours.`,
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from your dashboard. Your Pro features will remain active until the end of your current paid week.",
    },
    {
      question: "What is the 7-day free trial?",
      answer: `Every new user gets 7 days of free access with a limit of ${settings.free_tier_video_count} videos per day. No credit card or crypto is required to start the trial.`,
    },
  ];

  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Everything you need to know about CryptoReels.
          </p>
        </div>
        <Accordion className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
              <AccordionTrigger className="text-left hover:text-btc transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
