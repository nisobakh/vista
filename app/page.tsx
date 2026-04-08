import Link from "next/link";
import { Upload, LineChart, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <main className="mx-auto w-full max-w-4xl space-y-14 px-4 py-16 sm:px-6 lg:px-8">
        <section className="w-full rounded-2xl border border-black/5 bg-white/65 p-8 shadow-sm sm:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#7a5d45]/80">
            Vista
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#3f2e21] sm:text-4xl">
            See what your bank balance isn&apos;t telling you
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5a4636]">
            Vista looks at your last 90 days and tells you what&apos;s coming
            financially — before it hits.
          </p>
          <p className="mt-3 text-sm text-[#6b5543]">
            Built for food truck owners and small local businesses.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="h-12 px-6 text-base font-semibold">
              <Link href="/dashboard">Check My Cash Flow →</Link>
            </Button>
            <Link
              href="/dashboard?demo=true"
              className="text-sm font-medium text-[#5a4636] underline-offset-4 hover:underline"
            >
              See a live demo →
            </Link>
          </div>
        </section>

        <section>
          <p className="text-xs font-medium uppercase tracking-wider text-[#7a5d45]/70">
            How it works
          </p>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/5 bg-white/70 text-[#7a5d45]">
                <Upload className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <p className="text-sm font-medium text-[#3f2e21]">
                Upload 90 days of transactions
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/5 bg-white/70 text-[#7a5d45]">
                <LineChart className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <p className="text-sm font-medium text-[#3f2e21]">
                Vista finds the patterns
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/5 bg-white/70 text-[#7a5d45]">
                <CalendarClock className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <p className="text-sm font-medium text-[#3f2e21]">
                See what&apos;s coming before it hits
              </p>
            </div>
          </div>
        </section>

        <blockquote className="rounded-xl border border-black/5 bg-white/50 px-6 py-5 shadow-sm sm:px-8 sm:py-6">
          <p className="text-base leading-relaxed text-[#5a4636]">
            &ldquo;I just say yes and figure it out. Which works until it
            doesn&apos;t.&rdquo;
          </p>
          <footer className="mt-3 text-sm text-[#6b5543]">
            — Food truck owner, Austin TX
          </footer>
        </blockquote>
      </main>
    </div>
  );
}
