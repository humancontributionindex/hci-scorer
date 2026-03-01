<p align="center">
  <img src="public/icon.svg" alt="HCI Scorer" width="64" height="64" />
</p>

<h1 align="center">HCI Scorer</h1>

<p align="center">
  <strong>Evaluate authentic human intellectual contribution in research.</strong><br/>
  A free, open-source web tool implementing the <a href="https://github.com/humancontributionindex/hci-framework">Human Contribution Index (HCI) v1.0</a> framework.
</p>

<p align="center">
  <a href="https://humancontributionindex.com">Live App</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a href="https://github.com/humancontributionindex/hci-framework">HCI Framework</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a href="#quick-start">Quick Start</a>
</p>

---

## What is the HCI?

The **Human Contribution Index** is an open-source scoring framework that measures the depth of genuine human intellectual contribution in academic and research writing. In an era of AI-assisted authorship, the HCI provides a structured, transparent rubric for distinguishing authentic human thought from machine-generated content.

Paste a fragment of research text and the scorer analyzes it across **five weighted dimensions**, returning a scored assessment with evidence, confidence level, and a ready-to-cite block.

## Five Scoring Dimensions

| Dimension | Weight | What it measures |
|---|:---:|---|
| **Conceptual Direction** | 25% | Problem framing, research questions, intellectual agenda-setting |
| **Creative Synthesis** | 25% | Cross-domain connections, emergent insights, novel integration |
| **Critical Judgment** | 20% | Metacognition, epistemic humility, engagement with alternatives |
| **Ethical Reasoning** | 15% | Moral engagement, stakeholder consideration, responsibility |
| **Scholarly Voice** | 15% | Authorial presence, intellectual ownership, authentic perspective |

Each dimension is scored **1 -- 5** using anchor-based rubrics. The final HCI is a weighted composite expressed as a range (e.g., 3.2 -- 3.8 / 5.0) along with a confidence level (low / moderate / high) based on how many dimensions were assessable from the text.

## Features

