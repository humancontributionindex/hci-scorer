import type { Metadata } from "next";
import Link from "next/link";
import { DIMENSIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The HCI Framework — Human Contribution Index Scoring Rubric",
  description:
    "A structured rubric for measuring authentic human intellectual contribution in research. Five dimensions, weighted scoring, and detailed anchor descriptors for academics, reviewers, and publishers.",
  openGraph: {
    title: "The HCI Framework — Human Contribution Index Scoring Rubric",
    description:
      "A structured rubric for measuring authentic human intellectual contribution in research.",
    url: "https://humancontributionindex.com/framework",
    type: "website",
  },
};

const WEIGHTS_TABLE: { name: string; weight: string; measures: string }[] = [
  {
    name: "Conceptual Direction",
    weight: "25%",
    measures:
      "Did the researcher identify the problem, frame the questions, and direct the inquiry?",
  },
  {
    name: "Creative Synthesis",
    weight: "25%",
    measures:
      "Are the connections and insights non-obvious? Do they draw on cross-domain expertise?",
  },
  {
    name: "Critical Judgment",
    weight: "20%",
    measures:
      "Did the researcher evaluate alternatives, weigh evidence, and acknowledge limitations?",
  },
  {
    name: "Ethical Reasoning",
    weight: "15%",
    measures:
      "Did the researcher navigate ethical considerations and take responsibility for impact?",
  },
  {
    name: "Scholarly Voice",
    weight: "15%",
    measures:
      "Is there a distinctive intellectual perspective and authentic argumentation?",
  },
];

const AI_DEPENDENCY_TABLE: {
  range: string;
  level: string;
  examples: string;
}[] = [
  {
    range: "0.0\u20130.2",
    level: "Minimal",
    examples: "Spell-check, formatting, grammar tools",
  },
  {
    range: "0.2\u20130.4",
    level: "Moderate",
    examples:
      "Literature search assistance, data cleaning, reference management",
  },
  {
    range: "0.4\u20130.6",
    level: "Substantial",
    examples:
      "AI-assisted drafting with significant human revision; AI-supported analysis with human interpretation",
  },
  {
    range: "0.6\u20130.8",
    level: "Heavy",
    examples:
      "AI-generated sections with minor editing; AI-driven analysis with minimal human oversight",
  },
  {
    range: "0.8\u20131.0",
    level: "Dominant",
    examples: "Predominantly AI-written with cosmetic human edits",
  },
];

const SCORE_INTERPRETATION: {
  range: string;
  label: string;
  description: string;
}[] = [
  {
    range: "4.0\u20135.0",
    label: "Exceptional",
    description:
      "Strong evidence of authentic human intellectual engagement across all dimensions",
  },
  {
    range: "3.0\u20134.0",
    label: "Strong",
    description:
      "Clear evidence of genuine human intellectual contribution",
  },
  {
    range: "2.0\u20133.0",
    label: "Moderate",
    description:
      "Some dimensions show authentic engagement; others raise questions",
  },
  {
    range: "1.0\u20132.0",
    label: "Limited",
    description:
      "Significant concerns about the depth of human intellectual involvement",
  },
  {
    range: "Below 1.0",
    label: "Minimal",
    description:
      "Heavy AI dependency has substantially diminished the human contribution signal",
  },
];

