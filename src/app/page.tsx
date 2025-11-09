import { Suspense } from "react";
import HomePageContent from "@/components/composite/HomePageContent";
import { Spinner } from "@/components/ui/spinner";

function HomePageFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
      <div className="flex gap-6">
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="h-96 bg-muted rounded animate-pulse" />
        </aside>
        <div className="flex-1">
          <div className="h-8 bg-muted rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageFallback />}>
      <HomePageContent />
    </Suspense>
  );
}
