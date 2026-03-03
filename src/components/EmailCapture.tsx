"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <p className="font-sans text-sm text-success">
        You&apos;re on the early access list.
      </p>
    );
  }

  return (
    <div>
      <p className="font-sans text-sm font-semibold text-foreground mb-1">
        Full-document HCI assessment &mdash; coming soon
      </p>
      <div className="flex gap-2 mt-2 max-[480px]:flex-col">
        <Input
          type="email"
          placeholder="your@email.edu"
          className="flex-1 font-sans text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <Button
          variant="outline"
          className="border-foreground hover:bg-secondary whitespace-nowrap"
          onClick={handleSubmit}
          disabled={submitting}
        >
          Notify me
        </Button>
      </div>
    </div>
  );
}
