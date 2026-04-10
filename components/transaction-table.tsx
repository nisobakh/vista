import { cn } from "@/lib/utils";

type Transaction = {
  date: string;
  amount: number;
  type: "sale" | "expense";
  category: string;
  description: string;
};

const transactions: Transaction[] = [
  {
    date: "2026-02-07",
    amount: 478.52,
    type: "sale",
    category: "food_sales",
    description: "Daily food truck sales",
  },
  {
    date: "2026-02-07",
    amount: -12.44,
    type: "expense",
    category: "processing_fees",
    description: "Processing fees",
  },
  {
    date: "2026-02-06",
    amount: -385.2,
    type: "expense",
    category: "produce",
    description: "Weekend produce and ingredients restock",
  },
  {
    date: "2026-02-06",
    amount: 512.3,
    type: "sale",
    category: "food_sales",
    description: "Daily food truck sales",
  },
  {
    date: "2026-02-05",
    amount: -75.0,
    type: "expense",
    category: "fuel",
    description: "Truck fuel refill",
  },
  {
    date: "2026-02-05",
    amount: 390.15,
    type: "sale",
    category: "food_sales",
    description: "Daily food truck sales",
  },
  {
    date: "2026-02-04",
    amount: -22.5,
    type: "expense",
    category: "supplies",
    description: "Napkins, utensils, and packaging",
  },
  {
    date: "2026-02-04",
    amount: 445.8,
    type: "sale",
    category: "food_sales",
    description: "Daily food truck sales",
  },
  {
    date: "2026-02-03",
    amount: -150.0,
    type: "expense",
    category: "insurance",
    description: "Monthly commercial vehicle insurance",
  },
  {
    date: "2026-02-03",
    amount: 289.6,
    type: "sale",
    category: "catering",
    description: "Office catering order",
  },
];

function formatAmount(amount: number) {
  const prefix = amount >= 0 ? "+" : "-";
  return `${prefix}$${Math.abs(amount).toFixed(2)}`;
}

function formatCategory(category: string) {
  return category
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatDate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function TransactionTable() {
  return (
    <section>
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Recent Transactions
      </h2>

      {/* Desktop table — hidden on mobile */}
      <div className="hidden sm:block overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="max-h-[420px] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/40">
                <th className="h-9 px-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-[100px]">
                  Date
                </th>
                <th className="h-9 px-4 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-[110px]">
                  Amount
                </th>
                <th className="h-9 px-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-[80px]">
                  Type
                </th>
                <th className="h-9 px-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-[120px]">
                  Category
                </th>
                <th className="h-9 px-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr
                  key={`${tx.date}-${tx.amount}-${i}`}
                  className="border-t border-border/50 transition-colors hover:bg-muted/30"
                >
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                    {tx.date}
                  </td>
                  <td
                    className={cn(
                      "px-4 py-2.5 text-right font-mono text-sm font-semibold",
                      tx.amount >= 0 ? "text-success" : "text-destructive"
                    )}
                  >
                    {formatAmount(tx.amount)}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={cn(
                        "inline-block rounded-full px-2 py-0.5 text-[11px] font-medium",
                        tx.type === "sale"
                          ? "bg-success-bg text-success"
                          : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-xs font-medium text-foreground">
                    {formatCategory(tx.category)}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">
                    {tx.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile card layout — hidden on desktop */}
      <div className="sm:hidden space-y-2">
        {transactions.map((tx, i) => (
          <div
            key={`${tx.date}-${tx.amount}-${i}`}
            className="rounded-lg border border-border bg-card px-4 py-3 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-block rounded-full px-2 py-0.5 text-[11px] font-medium",
                    tx.type === "sale"
                      ? "bg-success-bg text-success"
                      : "bg-destructive/10 text-destructive"
                  )}
                >
                  {tx.type}
                </span>
                <span className="text-xs font-medium text-foreground">
                  {formatCategory(tx.category)}
                </span>
              </div>
              <span
                className={cn(
                  "font-mono text-sm font-semibold",
                  tx.amount >= 0 ? "text-success" : "text-destructive"
                )}
              >
                {formatAmount(tx.amount)}
              </span>
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{tx.description}</p>
              <p className="ml-3 shrink-0 font-mono text-xs text-muted-foreground">
                {formatDate(tx.date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}