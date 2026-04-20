import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const apiPath = path.join(here, "admin-board-api.ts");

async function readSource() {
  return readFile(apiPath, "utf8");
}

test("admin board save helpers reload post detail after backend id-only save response", async () => {
  const contents = await readSource();

  assert.match(
    contents,
    /interface\s+BackendPostSaveResponse\s*\{[\s\S]*id\?\s*:\s*string\s*\|\s*number\s*\|\s*null/s,
    "Expected admin-board-api to model the backend save response as id-only.",
  );
  assert.match(
    contents,
    /function\s+normalizeSavedPostId\s*\(/,
    "Expected admin-board-api to validate and normalize the saved post id.",
  );

  const detailReloads = contents.match(
    /return\s+getAdminBoardPost\s*\(\s*actorId\s*,\s*slug\s*,\s*normalizeSavedPostId\s*\(\s*saved\s*\)\s*,\s*payload\.menuId\s*\)/g,
  );
  assert.equal(
    detailReloads?.length,
    2,
    "Expected both create and update helpers to fetch full post detail after saving.",
  );

  const directDetailNormalizations = contents.match(/return\s+normalizePostDetail/g);
  assert.equal(
    directDetailNormalizations?.length,
    1,
    "Expected only the detail GET helper to normalize BackendPostDetail directly.",
  );
});
