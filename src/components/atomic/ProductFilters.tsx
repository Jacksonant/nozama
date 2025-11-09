'use client';

import { FilterState } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void;
  categories: string[];
}

export default function ProductFilters({ filters, onFiltersChange, onClearFilters, categories }: ProductFiltersProps) {
  return (
    <Card>
      <CardHeader className="pb-3 lg:pb-6">
        <CardTitle className="text-base lg:text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 lg:space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm">Search</Label>
          <Input
            id="search"
            type="text"
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            placeholder="Search products..."
            className="h-9 lg:h-10"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Category</Label>
          <Select
            value={filters.category || "all"}
            onValueChange={(value) => onFiltersChange({ category: value === "all" ? "" : value })}
          >
            <SelectTrigger className="h-9 lg:h-10">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category} className="capitalize">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Price Range</Label>
          <div className="flex space-x-2">
            <Input
              type="number"
              value={filters.minPrice || ''}
              onChange={(e) => onFiltersChange({ minPrice: Number(e.target.value) || 0 })}
              placeholder="Min"
              className="h-9 lg:h-10"
            />
            <Input
              type="number"
              value={filters.maxPrice || ''}
              onChange={(e) => onFiltersChange({ maxPrice: Number(e.target.value) || 0 })}
              placeholder="Max"
              className="h-9 lg:h-10"
            />
          </div>
        </div>

        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full h-9 lg:h-10 text-sm"
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
}