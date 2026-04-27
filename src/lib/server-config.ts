import "server-only";

import { readServerApiBaseUrlFromEnv } from "@/lib/api-env";

const readEnv = (name: string, fallback: string) => {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : fallback;
};

export const SERVER_API_BASE_URL = readServerApiBaseUrlFromEnv(process.env);

export const NAVER_STATIC_MAP_CLIENT_ID = process.env.NAVER_MAP_CLIENT_ID?.trim() || "";
export const NAVER_STATIC_MAP_CLIENT_SECRET =
  process.env.NAVER_MAP_CLIENT_SECRET?.trim() || "";

export const DEFAULT_CHURCH_LATITUDE = readEnv(
  "NEXT_PUBLIC_CHURCH_LAT",
  "37.2642526267482",
);
export const DEFAULT_CHURCH_LONGITUDE = readEnv(
  "NEXT_PUBLIC_CHURCH_LNG",
  "127.025125618372",
);
