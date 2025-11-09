"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import { useTheme } from "@/hooks/useTheme";
import { useCart } from "@/store/cart";
import { Filter, Moon, Search, ShoppingCart, Sun, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import FilterSidebar from "./FilterSidebar";

export default function Header() {
  const { items } = useCart();
  const { theme, toggleTheme } = useTheme();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const { suggestions } = useSearchSuggestions(searchQuery);

  const handleSearch = (e?: React.FormEvent, query?: string) => {
    e?.preventDefault();
    const searchTerm = query || searchQuery;
    if (query) setSearchQuery(query); // Update input value when selecting suggestion
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    router.push(`/?${params.toString()}`);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    router.push("/");
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSearch(undefined, suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-black text-white sticky top-0 z-50" role="banner">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-16 gap-2 sm:gap-4">
          <Link
            href="/"
            className="text-lg sm:text-2xl font-bold text-white-400 flex-shrink-0"
          >
            <span className="sm:hidden">NZM</span>
            <span className="hidden sm:inline">NOZAMA</span>
          </Link>

          {/* Mobile Search */}
          <div className="md:hidden flex-1">
            <div className="relative" ref={searchRef}>
              <form onSubmit={handleSearch}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                    setSelectedIndex(-1);
                  }}
                  onFocus={() =>
                    suggestions.length > 0 && setShowSuggestions(true)
                  }
                  onKeyDown={handleKeyDown}
                  className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 h-9 text-sm"
                  aria-label="Search products"
                  role="searchbox"
                  aria-autocomplete="list"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSearch(undefined, suggestion)}
                      className={`w-full text-left px-2 py-2 hover:bg-muted text-foreground flex items-center gap-2 text-sm truncate ${
                        index === selectedIndex ? "bg-muted" : ""
                      }`}
                    >
                      <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="truncate text-xs md:text-sm">
                        {suggestion}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-4xl">
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 flex-1"
            >
              <div className="relative flex-1" ref={searchRef}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                    setSelectedIndex(-1);
                  }}
                  onFocus={() =>
                    suggestions.length > 0 && setShowSuggestions(true)
                  }
                  onKeyDown={handleKeyDown}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 h-9"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSearch(undefined, suggestion)}
                        className={`w-full text-left px-4 py-2 hover:bg-muted text-foreground flex items-center gap-2 ${
                          index === selectedIndex ? "bg-muted" : ""
                        }`}
                      >
                        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="truncate text-xs md:text-sm">
                          {suggestion}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>

          <nav
            className="flex items-center sm:space-x-2 flex-shrink-0"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-white hover:bg-gray-800 h-9 w-9 p-0 md:hidden"
                  aria-label="Open filters"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetHeader className="p-4 pb-0">
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Filter products by category, brand, and price range
                  </SheetDescription>
                </SheetHeader>
                <div className="p-4">
                  <FilterSidebar
                    onClose={() =>
                      (
                        document.querySelector(
                          '[data-state="open"] button'
                        ) as HTMLButtonElement
                      )?.click()
                    }
                  />
                </div>
              </SheetContent>
            </Sheet>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="hidden md:block text-white hover:text-white hover:bg-gray-800 h-9 w-9 p-0"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              asChild
              className="relative text-white hover:text-white hover:bg-gray-800 h-9 w-9 p-0 hidden md:flex"
            >
              <Link href="/cart" aria-label={`Cart with ${itemCount} items`}>
                <ShoppingCart className="w-4 h-4" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-orange-500 hover:bg-orange-500 text-xs">
                    {itemCount > 99 ? "99+" : itemCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
