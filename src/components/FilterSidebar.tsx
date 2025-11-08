"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { sanitizeText } from "@/lib/sanitize";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FilterSidebarProps {
  onClose?: () => void;
}

export default function FilterSidebar({ onClose }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    brand: searchParams.get("brand") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("/api/filters");
        const data = await response.json();
        setCategories(data.categories || []);
        setBrands(data.brands || []);
      } catch (error) {
        console.error("Failed to fetch filters:", error);
      }
    };
    fetchFilters();
  }, []);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`/?${params.toString()}`);
    onClose?.();
  };

  const clearFilters = () => {
    router.push("/");
    setFilters({ category: "", brand: "", minPrice: "", maxPrice: "" });
    onClose?.();
  };

  const removeFilter = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: "" }));
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    router.push(`/?${params.toString()}`);
  };

  const activeFilters = Object.entries(filters).filter(([_, value]) => value);

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map(([key, value]) => (
                <Badge key={key} variant="secondary" className="text-xs">
                  {key === "minPrice"
                    ? `Min: $${value}`
                    : key === "maxPrice"
                    ? `Max: $${value}`
                    : value}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFilter(key)}
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <Separator />
          </div>
        )}

        {/* Category Filter */}
        <div className="space-y-2">
          <Label className="text-sm">Category</Label>
          <Select
            value={filters.category}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                category: value === "all" ? "" : value,
              }))
            }
          >
            <SelectTrigger className="h-9 w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {sanitizeText(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Brand Filter */}
        <div className="space-y-2">
          <Label className="text-sm">Brand</Label>
          <Select
            value={filters.brand}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                brand: value === "all" ? "" : value,
              }))
            }
          >
            <SelectTrigger className="h-9 w-full">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {sanitizeText(brand)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label className="text-sm">Price Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
              }
              className="h-9 w-full"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
              }
              className="h-9 w-full"
            />
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button onClick={applyFilters} className="w-full h-9">
            Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full h-9"
          >
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
