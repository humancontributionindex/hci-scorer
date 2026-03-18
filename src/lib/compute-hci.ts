import { DIMENSIONS } from "./constants";
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
  const margin =
    assessedCount < 4 ? 0.5 : assessedCount < 5 ? 0.3 : 0.2;

  return {
    low: Math.max(1, Math.round((normalized - margin) * 10) / 10),
    high: Math.min(5, Math.round((normalized + margin) * 10) / 10),
    midpoint: Math.round(normalized * 100) / 100,
    assessed: assessedCount,
    total: 5,
  };
}

export function computeMidpoint(
  dimensions: Record<string, { score?: number | null }>
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

  if (assessedCount < 1 || totalWeight === 0) return null;
  return Math.round((weightedSum / totalWeight) * 100) / 100;
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
    desc: "Limited text — treat as directional only",
  };
}
