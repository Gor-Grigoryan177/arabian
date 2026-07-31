"use client";

import { cn } from "@/lib/utils";

export interface QuizOption {
  value: string;
  label: string;
}

interface QuizStepProps {
  question: string;
  options: QuizOption[];
  selected: string | undefined;
  onSelect: (value: string) => void;
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  isLast: boolean;
  nextLabel?: string;
}

export function QuizStep({
  question,
  options,
  selected,
  onSelect,
  stepIndex,
  totalSteps,
  onNext,
  isLast,
  nextLabel,
}: QuizStepProps) {
  return (
    <div>
      <div
        className="mb-8 flex justify-center gap-2"
        role="progressbar"
        aria-valuenow={stepIndex + 1}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
      >
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors",
              i <= stepIndex ? "bg-gold" : "bg-border"
            )}
          />
        ))}
      </div>

      <h3 className="mb-8 text-center font-display text-[28px] font-light text-warmwhite">
        {question}
      </h3>

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={selected === opt.value}
            onClick={() => onSelect(opt.value)}
            className={cn(
              "rounded-full border border-border px-7 py-3 text-[13px] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/[0.06] hover:text-gold",
              selected === opt.value &&
                "scale-105 border-gold bg-gold/[0.06] text-gold shadow-[0_8px_24px_rgba(200,169,110,0.1)]"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onNext}
          disabled={!selected}
          className={cn(
            "rounded-sm px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-all",
            isLast
              ? "bg-gold text-black hover:bg-gold-light disabled:opacity-40"
              : "border border-gold-dim text-gold hover:border-gold disabled:opacity-40"
          )}
        >
          {nextLabel ?? (isLast ? "Find My Scent \u2192" : "Next \u2192")}
        </button>
      </div>
    </div>
  );
}
