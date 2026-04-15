import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const docsRoot = path.join(repoRoot, "docs");
const readmePath = path.join(repoRoot, "README.md");
const canonicalDocPath = path.join(docsRoot, "navigation-video-integration.md");
const legacyDocsRoot = path.join(repoRoot, "..", "docs");
const legacyDocNames = [
  "sermon-menu-integration-prd.md",
  "sermon-menu-integration-implementation-spec.md",
  "sermon-menu-integration-ticket-tracker.md",
  "sermon-menu-integration-remaining-work.md",
  "site-navigation-redesign-plan.md",
  "admin-media-operations-runbook.md",
];

test("docs/ contains exactly one canonical navigation+video integration doc", async () => {
  const docsEntries = await readdir(docsRoot, { withFileTypes: true });
  const canonicalCandidates = docsEntries
    .filter((entry) => entry.isFile() && entry.name === path.basename(canonicalDocPath))
    .map((entry) => entry.name);

  assert.deepEqual(
    canonicalCandidates,
    [path.basename(canonicalDocPath)],
    `Expected exactly one canonical doc at ${path.relative(repoRoot, canonicalDocPath)}`,
  );

  assert.equal(
    existsSync(path.join(legacyDocsRoot, path.basename(canonicalDocPath))),
    false,
    `Expected no duplicate canonical doc at ${path.relative(repoRoot, path.join(legacyDocsRoot, path.basename(canonicalDocPath)))}`,
  );
});

test("README links only to the canonical navigation+video doc", async () => {
  const readme = await readFile(readmePath, "utf8");
  const canonicalLinkPattern = new RegExp(
    String.raw`\[[^\]]*navigation\+video[^\]]*\]\((?:\.\/)?${escapeRegExp(path.relative(repoRoot, canonicalDocPath))}\)`,
    "i",
  );

  assert.match(
    readme,
    canonicalLinkPattern,
    "Expected README to link to the consolidated navigation+video documentation.",
  );

  for (const legacyDocName of legacyDocNames) {
    assert.doesNotMatch(
      readme,
      new RegExp(escapeRegExp(`docs/${legacyDocName}`), "i"),
      `Expected README not to link to legacy doc filename: ${legacyDocName}`,
    );
  }

  assert.doesNotMatch(
    readme,
    new RegExp(escapeRegExp(`../docs/${path.basename(canonicalDocPath)}`), "i"),
    "Expected README not to reference the duplicate canonical doc location.",
  );
});

test("canonical doc covers current model, admin/ops, and final status", async () => {
  const contents = await readFile(canonicalDocPath, "utf8");

  assert.match(
    contents,
    /^##\s+Current Model$/m,
    "Expected a Current Model section in the consolidated doc.",
  );
  assert.match(
    contents,
    /^##\s+Admin\/Ops$/m,
    "Expected an Admin/Ops section in the consolidated doc.",
  );
  assert.match(
    contents,
    /^##\s+Final Status$/m,
    "Expected a Final Status section in the consolidated doc.",
  );
});

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
