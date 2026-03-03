"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <p className="font-sans text-sm text-success">
        Thank you &mdash; your feedback contributes to the open-source HCI
        framework.
      </p>
    );
  }

  return (
    <div>
      <p className="font-sans text-sm font-semibold text-foreground mb-1">
        Help improve the HCI
      </p>
      <div className="flex gap-2 mt-2 max-[480px]:flex-col">
        <Input
          type="text"
          placeholder="Your feedback or suggestion..."
          className="flex-1 font-sans text-sm"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <Button
          variant="outline"
          className="border-foreground hover:bg-secondary whitespace-nowrap"
          onClick={handleSubmit}
          disabled={submitting}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
