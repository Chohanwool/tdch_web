import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const helperPath = path.join(here, "admin-board-editor-content.ts");

async function readHelper() {
  return readFile(helperPath, "utf8");
}

function assertExportedFunction(contents, name) {
  assert.match(
    contents,
    new RegExp(`export\\s+(?:async\\s+)?function\\s+${name}\\s*\\(`),
    `Expected admin-board-editor-content.ts to export ${name}().`,
  );
}

function extractFunction(contents, name) {
  const startPattern = new RegExp(`export\\s+(?:async\\s+)?function\\s+${name}\\s*\\(`);
  const startMatch = startPattern.exec(contents);
  assert.ok(startMatch, `Expected to find exported function ${name}().`);

  const start = startMatch.index;
  const nextExport = contents.slice(start + 1).search(/\nexport\s+(?:async\s+)?function\s+/);
  return nextExport === -1 ? contents.slice(start) : contents.slice(start, start + 1 + nextExport);
}

test("admin board editor content helper file exists and exports the expected surface", async () => {
  const contents = await readHelper();

  assertExportedFunction(contents, "createEmptyTiptapDocument");
  assertExportedFunction(contents, "createImageNode");
  assertExportedFunction(contents, "createYoutubeEmbedNode");
  assertExportedFunction(contents, "extractYouTubeVideoId");
  assertExportedFunction(contents, "collectAssetIdsFromTiptapDocument");
  assertExportedFunction(contents, "normalizeTiptapDocumentImageMetadata");
});

test("image node creation stores asset identity and stored path without public URLs", async () => {
  const contents = await readHelper();
  const createImageNode = extractFunction(contents, "createImageNode");

  assert.match(createImageNode, /\bstoredPath\b/, "Expected image nodes to persist storedPath.");
  assert.match(createImageNode, /\bassetId\b/, "Expected image nodes to persist assetId.");
  assert.match(createImageNode, /\balt\b/, "Expected image nodes to support alt text.");
  assert.equal(
    /\bpublicUrl\b/.test(createImageNode),
    false,
    "Expected image node persistence to avoid storing publicUrl.",
  );
});

test("asset collection includes official simple editor uploaded image sources", async () => {
  const contents = await readHelper();
  const collectAssetIdsFromTiptapDocument = extractFunction(contents, "collectAssetIdsFromTiptapDocument");

  assert.match(
    collectAssetIdsFromTiptapDocument,
    /getImageMetadataFromSource/,
    "Expected asset collection to read asset ids from SimpleEditor image src metadata.",
  );
  assert.match(
    contents,
    /tdchAssetId/,
    "Expected asset collection to read asset ids from SimpleEditor image src metadata.",
  );
  assert.match(
    contents,
    /URLSearchParams/,
    "Expected asset collection to parse SimpleEditor image src metadata safely.",
  );
});

test("image metadata normalization restores asset attrs from simple editor image sources", async () => {
  const contents = await readHelper();
  const normalizeTiptapDocumentImageMetadata = extractFunction(contents, "normalizeTiptapDocumentImageMetadata");

  assert.match(
    normalizeTiptapDocumentImageMetadata,
    /getImageMetadataFromSource/,
    "Expected normalization to recover metadata from the SimpleEditor image src hash.",
  );
  assert.match(
    normalizeTiptapDocumentImageMetadata,
    /\.\.\.metadata/,
    "Expected normalized image attrs to include recovered asset metadata.",
  );
});

test("youtube embed nodes use the official Tiptap youtube node shape", async () => {
  const contents = await readHelper();
  const createYoutubeEmbedNode = extractFunction(contents, "createYoutubeEmbedNode");

  assert.match(createYoutubeEmbedNode, /type\s*:\s*["']youtube["']/, "Expected YouTube embeds to use Tiptap's official youtube node type.");
  assert.match(createYoutubeEmbedNode, /\bsrc\b/, "Expected official YouTube nodes to persist a src attr.");
  assert.match(createYoutubeEmbedNode, /\bwidth\b/, "Expected official YouTube nodes to include width.");
  assert.match(createYoutubeEmbedNode, /\bheight\b/, "Expected official YouTube nodes to include height.");
  assert.equal(
    /\bpublicUrl\b/.test(createYoutubeEmbedNode),
    false,
    "Expected YouTube embed nodes to avoid persisting publicUrl.",
  );
});
