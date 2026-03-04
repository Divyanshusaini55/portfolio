export function Footer() {
  return (
    <footer className="pt-8 border-t border-border">
      <blockquote className="mb-8 text-muted-foreground italic text-sm leading-relaxed">
        {''}“It does not matter how slowly you go as long as you do not stop.”{''}
        <cite className="block mt-2 not-italic text-xs text-muted-foreground/70">
          — Confucius
        </cite>
      </blockquote>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground/60">
        <p className="font-mono">
          2025 Divyanshu Saini — All rights reserved.
        </p>
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
          <img
            src="/icon.png"
            alt="Divyanshu Saini"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </footer>
  )
}
