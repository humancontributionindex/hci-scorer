"use client";

import { useState } from "react";
import styles from "./EmailCapture.module.css";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email.includes("@") || submitting) return;
    setSubmitting(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
        You&apos;re on the early access list.
      </p>
    );
  }

  return (
    <div>
      <p className={styles.label}>
        Full-document HCI assessment &mdash; coming soon
      </p>
      <div className={styles.row}>
        <input
          className={styles.input}
          type="email"
          placeholder="your@email.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          className={styles.btn}
          onClick={handleSubmit}
          disabled={submitting}
        >
          Notify me
        </button>
      </div>
    </div>
  );
}
