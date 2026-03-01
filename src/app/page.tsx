"use client";

import { useAssessment } from "@/hooks/useAssessment";
import Header from "@/components/Header";
import InputView from "@/components/InputView";
import LoadingState from "@/components/LoadingState";
import ResultView from "@/components/ResultView";
import Counter from "@/components/Counter";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  const assessment = useAssessment();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
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
