import type { Metadata } from "next";
import ChallengePage from "@/components/challenge/ChallengePage";

export const metadata: Metadata = {
  title: "Can You Spot the Human? | HCI Challenge",
  description:
    "Test your research instinct. Judge AI-scored abstracts across the dimensions that define genuine human contribution.",
};

export default function ChallengeRoute() {
  return <ChallengePage />;
}
