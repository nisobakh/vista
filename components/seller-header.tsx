import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SellerHeader() {
  return (
    <header className="space-y-6">
      {/* Hero intro */}
      <div className="space-y-2">
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Vista
        </h1>
        <p className="max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
          Helps small business owners see what{"'"}s coming financially, not
          just what already happened.
        </p>
      </div>

      {/* Demo badge */}
      <div className="flex items-center gap-2">
        <Badge
          variant="secondary"
          className="gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-muted-foreground"
        >
          <Sparkles className="h-3 w-3" />
          {"Demo: Maria\u2019s Tacos \u2014 Food Truck, Austin TX"}
        </Badge>
      </div>
    </header>
  );
}
