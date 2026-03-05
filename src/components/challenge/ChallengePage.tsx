"use client";

import { useState, useMemo } from "react";
import {
  type UserRating,
  type LeaderboardEntry,
  PASSAGE_BANK,
  SEED_LEADERBOARD,
  computeScore,
} from "@/lib/challenge-data";
import ChallengeHook from "./ChallengeHook";
import ChallengeRound from "./ChallengeRound";
import ChallengeReveal from "./ChallengeReveal";
import ChallengeProfile from "./ChallengeProfile";

type FlowState = "hook" | "round" | "reveal" | "profile";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ChallengePage() {
  const [flowState, setFlowState] = useState<FlowState>("hook");
  const [returnState, setReturnState] = useState<FlowState | null>(null);
  const [field, setField] = useState("");
  const [currentRound, setCurrentRound] = useState(0);
  const [ratings, setRatings] = useState<UserRating[]>([]);
  const [lastRating, setLastRating] = useState<UserRating | null>(null);
  const [hasSeenProfile, setHasSeenProfile] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(
    () => [...SEED_LEADERBOARD].sort((a, b) => b.score - a.score)
  );
  const [savedName, setSavedName] = useState<string | null>(null);

  // Shuffle the passage bank once on mount, then cycle infinitely
  const [shuffledPassages] = useState(() => shuffleArray(PASSAGE_BANK));

  const currentPassage = useMemo(
    () => shuffledPassages[currentRound % shuffledPassages.length],
    [currentRound, shuffledPassages]
  );

  // Show the "View My Results" button after 5 completed rounds, during round or reveal
  const showResultsButton =
    ratings.length >= 5 &&
    (flowState === "round" || flowState === "reveal");

  const handleStart = () => {
    setFlowState("round");
  };

  const handleSubmitRating = (rating: UserRating) => {
    setRatings((prev) => [...prev, rating]);
    setLastRating(rating);
    setFlowState("reveal");
  };

  const handleNext = () => {
    const nextRound = currentRound + 1;
    setCurrentRound(nextRound);
    // Show profile after round 5 (index 4) if not yet seen
    if (nextRound === 5 && !hasSeenProfile) {
      setFlowState("profile");
      setHasSeenProfile(true);
    } else {
      setFlowState("round");
    }
  };

  // Compute current leaderboard with the user's live score (if they've saved a name)
  const liveLeaderboard = useMemo(() => {
    if (!savedName) return leaderboard;
    const score = computeScore(ratings);
    const entry: LeaderboardEntry = {
      name: savedName,
      score,
      rounds: ratings.length,
      field: field || "Other",
    };
    return [...leaderboard.filter((e) => e.name !== savedName), entry].sort(
      (a, b) => b.score - a.score
    );
  }, [leaderboard, savedName, ratings, field]);

  const handleSaveToLeaderboard = (name: string) => {
    const score = computeScore(ratings);
    const entry: LeaderboardEntry = {
      name,
      score,
      rounds: ratings.length,
      field: field || "Other",
    };
    setSavedName(name);
    setLeaderboard((prev) =>
      [...prev.filter((e) => e.name !== name), entry].sort(
        (a, b) => b.score - a.score
      )
    );
  };

  const handleViewProfile = () => {
    setReturnState(flowState);
    setFlowState("profile");
  };

  const handleContinue = () => {
    // Return to wherever the user was, or default to "round"
    if (returnState && returnState !== "profile") {
      setFlowState(returnState);
      setReturnState(null);
    } else {
      setFlowState("round");
    }
  };

  return (
    <div className="min-h-screen px-5 pt-12 pb-20 max-[480px]:px-4 max-[480px]:pt-8 max-[480px]:pb-12">
      <div className="max-w-[680px] mx-auto">
        {/* Persistent "View My Results" button */}
        {showResultsButton && (
          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={handleViewProfile}
              className="font-sans text-xs tracking-wide text-muted-foreground hover:text-foreground border-b border-transparent hover:border-foreground/30 transition-colors pb-0.5"
            >
              {"View my results \u2192"}
            </button>
          </div>
        )}

        {flowState === "hook" && (
          <ChallengeHook
            field={field}
            onFieldChange={setField}
            onStart={handleStart}
          />
        )}

        {flowState === "round" && currentPassage && (
          <ChallengeRound
            key={`round-${currentRound}`}
            passage={currentPassage}
            roundNumber={currentRound + 1}
            onSubmit={handleSubmitRating}
          />
        )}

        {flowState === "reveal" && currentPassage && lastRating && (
          <ChallengeReveal
            passage={currentPassage}
            rating={lastRating}
            roundNumber={currentRound + 1}
            onNext={handleNext}
          />
        )}

        {flowState === "profile" && (
          <ChallengeProfile
            ratings={ratings}
            passages={shuffledPassages}
            leaderboard={liveLeaderboard}
            onSaveToLeaderboard={handleSaveToLeaderboard}
            savedName={savedName}
            onContinue={handleContinue}
          />
        )}
      </div>
    </div>
  );
}
