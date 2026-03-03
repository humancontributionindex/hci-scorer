interface CounterProps {
  count: number | null;
}

export default function Counter({ count }: CounterProps) {
  if (count === null || count <= 0) return null;

  return (
    <p className="font-sans text-xs text-muted-foreground text-center mt-10">
      {count.toLocaleString()} assessment{count !== 1 ? "s" : ""} conducted
    </p>
  );
}
