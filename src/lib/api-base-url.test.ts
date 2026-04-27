import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { DEFAULT_API_BASE_URL, joinApiUrl, normalizeApiBaseUrl, readApiBaseUrlFromEnv } from "./api-base-url.ts";

type ApiEnvModule = {
  readServerApiBaseUrlFromEnv: (env: Record<string, string | undefined>) => string;
  readPublicApiBaseUrlFromEnv: (env: Record<string, string | undefined>) => string;
};

async function loadApiEnvModule(): Promise<ApiEnvModule> {
  const root = await mkdtemp(join(tmpdir(), "api-env-"));
  const [apiBaseUrlSource, apiEnvSource] = await Promise.all([
    readFile(new URL("./api-base-url.ts", import.meta.url), "utf8"),
    readFile(new URL("./api-env.ts", import.meta.url), "utf8"),
  ]);

  await writeFile(join(root, "api-base-url.ts"), apiBaseUrlSource, "utf8");
  const apiEnvPath = join(root, "api-env.ts");
  await writeFile(
    apiEnvPath,
    apiEnvSource.replace('from "./api-base-url"', 'from "./api-base-url.ts"'),
    "utf8",
  );

  return import(`file://${apiEnvPath}`) as Promise<ApiEnvModule>;
}

test("normalizeApiBaseUrl trims whitespace and trailing slashes", () => {
  assert.equal(normalizeApiBaseUrl(" https://api.example.com/// "), "https://api.example.com");
});

test("normalizeApiBaseUrl falls back to the local API base URL", () => {
  assert.equal(normalizeApiBaseUrl("   "), DEFAULT_API_BASE_URL);
  assert.equal(normalizeApiBaseUrl(undefined), DEFAULT_API_BASE_URL);
});

test("readApiBaseUrlFromEnv uses the first configured environment variable", () => {
  assert.equal(
    readApiBaseUrlFromEnv(
      {
        API_BASE_URL: " https://api.example.com/ ",
        NEXT_PUBLIC_API_BASE_URL: "https://public.example.com",
      },
      ["API_BASE_URL", "NEXT_PUBLIC_API_BASE_URL"],
    ),
    "https://api.example.com",
  );
});

test("readServerApiBaseUrlFromEnv only accepts API_BASE_URL", async () => {
  const { readServerApiBaseUrlFromEnv } = await loadApiEnvModule();
  assert.equal(
    readServerApiBaseUrlFromEnv({
      NODE_ENV: "production",
      API_BASE_URL: " https://api.example.com/ ",
      NEXT_PUBLIC_API_BASE_URL: "https://public.example.com",
    }),
    "https://api.example.com",
  );
});

test("readPublicApiBaseUrlFromEnv only accepts NEXT_PUBLIC_API_BASE_URL", async () => {
  const { readPublicApiBaseUrlFromEnv } = await loadApiEnvModule();
  assert.equal(
    readPublicApiBaseUrlFromEnv({
      NODE_ENV: "production",
      API_BASE_URL: "https://private.example.com",
      NEXT_PUBLIC_API_BASE_URL: " https://public.example.com/ ",
    }),
    "https://public.example.com",
  );
});

test("readServerApiBaseUrlFromEnv falls back to localhost outside production", async () => {
  const { readServerApiBaseUrlFromEnv } = await loadApiEnvModule();
  assert.equal(
    readServerApiBaseUrlFromEnv({
      NODE_ENV: "development",
    }),
    DEFAULT_API_BASE_URL,
  );
});

test("readPublicApiBaseUrlFromEnv falls back to localhost outside production", async () => {
  const { readPublicApiBaseUrlFromEnv } = await loadApiEnvModule();
  assert.equal(
    readPublicApiBaseUrlFromEnv({
      NODE_ENV: "test",
    }),
    DEFAULT_API_BASE_URL,
  );
});

test("readServerApiBaseUrlFromEnv fails fast in production when API_BASE_URL is missing", async () => {
  const { readServerApiBaseUrlFromEnv } = await loadApiEnvModule();
  assert.throws(
    () =>
      readServerApiBaseUrlFromEnv({
        NODE_ENV: "production",
        NEXT_PUBLIC_API_BASE_URL: "https://public.example.com",
      }),
    /API_BASE_URL/,
  );
});

test("readPublicApiBaseUrlFromEnv fails fast in production when NEXT_PUBLIC_API_BASE_URL is missing", async () => {
  const { readPublicApiBaseUrlFromEnv } = await loadApiEnvModule();
  assert.throws(
    () =>
      readPublicApiBaseUrlFromEnv({
        NODE_ENV: "production",
        API_BASE_URL: "https://private.example.com",
      }),
    /NEXT_PUBLIC_API_BASE_URL/,
  );
});

test("joinApiUrl avoids duplicate slashes between base URL and path", () => {
  assert.equal(joinApiUrl("https://api.example.com/", "/api/v1/health"), "https://api.example.com/api/v1/health");
  assert.equal(joinApiUrl("https://api.example.com", "api/v1/health"), "https://api.example.com/api/v1/health");
});
