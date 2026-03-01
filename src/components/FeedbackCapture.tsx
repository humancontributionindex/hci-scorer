"use client";

import { useState } from "react";
import styles from "./FeedbackCapture.module.css";

export default function FeedbackCapture() {
  const [feedback, setFeedback] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim() || submitting) return;
    setSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback_text: feedback }),
      });
      setDone(true);
    } catch {
      // Silently fail — non-critical
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <p className={styles.success}>
        Thank you &mdash; your feedback contributes to the open-source HCI
        framework.
      </p>
    );
  }

  return (
    <div>
      <p className={styles.label}>Help improve the HCI</p>
      <div className={styles.row}>
        <input
          className={styles.input}
          type="text"
          placeholder="Your feedback or suggestion..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          className={styles.btn}
          onClick={handleSubmit}
          disabled={submitting}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
