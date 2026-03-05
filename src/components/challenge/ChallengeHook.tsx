"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FIELD_OPTIONS } from "@/lib/challenge-data";

interface ChallengeHookProps {
  field: string;
  onFieldChange: (field: string) => void;
  onStart: () => void;
}

export default function ChallengeHook({
  field,
  onFieldChange,
  onStart,
}: ChallengeHookProps) {
  const [showError, setShowError] = useState(false);

  const handleStart = () => {
    if (!field) {
      setShowError(true);
      return;
    }
    onStart();
  };

  const handlePickField = (value: string) => {
    onFieldChange(value);
    if (showError) setShowError(false);
  };

  return (
    <div className="flex flex-col items-start">
      {/* Headline */}
      <h1 className="font-serif text-3xl font-semibold text-foreground tracking-tight text-balance sm:text-4xl">
        Can You Spot the Human?
      </h1>

      <p className="mt-5 text-sm leading-[1.7] text-muted-foreground text-pretty">
        Test your research instinct against an AI scoring system. Takes 60 seconds.
      </p>

      {/* Start the Challenge card */}
      <div className="mt-10 w-full rounded border border-border bg-card p-5">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
          Start the Challenge
        </p>

        <p className="font-sans text-sm text-foreground mb-3">
          Pick your field.
        </p>

        <div className="flex flex-wrap gap-2">
          {FIELD_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              aria-pressed={field === opt}
              onClick={() => handlePickField(opt)}
              className={cn(
                "font-sans text-sm px-4 py-2 rounded-full border transition-all active:scale-95",
                field === opt
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-border hover:border-foreground/40",
                showError && !field && "border-destructive"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
        {showError && !field && (
          <p className="font-sans text-xs text-destructive mt-2" role="alert">
            Select a field to continue.
          </p>
        )}

        <Button className="mt-5 w-full sm:w-auto" onClick={handleStart}>
          {"Start the Challenge \u2192"}
        </Button>
      </div>

      {/* How it works -- structured 3-column grid below the action card */}
      <div className="mt-10 w-full">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
          How it works
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 w-full border border-border rounded overflow-hidden">
          <div className="p-4 sm:border-r border-b sm:border-b-0 border-border">
            <span className="font-serif text-2xl font-semibold text-foreground/15">01</span>
            <p className="font-sans text-sm font-semibold text-foreground mt-2">Read</p>
            <p className="font-sans text-xs text-muted-foreground mt-1 leading-relaxed">
              A real abstract from published research across disciplines.
            </p>
          </div>
          <div className="p-4 sm:border-r border-b sm:border-b-0 border-border">
            <span className="font-serif text-2xl font-semibold text-foreground/15">02</span>
            <p className="font-sans text-sm font-semibold text-foreground mt-2">Score</p>
            <p className="font-sans text-xs text-muted-foreground mt-1 leading-relaxed">
              Rate one dimension of human contribution: novelty, reasoning, voice, synthesis, or ethics.
            </p>
          </div>
          <div className="p-4">
            <span className="font-serif text-2xl font-semibold text-foreground/15">03</span>
            <p className="font-sans text-sm font-semibold text-foreground mt-2">Compare</p>
            <p className="font-sans text-xs text-muted-foreground mt-1 leading-relaxed">
              See how your instinct stacks up against the AI after 5 rounds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
