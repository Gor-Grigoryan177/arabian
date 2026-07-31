"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { QuizStep, type QuizOption } from "./QuizStep";
import { QuizResult } from "./QuizResult";
import { getQuizRecommendations } from "@/lib/products";
import { useTranslations } from "@/hooks/useLocale";
import type { Product } from "@/types/product";

interface QuizAnswers {
  gender?: "Male" | "Female" | "Unisex";
  profile?: "Sweet" | "Fresh" | "Woody" | "Spicy";
  occasion?: "Daily" | "Evening" | "Both";
  strength?: "Soft" | "Moderate" | "Strong";
}

const STEPS: {
  key: keyof QuizAnswers;
  question: string;
  options: QuizOption[];
}[] = [
  {
    key: "gender",
    question: "Who is this fragrance for?",
    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
      { value: "Unisex", label: "Unisex" },
    ],
  },
  {
    key: "profile",
    question: "What scent profile do you prefer?",
    options: [
      { value: "Sweet", label: "Sweet & Warm" },
      { value: "Fresh", label: "Fresh & Light" },
      { value: "Woody", label: "Woody & Deep" },
      { value: "Spicy", label: "Spicy & Bold" },
    ],
  },
  {
    key: "occasion",
    question: "When will you wear it?",
    options: [
      { value: "Daily", label: "Daily wear" },
      { value: "Evening", label: "Evening & special" },
      { value: "Both", label: "Both" },
    ],
  },
  {
    key: "strength",
    question: "How strong do you like it?",
    options: [
      { value: "Soft", label: "Soft & subtle" },
      { value: "Moderate", label: "Moderate" },
      { value: "Strong", label: "Strong & powerful" },
    ],
  },
];

export function FragranceQuiz() {
  const t = useTranslations();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [results, setResults] = useState<Product[] | null>(null);

  const currentStep = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  function handleSelect(value: string) {
    setAnswers((prev) => ({ ...prev, [currentStep!.key]: value }));
  }

  function handleNext() {
    if (isLast) {
      setResults(getQuizRecommendations(answers));
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  function handleReset() {
    setStepIndex(0);
    setAnswers({});
    setResults(null);
  }

  return (
    <section id="quiz" className="border-t border-border py-14">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader
          eyebrow={t.sections.fragranceFinder}
          title={t.sections.findYourScent}
          align="center"
        />

        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-lg border border-border bg-gradient-to-br from-surface/90 to-deep/95 p-10 sm:p-16">
          {results ? (
            <QuizResult results={results} onReset={handleReset} />
          ) : (
            <QuizStep
              question={currentStep!.question}
              options={currentStep!.options}
              selected={answers[currentStep!.key]}
              onSelect={handleSelect}
              stepIndex={stepIndex}
              totalSteps={STEPS.length}
              onNext={handleNext}
              isLast={isLast}
            />
          )}
        </div>
      </div>
    </section>
  );
}
