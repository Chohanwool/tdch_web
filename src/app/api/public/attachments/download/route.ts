import { NextResponse } from "next/server";
import { joinApiUrl } from "@/lib/api-base-url";
import { SERVER_API_BASE_URL } from "@/lib/server-config";

function normalizeStoredPath(value: string | null) {
  const normalized = value?.trim().replace(/^\/+/, "") ?? "";

  if (!normalized || normalized.includes("..")) {
    return null;
  }

  return normalized;
}

function buildContentDisposition(filename: string) {
  const fallback = filename.replace(/[^\x20-\x7E]+/g, "_").replace(/["\\]/g, "_") || "attachment";
  const encoded = encodeURIComponent(filename);
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const storedPath = normalizeStoredPath(searchParams.get("storedPath"));
  const filename = searchParams.get("filename")?.trim() || "attachment";

  if (!storedPath) {
    return NextResponse.json({ message: "Invalid storedPath." }, { status: 400 });
  }

  const upstream = await fetch(joinApiUrl(SERVER_API_BASE_URL, `/upload/${storedPath}`), {
    cache: "no-store",
  });

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ message: "Failed to download attachment." }, { status: upstream.status || 502 });
  }

  const headers = new Headers();
  const contentType = upstream.headers.get("content-type");
  const contentLength = upstream.headers.get("content-length");

  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  if (contentLength) {
    headers.set("Content-Length", contentLength);
  }

  headers.set("Content-Disposition", buildContentDisposition(filename));
  headers.set("Cache-Control", "no-store");

  return new Response(upstream.body, {
    status: 200,
    headers,
  });
}
