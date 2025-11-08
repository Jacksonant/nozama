"use client";

import { useState } from "react";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { ImageOff } from "lucide-react";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  sizes?: string;
}

export function ImageWithLoader({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority,
  loading = "lazy",
  sizes,
}: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${className}`}
      >
        <ImageOff className="w-8 h-8 text-gray-400" />
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
          <Spinner scale="sm" className="mb-2" />
          <span className="text-xs text-gray-500">Loading...</span>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        className={`${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-200`}
        priority={priority}
        {...(!priority && { loading })}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </>
  );
}
