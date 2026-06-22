export function SocialProof() {
  return (
    <div className="border-y border-white/5 bg-white/5 backdrop-blur-sm py-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-20 items-center text-center">
          <div>
            <div className="text-3xl font-bold">687,500+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">Channels Created</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div>
            <div className="text-3xl font-bold">1,619,430+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">Videos Generated</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div>
            <div className="text-3xl font-bold">98.2%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">Happy Creators</div>
          </div>
        </div>
      </div>
    </div>
  );
}
