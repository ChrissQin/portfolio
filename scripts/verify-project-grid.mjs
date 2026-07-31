/**
 * Orientation-combination checks for resolveProjectGridLayout.
 * Run: node --import tsx scripts/verify-project-grid.mjs
 * or via the TypeScript mirror below through npx tsx.
 */

import assert from "node:assert/strict";
import { createRequire } from "node:module";

// Prefer compiled-free execution via dynamic import of the TS source through tsx.
const { resolveProjectGridLayout } = await import("../lib/projectGrid.ts");

function project(slug, orientation, gridSpan) {
  return {
    slug,
    title: slug,
    client: "Personal Project — Content Needed",
    year: "—",
    featured: true,
    description: "stub",
    contentType: "Content Needed",
    roles: ["Editor"],
    services: ["editing"],
    orientation,
    gridSpan,
    thumbnail: "/projects/project-01/poster.svg",
    videoProvider: "none",
  };
}

function spans(list) {
  return resolveProjectGridLayout(list).map((item) => item.span);
}

function assertNoSingleTrackFallback(values) {
  for (const span of values) {
    assert.notEqual(
      span,
      1,
      "horizontal/vertical cards must not fall back to a 1-column track",
    );
    assert.ok(span >= 4 && span <= 12, `unexpected span ${span}`);
  }
}

const cases = [
  {
    name: "two horizontal",
    input: [project("a", "horizontal"), project("b", "horizontal")],
    expected: [6, 6],
  },
  {
    name: "three horizontal",
    input: [
      project("a", "horizontal"),
      project("b", "horizontal"),
      project("c", "horizontal"),
    ],
    expected: [6, 6, 8],
  },
  {
    name: "one horizontal one vertical",
    input: [project("a", "horizontal"), project("b", "vertical")],
    expected: [7, 5],
  },
  {
    name: "vertical then horizontal",
    input: [project("a", "vertical"), project("b", "horizontal")],
    expected: [5, 7],
  },
  {
    name: "two vertical",
    input: [project("a", "vertical"), project("b", "vertical")],
    expected: [6, 6],
  },
  {
    name: "HVH stub order",
    input: [
      project("a", "horizontal"),
      project("b", "vertical"),
      project("c", "horizontal"),
    ],
    expected: [7, 5, 8],
  },
  {
    name: "VHH order",
    input: [
      project("a", "vertical"),
      project("b", "horizontal"),
      project("c", "horizontal"),
    ],
    expected: [5, 7, 8],
  },
  {
    name: "six mixed",
    input: [
      project("a", "horizontal"),
      project("b", "horizontal"),
      project("c", "vertical"),
      project("d", "vertical"),
      project("e", "horizontal"),
      project("f", "vertical"),
    ],
    expected: [6, 6, 6, 6, 7, 5],
  },
  {
    name: "explicit gridSpan override",
    input: [
      project("a", "horizontal", 12),
      project("b", "vertical"),
    ],
    expected: [12, 5],
  },
];

for (const testCase of cases) {
  const actual = spans(testCase.input);
  assert.deepEqual(actual, testCase.expected, testCase.name);
  assertNoSingleTrackFallback(actual);
  console.log(`ok — ${testCase.name}: [${actual.join(", ")}]`);
}

console.log(`\n${cases.length} orientation combinations passed.`);

// Silence unused in environments without tsx path quirks
void createRequire;
