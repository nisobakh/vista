"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  biggestExpenseInLatestMonth,
  netLast7Days,
  parseMariaTransactionsCsv,
  type MariaTransaction,
} from "@/lib/maria-transactions";

function formatMoneySigned(amount: number) {
  const prefix = amount >= 0 ? "+" : "-";
  return `${prefix}$${Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatExpense(amount: number) {
  if (amount === 0) return "—";
  return `-$${Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function DashboardSummaryBar() {
  const [transactions, setTransactions] = useState<MariaTransaction[] | null>(
    null
  );

  useEffect(() => {
    let cancelled = false;
    fetch("/maria_transactions.csv")
      .then((res) => res.text())
      .then((text) => {
        if (cancelled) return;
        setTransactions(parseMariaTransactionsCsv(text));
      })
      .catch(() => {
        if (!cancelled) setTransactions([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const net7 =
    transactions === null ? null : netLast7Days(transactions);
  const biggest =
    transactions === null ? null : biggestExpenseInLatestMonth(transactions);

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-sm">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Net Last 7 Days
        </p>
        <p
          className={cn(
            "mt-1 font-mono text-lg font-semibold tabular-nums",
            net7 === null && "text-muted-foreground",
            net7 !== null && net7 > 0 && "text-success",
            net7 !== null && net7 < 0 && "text-destructive",
            net7 !== null && net7 === 0 && "text-foreground"
          )}
        >
          {net7 === null ? "…" : formatMoneySigned(net7)}
        </p>
      </div>
      <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-sm">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Biggest Expense This Month
        </p>
        <p
          className={cn(
            "mt-1 font-mono text-lg font-semibold tabular-nums",
            biggest === null && "text-muted-foreground",
            biggest !== null && biggest < 0 && "text-destructive",
            biggest !== null && biggest === 0 && "text-muted-foreground"
          )}
        >
          {biggest === null ? "…" : formatExpense(biggest)}
        </p>
      </div>
      <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-sm">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Next Known Bill
        </p>
        <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">
          Commissary ~$1,800
        </p>
      </div>
    </section>
  );
}
