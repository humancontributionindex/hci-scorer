import { DimensionDef, DimensionResult } from "@/lib/types";
import { cn } from "@/lib/utils";

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
  const anchorText =
    scored && result.score! >= 1 && result.score! <= 5
      ? dimension.anchors[result.score!]
      : null;

  return (
    <div className={cn("py-5", !isLast && "border-b border-border")}>
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="font-sans text-base font-semibold text-foreground">
          {dimension.name}
        </h3>
        <span
          className={cn(
            "font-sans text-sm font-semibold",
            scored ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {scored ? `${result.score}/5` : "N/A"}
        </span>
      </div>

      <p className="font-sans text-xs text-muted-foreground mb-3">
        Weight: {dimension.weight * 100}% &mdash; {dimension.short}
      </p>

      {scored && result.evidence && (
        <div>
          <p className="font-sans text-xs font-semibold text-foreground mb-1">
            Evidence:
          </p>
          <p className="text-sm leading-[1.7] text-foreground mb-3">
            {result.evidence}
          </p>
        </div>
      )}

      {scored && anchorText && (
        <p className="font-sans text-xs text-muted-foreground">
          <span className="font-semibold">
            Rubric anchor ({result.score}/5):
          </span>{" "}
          {anchorText}
        </p>
      )}

      {!scored && result.not_assessable && (
        <p className="text-sm italic text-muted-foreground leading-[1.7]">
          Not assessable from this fragment: {result.not_assessable}
        </p>
      )}
    </div>
  );
}
