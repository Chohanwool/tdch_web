import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");
const readmePath = path.join(repoRoot, "README.md");
const remainingWorkDocPath = path.join(
  repoRoot,
  "../docs/sermon-menu-integration-remaining-work.md",
);
const runbookRelativePath = "docs/admin-media-operations-runbook.md";

test("README links to the admin media operations runbook", async () => {
  const contents = await readFile(readmePath, "utf8");

  assert.match(
    contents,
    new RegExp(String.raw`\[.*admin media operations runbook.*\]\(${escapeRegExp(runbookRelativePath)}\)`),
    "Expected README to link to the admin media operations runbook.",
  );
});

test("remaining-work section 3 only leaves P3-1 unresolved", async () => {
  const contents = await readFile(remainingWorkDocPath, "utf8");
  const sectionStart = contents.indexOf("## 3. 잔여 작업 목록");
  const sectionEnd = contents.indexOf("## 4. 권장 작업 순서");

  assert.notEqual(sectionStart, -1, "Expected a remaining-work section.");
  assert.notEqual(sectionEnd, -1, "Expected a recommended-order section.");
  assert.ok(sectionEnd > sectionStart, "Expected section 4 to follow section 3.");

  const remainingWorkSection = contents.slice(sectionStart, sectionEnd);
  const unresolvedItems = Array.from(
    remainingWorkSection.matchAll(/^### (P\d-\d+)\. (.+)$/gm),
    ([, ticket, title]) => ({ ticket, title }),
  ).filter((item) => {
    const statusLinePattern = new RegExp(
      `### ${escapeRegExp(item.ticket)}\\. ${escapeRegExp(item.title)}[\\s\\S]*?- 상태: ([^\n]+)`,
      "m",
    );
    const match = remainingWorkSection.match(statusLinePattern);
    return match?.[1]?.trim() !== "Done";
  });

  assert.deepEqual(
    unresolvedItems.map(({ ticket }) => ticket),
    ["P3-1"],
    "Expected only P3-1 to remain unresolved in section 3.",
  );
});

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
