"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DEMO_DATA, type AnalysisData } from "../../lib/demo-data";
import { SellerHeader } from "@/components/seller-header";
import { TransactionTable } from "@/components/transaction-table";
import { AnalysisResults } from "@/components/analysis-results";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Sparkles } from "lucide-react";

function DashboardContent() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const searchParams = useSearchParams();
  const loadingSteps = [
    "Reading 90 days of transactions...",
    "Identifying recurring expense patterns...",
    "Modeling your weekly cash position...",
    "Generating your 4-week outlook...",
  ];

  async function handleAnalyze() {
    try {
      setLoading(true);

      const res = await fetch("/api/analyze", {
        method: "POST",
      });

      const data = await res.json();
      setAnalysisData(data);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const isDemoMode = searchParams.get("demo") === "true";
    if (isDemoMode && !analysisData) {
      setAnalysisData(DEMO_DATA);
    }
  }, [searchParams, analysisData]);

  useEffect(() => {
    if (!loading) {
      setActiveStep(0);
      return;
    }

    const timers = [
      setTimeout(() => setActiveStep(1), 1200),
      setTimeout(() => setActiveStep(2), 2400),
      setTimeout(() => setActiveStep(3), 3600),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [loading]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f0eb] px-6">
        <div className="w-full max-w-xl rounded-2xl border border-black/5 bg-white/60 p-8 shadow-sm backdrop-blur-sm">
          <div className="mb-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7a5d45]/80">
              Vista
            </p>
          </div>
          <div className="space-y-4">
            {loadingSteps.slice(0, activeStep + 1).map((step, idx) => {
              const isComplete = idx < activeStep;
              const isCurrent = idx === activeStep;
              return (
                <div
                  key={step}
                  className={`flex items-center gap-3 transition-opacity ${
                    isCurrent ? "opacity-100" : "opacity-80"
                  }`}
                >
                  {isComplete ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <Loader2 className="h-4.5 w-4.5 animate-spin text-[#7a5d45]" />
                  )}
                  <p
                    className={`text-left text-sm ${
                      isCurrent
                        ? "font-medium text-[#3f2e21]"
                        : "font-normal text-[#6c5644]"
                    }`}
                  >
                    {step}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <SellerHeader />
          {analysisData && <AnalysisResults data={analysisData} />}
          <TransactionTable />

          {!analysisData && (
            <div className="flex justify-center pt-2">
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={loading}
                className="h-12 w-full max-w-md gap-2 text-base font-semibold"
              >
                <>
                  <Sparkles className="h-5 w-5" />
                  Analyze My Cash Flow
                </>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  );
}
