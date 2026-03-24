import type { Metadata } from "next";
import Link from "next/link";
import { DIMENSIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The HCI Framework — Scholarly Agency Scoring Rubric (0.2.0)",
  description:
    "A structured rubric for measuring scholarly agency in research. Five dimensions of human contribution, weighted scoring, and a three-tier classification system for academics, reviewers, and publishers.",
  openGraph: {
    title: "The HCI Framework — Scholarly Agency Scoring Rubric (0.2.0)",
    description:
      "A structured rubric for measuring scholarly agency in research.",
    url: "https://humancontributionindex.com/framework",
    type: "website",
  },
};

const DIMENSION_MEASURES: Record<string, string> = {
  epistemic_agency:
    "Did the researcher identify a meaningful gap, formulate original questions, and direct the inquiry?",
  cognitive_transformation:
    "Does the author\u2019s thinking evolve? Is there triangulation of evidence and grappling with contradictions?",
  methodological_autonomy:
    "Did the researcher justify their design, critically evaluate alternatives, and discuss trade-offs?",
  original_synthesis:
    "Are there new conceptual models or cross-theory integrations that transcend the individual sources?",
  metacognitive_oversight:
    "Is there an honest, reflective account of limitations and the research learning journey?",
};

const WEIGHTS_TABLE = DIMENSIONS.map((dim) => ({
  name: dim.name,
  weight: `${Math.round(dim.weight * 100)}%`,
  measures: DIMENSION_MEASURES[dim.key],
}));

const SCORE_INTERPRETATION: {
  range: string;
  label: string;
  description: string;
}[] = [
  {
    range: "80\u2013100",
    label: "High Agency",
    description:
      "The human author is clearly the intellectual architect of the work.",
  },
  {
    range: "60\u201379",
    label: "Hybrid",
    description:
      "A mix of human-led inquiry and significant reliance on AI for core intellectual tasks.",
  },
  {
    range: "Below 60",
    label: "Low Agency",
    description:
      "The work is likely a product of AI generation with minimal human intellectual contribution.",
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
            A rubric for measuring scholarly agency in research.
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
            assessable dimensions, scaled to 0&ndash;100.
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
              &times; 20
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
          </div>
          <p className="text-sm leading-relaxed text-foreground mt-4">
            The HCI is a weighted average of assessable dimension scores, scaled
            to 0&ndash;100. The result is classified into one of three agency tiers.
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
