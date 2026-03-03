"use client";

import { useAssessment } from "@/hooks/useAssessment";
import Header from "@/components/Header";
import InputView from "@/components/InputView";
import LoadingState from "@/components/LoadingState";
import ResultView from "@/components/ResultView";
import Counter from "@/components/Counter";
import Footer from "@/components/Footer";

export default function Home() {
  const assessment = useAssessment();

  return (
    <main className="min-h-screen px-5 pt-12 pb-20 max-[480px]:px-4 max-[480px]:pt-8 max-[480px]:pb-12">
      <div className="max-w-content mx-auto">
        <Header />

        {(assessment.appState === "input" ||
          assessment.appState === "error") && (
          <InputView
            text={assessment.text}
            onTextChange={assessment.setText}
            reflection={assessment.reflection}
            onReflectionChange={assessment.setReflection}
            onSubmit={assessment.runAssessment}
            error={assessment.error}
            isLoading={false}
          />
        )}

        {assessment.appState === "loading" && <LoadingState />}

        {assessment.appState === "result" &&
          assessment.result &&
          assessment.hci &&
          assessment.confidence && (
            <ResultView
              result={assessment.result}
              hci={assessment.hci}
              confidence={assessment.confidence}
              onReset={assessment.reset}
            />
          )}

        <Counter count={assessment.globalCount} />
        <Footer />
      </div>
    </main>
  );
}
