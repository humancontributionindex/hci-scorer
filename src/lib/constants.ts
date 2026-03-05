import { DimensionDef } from "./types";

export const MIN_TEXT_LENGTH = 500;

export const DIMENSIONS: DimensionDef[] = [
  {
    key: "conceptual_direction",
    name: "Conceptual Direction",
    weight: 0.25,
    short: "Problem framing, research questions, intellectual agenda-setting",
    anchors: {
      1: "Derivative questions with no independent framing; follows an existing template",
      2: "Minor variation on established questions; heavily guided by prior work",
      3: "Reasonable questions with some independent thought and adequate rationale",
      4: "Clear intellectual leadership with deep understanding and a coherent research vision",
      5: "Exceptionally original framing that reveals gaps others have missed; visionary agenda-setting",
    },
  },
  {
    key: "creative_synthesis",
    name: "Creative Synthesis",
    weight: 0.25,
    short: "Cross-domain connections, emergent insights, novel integration",
    anchors: {
      1: "No synthesis across ideas or fields; relies on a single narrow framework",
      2: "Simple, obvious connections with no new insights generated",
      3: "Some cross-field connections, but these remain superficial and yield no emergent insights",
      4: "Strong synthesis connecting different fields in ways that produce valuable new understanding",
      5: "Masterful integration of disparate domains, generating emergent insights that no single perspective could produce",
    },
  },
  {
    key: "critical_judgment",
    name: "Critical Judgment",
    weight: 0.2,
    short: "Metacognition, epistemic humility, engagement with alternatives",
    anchors: {
      1: "Claims accepted uncritically; no evaluation of competing positions or methodological trade-offs",
      2: "Inconsistent critical engagement; alternatives acknowledged but not meaningfully examined",
      3: "Reasonable analysis supported by evidence, but lacking depth or nuance",
      4: "Rigorous evaluation with serious consideration of alternatives and transparent acknowledgment of limitations",
      5: "Exceptional metacognitive awareness with sophisticated engagement across competing frameworks",
    },
  },
  {
    key: "ethical_reasoning",
    name: "Ethical Reasoning",
    weight: 0.15,
    short: "Moral engagement, stakeholder consideration, responsibility",
    anchors: {
      1: "Ethical implications ignored entirely; no consideration beyond procedural compliance",
      2: "Pro-forma ethics statement present but with no deeper engagement",
      3: "Key ethical issues addressed adequately, though analysis does not extend beyond the obvious",
      4: "Nuanced engagement with multiple stakeholders; ethical tensions identified and navigated",
      5: "Proactive identification of non-obvious ethical considerations, treated with depth and intellectual seriousness",
    },
  },
  {
    key: "scholarly_voice",
    name: "Scholarly Voice",
    weight: 0.15,
    short: "Authorial presence, intellectual ownership, authentic perspective",
    anchors: {
      1: "Generic writing with no distinct authorial presence; could have been written by anyone — or by AI",
      2: "Competent prose but lacking voice; no personal intellectual investment visible",
      3: "An emerging voice with moments of distinctive perspective, though inconsistent across the work",
      4: "A clear, confident voice that owns its arguments and engages the reader",
      5: "An exceptional scholarly voice with powerful intellectual ownership — only this researcher could have written it",
    },
  },
];
