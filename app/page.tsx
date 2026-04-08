import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-4 py-16 sm:px-6 lg:px-8">
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
      </main>
    </div>
  );
}
