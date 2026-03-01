export interface DimensionDef {
  key: string;
  name: string;
  weight: number;
  short: string;
  anchors: Record<number, string>;
}

export interface DimensionResult {
  score: number | null;
  evidence: string;
  not_assessable: string;
}

export interface AssessmentResponse {
  dimensions: Record<string, DimensionResult>;
  overall_note: string;
  confidence: "low" | "moderate" | "high";
}

export interface HCIScore {
  low: number;
  high: number;
  midpoint: number;
  assessed: number;
  total: number;
}

export interface ConfidenceInfo {
  text: string;
  desc: string;
}

export type AppState = "input" | "loading" | "result" | "error";
