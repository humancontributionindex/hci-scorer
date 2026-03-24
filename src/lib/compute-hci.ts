import { DIMENSIONS, classifyAgency } from "./constants";
import { DimensionResult, HCIScore, ConfidenceInfo } from "./types";

export function computeHCI(
  dimensions: Record<string, DimensionResult>
): HCIScore | null {
  let weightedSum = 0;
  let totalWeight = 0;
  let assessedCount = 0;

  for (const dim of DIMENSIONS) {
    const result = dimensions[dim.key];
    if (result && result.score != null) {
      const numScore =
        typeof result.score === "string"
          ? parseFloat(result.score)
          : result.score;
      if (!isNaN(numScore)) {
        weightedSum += numScore * dim.weight;
        totalWeight += dim.weight;
        assessedCount++;
      }
    }
  }

  if (assessedCount < 2) return null;

  const normalized = totalWeight > 0 ? weightedSum / totalWeight : 0;
  const score100 = Math.round(normalized * 20);

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

export function confidenceLabel(
  conf: "low" | "moderate" | "high"
): ConfidenceInfo {
  if (conf === "high")
    return {
      text: "High confidence",
      desc: "Most dimensions assessable from this text",
    };
  if (conf === "moderate")
    return {
      text: "Moderate confidence",
      desc: "Some dimensions partially assessable",
    };
  return {
    text: "Low confidence",
    desc: "Limited text \u2014 treat as directional only",
  };
}
