// Types for the challenge micro-app
export interface ChallengePassage {
  id: string;
  text: string;
  field: string;
  year: number;
  dimension: string;
  aiScore: number; // 1-5
}

export interface UserRating {
  passageId: string;
  dimension: string;
  userScore: number; // 0-100
  confidence: "guessing" | "somewhat" | "very";
}

export interface DimensionDef {
  key: string;
  name: string;
  weight: number;
  short: string;
  anchors: Record<number, string>;
}

// HCI Dimensions — canonical definitions
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

// TODO: Replace these placeholder abstracts with real ArXiv/published abstracts
export const PASSAGE_BANK: ChallengePassage[] = [
  {
    id: "p1",
    text: "We present a novel framework for multi-task reinforcement learning that leverages shared latent representations across diverse control domains. Unlike prior approaches that train task-specific policies in isolation, our method discovers a compact embedding space where knowledge transfers naturally between locomotion, manipulation, and navigation tasks. Through extensive experiments on 12 benchmark environments, we demonstrate that our approach achieves competitive performance with 60% fewer training samples. Critically, we identify a surprising failure mode: the shared representation can amplify distributional shift when source and target tasks differ in observation dimensionality, a phenomenon we term 'dimensional collapse.' We provide both theoretical analysis characterizing when this collapse occurs and practical mitigation strategies. Our findings challenge the prevailing assumption that larger shared representations are universally beneficial and suggest a more nuanced view of transfer in multi-task settings.",
    field: "Computer Science — Reinforcement Learning",
    year: 2024,
    dimension: "conceptual_direction",
    aiScore: 4,
  },
  {
    id: "p2",
    text: "This study examines the relationship between urban green infrastructure and mental health outcomes in post-industrial cities, drawing on environmental psychology, urban planning theory, and epidemiological methods. We conducted a mixed-methods investigation across three Rust Belt cities, combining spatial analysis of green space accessibility with longitudinal survey data from 2,400 residents and 45 in-depth interviews. Our quantitative models reveal a nonlinear dose-response relationship: mental health benefits plateau beyond 30 minutes of weekly green space exposure, contradicting the 'more is better' assumption embedded in current policy. The qualitative data illuminate why — residents in economically disadvantaged neighborhoods experience green spaces differently, often associating new parks with gentrification anxiety rather than restoration. We propose an equity-weighted accessibility metric that accounts for both physical proximity and psychosocial barriers. This framework bridges environmental health science and critical urban theory in ways neither discipline has achieved independently.",
    field: "Public Health — Environmental Epidemiology",
    year: 2023,
    dimension: "creative_synthesis",
    aiScore: 4,
  },
  {
    id: "p3",
    text: "Large language models increasingly serve as research assistants, yet their epistemic properties remain poorly understood. We investigate whether LLM-generated literature reviews exhibit systematic biases in source selection, argumentation structure, and evidential reasoning. Analyzing 500 LLM-produced reviews across five disciplines alongside 500 human-authored counterparts, we find that LLMs consistently overrepresent highly-cited works while neglecting methodologically rigorous but less visible studies. More troublingly, LLM reviews construct arguments with a distinctive pattern we call 'coherence without conviction' — logically structured but lacking the epistemic risk-taking that characterizes genuine scholarly engagement. We argue this has implications beyond automation anxiety: if AI-generated reviews shape what researchers read, they may inadvertently narrow the field's epistemic horizon. Our analysis draws on philosophy of science, bibliometrics, and computational linguistics, though we acknowledge our own coding scheme inevitably embeds disciplinary assumptions about what constitutes 'good' reasoning.",
    field: "Information Science — Scholarly Communication",
    year: 2024,
    dimension: "critical_judgment",
    aiScore: 4,
  },
  {
    id: "p4",
    text: "We apply standard transformer architectures to protein folding prediction using a dataset of 50,000 experimentally validated structures. Our model employs multi-head attention over amino acid sequences with positional encodings adapted for biological sequences. Following established training protocols, we achieve a TM-score of 0.82 on the CASP15 benchmark, representing incremental improvement over existing methods. We report results across four standard metrics and provide ablation studies isolating the contribution of each architectural modification. The model trains in 72 hours on 8 A100 GPUs. We release our code and trained weights for reproducibility. Future work will explore incorporating evolutionary coupling information and expanding to multi-chain complexes.",
    field: "Computational Biology — Protein Structure",
    year: 2024,
    dimension: "conceptual_direction",
    aiScore: 2,
  },
  {
    id: "p5",
    text: "The ethics of predictive policing algorithms have been extensively discussed, yet most analyses focus narrowly on racial bias in arrest data. This paper broadens the ethical lens to examine how predictive systems reshape the phenomenology of urban space — transforming neighborhoods from lived places into risk surfaces. Drawing on 18 months of ethnographic fieldwork in three cities deploying predictive policing, we document how residents internalize algorithmic classifications, altering movement patterns, social interactions, and sense of belonging. We find that even 'debiased' algorithms perpetuate harm through what we term 'categorical violence' — the reduction of complex community dynamics to actionable threat scores. Particularly concerning is the impact on youth, who describe feeling 'pre-judged by math.' We engage with multiple ethical frameworks — consequentialist, deontological, and care ethics — while arguing that none alone captures the full scope of harm. Our analysis suggests that the ethical question is not whether algorithms can be made fair, but whether certain domains of human life should remain outside algorithmic governance entirely.",
    field: "Sociology — Science & Technology Studies",
    year: 2023,
    dimension: "ethical_reasoning",
    aiScore: 5,
  },
  {
    id: "p6",
    text: "Climate change adaptation in smallholder agriculture requires understanding how farmers perceive and respond to environmental variability. We surveyed 800 farmers across four regions in Sub-Saharan Africa, measuring adoption rates for drought-resistant crop varieties, water harvesting techniques, and crop diversification strategies. Results indicate that 45% of respondents have adopted at least one adaptation strategy, with education level and access to extension services as primary predictors. Farmers with more land adopted more strategies. Barriers to adaptation include limited financial resources, insufficient information, and tenure insecurity. We recommend policy interventions targeting these barriers, including expanded extension services and microfinance programs. Our findings align with previous studies in South Asia and Latin America, confirming the importance of institutional support in facilitating climate adaptation among vulnerable agricultural populations.",
    field: "Agricultural Economics — Climate Adaptation",
    year: 2023,
    dimension: "scholarly_voice",
    aiScore: 2,
  },
  {
    id: "p7",
    text: "Digital humanities scholars have long debated whether computational methods fundamentally alter hermeneutic practice or merely accelerate it. We intervene in this debate through a case study that is itself methodologically experimental: applying topic modeling, network analysis, and close reading to a corpus of 3,200 nineteenth-century periodical essays on 'the woman question.' Rather than treating computational outputs as findings, we use them as what we call 'hermeneutic provocations' — algorithmic results that force the interpreter to confront unexpected patterns and revise interpretive frameworks. The topic model revealed a cluster linking domestic economy discourse with early labor rights rhetoric — a connection invisible to conventional periodization but immediately recognizable once surfaced. This approach, which we term 'computational estrangement,' preserves humanistic interpretation as the primary mode of knowledge production while leveraging computation to defamiliarize the archive. We position this against both techno-positivist and techno-skeptical camps in DH, arguing that the most productive computational humanities work is deliberately uncomfortable.",
    field: "Digital Humanities — Literary Studies",
    year: 2024,
    dimension: "creative_synthesis",
    aiScore: 5,
  },
  {
    id: "p8",
    text: "Federated learning promises privacy-preserving machine learning, but theoretical guarantees often diverge from practical security. We present a comprehensive audit of five widely-deployed federated learning frameworks, testing them against a taxonomy of 14 attack vectors spanning gradient inversion, model poisoning, and inference attacks. Our results are sobering: all five frameworks are vulnerable to at least three attack categories under realistic threat models. However, we resist the temptation to declare federated learning 'broken.' Instead, we develop a risk stratification framework that maps specific deployment contexts (healthcare, financial, IoT) to their most relevant threat vectors, enabling practitioners to make informed trade-offs rather than binary adopt/reject decisions. We note a significant limitation: our audit assumes honest-but-curious servers, and extending to fully malicious settings may reveal additional vulnerabilities we cannot currently characterize. The gap between cryptographic security proofs and deployed system behavior warrants sustained attention from both communities.",
    field: "Computer Science — Security & Privacy",
    year: 2024,
    dimension: "critical_judgment",
    aiScore: 4,
  },
  {
    id: "p9",
    text: "We examine the rapid expansion of AI tutoring systems in K-12 education through the lens of care ethics, arguing that the displacement of human tutors raises moral questions that efficiency-focused evaluations systematically overlook. Through a year-long comparative study of 12 schools — six using AI tutoring and six with traditional peer tutoring — we find that while standardized test improvements are statistically equivalent, the AI-tutored cohort shows measurably lower help-seeking behavior, reduced academic self-efficacy, and diminished sense of intellectual community. Students describe the AI as 'always patient but never proud of me.' We argue these findings reflect a fundamental tension: care requires vulnerability to the cared-for, which artificial agents cannot genuinely experience. The schools serving predominantly low-income students showed the starkest differences, raising equity concerns about who receives human attention and who is delegated to machines. We propose a 'care audit' framework for educational technology adoption that centers relational outcomes alongside academic metrics.",
    field: "Education — Philosophy of Education",
    year: 2024,
    dimension: "ethical_reasoning",
    aiScore: 4,
  },
  {
    id: "p10",
    text: "I have spent six years studying the sociolinguistics of code-switching in multilingual courtrooms, and this paper represents what I have come to understand as the central paradox of legal multilingualism: the very mechanisms designed to ensure equal access — court interpreters, translated documents, bilingual proceedings — can systematically distort the pragmatic force of witness testimony. Through granular discourse analysis of 200 hours of courtroom recordings across three jurisdictions, I demonstrate that interpreted testimony consistently loses what I call 'epistemic texture' — the hedges, repairs, and prosodic markers that signal a speaker's relationship to their own knowledge claims. Judges and juries, trained to read confidence from delivery, are effectively evaluating the interpreter's certainty rather than the witness's. This is not merely a translation problem but a fundamental epistemological one. My analysis draws on conversation analysis, legal pragmatics, and phenomenology of testimony, and I argue — from a position I am willing to defend — that current standards of legal interpretation are not just imperfect but epistemically violent.",
    field: "Linguistics — Forensic Linguistics",
    year: 2023,
    dimension: "scholarly_voice",
    aiScore: 5,
  },
];

