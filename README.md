# Vista
 
A 30-day cash-flow checkup for small local businesses.
 
**Live demo:** https://vista-cash.vercel.app
 
---
 
## What this is
 
Vista takes 90 days of transaction data from a small business and tells the owner what's coming financially over the next four weeks. Plain language, specific actions, no jargon.
 
It answers one question: "Am I going to be short on cash soon, and what should I do about it?"
 
## Who it's for
 
Maria runs a food truck in Austin. She does about $15-25K a month, all through her card reader. No bookkeeper. No accountant. She opens her bank app in the morning, sees a number, and that's what she bases her decisions on. Whether to do a big restock, whether she needs help this weekend, whether the truck repair can wait.
 
The problem is she makes enough money most months. She just can't see when the tight weeks are coming. Rent and insurance hit on fixed dates, but her sales fluctuate. She's been caught short twice this year. Not because business was bad, but because a slow week happened to land on the same week as a big bill.
 
## What the AI does
 
When Maria clicks "Analyze," Vista sends her transaction history to an LLM with a structured prompt. The model looks for revenue patterns by day of week, maps when recurring expenses land relative to income, and flags anything unusual (slow weeks, refund spikes, expense clusters). It generates a 4-week forecast, surfaces 2-3 specific recommendations tied to real patterns in the data, and includes one observation Maria probably hasn't noticed on her own.
 
The AI is told to use approximate numbers, never present forecasts as certainties, and never give tax, legal, or investment advice. It speaks in plain language ("based on your recent patterns," "it looks like") not financial jargon.
 
## Decisions I made
 
- **Weekly granularity, not daily.** Maria thinks in weeks, not days. Daily forecasts would feel noisy and fake.
- **Plain language, not charts.** She checks her phone between lunch rushes. She needs a sentence, not a graph.
- **2-3 actions max, not a full report.** Too many recommendations means no action. I forced the AI to pick the most important ones.
- **I told the AI what not to do.** No fake precision, no suggesting loans, no finance jargon. If the model says "you will have exactly $2,847.33 on March 14th" to a food truck owner, that's worse than saying nothing. So I built that constraint into the prompt.
- **I started too broad.** My first version was "for small businesses." The output was bland and generic. Once I narrowed it to one food truck owner with one fear ("will I make rent this month?"), everything got better. The data, the prompt, the UI, the recommendations. Picking one person made every decision easier.
 
## What I intentionally left out
 
- **No charts or dashboards.** Maria doesn't need another dashboard. She needs an answer.
- **No CSV upload.** The demo uses pre-loaded data to keep the experience focused. In production this would connect to a POS system directly.
- **No auth or user accounts.** This is a v0 prototype proving one interaction works well.
- **No mobile optimization.** Scoped out to ship faster. Would be priority for v1.
 
## What didn't work
 
- **My first prompt produced generic advice.** Things like "watch your spending" and "processing fees impact profitability." Useless. I had to rewrite the prompt to force specific dollar amounts, dates, and concrete actions tied to patterns in the actual data.
- **"Small businesses" was too vague.** When I tried to build for everyone, the AI output was bland. Narrowing to one food truck owner with specific expenses and rhythms made the output dramatically better.
- **The AI sometimes over-promises.** It would say "you will be short $400" when the data only supports "there's a chance this week could be tight." I added explicit guardrail language to the prompt to prevent false precision.
 
## What I'd build next
 
- **Connect to real POS data** instead of mock CSV. Plug into a payments API so the analysis runs on actual transactions.
- **"What if" mode.** Let Maria adjust variables (revenue drops 15%, rent increases, add an employee) and see how the forecast changes. No ML needed, just recalculation.
- **Weekly email digest.** Send Maria a short summary every Monday morning so she doesn't have to remember to check.
 
## Built with
 
- Next.js
- OpenAI API (GPT-4o)
- Vercel
- v0 (initial UI generation)
 
## About
 
Built by Niso Bakhriddinova. I built this because every small business owner I know worries about cash first, and most of them are making decisions based on whatever their bank balance says that morning. I wanted to see if AI could do better than a gut feeling.
 
[GitHub](https://github.com/nisobakh/vista) · [LinkedIn](http://www.linkedin.com/in/niso) · [Portfolio](http://www.nisobakhr.com)
 