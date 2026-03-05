"use client";

import Link from "next/link";
import { MIN_TEXT_LENGTH } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface InputViewProps {
  researchField: string;
  onResearchFieldChange: (field: string) => void;
  text: string;
  onTextChange: (text: string) => void;
  onSubmit: () => void;
  error: string | null;
  isLoading: boolean;
}

export default function InputView({
  researchField,
  onResearchFieldChange,
  text,
  onTextChange,
  onSubmit,
  error,
  isLoading,
}: InputViewProps) {
  const charCount = text.trim().length;
  const isShort = charCount > 0 && charCount < MIN_TEXT_LENGTH;

  return (
    <div>
      <div className="mb-6">
        <label
          htmlFor="research-field"
          className="block font-sans text-sm font-semibold text-foreground mb-1"
        >
          Research field
        </label>
        <p className="font-sans text-xs text-muted-foreground mb-2">
          e.g., Cognitive Psychology, Machine Learning, Legal Studies
        </p>
        <Input
          id="research-field"
          type="text"
          value={researchField}
          onChange={(e) => onResearchFieldChange(e.target.value)}
          className="font-sans text-sm"
          placeholder="Enter your research field..."
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="research-text"
          className="block font-sans text-sm font-semibold text-foreground mb-1"
        >
          Paste your research text
        </label>
        <p className="font-sans text-xs text-muted-foreground mb-2">
          This can be an abstract, a chapter section, or any passage you wish to
          evaluate.
        </p>
        <Textarea
          id="research-text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className="min-h-[200px] font-serif text-base leading-[1.7] resize-y"
          placeholder="Paste your text here..."
        />
        <p
          className={cn(
            "font-sans text-xs text-right mt-1 min-h-[1.2em]",
            isShort ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {charCount > 0 && (
            <>
              {charCount} character{charCount !== 1 ? "s" : ""}
              {isShort && ` (minimum ${MIN_TEXT_LENGTH})`}
            </>
          )}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button onClick={onSubmit} disabled={isLoading}>
          Run HCI Assessment
        </Button>
        <Button
          variant="outline"
          className="border-foreground hover:bg-secondary"
          asChild
        >
          <Link href="/framework">View the scoring framework</Link>
        </Button>
        {error && (
          <p className="font-sans text-sm text-destructive mt-3 sm:self-center">{error}</p>
        )}
      </div>

      <Separator className="my-8" />

      <div>
        <p className="font-sans text-xs text-muted-foreground leading-relaxed [&_a]:underline [&_a]:transition-colors hover:[&_a]:text-foreground">
          This tool applies the HCI scoring rubric to your text fragment.
          Fragment-level analysis is a preliminary estimate. The rubric is
          open-source and inspectable{" "}
          <Link href="/framework">
            here
          </Link>
          . Your text is analyzed in real time and never stored.
        </p>
      </div>
    </div>
  );
}
