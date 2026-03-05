"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { DIMENSIONS } from "@/lib/constants";
import { DimensionResult } from "@/lib/types";

interface DimensionRadarChartProps {
  dimensions: Record<string, DimensionResult>;
}

const SHORT_NAMES: Record<string, string> = {
  conceptual_direction: "Conceptual",
  creative_synthesis: "Creative",
  critical_judgment: "Critical",
  ethical_reasoning: "Ethical",
  scholarly_voice: "Scholarly",
};

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--foreground))",
  },
} satisfies ChartConfig;

export default function DimensionRadarChart({
  dimensions,
}: DimensionRadarChartProps) {
  const chartData = DIMENSIONS.map((dim) => {
    const d = dimensions[dim.key];
    return {
      dimension: SHORT_NAMES[dim.key] || dim.name,
      score: d?.score ?? 0,
      fullMark: 5,
    };
  });

  const hasNA = DIMENSIONS.some((dim) => {
    const d = dimensions[dim.key];
    return !d || d.score === null;
  });

  return (
    <div className="mb-6">
      <ChartContainer config={chartConfig} className="mx-auto min-h-[280px] max-w-[360px]">
        <RadarChart data={chartData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{
              fontSize: 12,
              fill: "hsl(var(--muted-foreground))",
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tickCount={6}
            tick={false}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="hsl(var(--foreground))"
            fill="hsl(var(--foreground))"
            fillOpacity={0.15}
            strokeWidth={1.5}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => [`${value}/5 Score`]}
              />
            }
          />
        </RadarChart>
      </ChartContainer>
      {hasNA && (
        <p className="text-center font-sans text-xs text-muted-foreground mt-2">
          Dimensions scored N/A appear as 0 on the chart.
        </p>
      )}
    </div>
  );
}