export default function FrameworkPage() {
  return (
    <main className="min-h-screen px-5 pt-12 pb-20 max-[480px]:px-4 max-[480px]:pt-8 max-[480px]:pb-12">
      <div className="max-w-content mx-auto">
        {/* Hero */}
        <header className="mb-10">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Human Contribution Index
          </p>
          <h1 className="text-[1.875rem] font-semibold text-foreground leading-tight mb-2 max-[480px]:text-2xl">
            The HCI Framework
          </h1>
          <p className="text-lg italic text-muted-foreground leading-relaxed">
            A rubric for measuring genuine human thinking in research.
          </p>
          <hr className="mt-6 border-t-2 border-foreground" />
        </header>

        {/* Intro */}
        <section className="mb-8">
          <p className="text-base leading-[1.7] text-foreground mb-4">
            As AI-generated text becomes increasingly difficult to distinguish
            from human writing, a new question confronts universities, journals,
            and funding bodies: how much of this research reflects genuine human
            intellectual engagement?
          </p>
          <p className="text-base leading-[1.7] text-foreground mb-4">
            Existing tools detect whether text was AI-generated. The HCI goes
            further &mdash; it measures the <em>depth</em> of human intellectual
            contribution behind the work, across five dimensions that capture
            the cognitive acts most characteristic of human researchers.
          </p>
          <p className="text-base leading-[1.7] text-foreground">
            Each dimension is scored on a 1&ndash;5 scale using the anchor
            descriptors below. The composite HCI score is a weighted average of
            all dimensions, adjusted for AI dependency.
          </p>
        </section>

        <Separator className="my-8" />

        {/* How the Score Works */}
        <section className="mb-8">
          <h2 className="font-sans text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
            How the Score Works
          </h2>
          <div className="bg-secondary rounded-lg p-5 mb-4 text-center">
            <p className="font-sans text-lg text-foreground tracking-wide">
              HCI = &Sigma;(&lambda;<sub>j</sub> &times; HC<sub>j</sub>)
              &times; (1 &minus; AI<sup>d</sup>)
            </p>
          </div>
          <div className="space-y-2 text-sm leading-relaxed text-foreground">
            <p>
              <strong>HC<sub>j</sub></strong> = score for dimension{" "}
              <em>j</em> (1&ndash;5 scale)
            </p>
            <p>
              <strong>&lambda;<sub>j</sub></strong> = weight for dimension{" "}
              <em>j</em> (see below)
            </p>
            <p>
              <strong>
                AI<sup>d</sup>
              </strong>{" "}
              = AI dependency factor (0.0&ndash;1.0), reflecting the extent of
              AI involvement in the research process
            </p>
          </div>
          <p className="text-sm leading-relaxed text-foreground mt-4">
            The AI dependency factor acts as a multiplier: work produced entirely
            by a human (AI<sup>d</sup> = 0) retains its full score, while heavy
            AI reliance reduces the composite proportionally.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Dimension Weights */}
        <section className="mb-8">
          <h2 className="font-sans text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Dimension Weights
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="font-sans font-semibold text-foreground text-left py-2 pr-4">
                    Dimension
                  </th>
                  <th className="font-sans font-semibold text-foreground text-left py-2 pr-4 w-16">
                    Weight
                  </th>
                  <th className="font-sans font-semibold text-foreground text-left py-2">
                    What It Measures
                  </th>
                </tr>
              </thead>
              <tbody>
                {WEIGHTS_TABLE.map((row) => (
                  <tr key={row.name} className="border-b border-border/50">
                    <td className="font-sans font-semibold text-foreground py-2.5 pr-4">
                      {row.name}
                    </td>
                    <td className="font-sans text-muted-foreground py-2.5 pr-4 tabular-nums">
                      {row.weight}
                    </td>
                    <td className="text-foreground py-2.5 leading-relaxed">
                      {row.measures}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Scoring Rubric */}
        <section>
          <h2 className="font-sans text-sm tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Scoring Rubric
          </h2>
          {DIMENSIONS.map((dim, i) => (
            <div
              key={dim.key}
              className={i < DIMENSIONS.length - 1 ? "mb-10" : ""}
            >
              <h3 className="font-sans text-base font-semibold text-foreground mb-1">
                {dim.name}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({Math.round(dim.weight * 100)}%)
                </span>
              </h3>
              <p className="text-sm italic text-muted-foreground mb-3">
                {dim.short}
              </p>
              <div className="space-y-2">
                {([1, 2, 3, 4, 5] as const).map((score) => (
                  <div key={score} className="flex gap-3">
                    <span className="font-sans text-sm font-semibold text-foreground w-5 shrink-0 pt-[2px]">
                      {score}
                    </span>
                    <p className="text-sm leading-relaxed text-foreground">
                      {dim.anchors[score]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <Separator className="my-8" />

        {/* AI Dependency Factor */}
        <section className="mb-8">
          <h2 className="font-sans text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
            AI Dependency Factor
          </h2>
          <p className="text-base leading-[1.7] text-foreground mb-4">
            The AI dependency factor (AI<sup>d</sup>) captures the extent of AI
            involvement in the research process. It ranges from 0.0 (no AI
            involvement) to 1.0 (entirely AI-generated).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="font-sans font-semibold text-foreground text-left py-2 pr-4">
                    AI<sup>d</sup> Range
                  </th>
                  <th className="font-sans font-semibold text-foreground text-left py-2 pr-4">
                    Level
                  </th>
                  <th className="font-sans font-semibold text-foreground text-left py-2">
                    Examples
                  </th>
                </tr>
              </thead>
              <tbody>
                {AI_DEPENDENCY_TABLE.map((row) => (
                  <tr key={row.range} className="border-b border-border/50">
                    <td className="font-sans text-foreground py-2.5 pr-4 tabular-nums">
                      {row.range}
                    </td>
                    <td className="font-sans font-semibold text-foreground py-2.5 pr-4">
                      {row.level}
                    </td>
                    <td className="text-foreground py-2.5 leading-relaxed">
                      {row.examples}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Score Interpretation */}
        <section className="mb-8">
          <h2 className="font-sans text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Interpreting Your Score
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="font-sans font-semibold text-foreground text-left py-2 pr-4">
                    HCI Score
                  </th>
                  <th className="font-sans font-semibold text-foreground text-left py-2">
                    Interpretation
                  </th>
                </tr>
              </thead>
              <tbody>
                {SCORE_INTERPRETATION.map((row) => (
                  <tr key={row.range} className="border-b border-border/50">
                    <td className="font-sans text-foreground py-2.5 pr-4 tabular-nums whitespace-nowrap">
                      {row.range}
                    </td>
                    <td className="text-foreground py-2.5 leading-relaxed">
                      <strong>{row.label}</strong> &mdash; {row.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Separator className="my-8" />

        {/* CTA */}
        <section className="text-center">
          <p className="text-base text-muted-foreground mb-4">
            See how your research scores.
          </p>
          <Button
            variant="outline"
            className="border-foreground hover:bg-secondary"
            asChild
          >
            <Link href="/">Score a paper now &rarr;</Link>
          </Button>
        </section>

        <Footer />
      </div>
    </main>
  );
}
