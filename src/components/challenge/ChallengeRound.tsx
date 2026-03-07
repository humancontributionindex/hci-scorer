"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  type ChallengePassage,
  type UserRating,
  DIMENSIONS,
} from "@/lib/challenge-data";

interface ChallengeRoundProps {
  passage: ChallengePassage;
  roundNumber: number;
  onSubmit: (rating: UserRating) => void;
}

const CONFIDENCE_OPTIONS: { value: "guessing" | "somewhat" | "very"; label: string }[] = [
  { value: "guessing", label: "Guessing" },
  { value: "somewhat", label: "Somewhat confident" },
  { value: "very", label: "Very confident" },
];

const TICK_MARKS = [0, 25, 50, 75, 100];

export default function ChallengeRound({
  passage,
  roundNumber,
  onSubmit,
}: ChallengeRoundProps) {
  const [sliderValue, setSliderValue] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const [confidence, setConfidence] = useState<
    "guessing" | "somewhat" | "very" | null
  >(null);

  const [showErrors, setShowErrors] = useState(false);

  const dimension = DIMENSIONS.find((d) => d.key === passage.dimension);
  if (!dimension) {
    console.warn(`[ChallengeRound] Unknown dimension: ${passage.dimension}`, passage);
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
    if (!hasMoved) setHasMoved(true);
  };

  const handleSubmit = () => {
    if (!hasMoved || !confidence) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    onSubmit({
      passageId: passage.id,
      dimension: passage.dimension,
      userScore: sliderValue,
      confidence,
    });
  };

  // Calculate the thumb position as a percentage for the floating label
  const thumbPercent = sliderValue / 100;

  return (
    <div className="flex flex-col">
      {/* Progress */}
      <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
        {"Round " + roundNumber}
      </p>

      {/* Abstract */}
      <div className="border-l-2 border-border pl-5 mb-8">
        <p className="font-sans text-xs text-muted-foreground mb-3">
          {passage.field + ", " + passage.year}
        </p>
        <p className="font-serif text-sm leading-[1.7] text-foreground">
          {passage.text}
        </p>
      </div>

      <Separator className="my-6" />

      {/* Question */}
      <div className="mb-8">
        <h2 className="font-serif text-lg font-semibold text-foreground mb-1">
          How strong is the{" "}
          <span className="italic">{dimension?.name}</span> in this abstract?
        </h2>
        <p className="font-sans text-xs text-muted-foreground">
          {dimension?.short}
        </p>
      </div>

      {/* Slider */}
      <div className="mb-8">
        <div className="relative pt-8 pb-2 px-1">
          {/* Prompt when thumb is hidden */}
          {!hasMoved && (
            <p className="absolute top-0 left-0 right-0 text-center font-sans text-xs text-muted-foreground animate-pulse">
              Click the bar to place your score
            </p>
          )}
          {/* Floating value label — hidden until first interaction */}
          {hasMoved && (
            <div
              className="absolute top-0 flex flex-col items-center -translate-x-1/2 pointer-events-none"
              style={{ left: `calc(${thumbPercent * 100}% + ${(0.5 - thumbPercent) * 20}px)` }}
            >
              <span className="font-sans text-sm font-semibold tabular-nums px-2 py-0.5 rounded bg-foreground text-background">
                {sliderValue}
              </span>
            </div>
          )}

          {/* Clickable track overlay for first interaction — appears when thumb is hidden */}
          {!hasMoved && (
            <div
              role="presentation"
              aria-hidden="true"
              onPointerDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const pct = Math.round(Math.min(100, Math.max(0, (x / rect.width) * 100)));
                setSliderValue(pct);
                setHasMoved(true);
              }}
              className="absolute inset-0 z-20 cursor-pointer"
            />
          )}

          {/* Native range input — custom styled, thumb hidden until first click */}
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={sliderValue}
            onChange={handleSliderChange}
            className={cn(
              "challenge-slider w-full h-2 appearance-none bg-muted rounded-full cursor-pointer outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background relative z-10",
              !hasMoved && "challenge-slider--hidden-thumb"
            )}
            aria-label={`Score from 0 to 100. ${hasMoved ? `Current value: ${sliderValue}` : "Click the track to set your score."}`}
          />

          {/* Tick marks */}
          <div className="relative w-full h-3 mt-1">
            {TICK_MARKS.map((tick) => (
              <div
                key={tick}
                className="absolute flex flex-col items-center -translate-x-1/2"
                style={{ left: `${tick}%` }}
              >
                <span className="w-px h-1.5 bg-muted-foreground/40" />
                <span className="font-sans text-[10px] text-muted-foreground mt-0.5 tabular-nums">
                  {tick}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-1 px-1">
          <span className="font-sans text-xs text-muted-foreground">
            Purely mechanical
          </span>
          <span className="font-sans text-xs text-muted-foreground">
            Deeply human
          </span>
        </div>
        {showErrors && !hasMoved && (
          <p className="font-sans text-xs text-destructive mt-2 px-1" role="alert">
            Move the slider to set your score.
          </p>
        )}
      </div>

      {/* Confidence */}
      <div className="mb-8">
        <p className="font-sans text-xs font-semibold text-foreground mb-3">
          How confident are you?
        </p>
        <div className="flex flex-wrap gap-2">
          {CONFIDENCE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              aria-pressed={confidence === opt.value}
              onClick={() => {
                setConfidence(opt.value);
                if (showErrors) setShowErrors(false);
              }}
              className={cn(
                "font-sans text-xs px-4 py-1.5 rounded-full border transition-colors",
                confidence === opt.value
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-border hover:border-foreground/40",
                showErrors && confidence === null && "border-destructive"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {showErrors && confidence === null && (
          <p className="font-sans text-xs text-destructive mt-2" role="alert">
            Choose a confidence level.
          </p>
        )}
      </div>

      {/* Submit */}
      <Button onClick={handleSubmit} className="self-start">
        Submit
      </Button>
    </div>
  );
}
