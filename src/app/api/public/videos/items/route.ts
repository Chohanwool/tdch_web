import { NextRequest, NextResponse } from "next/server";
import { SERVER_MEDIA_API_BASE_URL } from "@/lib/server-config";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path")?.trim();
  const page = request.nextUrl.searchParams.get("page")?.trim() ?? "1";
  const size = request.nextUrl.searchParams.get("size")?.trim() ?? "8";

  if (!path) {
    return NextResponse.json({ message: "path is required" }, { status: 400 });
  }

  const response = await fetch(
    `${SERVER_MEDIA_API_BASE_URL}/api/v1/public/videos/items?path=${encodeURIComponent(path)}&page=${encodeURIComponent(page)}&size=${encodeURIComponent(size)}`,
    {
      cache: "no-store",
    },
  );

  const payload = await response.text();

  return new NextResponse(payload, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
    },
  });
}
