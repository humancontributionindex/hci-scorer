"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  type ChallengePassage,
  type UserRating,
  type LeaderboardEntry,
  DIMENSIONS,
  computeScore,
} from "@/lib/challenge-data";

interface ChallengeProfileProps {
  ratings: UserRating[];
  passages: ChallengePassage[];
  leaderboard: LeaderboardEntry[];
  onSaveToLeaderboard: (name: string) => void;
  savedName: string | null;
  onContinue: () => void;
}

function sliderToFive(slider: number): number {
  return Math.round((slider / 100) * 4 * 10) / 10 + 1;
}

interface DimensionSummary {
  key: string;
  name: string;
  userAvg: number;
  aiAvg: number;
  label: string;
}

// Staggered animation hook
function useStaggeredReveal(count: number, delayMs = 120) {
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    if (visibleCount < count) {
      const timer = setTimeout(() => setVisibleCount((c) => c + 1), delayMs);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, count, delayMs]);
  return visibleCount;
}

export default function ChallengeProfile({
  ratings,
  passages,
  leaderboard,
  onSaveToLeaderboard,
  savedName,
  onContinue,
}: ChallengeProfileProps) {
  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  const summaries = useMemo(() => {
    const result: DimensionSummary[] = [];

    for (const dim of DIMENSIONS) {
      const dimRatings = ratings.filter((r) => r.dimension === dim.key);
      if (dimRatings.length === 0) continue;

      const userAvg =
        dimRatings.reduce((sum, r) => sum + sliderToFive(r.userScore), 0) /
        dimRatings.length;
      const aiAvg =
        dimRatings.reduce((sum, r) => {
          const p = passages.find((pp) => pp.id === r.passageId);
          if (!p) {
            console.warn(`[ChallengeProfile] No passage found for id "${r.passageId}" — using default aiScore 3`);
          }
          return sum + (p?.aiScore ?? 3);
        }, 0) / dimRatings.length;

      const diff = userAvg - aiAvg;
      const label =
        Math.abs(diff) <= 0.5
          ? "Aligned with AI"
          : diff > 0
            ? "Softer than AI"
            : "Tougher than AI";

      result.push({ key: dim.key, name: dim.name, userAvg, aiAvg, label });
    }

    return result;
  }, [ratings, passages]);

  const visibleDims = useStaggeredReveal(summaries.length, 150);

  // Find the most divergent dimension for the callout
  const mostDivergent = useMemo(() => {
    if (summaries.length === 0) return null;
    return summaries.reduce((prev, curr) =>
      Math.abs(curr.userAvg - curr.aiAvg) > Math.abs(prev.userAvg - prev.aiAvg)
        ? curr
        : prev
    );
  }, [summaries]);

  const summaryOneLiner = mostDivergent
    ? mostDivergent.label === "Aligned with AI"
      ? `You and the AI see eye to eye across the board \u2014 your instincts track closely with algorithmic assessment.`
      : mostDivergent.label === "Tougher than AI"
        ? `You\u2019re a ${mostDivergent.name} hawk \u2014 you score harder than the AI on ${mostDivergent.name.toLowerCase()}.`
        : `You\u2019re generous on ${mostDivergent.name} \u2014 you see more human contribution than the AI does.`
    : "";

  const userRank = useMemo(() => {
    const score = computeScore(ratings);
    return leaderboard.filter((e) => e.score > score).length + 1;
  }, [ratings, leaderboard]);

  return (
    <div className="flex flex-col">
      {/* Title */}
      <h1 className="font-serif text-3xl font-semibold text-foreground tracking-tight text-balance sm:text-4xl">
        Your Research Instinct
      </h1>

      {/* #2 Callout summary -- elevated visual weight */}
      <div className="mt-6 p-4 rounded border border-border bg-card">
        <p className="font-serif text-base leading-relaxed text-foreground text-pretty">
          {summaryOneLiner}
        </p>
      </div>

      {/* #1 Dimension breakdowns -- taller bars, stronger colors, verdict-style pills */}
      <div className="flex flex-col gap-8 mt-10">
        {summaries.map((s, i) => {
          const diff = s.userAvg - s.aiAvg;
          const isVisible = i < visibleDims;
          return (
            <div
              key={s.key}
              className={cn(
                "transition-all duration-500 ease-out",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-sans text-sm font-semibold text-foreground">
                  {s.name}
                </h3>
                <span
                  className={cn(
                    "font-sans text-xs font-medium px-3 py-1 rounded-full",
                    s.label === "Aligned with AI"
                      ? "bg-muted text-muted-foreground"
                      : s.label === "Tougher than AI"
                        ? "bg-foreground text-background"
                        : "bg-muted text-foreground border border-border"
                  )}
                >
                  {s.label}
                </span>
              </div>

              {/* You bar */}
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs text-muted-foreground w-7 shrink-0">
                  You
                </span>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground rounded-full transition-all duration-700 ease-out"
                    style={{ width: isVisible ? `${(s.userAvg / 5) * 100}%` : "0%" }}
                  />
                </div>
                <span className="font-sans text-sm font-semibold text-foreground tabular-nums w-8 text-right">
                  {s.userAvg.toFixed(1)}
                </span>
              </div>

              {/* AI bar */}
              <div className="flex items-center gap-3 mt-1.5">
                <span className="font-sans text-xs text-muted-foreground w-7 shrink-0">
                  AI
                </span>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-muted-foreground/30 rounded-full transition-all duration-700 ease-out"
                    style={{ width: isVisible ? `${(s.aiAvg / 5) * 100}%` : "0%" }}
                  />
                </div>
                <span className="font-sans text-xs text-muted-foreground tabular-nums w-8 text-right">
                  {s.aiAvg.toFixed(1)}
                </span>
              </div>

              {Math.abs(diff) > 0.5 && (
                <p className="font-sans text-xs text-muted-foreground mt-2 pl-10">
                  {diff > 0
                    ? `+${diff.toFixed(1)} higher than the AI`
                    : `${Math.abs(diff).toFixed(1)} lower than the AI`}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* #4 Leaderboard card -- name input + table grouped in one unit */}
      <div className="mt-12 rounded border border-border bg-card p-5">
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
          Leaderboard
        </p>

        {/* Claim your spot / saved confirmation */}
        <div className="mb-5">
          {savedName ? (
            <p className="font-sans text-sm text-foreground">
              {"You\u2019re "}
              <span className="font-semibold">#{userRank}</span>
              {" on the leaderboard as "}
              <span className="font-semibold">{savedName}</span>.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="leaderboard-name"
                className="font-sans text-sm font-semibold text-foreground"
              >
                Claim your spot on the leaderboard
              </label>
              <div className="flex gap-2 items-start flex-wrap">
                <div className="flex flex-col">
                  <input
                    ref={nameInputRef}
                    id="leaderboard-name"
                    type="text"
                    value={nameInput}
                    onChange={(e) => {
                      setNameInput(e.target.value.slice(0, 20));
                      if (nameError) setNameError("");
                    }}
                    placeholder="e.g. MethodsHawk"
                    maxLength={20}
                    className="font-sans text-sm px-3 py-2 border border-border rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 w-52"
                  />
                  {nameError && (
                    <p className="font-sans text-xs text-destructive mt-1" role="alert">
                      {nameError}
                    </p>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="border-foreground hover:bg-secondary whitespace-nowrap"
                  onClick={() => {
                    const trimmed = nameInput.trim();
                    if (!trimmed) {
                      setNameError("Enter a name to save your score.");
                      nameInputRef.current?.focus();
                      return;
                    }
                    onSaveToLeaderboard(trimmed);
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* #6 Share buttons inside leaderboard card -- visible alongside rank */}
        <div className="flex gap-2 mb-5 flex-wrap">
          <button
            type="button"
            onClick={() => {
              const strongest = summaries.length > 0
                ? summaries.reduce((a, b) => (a.userAvg > b.userAvg ? a : b))
                : null;
              const dir = mostDivergent
                ? mostDivergent.userAvg < mostDivergent.aiAvg ? "tougher" : "softer"
                : "";
              const text = `I took the HCI Challenge \u2014 I'm a ${strongest?.name ?? "research"} hawk, ${dir} than AI on ${mostDivergent?.name?.toLowerCase() ?? "key dimensions"}. Test your research instinct: humancontributionindex.com/challenge`;
              window.open(
                `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`,
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="inline-flex items-center font-sans text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-3.5 h-3.5 mr-1.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on X
          </button>
          <span className="text-border">|</span>
          <button
            type="button"
            onClick={() => {
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://humancontributionindex.com/challenge")}`,
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="inline-flex items-center font-sans text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-3.5 h-3.5 mr-1.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Share on LinkedIn
          </button>
        </div>

        {/* Leaderboard table */}
        {leaderboard.length > 0 && (
          <div className="w-full overflow-x-auto">
            <table className="w-full font-sans text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-normal text-muted-foreground pb-2 pr-4 w-10">#</th>
                  <th className="text-left text-xs font-normal text-muted-foreground pb-2 pr-4">Name</th>
                  <th className="text-right text-xs font-normal text-muted-foreground pb-2 pr-4 w-16">Score</th>
                  <th className="text-right text-xs font-normal text-muted-foreground pb-2 pr-4 w-16">Rounds</th>
                  <th className="text-left text-xs font-normal text-muted-foreground pb-2 hidden sm:table-cell">Field</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.slice(0, 10).map((entry, i) => {
                  const rank = i + 1;
                  const isTopThree = rank <= 3;
                  const isCurrentUser = savedName && entry.name === savedName;
                  return (
                    <tr
                      key={`${entry.name}-${i}`}
                      className={cn(
                        "border-b border-border",
                        isCurrentUser
                          ? "border-l-2 border-l-foreground bg-foreground/[0.04]"
                          : isTopThree
                            ? "bg-muted/40"
                            : ""
                      )}
                    >
                      <td
                        className={cn(
                          "py-2.5 pr-4 tabular-nums text-muted-foreground",
                          (isTopThree || isCurrentUser) && "font-semibold text-foreground"
                        )}
                      >
                        {rank}
                      </td>
                      <td
                        className={cn(
                          "py-2.5 pr-4",
                          (isTopThree || isCurrentUser)
                            ? "font-semibold text-foreground"
                            : "text-foreground"
                        )}
                      >
                        {entry.name}
                        {isCurrentUser && (
                          <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                            (you)
                          </span>
                        )}
                      </td>
                      <td
                        className={cn(
                          "py-2.5 pr-4 text-right tabular-nums",
                          (isTopThree || isCurrentUser)
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {entry.score}
                      </td>
                      <td className="py-2.5 pr-4 text-right tabular-nums text-muted-foreground">
                        {entry.rounds}
                      </td>
                      <td className="py-2.5 text-muted-foreground hidden sm:table-cell">
                        {entry.field}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* #7 CTAs -- "Keep going" is primary, "Score your own research" is secondary */}
      <div className="flex flex-col gap-3 sm:flex-row mt-10">
        <Button onClick={onContinue}>
          Keep going
        </Button>
        <Button variant="outline" className="border-foreground hover:bg-secondary" asChild>
          <Link href="/">{"Score your own research \u2192"}</Link>
        </Button>
      </div>
    </div>
  );
}
