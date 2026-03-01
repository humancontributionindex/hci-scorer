"use client";

import { MIN_TEXT_LENGTH } from "@/lib/constants";
import styles from "./InputView.module.css";

interface InputViewProps {
  text: string;
  onTextChange: (text: string) => void;
  reflection: string;
  onReflectionChange: (reflection: string) => void;
  onSubmit: () => void;
  error: string | null;
  isLoading: boolean;
}

export default function InputView({
  text,
  onTextChange,
  reflection,
  onReflectionChange,
  onSubmit,
  error,
  isLoading,
}: InputViewProps) {
  const charCount = text.trim().length;
  const isShort = charCount > 0 && charCount < MIN_TEXT_LENGTH;

  return (
    <div>
      <div className={styles.section}>
        <label htmlFor="research-text" className={styles.label}>
          Paste your research text
        </label>
        <p className={styles.hint}>
          This can be an abstract, a chapter section, or any passage you wish to
          evaluate.
        </p>
        <textarea
          id="research-text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className={styles.textarea}
          placeholder="Paste your text here..."
        />
        <p className={isShort ? styles.charCountWarning : styles.charCount}>
          {charCount > 0 && (
            <>
              {charCount} character{charCount !== 1 ? "s" : ""}
              {isShort && ` (minimum ${MIN_TEXT_LENGTH})`}
            </>
          )}
        </p>
      </div>

      <div className={styles.section}>
        <label htmlFor="decision" className={styles.label}>
          What was your main intellectual decision in this section?
          <span className={styles.optionalTag}>Optional</span>
        </label>
        <p className={styles.hint}>
          Providing context helps the rubric assess contribution dimensions more
          accurately.
        </p>
        <input
          id="decision"
          type="text"
          value={reflection}
          onChange={(e) => onReflectionChange(e.target.value)}
          className={styles.reflectionInput}
          placeholder="e.g., I chose to frame the problem as a question of institutional trust rather than individual behavior."
        />
      </div>

      <div className={styles.submitSection}>
        <button
          className={styles.btnPrimary}
          onClick={onSubmit}
          disabled={isLoading}
        >
          Run HCI Assessment
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <hr className={styles.divider} />

      <div>
        <p className={styles.methodologyNote}>
          This tool applies the HCI scoring rubric to your text fragment.
          Fragment-level analysis is a preliminary estimate. The rubric is
          open-source and inspectable at{" "}
          <a
            href="https://github.com/humancontributionindex/hci-framework"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/humancontributionindex/hci-framework
          </a>
          . Your text is analyzed in real time and never stored.
        </p>
      </div>
    </div>
  );
}
