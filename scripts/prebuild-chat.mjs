/**
 * Pre-build script: Converts ilovepdf_merged.txt → data/chunks.json
 * Run automatically before every `next build` via the "prebuild" npm hook.
 *
 * This eliminates ALL runtime file I/O in the chat API route, making
 * the chatbot respond instantly even on a cold serverless start.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SOURCE_PATHS = [
  path.join(ROOT, 'data', 'ilovepdf_merged.txt'),
  path.join(ROOT, 'backend', 'uploads', 'ilovepdf_merged.txt'),
];

const OUTPUT_PATH = path.join(ROOT, 'data', 'chunks.json');

// ─── Read document ────────────────────────────────────────────────────────────
let rawText = '';
for (const p of SOURCE_PATHS) {
  if (fs.existsSync(p)) {
    rawText = fs.readFileSync(p, 'utf8');
    console.log(`[prebuild-chat] ✅ Read source: ${p} (${(rawText.length / 1024).toFixed(1)} KB)`);
    break;
  }
}

if (!rawText) {
  console.error('[prebuild-chat] ❌ Source document not found — skipping chunk generation.');
  process.exit(0); // Non-fatal: dev may not have the file yet
}

// ─── Chunk by sentence boundaries (~600 chars each) ──────────────────────────
const sentences = rawText.match(/[^.!?\r\n]+[.!?]+(?:\s|$)/g) || [rawText];
const chunks = [];
let current = '';

for (const sentence of sentences) {
  const s = sentence.replace(/\s+/g, ' ').trim();
  if (!s || s.length < 10) continue; // Skip noise

  if ((current + ' ' + s).length < 650) {
    current += (current ? ' ' : '') + s;
  } else {
    if (current.length > 30) chunks.push(current);
    current = s;
  }
}
if (current.length > 30) chunks.push(current);

// ─── Write output ─────────────────────────────────────────────────────────────
fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(chunks), 'utf8');

console.log(`[prebuild-chat] ✅ Generated ${chunks.length} chunks → ${OUTPUT_PATH}`);
console.log(`[prebuild-chat] 📦 Output size: ${(fs.statSync(OUTPUT_PATH).size / 1024).toFixed(1)} KB`);
