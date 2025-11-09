"use client";

import { Suspense } from "react";
import Header from "./Header";

function HeaderFallback() {
  return (
    <header className="bg-black text-white sticky top-0 z-50" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-16 gap-4">
          <div className="text-lg sm:text-2xl font-bold text-orange-400 flex-shrink-0">
            NOZAMA
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-9 h-9 bg-gray-800 rounded animate-pulse" />
            <div className="w-9 h-9 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default function HeaderWrapper() {
  return (
    <Suspense fallback={<HeaderFallback />}>
      <Header />
    </Suspense>
  );
}