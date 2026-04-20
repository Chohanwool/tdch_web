import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const pagePath = path.join(here, "page.tsx");
const clientPath = path.join(here, "_components", "menu-management-client.tsx");

async function readPage() {
  return readFile(pagePath, "utf8");
}

async function readClient() {
  return readFile(clientPath, "utf8");
}

function extractBoardCase(contents) {
  const match = contents.match(/case\s+["']BOARD["']\s*:\s*(?<body>[\s\S]*?)(?=\n\s*case\s+["'][A-Z_]+["']\s*:)/);
  assert.ok(match?.groups?.body, "Expected getPublicRouteSummary to handle BOARD menu nodes.");
  return match.groups.body;
}

function extractBoardEditorBlock(contents) {
  const match = contents.match(
    /\{\s*selectedNode\.type\s*===\s*["']BOARD["']\s*&&\s*\((?<body>[\s\S]*?)(?=\n\s*\{\s*selectedNode\.type\s*===\s*["']EXTERNAL_LINK["'])/,
  );
  assert.ok(match?.groups?.body, "Expected the editor UI to render a BOARD-specific section.");
  return match.groups.body;
}

test("admin menu page does not fetch global boards for BOARD menu editing", async () => {
  const contents = await readPage();

  assert.doesNotMatch(
    contents,
    /getAdminBoards|availableBoards/s,
    "Expected menu/page.tsx to avoid fetching or passing global seed boards.",
  );
  assert.match(
    contents,
    /<MenuManagementClient\b[\s\S]*initialItems\s*=\s*\{\s*menuTree\.items\s*\}/s,
    "Expected menu/page.tsx to pass only the menu tree into MenuManagementClient.",
  );
});

test("admin menu public address preview builds BOARD URLs from parent and child slugs", async () => {
  const contents = await readClient();
  const boardCase = extractBoardCase(contents);

  assert.match(
    boardCase,
    /node\.parentId/,
    "Expected BOARD preview to require or use its parent menu when building the public route.",
  );
  assert.match(
    boardCase,
    /menuById\.get\s*\(\s*node\.parentId\s*\)/,
    "Expected BOARD preview to read the parent slug from menuById.",
  );
  assert.match(
    boardCase,
    /node\.slug/,
    "Expected BOARD preview to use the BOARD menu slug as the child path segment.",
  );
  assert.doesNotMatch(
    boardCase,
    /\/news\s*#|\$\{\s*node\.boardKey\s*\}/,
    "Expected BOARD preview to avoid legacy /news#boardKey URLs.",
  );
});

test("menu management client renders BOARD editing as a board type dropdown", async () => {
  const contents = await readClient();
  const boardEditorBlock = extractBoardEditorBlock(contents);

  assert.doesNotMatch(
    contents,
    /availableBoards|AdminBoardSummary|getAdminBoards/s,
    "Expected MenuManagementClient to avoid global board list props.",
  );
  assert.match(
    boardEditorBlock,
    /게시판 타입/,
    "Expected BOARD editor label to be '게시판 타입'.",
  );
  assert.doesNotMatch(
    boardEditorBlock,
    /게시판 키|연결 게시판/,
    "Expected BOARD editor to avoid exposing raw board key or global board connection labels.",
  );
  assert.match(
    boardEditorBlock,
    /<select\b[\s\S]*value\s*=\s*\{\s*selectedNode\.boardTypeId[\s\S]*onChange\s*=\s*\{\s*\(?\s*event\s*\)?\s*=>[\s\S]*boardTypeId\s*:\s*Number\s*\(\s*event\.target\.value\s*\)/s,
    "Expected BOARD editor to update node.boardTypeId from a board_type select value.",
  );
  assert.match(
    boardEditorBlock,
    /boardTypes\.map\s*\(\s*\(?\s*boardType\s*\)?\s*=>[\s\S]*<option\b[\s\S]*value\s*=\s*\{\s*boardType\.id\s*\}/s,
    "Expected BOARD select options to come from board_type rows.",
  );
  assert.doesNotMatch(
    boardEditorBlock,
    /<input\b/,
    "Expected BOARD editor to use a select, not a free text input, for boardKey.",
  );
});

test("menu management client labels slug as a URL path field", async () => {
  const contents = await readClient();

  assert.match(
    contents,
    /<span[^>]*>\s*URL\s*경로\s*<\/span>|<span[^>]*>\s*공개\s*URL\s*경로\s*<\/span>/,
    "Expected the slug input label to communicate that it controls the URL path.",
  );
  assert.match(
    contents,
    /URL\s*경로|공개\s*URL에\s*들어가는\s*주소\s*조각/,
    "Expected the slug help text to explain the URL path behavior.",
  );
});
