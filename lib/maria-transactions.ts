export type MariaTransaction = {
  date: string;
  amount: number;
  type: string;
  category: string;
  description: string;
};

export function parseMariaTransactionsCsv(text: string): MariaTransaction[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const rows: MariaTransaction[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split("\t");
    if (parts.length < 5) continue;
    const amount = Number.parseFloat(parts[1]);
    if (Number.isNaN(amount)) continue;
    rows.push({
      date: parts[0],
      amount,
      type: parts[2],
      category: parts[3],
      description: parts[4],
    });
  }
  return rows;
}

function latestDateString(transactions: MariaTransaction[]): string {
  return transactions.reduce((max, tx) => (tx.date > max ? tx.date : max), transactions[0].date);
}

/** Inclusive window of `days` days ending on `endIso` (YYYY-MM-DD). */
function startDateForLastNDays(endIso: string, days: number): string {
  const end = new Date(`${endIso}T12:00:00`);
  const start = new Date(end);
  start.setDate(start.getDate() - (days - 1));
  const y = start.getFullYear();
  const m = String(start.getMonth() + 1).padStart(2, "0");
  const d = String(start.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Sum of all amounts in the last 7 days relative to the latest transaction in the file. */
export function netLast7Days(transactions: MariaTransaction[]): number {
  if (transactions.length === 0) return 0;
  const end = latestDateString(transactions);
  const start = startDateForLastNDays(end, 7);
  return transactions
    .filter((tx) => tx.date >= start && tx.date <= end)
    .reduce((sum, tx) => sum + tx.amount, 0);
}

/** Largest single negative amount in the same calendar month as the latest transaction. */
export function biggestExpenseInLatestMonth(transactions: MariaTransaction[]): number {
  if (transactions.length === 0) return 0;
  const latest = latestDateString(transactions);
  const monthPrefix = latest.slice(0, 7);
  let min = 0;
  for (const tx of transactions) {
    if (!tx.date.startsWith(monthPrefix)) continue;
    if (tx.amount < min) min = tx.amount;
  }
  return min;
}
