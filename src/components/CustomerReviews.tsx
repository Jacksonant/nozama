"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, User } from "lucide-react";

interface CustomerReviewsProps {
  reviewCount: number;
}
/**
 * This component is hardcoded to mock review section
 */
export default function CustomerReviews({ reviewCount }: CustomerReviewsProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Rating */}
        <div className="lg:col-span-1">
          <div className="text-center space-y-4">
            <div>
              <div className="text-4xl font-bold">4.3</div>
              <div className="flex justify-center mb-2">
                {[...Array(4)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
                <Star className="w-5 h-5 text-gray-300" />
              </div>
              <div className="text-sm text-muted-foreground">
                {reviewCount} reviews
              </div>
            </div>

            <div className="space-y-2 text-sm">
              {[
                { stars: 5, count: 45 },
                { stars: 4, count: 32 },
                { stars: 3, count: 8 },
                { stars: 2, count: 3 },
                { stars: 1, count: 2 },
              ].map((rating) => (
                <div key={rating.stars} className="flex items-center gap-2">
                  <span className="w-3">{rating.stars}</span>
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${(rating.count / 90) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 text-xs text-muted-foreground">
                    {rating.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="lg:col-span-2 space-y-4">
          {/* Review 1 */}
          <div className="border-b pb-4">
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">Sarah M.</span>
                  <span className="text-xs text-muted-foreground">
                    2 days ago
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">
                    Perfect purchase!
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm ml-13">
              Great quality, shipped fast. Exactly what I needed.
            </p>
          </div>

          {/* Review 2 */}
          <div className="border-b pb-4">
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-green-100 text-green-600">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">Mike R.</span>
                  <span className="text-xs text-muted-foreground">
                    1 week ago
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">Good value</span>
                </div>
              </div>
            </div>
            <p className="text-sm ml-13">Works as expected. Good value.</p>
          </div>

          {/* Review 3 */}
          <div className="pb-4">
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-purple-100 text-purple-600">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">Jennifer L.</span>
                  <span className="text-xs text-muted-foreground">
                    2 weeks ago
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="text-sm font-semibold">
                    Pretty good overall
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm ml-13">
              Pretty good overall. Packaging could be better but product is
              fine.
            </p>
          </div>

          <Button variant="outline" className="w-full">
            View All {reviewCount} Reviews
          </Button>
        </div>
      </div>
    </div>
  );
}
