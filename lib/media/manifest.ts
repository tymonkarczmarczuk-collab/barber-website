/**
 * MEDIA MANIFEST (server side)
 * ------------------------------------------------------------------
 * Scans /public for the files declared in lib/config/media.ts and
 * reports which ones actually exist.
 *
 * The result is handed to the client through <MediaProvider>, so a
 * component can render a real <Image>/<video> when the asset is on
 * disk and a designed placeholder when it is not — with no broken
 * image requests and no layout shift either way.
 *
 * Called from app/layout.tsx (a server component). In development the
 * scan re-runs per request, so a newly dropped file appears on reload.
 * In production it is evaluated once at build time.
 */

import fs from "node:fs";
import path from "node:path";
import { mediaPaths } from "@/lib/config/media";

export type MediaManifest = Record<string, boolean>;

const PUBLIC_DIR = path.join(process.cwd(), "public");

export function scanMediaManifest(): MediaManifest {
  const manifest: MediaManifest = {};

  for (const publicPath of mediaPaths) {
    const filePath = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ""));
    let exists = false;
    try {
      exists = fs.statSync(filePath).isFile();
    } catch {
      exists = false;
    }
    manifest[publicPath] = exists;
  }

  return manifest;
}
