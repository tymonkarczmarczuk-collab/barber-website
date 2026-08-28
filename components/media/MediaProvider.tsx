"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { MediaManifest } from "@/lib/media/manifest";

const MediaManifestContext = createContext<MediaManifest>({});

export function MediaProvider({
  manifest,
  children,
}: {
  manifest: MediaManifest;
  children: ReactNode;
}) {
  return (
    <MediaManifestContext.Provider value={manifest}>{children}</MediaManifestContext.Provider>
  );
}

/** True when the declared file — or the same name under a different extension — is present. */
export function useMediaAvailable(src: string | undefined): boolean {
  const manifest = useContext(MediaManifestContext);
  return Boolean(src && manifest[src]);
}

/**
 * The path that should actually be rendered for a declared asset:
 * itself, or the same name resolved to whichever extension is on
 * disk. Returns undefined when nothing was found — render a
 * placeholder in that case rather than an <Image> with no src.
 */
export function useResolvedMediaSrc(src: string | undefined): string | undefined {
  const manifest = useContext(MediaManifestContext);
  if (!src) return undefined;
  const resolved = manifest[src];
  return resolved ? resolved : undefined;
}
