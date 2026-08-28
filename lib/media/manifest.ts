/**
 * MEDIA MANIFEST (server side)
 * ------------------------------------------------------------------
 * Scans /public for the files declared in lib/config/media.ts and
 * reports which ones actually exist — and under which extension.
 *
 * A declared path like "/media/passage-01-hero.webp" is the preferred
 * form, but a contributor dropping in a raw phone photo will usually
 * have a .jpg or .png instead. Rather than requiring a manual
 * conversion, the scan also looks for the same filename under a set of
 * common raster extensions and resolves to whichever one is actually
 * present.
 *
 * The result is handed to the client through <MediaProvider>, so
 * <MediaFrame> can render a real <Image> when the asset is on disk and
 * a designed placeholder when it is not — with no broken image
 * requests and no layout shift either way.
 *
 * Called from app/layout.tsx (a server component). In development the
 * scan re-runs per request, so a newly dropped file appears on reload.
 * In production it is evaluated once at build time.
 */

import fs from "node:fs";
import path from "node:path";
import { mediaPaths } from "@/lib/config/media";

/**
 * Maps each declared path to the path that should actually be used —
 * usually itself, sometimes the same name under a different extension
 * — or `false` when nothing matching was found on disk.
 */
export type MediaManifest = Record<string, string | false>;

const PUBLIC_DIR = path.join(process.cwd(), "public");

/** Tried in order after the declared extension; first match wins. */
const IMAGE_FALLBACK_EXTENSIONS = ["webp", "avif", "jpg", "jpeg", "png"];

function fileExists(filePath: string): boolean {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function resolveAsset(declaredPath: string): string | false {
  const direct = path.join(PUBLIC_DIR, declaredPath.replace(/^\//, ""));
  if (fileExists(direct)) return declaredPath;

  const ext = path.extname(declaredPath);
  const withoutExt = declaredPath.slice(0, -ext.length);
  for (const candidate of IMAGE_FALLBACK_EXTENSIONS) {
    const candidatePath = `${withoutExt}.${candidate}`;
    if (fileExists(path.join(PUBLIC_DIR, candidatePath.replace(/^\//, "")))) {
      return candidatePath;
    }
  }

  return false;
}

export function scanMediaManifest(): MediaManifest {
  const manifest: MediaManifest = {};

  for (const declaredPath of mediaPaths) {
    manifest[declaredPath] = resolveAsset(declaredPath);
  }

  return manifest;
}
