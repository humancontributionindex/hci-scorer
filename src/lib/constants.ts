import { DimensionDef } from "./types";

export const MIN_TEXT_LENGTH = 500;

export const DIMENSIONS: DimensionDef[] = [
  {
    key: "conceptual_direction",
    name: "Conceptual Direction",
    weight: 0.25,
    short: "Problem framing, research questions, intellectual agenda-setting",
    anchors: {
      1: "Derivative questions, no independent thought, follows a template",
      2: "Minor variation on existing questions, heavily guided by prior work",
      3: "Reasonable questions with some independent thought, adequate rationale",
      4: "Clear intellectual leadership, deep understanding, clear vision",
      5: "Exceptionally original, visionary framing that reveals gaps others missed",
    },
  },
  {
    key: "creative_synthesis",
    name: "Creative Synthesis",
    weight: 0.25,
    short: "Cross-domain connections, emergent insights, novel integration",
    anchors: {
      1: "No synthesis across ideas or fields, single narrow framework",
      2: "Simple obvious connections, no new insights generated",
      3: "Some cross-field connections but superficial, no emergent insights",
      4: "Strong synthesis connecting different fields in valuable new ways",
      5: "Masterful integration generating emergent insights from disparate fields",
    },
  },
  {
    key: "critical_judgment",
    name: "Critical Judgment",
    weight: 0.2,
    short: "Metacognition, epistemic humility, engagement with alternatives",
    anchors: {
      1: "Claims accepted uncritically, no evaluation of strengths and weaknesses",
      2: "Inconsistent critical thinking, alternatives acknowledged but not engaged",
      3: "Reasonable analysis with evidence, but lacks depth or nuance",
      4: "Rigorous evaluation, alternatives considered, limitations acknowledged",
      5: "Exceptional metacognitive awareness and sophisticated engagement",
    },
  },
  {
    key: "ethical_reasoning",
    name: "Ethical Reasoning",
    weight: 0.15,
    short: "Moral engagement, stakeholder consideration, responsibility",
    anchors: {
      1: "Ethical implications ignored, no consideration beyond compliance",
      2: "Pro-forma ethics statement, no deeper engagement",
      3: "Key ethical issues addressed adequately, doesn't go beyond obvious",
      4: "Nuanced engagement, multiple stakeholders, tensions navigated",
      5: "Proactively identifies non-obvious ethical considerations with depth",
    },
  },
  {
    key: "scholarly_voice",
    name: "Scholarly Voice",
    weight: 0.15,
    short: "Authorial presence, intellectual ownership, authentic perspective",
    anchors: {
      1: "Generic writing, no distinct authorial presence, could be anyone or AI",
      2: "Competent but lacking voice, no personal intellectual investment",
      3: "Emerging voice with moments of distinctive perspective, inconsistent",
      4: "Clear confident voice, owns arguments, engages the reader",
      5: "Exceptional voice, powerful ownership — only this researcher could write it",
    },
  },
];
