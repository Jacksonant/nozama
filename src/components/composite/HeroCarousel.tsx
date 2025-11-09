"use client";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ShoppingBag, Sparkles, Tag } from "lucide-react";
import Link from "next/link";

// OK, this is AI generated
const heroSlides = [
  {
    id: 1,
    title: "Beauty Sale",
    subtitle: "Up to 50% Off",
    description: "Discover amazing deals on premium makeup and skincare",
    cta: "Shop Now",
    href: "/?category=lipstick",
    bgColor: "bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200",
    textColor: "text-white dark:text-gray-900",
    icon: <Sparkles className="w-8 h-8" />
  },
  {
    id: 2,
    title: "Free Shipping",
    subtitle: "On Orders $25+",
    description: "Get your favorite products delivered to your door",
    cta: "Start Shopping",
    href: "/",
    bgColor: "bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-200 dark:to-gray-300",
    textColor: "text-white dark:text-gray-900",
    icon: <ShoppingBag className="w-8 h-8" />
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "Fresh & Trending",
    description: "Check out the latest additions to our collection",
    cta: "Explore",
    href: "/?category=foundation",
    bgColor: "bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100",
    textColor: "text-white dark:text-gray-900",
    icon: <Tag className="w-8 h-8" />
  }
];

export default function HeroCarousel() {
  return (
    <div className="w-full mb-8 md:mt-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className={`${slide.bgColor} ${slide.textColor} md:rounded-lg overflow-hidden h-48 sm:h-64 md:h-80`}>
                <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-16 lg:px-16 lg:py-20 h-full flex items-center">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 mb-2 sm:mb-4">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8">{slide.icon}</div>
                      <span className="ml-4 md:ml-0 text-sm sm:text-base md:text-lg font-medium">{slide.subtitle}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 opacity-90">
                      {slide.description}
                    </p>
                    <Button asChild size="sm" className="bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 sm:text-base">
                      <Link href={slide.href}>
                        {slide.cta}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hidden md:flex" />
        <CarouselNext className="right-4 hidden md:flex" />
      </Carousel>
    </div>
  );
}