// Field options for the hook screen
export const FIELD_OPTIONS = [
  "STEM",
  "Social Sciences",
  "Humanities",
  "Health Sciences",
  "Other",
] as const;

// --- Leaderboard ---

export interface LeaderboardEntry {
  name: string;
  score: number;
  rounds: number;
  field: string;
}

// Confidence multiplier: guessing=1, somewhat=2, very=3
export function confidencePoints(c: UserRating["confidence"]): number {
  switch (c) {
    case "guessing":
      return 1;
    case "somewhat":
      return 2;
    case "very":
      return 3;
  }
}

export function computeScore(ratings: UserRating[]): number {
  return ratings.reduce((sum, r) => sum + confidencePoints(r.confidence), 0);
}

// Seeded leaderboard entries (will be replaced by Supabase later)
export const SEED_LEADERBOARD: LeaderboardEntry[] = [
  { name: "SynthesisOwl", score: 126, rounds: 42, field: "STEM" },
  { name: "MethodsHawk", score: 98, rounds: 38, field: "Social Sciences" },
  { name: "EthicsFirst", score: 87, rounds: 35, field: "Humanities" },
  { name: "VoiceHunter", score: 72, rounds: 29, field: "Health Sciences" },
  { name: "CriticalMind", score: 65, rounds: 27, field: "STEM" },
  { name: "DeepReader", score: 54, rounds: 22, field: "Humanities" },
  { name: "FrameworkFox", score: 41, rounds: 18, field: "Social Sciences" },
  { name: "NuanceNerd", score: 33, rounds: 14, field: "STEM" },
];
