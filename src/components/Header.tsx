export default function Header() {
  return (
    <header className="mb-10">
      <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
        Human Contribution Index
      </p>
      <h1 className="text-[1.875rem] font-semibold text-foreground leading-tight mb-2 max-[480px]:text-2xl">
        Preliminary HCI Assessment
      </h1>
      <p className="text-lg italic text-muted-foreground leading-relaxed">
        An open-source framework for evaluating scholarly agency in research
      </p>
      <hr className="mt-6 border-t-2 border-foreground" />
    </header>
  );
}
