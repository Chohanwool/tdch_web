import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const defaultLatitude = "37.2642526267482";
const defaultLongitude = "127.025125618372";

export async function GET(request: NextRequest) {
  const clientId = process.env.NAVER_MAP_CLIENT_ID;
  const clientSecret = process.env.NAVER_MAP_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response("Static map credentials are missing.", { status: 503 });
  }

  const lat = request.nextUrl.searchParams.get("lat") ?? defaultLatitude;
  const lng = request.nextUrl.searchParams.get("lng") ?? defaultLongitude;

  const params = new URLSearchParams({
    w: "1280",
    h: "720",
    center: `${lng},${lat}`,
    level: "16",
    scale: "2",
    format: "png",
    maptype: "basic",
    lang: "ko",
    markers: `type:d|size:mid|color:0x2A4F8F|pos:${lng} ${lat}`,
  });

  const upstream = await fetch(
    `https://maps.apigw.ntruss.com/map-static/v2/raster?${params.toString()}`,
    {
      headers: {
        "x-ncp-apigw-api-key-id": clientId,
        "x-ncp-apigw-api-key": clientSecret,
      },
      cache: "no-store",
    }
  );

  if (!upstream.ok) {
    const message = await upstream.text();

    return new Response(message || "Failed to load static map.", {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") ?? "text/plain; charset=utf-8",
      },
    });
  }

  const contentType = upstream.headers.get("content-type") ?? "image/png";
  const image = await upstream.arrayBuffer();

  return new Response(image, {
    status: 200,
    headers: {
      "content-type": contentType,
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
