"use client";

import { useEffect, useState } from "react";
import {
  parseMariaTransactionsCsv,
  netLast7Days,
} from "@/lib/maria-transactions";

const BANK_BALANCE = 4100;
const NEXT_BILL_AMOUNT = 1800;
const NEXT_BILL_LABEL = "Commissary";
const NEXT_BILL_DAYS = 6;

export default function WidgetPage() {
  const [net7, setNet7] = useState<number | null>(null);

  useEffect(() => {
    fetch("/maria_transactions.csv")
      .then((res) => res.text())
      .then((text) => {
        const txs = parseMariaTransactionsCsv(text);
        setNet7(netLast7Days(txs));
      })
      .catch(() => setNet7(0));
  }, []);

  const realBalance = BANK_BALANCE - NEXT_BILL_AMOUNT;
  const isHealthy = realBalance > 500;

  return (
    <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">

        {/* Page header */}
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7a5d45]/80">
            Vista
          </p>
          <p className="mt-1 text-sm text-[#6b5543]">
            Real-Balance Widget — Preview
          </p>
        </div>

        {/* The widget itself */}
        <div className="rounded-2xl border border-black/8 bg-white shadow-sm overflow-hidden">
          {/* Widget header */}
          <div className="px-5 pt-5 pb-3">
            <p className="text-xs font-medium uppercase tracking-wider text-[#7a5d45]/70">
              Maria's Tacos
            </p>
            <p className="mt-0.5 text-[11px] text-[#9a7d6b]">
              What you can actually spend
            </p>
          </div>

          {/* The number */}
          <div className="px-5 pb-4">
            <p
              className={`font-mono text-5xl font-bold tabular-nums tracking-tight ${
                isHealthy ? "text-[#1a6b3c]" : "text-[#b84c38]"
              }`}
            >
              ${realBalance.toLocaleString()}
            </p>
            <p className="mt-1.5 text-xs text-[#7a5d45]">
              Bank balance after upcoming bills
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-black/5" />

          {/* Breakdown */}
          <div className="px-5 py-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#7a5d45]">Bank balance</span>
              <span className="font-mono text-xs font-medium text-[#3f2e21]">
                ${BANK_BALANCE.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#7a5d45]">
                {NEXT_BILL_LABEL} in {NEXT_BILL_DAYS} days
              </span>
              <span className="font-mono text-xs font-medium text-[#b84c38]">
                −${NEXT_BILL_AMOUNT.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-black/5 pt-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#3f2e21]">
                Real balance
              </span>
              <span
                className={`font-mono text-xs font-bold ${
                  isHealthy ? "text-[#1a6b3c]" : "text-[#b84c38]"
                }`}
              >
                ${realBalance.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Context below widget */}
        <div className="rounded-xl border border-black/5 bg-white/60 px-4 py-4 space-y-3">
          <p className="text-xs font-semibold text-[#3f2e21]">
            What this replaces
          </p>
          <p className="text-xs leading-relaxed text-[#6b5543]">
            Most food truck owners check their bank app 4–5 times a day. 
            That number shows $4,100 and feels okay — but it doesn't account 
            for the commissary bill landing in 6 days.
          </p>
          <p className="text-xs leading-relaxed text-[#6b5543]">
            The real-balance widget shows the number your bank app should show 
            you but doesn't. Designed to live on a phone home screen.
          </p>
        </div>

        {/* Net 7 days stat */}
        <div className="rounded-xl border border-black/5 bg-white/60 px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-[#7a5d45]">Net last 7 days</span>
          <span className="font-mono text-sm font-semibold text-[#1a6b3c]">
            {net7 === null ? "…" : `+$${net7.toLocaleString()}`}
          </span>
        </div>

        {/* Link back */}
        <p className="text-center text-xs text-[#9a7d6b]">
          
            href="/dashboard?demo=true"
            className="underline underline-offset-2 hover:text-[#6b5543]"
          >
            See full 4-week outlook →
          </a>
        </p>
      </div>
    </div>
  );
}