import { DIMENSIONS, classifyAgency } from "./constants";
import { DimensionResult, HCIScore, ConfidenceInfo } from "./types";

const SCALE_FACTOR = 20; // converts 1–5 weighted average to 0–100

/**
 * Computes a 0–100 score from dimension results.
 * Returns null if fewer than minAssessed dimensions have scores.
 */
export function computeScore100(
  dimensions: Record<string, { score?: number | null }>,
  minAssessed = 1
): number | null {
  let weightedSum = 0;
  let totalWeight = 0;
  let assessedCount = 0;

  for (const dim of DIMENSIONS) {
    const d = dimensions[dim.key];
    if (d && d.score != null) {
      const numScore =
        typeof d.score === "string" ? parseFloat(d.score as string) : d.score;
      if (!isNaN(numScore)) {
        weightedSum += numScore * dim.weight;
        totalWeight += dim.weight;
        assessedCount++;
      }
    }
  }

  if (assessedCount < minAssessed || totalWeight === 0) return null;

  const normalized = weightedSum / totalWeight;
  return Math.round(normalized * SCALE_FACTOR);
}

export function computeHCI(
  dimensions: Record<string, DimensionResult>
): HCIScore | null {
  const score100 = computeScore100(dimensions, 2);
  if (score100 === null) return null;

  let assessedCount = 0;
  for (const dim of DIMENSIONS) {
    const result = dimensions[dim.key];
    if (result && result.score != null) {
      const numScore =
        typeof result.score === "string"
          ? parseFloat(result.score)
          : result.score;
      if (!isNaN(numScore)) assessedCount++;
    }
  }

  const margin = assessedCount < 4 ? 10 : assessedCount < 5 ? 6 : 4;

  const classification = classifyAgency(score100);

  return {
    score: score100,
    low: Math.max(0, score100 - margin),
    high: Math.min(100, score100 + margin),
    assessed: assessedCount,
    total: 5,
    tier: classification.tier,
    tierLabel: classification.label,
    tierDescription: classification.description,
  };
}

export function confidenceLabel(conf: string): ConfidenceInfo {
  const normalized = conf?.toLowerCase?.() ?? "";
  if (normalized === "high")
    return {
      text: "High confidence",
      desc: "Most dimensions assessable from this text",
    };
  if (normalized === "moderate")
    return {
      text: "Moderate confidence",
      desc: "Some dimensions partially assessable",
    };
  return {
    text: "Low confidence",
    desc: "Limited text \u2014 treat as directional only",
  };
}
