"use client";

import { DIMENSIONS } from "@/lib/constants";
import { AssessmentResponse, HCIScore, ConfidenceInfo } from "@/lib/types";
import DimensionCard from "./DimensionCard";
import CitableBlock from "./CitableBlock";
import EmailCapture from "./EmailCapture";
import FeedbackCapture from "./FeedbackCapture";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ResultViewProps {
  result: AssessmentResponse;
  hci: HCIScore;
  confidence: ConfidenceInfo;
  onReset: () => void;
}

export default function ResultView({
  result,
  hci,
  confidence,
  onReset,
}: ResultViewProps) {
  return (
    <div>
      {/* Assessment Result */}
      <section>
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
          Assessment Result
        </p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-4xl font-semibold text-foreground max-[480px]:text-[1.75rem]">
            {hci.low}&ndash;{hci.high}
          </span>
          <span className="text-xl text-muted-foreground">/5.0</span>
        </div>
        <p className="font-sans text-sm text-muted-foreground mb-1">
          {confidence.text} &mdash; {confidence.desc}
        </p>
        <p className="font-sans text-sm text-muted-foreground mb-4">
          {hci.assessed} of {hci.total} dimensions assessed from this fragment
        </p>
        {result.overall_note && (
          <p className="text-base leading-[1.7] text-foreground">
            {result.overall_note}
          </p>
        )}
      </section>

      <Separator className="my-8" />

      {/* Dimension Breakdown */}
      <section className="mb-2">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
          Dimension Breakdown
        </p>
        {DIMENSIONS.map((dim, i) => {
          const d = result.dimensions[dim.key];
          if (!d) return null;
          return (
            <DimensionCard
              key={dim.key}
              dimension={dim}
              result={d}
              isLast={i === DIMENSIONS.length - 1}
            />
          );
        })}
      </section>

      <Separator className="my-8" />

      {/* Citable Block */}
      <section>
        <CitableBlock hci={hci} result={result} />
      </section>

      <Separator className="my-8" />

      {/* Email Capture */}
      <section>
        <EmailCapture />
      </section>

      {/* Feedback */}
      <section className="mt-8">
        <FeedbackCapture />
      </section>

      <Separator className="my-8" />

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="outline"
          className="border-foreground hover:bg-secondary text-center"
          onClick={onReset}
        >
          Assess another text
        </Button>
        <Button
          variant="outline"
          className="border-foreground hover:bg-secondary text-center"
          asChild
        >
          <a
            href="https://github.com/humancontributionindex/hci-framework"
            target="_blank"
            rel="noopener noreferrer"
          >
            View scoring rubric on GitHub
          </a>
        </Button>
      </div>
    </div>
  );
}
