"use client";

import { DIMENSIONS } from "@/lib/constants";
import { AssessmentResponse, HCIScore, ConfidenceInfo } from "@/lib/types";
import DimensionCard from "./DimensionCard";
import CitableBlock from "./CitableBlock";
import EmailCapture from "./EmailCapture";
import FeedbackCapture from "./FeedbackCapture";
import styles from "./ResultView.module.css";

interface ResultViewProps {
  result: AssessmentResponse;
  hci: HCIScore;
  confidence: ConfidenceInfo;
  onReset: () => void;
}

export default function ResultView({
  result,
  hci,
  confidence,
  onReset,
}: ResultViewProps) {
  return (
    <div>
      {/* Assessment Result */}
      <section>
        <p className={styles.sectionLabel}>Assessment Result</p>
        <div className={styles.scoreRow}>
          <span className={styles.scoreRange}>
            {hci.low}&ndash;{hci.high}
          </span>
          <span className={styles.scoreMax}>/5.0</span>
        </div>
        <p className={styles.confidenceText}>
          {confidence.text} &mdash; {confidence.desc}
        </p>
        <p className={styles.dimensionsAssessed}>
          {hci.assessed} of {hci.total} dimensions assessed from this fragment
        </p>
        {result.overall_note && (
          <p className={styles.overallNote}>{result.overall_note}</p>
        )}
      </section>

      <hr className={styles.divider} />

      {/* Dimension Breakdown */}
      <section className={styles.section}>
        <p className={styles.sectionLabel}>Dimension Breakdown</p>
        {DIMENSIONS.map((dim, i) => {
          const d = result.dimensions[dim.key];
          if (!d) return null;
          return (
            <DimensionCard
              key={dim.key}
              dimension={dim}
              result={d}
              isLast={i === DIMENSIONS.length - 1}
            />
          );
        })}
      </section>

      <hr className={styles.divider} />

      {/* Citable Block */}
      <section>
        <CitableBlock hci={hci} result={result} />
      </section>

      <hr className={styles.divider} />

      {/* Email Capture */}
      <section>
        <EmailCapture />
      </section>

      {/* Feedback */}
      <section className={styles.engagementSection}>
        <FeedbackCapture />
      </section>

      <hr className={styles.divider} />

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button className={styles.btnSecondary} onClick={onReset}>
          Assess another text
        </button>
        <a
          href="https://github.com/humancontributionindex/hci-framework"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnSecondary}
        >
          View scoring rubric on GitHub
        </a>
      </div>
    </div>
  );
}
