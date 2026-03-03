export default function LoadingState() {
  return (
    <div className="py-20 text-center">
      <p className="text-lg text-foreground mb-4">
        Analyzing your text against five HCI dimensions
        <span className="inline-flex gap-[3px] ml-1 align-baseline">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-foreground animate-pulse-dot"
            style={{ animationDelay: "-0.32s" }}
          />
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-foreground animate-pulse-dot"
            style={{ animationDelay: "-0.16s" }}
          />
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground animate-pulse-dot" />
        </span>
      </p>
      <p className="font-sans text-sm text-muted-foreground mt-4">
        This typically takes 10&ndash;15 seconds.
      </p>
    </div>
  );
}