- **Fragment-level assessment** -- paste an abstract, chapter section, or any research passage (min. 500 characters)
- **Researcher reflection** -- optionally describe your main intellectual decision to improve accuracy
- **Dimension breakdown** -- per-dimension scores with evidence citations and rubric anchors
- **Citable assessment block** -- one-click copy of a formatted citation for your paper
- **Confidence reporting** -- transparent about what the rubric can and cannot assess from a fragment
- **Global counter** -- live count of assessments conducted across all users
- **Waitlist sign-up** -- register for full-document assessment (coming soon)
- **Feedback collection** -- contribute suggestions to improve the open-source framework
- **Rate limiting** -- 5 requests per minute per IP to prevent abuse
- **Privacy-first** -- your text is analyzed in real time and never stored

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| UI | [React 19](https://react.dev), CSS Modules |
| Fonts | Source Serif 4, Source Sans 3 (via `next/font`) |
| AI Backend | [Google Gemini 2.5 Flash](https://ai.google.dev) via `@google/generative-ai` |
| Database | [Supabase](https://supabase.com) (counter, waitlist, feedback) |
| CI/CD | GitHub Actions (lint, type-check, build) |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── assess/route.ts      # Core assessment endpoint (Gemini AI)
│   │   ├── counter/route.ts     # Global assessment counter
│   │   ├── feedback/route.ts    # User feedback collection
│   │   └── waitlist/route.ts    # Email waitlist sign-up
│   ├── layout.tsx               # Root layout with fonts & metadata
│   ├── page.tsx                 # Main page (state machine: input → loading → result)
│   ├── globals.css
│   └── page.module.css
├── components/
│   ├── Header.tsx               # Title and description
│   ├── InputView.tsx            # Text input + reflection field
│   ├── LoadingState.tsx         # Animated loading indicator
│   ├── ResultView.tsx           # Full result display
│   ├── DimensionCard.tsx        # Individual dimension score card
│   ├── CitableBlock.tsx         # Copy-to-clipboard citation
│   ├── Counter.tsx              # Global assessment counter display
│   ├── EmailCapture.tsx         # Waitlist email form
│   ├── FeedbackCapture.tsx      # Feedback submission form
│   └── Footer.tsx               # Links and license info
├── hooks/
│   └── useAssessment.ts         # Core assessment state management hook
└── lib/
    ├── compute-hci.ts           # Weighted score computation + confidence
    ├── constants.ts             # Dimension definitions, weights, and anchors
    ├── system-prompt.ts         # Gemini system prompt for the HCI rubric
    ├── supabase.ts              # Supabase client singleton
    └── types.ts                 # TypeScript interfaces
```

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org) >= 20
- A [Google AI API key](https://aistudio.google.com/apikey) (Gemini)
- A [Supabase](https://supabase.com) project (for counter, waitlist, and feedback)

### 1. Clone and install

```bash
git clone https://github.com/humancontributionindex/hci-scorer.git
cd hci-scorer
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
GOOGLE_AI_API_KEY=your-google-ai-api-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 3. Set up Supabase tables

The app expects the following tables in your Supabase project:

**`assessments_counter`** -- tracks the global number of assessments:

```sql
CREATE TABLE assessments_counter (
  id INTEGER PRIMARY KEY DEFAULT 1,
  count BIGINT NOT NULL DEFAULT 0
);

INSERT INTO assessments_counter (id, count) VALUES (1, 0);

-- RPC function used by the app
CREATE OR REPLACE FUNCTION increment_counter()
RETURNS void AS $$
  UPDATE assessments_counter SET count = count + 1 WHERE id = 1;
$$ LANGUAGE sql;
```

**`waitlist_emails`** -- stores early-access sign-ups:

```sql
CREATE TABLE waitlist_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**`feedback`** -- stores user feedback:

```sql
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## How Scoring Works

1. The user pastes research text (min. 500 chars, max. 50,000 chars) and optionally provides a reflection describing their intellectual decisions.
2. The text is sent to **Gemini 2.5 Flash** with a structured system prompt encoding the full HCI rubric.
3. Gemini returns a JSON response with per-dimension scores (1--5 or `null`), evidence, and not-assessable notes.
4. The client computes a **weighted composite score** with a confidence margin:
   - Fewer than 4 dimensions assessed: &plusmn; 0.5
   - 4 dimensions assessed: &plusmn; 0.3
   - All 5 dimensions assessed: &plusmn; 0.2
5. Results are displayed with the score range, confidence level, dimension breakdown, and a citable block.

A minimum of 2 assessed dimensions is required to produce a score.

## API Reference

### `POST /api/assess`

Runs the HCI assessment on submitted text.

**Request body:**

```json
{
  "text": "Your research text (min 500 characters)...",
  "reflection": "Optional: your main intellectual decision"
}
```

**Response:** `AssessmentResponse` object with dimension scores, evidence, overall note, and confidence level.

**Rate limit:** 5 requests per minute per IP.

### `GET /api/counter`

Returns the global assessment count.

### `POST /api/waitlist`

Subscribes an email to the early-access waitlist.

### `POST /api/feedback`

Submits user feedback (3--2000 characters).

## Deployment

The app is designed for deployment on [Vercel](https://vercel.com):

1. Push the repository to GitHub
2. Import the project in Vercel
3. Add the three environment variables (`GOOGLE_AI_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`)
4. Deploy

For other platforms, run `npm run build` and serve the `.next` output with `npm run start`.

## Contributing

Contributions are welcome. This project is part of the broader [Human Contribution Index](https://github.com/humancontributionindex) initiative.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch and open a pull request

For changes to the scoring rubric itself, please contribute to the [HCI Framework](https://github.com/humancontributionindex/hci-framework) repository.

## License

This project is released under the [MIT License](https://opensource.org/licenses/MIT).

---

<p align="center">
  <strong>Human Contribution Index v1.0</strong><br/>
  <em>Because human thought still matters.</em>
</p>
