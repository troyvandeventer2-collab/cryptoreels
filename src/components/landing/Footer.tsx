import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-btc rounded-lg flex items-center justify-center font-bold text-white text-xl">C</div>
              <span className="font-bold text-xl tracking-tight">Crypto<span className="text-btc">Reels</span></span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left max-w-xs">
              The world's first AI-powered faceless video generator with crypto payments.
            </p>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">Discord</Link>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CryptoReels. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
