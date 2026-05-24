import { NextResponse } from 'next/server';
// Pre-chunked legal document — generated at build time by scripts/prebuild-chat.mjs.
// Bundled directly into the serverless function: zero file I/O, instant cold starts.
import CHUNKS from '../../../data/chunks.json';

const chunks = CHUNKS as string[];

// ─── Stopwords ────────────────────────────────────────────────────────────────
// Common English words that add noise to keyword matching.
const STOPWORDS = new Set([
  'about', 'after', 'also', 'been', 'before', 'between', 'both', 'but',
  'can', 'come', 'could', 'does', 'each', 'even', 'every', 'from', 'have',
  'here', 'however', 'into', 'its', 'just', 'like', 'make', 'many', 'more',
  'most', 'must', 'need', 'not', 'only', 'other', 'our', 'over', 'same',
  'should', 'since', 'some', 'such', 'than', 'that', 'their', 'them', 'then',
  'there', 'these', 'they', 'this', 'those', 'through', 'time', 'under',
  'until', 'very', 'was', 'what', 'when', 'where', 'which', 'while', 'will',
  'with', 'would', 'your',
]);

// ─── Sanitise extracted text ──────────────────────────────────────────────────
// Removes HTML-like noise, control characters, and excess whitespace.
function sanitise(text: string): string {
  return text
    .replace(/<[^>]+>/g, ' ')      // strip any HTML tags
    .replace(/[^\x20-\x7E\n]/g, ' ') // keep only printable ASCII + newlines
    .replace(/\s{2,}/g, ' ')       // collapse multiple spaces
    .trim();
}

// ─── Fast keyword scorer ──────────────────────────────────────────────────────
function scoreChunk(chunk: string, queryWords: string[]): number {
  if (queryWords.length === 0) return 0;
  const cl = chunk.toLowerCase();
  let hits = 0;
  for (const word of queryWords) {
    if (cl.includes(word)) hits++;
  }
  return hits / queryWords.length;
}

// ─── Extract up to 4 clean sentences from the best-matching chunk ─────────────
function extractAnswer(chunk: string): string {
  const clean = sanitise(chunk);
  // Split on sentence-ending punctuation followed by a space or end
  const sentences = clean.match(/[^.!?]+[.!?]+(?:\s|$)/g) ?? [clean];
  const selected = sentences
    .map(s => s.trim())
    .filter(s => s.length > 20) // skip very short fragments
    .slice(0, 4)
    .join(' ')
    .trim();

  if (!selected) return clean.slice(0, 400).trim();

  // Ensure the first letter is capitalised
  return selected.charAt(0).toUpperCase() + selected.slice(1);
}

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query: string = (body.query ?? '').trim();

    if (!query) {
      return NextResponse.json({ error: 'Query is required.' }, { status: 400 });
    }

    const queryLower = query.toLowerCase();
    const queryWords = queryLower
      .split(/\W+/)
      .filter(w => w.length > 3 && !STOPWORDS.has(w));

    // ── Score all chunks ───────────────────────────────────────────────────────
    const scored = chunks
      .map((chunk, idx) => ({ idx, score: scoreChunk(chunk, queryWords), chunk }))
      .filter(c => c.score > 0)
      .sort((a, b) => b.score - a.score);

    // ── No match → graceful fallback ──────────────────────────────────────────
    if (scored.length === 0) {
      return NextResponse.json({
        answer:
          'I was unable to find relevant information for your query within our documentation. For advice tailored to your specific situation, please complete our free assessment form and a regulated immigration specialist will be in touch.',
      });
    }

    const answer = extractAnswer(scored[0].chunk);

    return NextResponse.json({ answer });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[Chat API] Error:', msg);
    return NextResponse.json({
      answer:
        'I encountered an issue processing your request. Please try again shortly, or contact us directly for assistance.',
    });
  }
}
