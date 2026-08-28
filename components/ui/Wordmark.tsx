"use client";

import Image from "next/image";
import { media } from "@/lib/config/media";
import { useResolvedMediaSrc } from "@/components/media/MediaProvider";

/**
 * The SARVEON wordmark.
 *
 * SARVEON is a wordmark first — there is no crest and no emblem. Until
 * a final logo file exists, the mark is set in the brand sans with the
 * letter-spacing the identity calls for. Drop
 * /public/media/sarveon-wordmark.svg in place and it takes over.
 */
export function Wordmark({
  className = "",
  size = "md",
  as: Tag = "span",
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  as?: "span" | "h1" | "div";
}) {
  const resolvedSrc = useResolvedMediaSrc(media.logo.src);

  const sizes = {
    sm: "text-[0.7rem] tracking-[0.36em]",
    md: "text-[0.78rem] tracking-[0.36em] sm:text-[0.82rem] sm:tracking-[0.42em]",
    lg: "text-[0.92rem] tracking-[0.38em] sm:text-lg sm:tracking-[0.44em] lg:text-xl",
    xl: "text-3xl tracking-[0.4em] sm:text-4xl lg:text-5xl",
  } as const;

  const heights = { sm: 14, md: 17, lg: 26, xl: 48 } as const;

  if (resolvedSrc) {
    return (
      <Tag className={`inline-flex items-center ${className}`}>
        <Image
          src={resolvedSrc}
          alt={media.logo.alt}
          width={heights[size] * 6}
          height={heights[size]}
          className="h-[1em] w-auto"
          style={{ fontSize: `${heights[size]}px` }}
          priority={size === "md" || size === "lg"}
        />
      </Tag>
    );
  }

  return (
    <Tag
      className={`font-sans font-light uppercase leading-none ${sizes[size]} ${className}`}
      style={{ textIndent: "0.42em" }}
    >
      Sarveon
    </Tag>
  );
}
