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

/** True when the declared file is actually present in /public. */
export function useMediaAvailable(src: string | undefined): boolean {
  const manifest = useContext(MediaManifestContext);
  return src ? manifest[src] === true : false;
}
