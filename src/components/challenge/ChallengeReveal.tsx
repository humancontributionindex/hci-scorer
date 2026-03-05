"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  type ChallengePassage,
  type UserRating,
  DIMENSIONS,
} from "@/lib/challenge-data";

interface ChallengeRevealProps {
  passage: ChallengePassage;
  rating: UserRating;
  roundNumber: number;
  onNext: () => void;
}

function sliderToFive(slider: number): number {
  // Map 0-100 to 1-5 scale
  return Math.round((slider / 100) * 4 * 10) / 10 + 1;
}

function getInsight(userFive: number, aiFive: number, dimensionName: string): string {
  const diff = userFive - aiFive;
  if (Math.abs(diff) <= 0.5) {
    return "You and the AI agree closely on this one.";
  }
  if (diff > 0) {
    return `You scored higher than the AI \u2014 you see more human thinking here.`;
  }
  return `You\u2019re tougher than the AI on ${dimensionName}.`;
}

export default function ChallengeReveal({
  passage,
  rating,
  roundNumber,
  onNext,
}: ChallengeRevealProps) {
  const dimension = DIMENSIONS.find((d) => d.key === passage.dimension);
  const userFive = sliderToFive(rating.userScore);
  const aiFive = passage.aiScore;
  const insight = getInsight(userFive, aiFive, dimension?.name ?? "this dimension");

  const gap = userFive - aiFive;
  const gapLabel =
    Math.abs(gap) <= 0.5
      ? "Aligned"
      : gap > 0
        ? `+${gap.toFixed(1)} higher`
        : `${gap.toFixed(1)} lower`;

  return (
    <div className="flex flex-col">
      {/* Progress */}
      <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
        {"Round " + roundNumber + " \u2014 Result"}
      </p>

      {/* Dimension label */}
      <p className="font-sans text-xs font-semibold text-muted-foreground mb-4">
        {dimension?.name}
      </p>

      {/* Score comparison */}
      <div className="flex items-center gap-6 mb-2">
        {/* Your score */}
        <div className="flex flex-col items-center">
          <span className="font-sans text-xs text-muted-foreground mb-1">You</span>
          <span className="font-serif text-4xl font-semibold text-foreground">
            {userFive.toFixed(1)}
          </span>
        </div>

        {/* Connector */}
        <div className="flex flex-col items-center gap-1">
          <span className="w-12 h-px bg-border" />
          <span className="font-sans text-[10px] text-muted-foreground tabular-nums">
            {gapLabel}
          </span>
          <span className="w-12 h-px bg-border" />
        </div>

        {/* AI score */}
        <div className="flex flex-col items-center">
          <span className="font-sans text-xs text-muted-foreground mb-1">AI</span>
          <span className="font-serif text-4xl font-semibold text-foreground">
            {aiFive.toFixed(1)}
          </span>
        </div>

        {/* out of */}
        <div className="flex flex-col justify-end pb-0.5">
          <span className="font-sans text-sm text-muted-foreground">/5.0</span>
        </div>
      </div>

      {/* Insight */}
      <p className="text-sm leading-[1.7] text-foreground mt-2 mb-2">
        {insight}
      </p>

      <Separator className="my-6" />

      {/* Abstract reminder — collapsed */}
      <div className="border-l-2 border-border pl-5 mb-6">
        <p className="font-sans text-xs text-muted-foreground mb-2">
          {passage.field + ", " + passage.year}
        </p>
        <p className="font-serif text-xs leading-[1.6] text-muted-foreground line-clamp-3">
          {passage.text}
        </p>
      </div>

      {/* Next */}
      <Button
        onClick={onNext}
        variant="outline"
        className="self-start border-foreground hover:bg-secondary"
      >
        {"Next \u2192"}
      </Button>
    </div>
  );
}
