"use client";

import { useState } from "react";
import { HCIScore, AssessmentResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";

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
    <div className="mb-2">
      <h2 className="font-sans text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
        Citable Assessment Block
      </h2>
      <div className="bg-secondary p-5 rounded-lg mb-3">
        <p className="text-sm italic leading-[1.7] text-foreground">
          {citableText}
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="border-foreground hover:bg-secondary"
        onClick={handleCopy}
      >
        {copied ? "Copied" : "Copy to clipboard"}
      </Button>
    </div>
  );
}
