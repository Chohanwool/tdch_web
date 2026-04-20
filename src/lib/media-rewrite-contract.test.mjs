import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const nextConfigPath = path.join(here, "..", "..", "next.config.ts");

test("next config proxies editor media paths to the media API", async () => {
  const contents = await readFile(nextConfigPath, "utf8");

  assert.match(
    contents,
    /MEDIA_API_BASE_URL/,
    "Expected media rewrite destination to come from the configured media API base URL.",
  );
  assert.match(
    contents,
    /source:\s*["']\/media\/:path\*["']/,
    "Expected Next to own /media/* paths so admin editor image previews can load before save.",
  );
  assert.match(
    contents,
    /destination:\s*`\$\{mediaApiBaseUrl\}\/media\/:path\*`/,
    "Expected /media/* requests to be proxied to the media API /media/* route.",
  );
});
