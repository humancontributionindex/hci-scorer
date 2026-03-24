"use client";

import Link from "next/link";
import { DIMENSIONS } from "@/lib/constants";
import { AssessmentResponse, HCIScore, ConfidenceInfo } from "@/lib/types";
import DimensionCard from "./DimensionCard";
import DimensionRadarChart from "./DimensionRadarChart";
import ErrorBoundary from "./ErrorBoundary";
import CitableBlock from "./CitableBlock";
import EmailCapture from "./EmailCapture";
import FeedbackCapture from "./FeedbackCapture";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ResultViewProps {
  result: AssessmentResponse;
  hci: HCIScore | null;
  confidence: ConfidenceInfo | null;
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
        <h2 className="font-sans text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
          Assessment Result
        </h2>
        {hci ? (
          <>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-semibold text-foreground max-[480px]:text-[1.75rem]">
                {hci.score}
              </span>
              <span className="text-xl text-muted-foreground">/ 100</span>
            </div>
            <div className="mb-3">
              <span
                className={cn(
                  "inline-block font-sans text-sm font-semibold px-2.5 py-0.5 rounded-full",
                  hci.tier === "high" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                  hci.tier === "hybrid" && "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
                  hci.tier === "low" && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                )}
              >
                {hci.tierLabel}
              </span>
            </div>
            <p className="font-sans text-sm text-muted-foreground mb-1">
              {hci.tierDescription}
            </p>
            {confidence && (
              <p className="font-sans text-sm text-muted-foreground mb-1">
                {confidence.text} &mdash; {confidence.desc}
              </p>
            )}
            <p className="font-sans text-sm text-muted-foreground mb-4">
              {hci.assessed} of {hci.total} dimensions assessed
              {hci.assessed < hci.total && ` (confidence range: ${hci.low}\u2013${hci.high})`}
            </p>
          </>
        ) : (
          <p className="font-sans text-sm text-muted-foreground mb-4">
            Score could not be computed &mdash; see individual dimensions below.
          </p>
        )}
        {result.overall_note && (
          <p className="text-base leading-[1.7] text-foreground">
            {result.overall_note}
          </p>
        )}
      </section>

      <Separator className="my-8" />

      {/* Dimension Breakdown */}
      <section className="mb-2">
        <h2 className="font-sans text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
          Dimension Breakdown
        </h2>
        <ErrorBoundary
          fallback={
            <p className="text-xs text-muted-foreground italic mb-4">
              Radar chart could not be displayed.
            </p>
          }
        >
          <DimensionRadarChart dimensions={result.dimensions} />
        </ErrorBoundary>
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
      {hci && (
        <section>
          <CitableBlock hci={hci} result={result} />
        </section>
      )}

      {hci && <Separator className="my-8" />}

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
          <Link href="/framework">View the scoring framework</Link>
        </Button>
      </div>
    </div>
  );
}
