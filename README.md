# Vista

**A 30-day cash flow tool for food truck owners and small local businesses.**

[Live Demo](https://vista-cash.vercel.app/dashboard?demo=true) · [Widget Preview](https://vista-cash.vercel.app/widget) · [Try It](https://vista-cash.vercel.app)

---

## What Vista does

Most small business owners check their bank app 4–5 times a day. That number feels like information. It isn't.

A food truck owner with $4,100 in their account feels okay — until you account for the $1,800 commissary bill landing in 6 days and the $400 produce restock due Tuesday. Their real available balance is closer to $1,900. Nothing in their current toolset tells them that.

Vista takes 90 days of transaction data and answers one question: **"Given what's coming, am I actually okay this week?"**

It produces a plain-language 4-week outlook with labeled cash positions (OK / TIGHT / AT RISK), behavioral insights grounded in the actual transaction patterns, and a single most-important decision for the current week.

---

## Why I built this

I interviewed 5 food truck owners in Bastrop and Austin, TX before writing a line of code. I went to their trucks, asked about their last 3 days in detail, and listened.

Every single owner knew their bank balance. None of them could confidently answer whether they were ahead or behind right now. They weren't missing data — they had a false sense of visibility.

The interviews broke my initial assumption (that they needed better dashboards and trend analysis) and led directly to the product decision that makes Vista work: don't explain the data, replace the need to think through it.

---

## Product decisions worth noting

**Why forward-looking weekly positions instead of historical summaries**
V1 and V2 of Vista produced categorized transaction summaries and spending pattern analysis. Both failed the same test: they required interpretation. An owner standing at a grill at 11am does not have time to analyze. V3 shifted entirely to forward-looking weekly cash positions with plain-language labels. That single decision changed everything.

**Why CSV upload instead of bank API integration**
Plaid and similar bank connection APIs add significant complexity, cost, and compliance requirements. Most food truck owners already use Square, which exports a clean CSV in under 30 seconds. For an MVP, CSV upload is the honest, fast, and user-appropriate choice. Square API integration is the planned v2.

**Why hardcoded demo data instead of live API calls on page load**
Every visit to the demo URL triggers real computation. Using static fixture data for the demo eliminates unnecessary API costs, ensures consistent output quality for every reviewer, and loads instantly. The real analysis flow still calls the API when a user clicks Generate.

**Why prompt engineering over fine-tuning**
The analysis quality comes entirely from prompt architecture — not model fine-tuning. The system prompt specifies the exact JSON output format, instructs the model to avoid financial jargon, references the specific user persona, and prohibits invented precision. Three iteration cycles were required to get outputs that matched how owners actually think about their weeks.

---

## Technical architecture
```
app/
├── page.tsx              # Landing page
├── onboard/page.tsx      # 4-step onboarding flow
├── dashboard/page.tsx    # Main product dashboard
├── widget/page.tsx       # Real-balance widget preview
└── api/analyze/route.ts  # GPT-4o analysis endpoint

lib/
├── demo-data.ts          # Static fixture data (Maria's Tacos + Carlos Catering)
└── maria-transactions.ts # CSV parser + financial calculations

components/
├── analysis-results.tsx       # 4-week outlook, insights, observation, roadmap
├── dashboard-summary-bar.tsx  # Real-time summary bar (calculated from CSV)
├── seller-header.tsx          # Business identity header
└── transaction-table.tsx      # Responsive transaction table
```

**Stack:** Next.js 14, TypeScript, Tailwind CSS, GPT-4o, Vercel

**Key technical decisions:**
- `useSearchParams` with `Suspense` boundary for demo URL parameter handling
- CSV parsed client-side via custom parser in `lib/maria-transactions.ts`
- Strict JSON output format enforced via prompt — no markdown, no code fences
- JSON fences stripped as a safety fallback before `JSON.parse`
- Demo switcher toggles between two distinct fixture datasets without API calls
- Vercel Analytics tracking real usage from day one

---

## Data flow
```
User uploads CSV (or demo loads fixture data)
        ↓
Transaction table renders from parsed CSV
        ↓
User clicks "Generate My Outlook"
        ↓
POST /api/analyze
        ↓
CSV read from filesystem → sent to GPT-4o with structured prompt
        ↓
Model returns strict JSON: { outlook[], insights[], non_obvious_observation }
        ↓
Analysis results render: decision prompt → 4-week outlook → insights → observation
```

---

## What I'd build next

**Square API integration (v2 priority)**
Direct connection to Square's transaction API would eliminate the CSV export step entirely. The data model is already designed for this — swapping the CSV source for an API response requires minimal changes to the analysis pipeline.

**Real-balance widget**
A phone home-screen widget showing one number: bank balance minus what's coming in the next 7 days. Preview available at `/widget`. The calculation logic already exists in `lib/maria-transactions.ts`.

**Catering decision support**
Before a business owner says yes to a catering job, Vista should tell them if the cash timing works. One interviewee described doing the math in a Restaurant Depot parking lot on her phone while her girlfriend texted her. That problem is completely solvable.

**Personalized analysis from onboarding responses**
The 4-step onboarding currently collects business type, financial worry, and upcoming expenses. These responses are not yet injected into the analysis prompt. Connecting onboarding answers to prompt context would meaningfully improve output relevance.

---

## User research

5 informal interviews conducted with food truck owners in Bastrop and Austin, TX:
- Taqueria 95
- Jalisco Food Truck
- Angelica's Kitchen
- La Tapatía Taqueria
- Las Trancas Taco Stand

**Key finding:** 4 of 5 owners could not answer "are you ahead or behind right now" with confidence. 0 of 5 had any tool that accounted for upcoming expenses against current balance.

**The insight that changed the product:** Owners don't have a visibility problem. They have a false sense of visibility. The bank balance feels like information. It isn't.

---

## Running locally
```bash
git clone https://github.com/nisobakh/vista
cd vista
npm install
```

Add your OpenAI API key to `.env.local`:
```bash
OPENAI_API_KEY=your_key_here
```
```bash
npm run dev
```

Open `http://localhost:3000`

---

Built by [Niso Bakhriddinova](https://www.nisobakhr.com) · [LinkedIn](https://linkedin.com/in/niso)