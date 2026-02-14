import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export function TransactionTable() {
  return (
    <section>
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Recent Transactions
      </h2>
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="max-h-[420px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="h-9 w-[100px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Date
                </TableHead>
                <TableHead className="h-9 w-[110px] text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Amount
                </TableHead>
                <TableHead className="h-9 w-[80px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Type
                </TableHead>
                <TableHead className="h-9 w-[120px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Category
                </TableHead>
                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Description
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx, i) => (
                <TableRow
                  key={`${tx.date}-${tx.amount}-${i}`}
                  className="transition-colors hover:bg-muted/30"
                >
                  <TableCell className="py-2.5 font-mono text-xs text-muted-foreground">
                    {tx.date}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "py-2.5 text-right font-mono text-sm font-semibold",
                      tx.amount >= 0 ? "text-success" : "text-destructive"
                    )}
                  >
                    {formatAmount(tx.amount)}
                  </TableCell>
                  <TableCell className="py-2.5">
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
                  </TableCell>
                  <TableCell className="py-2.5 text-xs font-medium text-foreground">
                    {formatCategory(tx.category)}
                  </TableCell>
                  <TableCell className="py-2.5 text-xs text-muted-foreground">
                    {tx.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
