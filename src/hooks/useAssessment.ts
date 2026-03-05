"use client";

import { useState, useEffect, useCallback } from "react";
import { AssessmentResponse, HCIScore, ConfidenceInfo, AppState } from "@/lib/types";
import { computeHCI, confidenceLabel } from "@/lib/compute-hci";
import { MIN_TEXT_LENGTH } from "@/lib/constants";

export function useAssessment() {
  const [researchField, setResearchField] = useState("");
  const [text, setText] = useState("");
  const [appState, setAppState] = useState<AppState>("input");
  const [result, setResult] = useState<AssessmentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [globalCount, setGlobalCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/counter")
      .then((r) => r.json())
      .then((d) => setGlobalCount(d.count))
      .catch(() => {});
  }, []);

  const runAssessment = useCallback(async () => {
    if (!researchField.trim()) {
      setError("Please enter your research field.");
      return;
    }
    if (text.trim().length < MIN_TEXT_LENGTH) {
      setError(
        `Please paste at least ${MIN_TEXT_LENGTH} characters of research text.`
      );
      return;
    }
    setError(null);
    setAppState("loading");
    setResult(null);

    try {
      const response = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text.trim(),
          researchField: researchField.trim(),
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Assessment failed.");
      }

      const parsed: AssessmentResponse = await response.json();
      setResult(parsed);
      setAppState("result");
      setGlobalCount((prev) => (prev !== null ? prev + 1 : 1));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Assessment failed. Please try again.";
      setError(message);
      setAppState("input");
    }
  }, [text, researchField]);

  const reset = useCallback(() => {
    setResearchField("");
    setText("");
    setResult(null);
    setError(null);
    setAppState("input");
  }, []);

  const hci: HCIScore | null = result ? computeHCI(result.dimensions) : null;
  const confidence: ConfidenceInfo | null = result
    ? confidenceLabel(result.confidence)
    : null;

  return {
    researchField,
    setResearchField,
    text,
    setText,
    appState,
    result,
    error,
    hci,
    confidence,
    globalCount,
    runAssessment,
    reset,
  };
}
