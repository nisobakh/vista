"use client";

import { cn } from "@/lib/utils";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Eye,
} from "lucide-react";

type WeekOutlook = {
  week: string;
  expected_in: number;
  expected_out: number;
  summary: string;
  tight: boolean;
};

type Insight = {
  title: string;
  insight: string;
  suggested_action: string;
  accentColor: "success" | "warning" | "info";
};

type NonObviousObservation =
  | string
  | {
      title?: string;
      body?: string;
    };

type AnalysisData = {
  outlook: WeekOutlook[];
  insights: Insight[];
  non_obvious_observation?: NonObviousObservation;
};

function formatMoney(amount?: number) {
  if (typeof amount !== "number") return "$0";
  return `$${amount.toLocaleString()}`;
}

const accentBorderMap = {
  success: "border-l-success",
  warning: "border-l-warning",
  info: "border-l-info",
} as const;

function WeekCard({ week }: { week: WeekOutlook }) {
  const net = (week?.expected_in ?? 0) - (week?.expected_out ?? 0);

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border p-4 transition-all",
        week.tight
          ? "border-warning/30 bg-warning-bg"
          : "border-border bg-card shadow-sm"
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {week.tight ? (
            <AlertTriangle className="h-4 w-4 text-warning" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-success" />
          )}
          <span className="text-sm font-semibold">{week.week}</span>
        </div>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            week.tight
              ? "bg-warning/15 text-warning"
              : "bg-success-bg text-success"
          )}
        >
          {week.tight ? "Tight" : "OK"}
        </span>
      </div>

      <div className="mb-1 flex items-center gap-1.5">
        <ArrowUpRight className="h-3.5 w-3.5 text-success" />
        <span className="font-mono text-sm font-medium text-success">
          {formatMoney(week.expected_in)}
        </span>
        <span className="text-xs text-muted-foreground">in</span>
      </div>

      <div className="mb-3 flex items-center gap-1.5">
        <ArrowDownLeft className="h-3.5 w-3.5 text-destructive/70" />
        <span className="font-mono text-sm font-medium text-foreground">
          {formatMoney(week.expected_out)}
        </span>
        <span className="text-xs text-muted-foreground">out</span>
      </div>

      <div className="mb-3 border-t border-border/60 pt-2">
        <span className="text-xs text-muted-foreground">Net: </span>
        <span
          className={cn(
            "font-mono text-xs font-semibold",
            net >= 0 ? "text-success" : "text-destructive"
          )}
        >
          {net >= 0 ? "+" : "-"}
          {formatMoney(Math.abs(net))}
        </span>
      </div>

      <p className="mt-auto text-xs leading-relaxed text-muted-foreground">
        {week.summary}
      </p>
    </div>
  );
}

function InsightCard({ insight }: { insight: Insight }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border border-l-4 bg-card p-5 shadow-sm",
        accentBorderMap[insight.accentColor]
      )}
    >
      <h4 className="mb-2 text-sm font-semibold">{insight.title}</h4>
      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
        {insight.insight}
      </p>
      <div className="rounded-md bg-muted/70 px-3 py-2.5">
        <p className="text-xs italic leading-relaxed text-foreground/70">
          <span className="not-italic font-semibold text-foreground/90">
            Suggested:{" "}
          </span>
          {insight.suggested_action}
        </p>
      </div>
    </div>
  );
}

export function AnalysisResults({ data }: { data: AnalysisData }) {
  if (!data) return null;

  const firstTightWeek = data.outlook?.find((week) => week.tight);
  const decisionMessage = firstTightWeek
    ? `${firstTightWeek.week} looks tight. Your expenses are projected to exceed income by ${formatMoney(
        Math.max(
          0,
          (firstTightWeek.expected_out ?? 0) - (firstTightWeek.expected_in ?? 0)
        )
      )}. Consider delaying any non-essential purchases until the following week.`
    : "You're in good shape this month. No major cash crunches ahead based on your patterns.";

  const renderNonObvious = () => {
    const obs = data.non_obvious_observation;
    if (!obs) return null;

    if (typeof obs === "string") {
      return {
        title: "Something You Might Have Missed",
        body: obs,
      };
    }

    return {
      title: obs.title ?? "Something You Might Have Missed",
      body: obs.body ?? "",
    };
  };

  const observation = renderNonObvious();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-10 duration-500">
      {/* Decision Prompt */}
      <section>
        <div className="rounded-lg border border-amber-300/40 bg-amber-50/60 p-5 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-900/90">
            Your most important decision this week
          </p>
          <p className="text-sm leading-relaxed text-amber-950/80">
            {decisionMessage}
          </p>
        </div>
      </section>

      {/* Weekly Outlook */}
      <section>
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          4-Week Outlook
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.outlook?.map((week) => (
            <WeekCard key={week.week} week={week} />
          ))}
        </div>
      </section>

      {/* Insights */}
      <section>
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Insights
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.insights?.map((insight) => (
            <InsightCard key={insight.title} insight={insight} />
          ))}
        </div>
      </section>

      {/* Something You Might Have Missed */}
      {observation && (
        <section>
          <div className="relative overflow-hidden rounded-lg border border-info/20 bg-gradient-to-br from-info-bg via-card to-info-bg p-6 shadow-sm">
            <div className="relative">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-info/10">
                  <Eye className="h-3.5 w-3.5 text-info" />
                </div>
                <h4 className="text-sm font-semibold">
                  {observation.title}
                </h4>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {observation.body}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
