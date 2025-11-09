"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  VisuallyHidden,
} from "@/components/ui/dialog";
import { ImageWithLoader } from "@/components/ui/image-with-loader";
import { getImageUrl } from "@/lib/utils";
import { Heart, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
}

export default function ProductImageCarousel({
  images,
  productName,
}: ProductImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mainCarouselApi, setMainCarouselApi] = useState<CarouselApi>();
  const [thumbCarouselApi, setThumbCarouselApi] = useState<CarouselApi>();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    if (!mainCarouselApi) return;

    const onSelect = () => {
      const index = mainCarouselApi.selectedScrollSnap();
      setCurrentImageIndex(index);
    };

    mainCarouselApi.on("select", onSelect);
    return () => {
      mainCarouselApi.off("select", onSelect);
    };
  }, [mainCarouselApi]);

  return (
    <div className="lg:sticky lg:top-20">
      <div className="bg-background rounded-lg p-2 lg:p-4 mb-4 relative">
        {/* Main images */}
        <Carousel
          className="w-full mb-2 lg:mb-4 group"
          setApi={setMainCarouselApi}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-square">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div
                        className="relative w-full h-full cursor-zoom-in overflow-hidden"
                        onMouseEnter={() => setIsZooming(true)}
                        onMouseLeave={() => setIsZooming(false)}
                        onMouseMove={handleMouseMove}
                      >
                        <ImageWithLoader
                          src={getImageUrl(image)}
                          alt={productName || "Product"}
                          fill
                          className="object-contain transition-transform duration-200"
                          priority={index === 0}
                        />
                      </div>
                    </DialogTrigger>

                    {/* Initially I want to apply carousel in this dialog content also,
                    but encounter carousel blocking images issue at time of writing */}
                    {/* The zoom in modal when user click */}
                    <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-card border-0">
                      <VisuallyHidden>
                        <DialogTitle>Product Image Fullscreen View</DialogTitle>
                      </VisuallyHidden>
                      <div className="relative w-full h-[90vh] flex items-center justify-center bg-muted">
                        <ImageWithLoader
                          src={getImageUrl(image)}
                          alt={`${productName} fullscreen view`}
                          fill
                          className="object-contain"
                          sizes="90vw"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="absolute top-2 right-2 flex gap-2">
                    <button className="p-2 bg-background/80 rounded-full hover:bg-background shadow-sm">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-background/80 rounded-full hover:bg-background shadow-sm">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-2 bg-background/80 hover:bg-foreground hover:text-background group-hover:bg-foreground group-hover:text-background" />
              <CarouselNext className="right-2 bg-background/80 hover:bg-foreground hover:text-background group-hover:bg-foreground group-hover:text-background" />
            </>
          )}
        </Carousel>

        {/* The side zoom in overlay when user hover */}
        {isZooming && (
          <div
            className="absolute top-2 left-full ml-4 w-96 h-96 bg-background border-1 border-gray-500 rounded-lg shadow-xl overflow-hidden z-50 hidden lg:block"
            style={{
              backgroundImage: `url(${getImageUrl(images[currentImageIndex])})`,
              backgroundSize: "250%",
              backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
              backgroundRepeat: "no-repeat",
            }}
          />
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <Carousel
            className="w-full max-w-xs mx-auto mt-2 lg:mt-0"
            setApi={setThumbCarouselApi}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="basis-1/3">
                  <button
                    onClick={() => {
                      mainCarouselApi?.scrollTo(index);
                    }}
                    className={`relative w-full aspect-square rounded-md overflow-hidden border-1 transition-colors ${
                      currentImageIndex === index
                        ? "border-gray-500"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <ImageWithLoader
                      src={getImageUrl(image)}
                      alt={`${productName} view ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain bg-background"
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  );
}
