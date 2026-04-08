"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DEMO_DATA, type AnalysisData } from "../lib/demo-data";
import { SellerHeader } from "@/components/seller-header";
import { TransactionTable } from "@/components/transaction-table";
import { AnalysisResults } from "@/components/analysis-results";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

function PageContent() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

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

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <SellerHeader />
          <TransactionTable />

          {!analysisData && (
            <div className="flex justify-center pt-2">
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={loading}
                className="h-12 w-full max-w-md gap-2 text-base font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Analyze My Cash Flow
                  </>
                )}
              </Button>
            </div>
          )}

          {analysisData && <AnalysisResults data={analysisData} />}
        </div>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}
