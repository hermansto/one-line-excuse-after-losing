import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The whole entry is this one spoken excuse, kept under the 200-char cap.
// It is written as-is, with no newline at the end, so the file holds
// exactly the line the judge will read aloud.
const line =
  "I didn't lose the bounty. The judge simply hasn't finished appreciating my genius yet. Check back in three to five business eternities.";

if (line.length > 200) {
  throw new Error(`excuse is ${line.length} characters, over the 200 limit`);
}
if (line.endsWith("\n")) {
  throw new Error("excuse must not end with a newline");
}

// The harness only ever writes into the output folder it hands us.
// Nothing here touches the repository directory, which is read-only
// when the grader runs this program.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, line, "utf8");

// Read it straight back and prove the bytes on disk are the line,
// character for character, before we call the run a success.
const back = readFileSync(target, "utf8");
if (back !== line) {
  throw new Error("entry.txt does not match the excuse line exactly");
}

console.log(`Wrote ${back.length}-character entry to ${target}`);
