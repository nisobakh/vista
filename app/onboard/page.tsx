"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEP1_OPTIONS = [
  "Food Truck",
  "Restaurant",
  "Catering",
  "Other",
] as const;

const STEP2_OPTIONS = [
  "Running short before a big expense",
  "Not knowing if I can afford to restock",
  "Irregular income week to week",
  "Something else",
] as const;

const STEP3_OPTIONS = [
  "Commissary or kitchen rent",
  "Equipment repair or purchase",
  "Payroll",
  "Nothing major right now",
] as const;

type Step1 = (typeof STEP1_OPTIONS)[number] | null;
type Step2 = (typeof STEP2_OPTIONS)[number] | null;
type Step3 = (typeof STEP3_OPTIONS)[number] | null;

function OptionCard({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors",
        selected
          ? "border-[#7a5d45] bg-white shadow-sm ring-2 ring-[#7a5d45]/20 text-[#3f2e21]"
          : "border-black/5 bg-white/60 text-[#5a4636] hover:border-black/10 hover:bg-white/80"
      )}
    >
      {label}
    </button>
  );
}

export default function OnboardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState<Step1>(null);
  const [worry, setWorry] = useState<Step2>(null);
  const [bigExpense, setBigExpense] = useState<Step3>(null);

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <main className="mx-auto w-full max-w-lg px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-center text-xs font-medium uppercase tracking-[0.16em] text-[#7a5d45]/80">
          Vista
        </p>
        <p className="mt-3 text-center text-sm text-[#6b5543]">
          Step {step} of 3
        </p>

        <div className="mt-8 rounded-2xl border border-black/5 bg-white/65 p-6 shadow-sm sm:p-8">
          {step === 1 && (
            <>
              <h1 className="text-lg font-semibold text-[#3f2e21] sm:text-xl">
                What kind of business do you run?
              </h1>
              <div className="mt-6 flex flex-col gap-3">
                {STEP1_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={businessType === opt}
                    onSelect={() => setBusinessType(opt)}
                  />
                ))}
              </div>
              <Button
                className="mt-8 w-full h-11 text-base font-semibold"
                disabled={!businessType}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-lg font-semibold text-[#3f2e21] sm:text-xl">
                What&apos;s your biggest financial worry right now?
              </h1>
              <div className="mt-6 flex flex-col gap-3">
                {STEP2_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={worry === opt}
                    onSelect={() => setWorry(opt)}
                  />
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row-reverse">
                <Button
                  className="h-11 flex-1 text-base font-semibold"
                  disabled={!worry}
                  onClick={() => setStep(3)}
                >
                  Continue
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 flex-1 border-black/10 bg-white/60 text-[#5a4636] hover:bg-white/80"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-lg font-semibold text-[#3f2e21] sm:text-xl">
                Any big expenses coming up this month?
              </h1>
              <div className="mt-6 flex flex-col gap-3">
                {STEP3_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={bigExpense === opt}
                    onSelect={() => setBigExpense(opt)}
                  />
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row-reverse">
                <Button
                  className="h-11 flex-1 text-base font-semibold"
                  disabled={!bigExpense}
                  onClick={() => router.push("/dashboard")}
                >
                  See My Outlook
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 flex-1 border-black/10 bg-white/60 text-[#5a4636] hover:bg-white/80"
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
