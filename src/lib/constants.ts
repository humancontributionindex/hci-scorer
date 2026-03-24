import { DimensionDef } from "./types";

export const MIN_TEXT_LENGTH = 500;

// --- Agency tier classification (new in 0.2.0) ---

export type AgencyTier = "high" | "hybrid" | "low";

export interface AgencyClassification {
  tier: AgencyTier;
  label: string;
  description: string;
}

export function classifyAgency(score: number): AgencyClassification {
  if (score >= 80)
    return {
      tier: "high",
      label: "High Agency",
      description:
        "The human author is clearly the intellectual architect of the work.",
    };
  if (score >= 60)
    return {
      tier: "hybrid",
      label: "Hybrid",
      description:
        "The work shows a mix of human-led inquiry and significant reliance on AI for core intellectual tasks.",
    };
  return {
    tier: "low",
    label: "Low Agency",
    description:
      "The work is likely a product of AI generation with minimal human intellectual contribution.",
  };
}

// --- HCI Dimensions (Framework 0.2.0) ---

export const DIMENSIONS: DimensionDef[] = [
  {
    key: "epistemic_agency",
    name: "Epistemic Agency",
    weight: 0.35,
    short: "Identifying research gaps, formulating questions, directing inquiry",
    anchors: {
      1: "No original research gap identified; questions are generic or template-driven",
      2: "Minor gap identification; questions closely follow existing work with little independence",
      3: "Reasonable gap identification with some independent formulation of research questions",
      4: "Clear articulation of a novel research gap with precise, insightful research questions",
      5: "Exceptional identification of a critical juncture or overlooked gap; visionary question formulation that reframes the field",
    },
  },
  {
    key: "cognitive_transformation",
    name: "Cognitive Transformation",
    weight: 0.25,
    short:
      "Evolving thinking, triangulating evidence, grappling with contradictions",
    anchors: {
      1: "No evidence of thinking evolving; findings accepted at face value without integration",
      2: "Some engagement with multiple sources but no meaningful transformation of understanding",
      3: "Reasonable triangulation of evidence with some grappling with conflicting findings",
      4: "Strong evidence of thinking evolving through the work; multiple evidence sources integrated with nuance",
      5: "Exceptional cognitive transformation visible throughout; the author\u2019s understanding demonstrably deepens and shifts as they engage with evidence",
    },
  },
  {
    key: "methodological_autonomy",
    name: "Methodological Autonomy",
    weight: 0.2,
    short:
      "Design justification, novel frameworks, critical methods discussion",
    anchors: {
      1: "No rationale for research design; methodology appears chosen by default or convenience",
      2: "Basic rationale given but no critical evaluation of alternatives or limitations",
      3: "Adequate justification with some awareness of methodological trade-offs",
      4: "Well-justified methodology with critical discussion of strengths, weaknesses, and alternatives considered",
      5: "Exceptional methodological autonomy; novel analytical tools or frameworks developed with rigorous justification for every design choice",
    },
  },
  {
    key: "original_synthesis",
    name: "Original Synthesis",
    weight: 0.15,
    short:
      "New models, cross-theory integration, arguments greater than sum of parts",
    anchors: {
      1: "No synthesis; work is a collection of summaries with no integrative argument",
      2: "Simple juxtaposition of ideas with no emergent insight from the combination",
      3: "Some integration across sources but the synthesis is predictable and does not generate new understanding",
      4: "Strong original synthesis creating new conceptual models or integrating theories from different fields in valuable ways",
      5: "Masterful synthesis producing a holistic argument that is genuinely more than the sum of its parts; creates new conceptual territory",
    },
  },
  {
    key: "metacognitive_oversight",
    name: "Metacognitive Oversight",
    weight: 0.05,
    short: "Limitations awareness, process transparency, reflective learning",
    anchors: {
      1: "No discussion of limitations or reflection on the research process",
      2: "Perfunctory limitations section with no genuine self-awareness",
      3: "Adequate limitations discussion but lacking depth or honesty about the research journey",
      4: "Thoughtful and honest discussion of limitations with transparent account of research decisions",
      5: "Exceptional metacognitive awareness; candid reflective account of the learning journey with genuine intellectual humility",
    },
  },
];
