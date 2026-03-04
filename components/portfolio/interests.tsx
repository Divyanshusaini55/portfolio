export function Interests() {
  const interests = [
    "machine learning",
    "deep learning",
    "mathematics",
    "web development",
    "programming",
    "problem solving",
    "data structures",
    "algorithms",
    "learning",
    "music",
    "books",
    "exploring",
  ]

  const hates = ["procrastination", "bugs at 2am", "slow wifi"]

  return (
    <section className="mb-16" id="interests">
      <div className="space-y-4 text-sm text-muted-foreground">
        <p>
          <span className="text-primary font-mono font-medium">interests:</span>{" "}
          <span className="leading-relaxed">
            {interests.join(", ")}...
          </span>
        </p>
        
        <p>
          <span className="text-primary font-mono font-medium">hate:</span>{" "}
          {hates.map((item, index) => (
            <span key={item}>
              <span className="hover:line-through cursor-default transition-all">
                {item}
              </span>
              {index < hates.length - 1 && ", "}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
