import { DimensionDef, DimensionResult } from "@/lib/types";
import styles from "./DimensionCard.module.css";

interface DimensionCardProps {
  dimension: DimensionDef;
  result: DimensionResult;
  isLast: boolean;
}

export default function DimensionCard({
  dimension,
  result,
  isLast,
}: DimensionCardProps) {
  const scored = result.score !== null;
  const anchorText = scored ? dimension.anchors[result.score!] : null;

  return (
    <div className={isLast ? styles.card : styles.cardBordered}>
      <div className={styles.header}>
        <span className={styles.name}>{dimension.name}</span>
        <span className={scored ? styles.score : styles.scoreNA}>
          {scored ? `${result.score}/5` : "N/A"}
        </span>
      </div>

      <p className={styles.meta}>
        Weight: {dimension.weight * 100}% &mdash; {dimension.short}
      </p>

      {scored && result.evidence && (
        <div>
          <p className={styles.evidenceLabel}>Evidence:</p>
          <p className={styles.evidence}>{result.evidence}</p>
        </div>
      )}

      {scored && anchorText && (
        <p className={styles.anchor}>
          <span className={styles.anchorBold}>
            Rubric anchor ({result.score}/5):
          </span>{" "}
          {anchorText}
        </p>
      )}

      {!scored && result.not_assessable && (
        <p className={styles.notAssessable}>
          Not assessable from this fragment: {result.not_assessable}
        </p>
      )}
    </div>
  );
}
