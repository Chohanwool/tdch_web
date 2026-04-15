import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const readmePath = path.join(repoRoot, "README.md");
const canonicalDocPath = path.join(repoRoot, "docs/navigation-video-integration.md");

test("README links to the canonical navigation-video doc", async () => {
  const contents = await readFile(readmePath, "utf8");

  assert.ok(
    contents.includes("[Navigation+Video Integration](docs/navigation-video-integration.md)"),
    "Expected README to link to the canonical navigation-video doc.",
  );
});

test("canonical navigation-video doc keeps the admin ops and final status sections", async () => {
  const contents = await readFile(canonicalDocPath, "utf8");

  assert.match(
    contents,
    /^##\s+Admin\/Ops$/m,
    "Expected the canonical navigation-video doc to include an Admin/Ops section.",
  );
  assert.match(
    contents,
    /^##\s+Final Status$/m,
    "Expected the canonical navigation-video doc to include a Final Status section.",
  );
});
