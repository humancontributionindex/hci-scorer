"use client";

import { useState } from "react";
import { HCIScore, AssessmentResponse } from "@/lib/types";
import styles from "./CitableBlock.module.css";

interface CitableBlockProps {
  hci: HCIScore;
  result: AssessmentResponse;
}

export default function CitableBlock({ hci, result }: CitableBlockProps) {
  const [copied, setCopied] = useState(false);

  const citableText = `This work received a preliminary HCI assessment using the Human Contribution Index v1.0 (fragment-level analysis). Estimated HCI: ${hci.low}\u2013${hci.high}/5.0 (${hci.assessed} of ${hci.total} dimensions assessed, ${result.confidence} confidence). The HCI is an open-source framework for evaluating authentic human intellectual contribution in research (Macario, Casadio & Chan, 2026). Methodology and scoring rubric: humancontributionindex.com`;

  const handleCopy = () => {
    navigator.clipboard.writeText(citableText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Citable Assessment Block</p>
      <div className={styles.block}>
        <p className={styles.blockText}>{citableText}</p>
      </div>
      <button className={styles.btnCopy} onClick={handleCopy}>
        {copied ? "Copied" : "Copy to clipboard"}
      </button>
    </div>
  );
}
