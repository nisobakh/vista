"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileDown, LineChart, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const OTHER = "Other" as const;

const STEP1_OPTIONS = [
  "Food Truck",
  "Restaurant",
  "Catering",
  OTHER,
] as const;

const STEP2_OPTIONS = [
  "I never know if I can cover next week's expenses",
  "Big bills hit and I'm not ready for them",
  "My income is too unpredictable to plan around",
  "I spend more at Restaurant Depot than I realize",
  OTHER,
] as const;

const STEP3_OPTIONS = [
  "Commissary or kitchen rent",
  "Equipment repair or purchase",
  "Payroll",
  "Nothing major right now",
  OTHER,
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
        "w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3d3530]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f0eb]",
        selected
          ? "border-[#3d3530] bg-white shadow-sm text-[#3f2e21]"
          : "border-black/5 bg-white/60 text-[#5a4636] hover:border-black/10 hover:bg-white/80"
      )}
    >
      {label}
    </button>
  );
}

function OptionalOtherField({
  visible,
  value,
  onChange,
}: {
  visible: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  if (!visible) return null;
  return (
    <div className="mt-3">
      <Input
        placeholder="Tell us more (optional)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 border-black/10 bg-white/80 text-sm text-[#3f2e21] placeholder:text-[#6b5543]/70 focus-visible:border-[#3d3530]/50 focus-visible:ring-[#3d3530]/30"
      />
    </div>
  );
}

export default function OnboardPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [businessType, setBusinessType] = useState<Step1>(null);
  const [worry, setWorry] = useState<Step2>(null);
  const [bigExpense, setBigExpense] = useState<Step3>(null);
  const [otherBusiness, setOtherBusiness] = useState("");
  const [otherWorry, setOtherWorry] = useState("");
  const [otherExpense, setOtherExpense] = useState("");

  const displayedStep = step + 1;

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <main className="mx-auto w-full max-w-lg px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-center text-xs font-medium uppercase tracking-[0.16em] text-[#7a5d45]/80">
          Vista
        </p>
        <p className="mt-3 text-center text-sm text-[#6b5543]">
          Step {displayedStep} of 4
        </p>

        <div className="mt-8 rounded-2xl border border-black/5 bg-white/65 p-6 shadow-sm sm:p-8">
          {step === 0 && (
            <>
              <p className="text-xs font-medium uppercase tracking-wider text-[#7a5d45]/75">
                Before we get started
              </p>
              <h1 className="mt-2 text-lg font-semibold text-[#3f2e21] sm:text-xl">
                How Vista works
              </h1>
              <ul className="mt-6 space-y-4">
                <li className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/5 bg-white/70 text-[#7a5d45]">
                    <FileDown className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm leading-relaxed text-[#5a4636]">
                    Export 90 days of transactions from Square, Toast, or your
                    bank app as a CSV
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/5 bg-white/70 text-[#7a5d45]">
                    <Upload className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm leading-relaxed text-[#5a4636]">
                    Upload your CSV — Vista reads your patterns automatically
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/5 bg-white/70 text-[#7a5d45]">
                    <LineChart className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm leading-relaxed text-[#5a4636]">
                    Get a plain-language 4-week outlook with specific actions
                  </p>
                </li>
              </ul>
              <p className="mt-6 rounded-lg border border-amber-200/60 bg-amber-50/50 px-3 py-2.5 text-xs leading-relaxed text-[#6b5543]">
                Square API integration coming soon — for now, a quick CSV export
                takes about 30 seconds
              </p>
              <Button
                className="mt-8 w-full h-11 text-base font-semibold"
                onClick={() => setStep(1)}
              >
                Got it, let&apos;s go →
              </Button>
            </>
          )}

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
                    onSelect={() => {
                      setBusinessType(opt);
                      if (opt !== OTHER) setOtherBusiness("");
                    }}
                  />
                ))}
              </div>
              <OptionalOtherField
                visible={businessType === OTHER}
                value={otherBusiness}
                onChange={setOtherBusiness}
              />
              <Button
                className="mt-8 w-full h-11 text-base font-semibold"
                disabled={!businessType}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
              <Button
                type="button"
                variant="outline"
                className="mt-3 w-full h-11 border-black/10 bg-white/60 text-[#5a4636] hover:bg-white/80"
                onClick={() => setStep(0)}
              >
                Back
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
                    onSelect={() => {
                      setWorry(opt);
                      if (opt !== OTHER) setOtherWorry("");
                    }}
                  />
                ))}
              </div>
              <OptionalOtherField
                visible={worry === OTHER}
                value={otherWorry}
                onChange={setOtherWorry}
              />
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
                    onSelect={() => {
                      setBigExpense(opt);
                      if (opt !== OTHER) setOtherExpense("");
                    }}
                  />
                ))}
              </div>
              <OptionalOtherField
                visible={bigExpense === OTHER}
                value={otherExpense}
                onChange={setOtherExpense}
              />
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
