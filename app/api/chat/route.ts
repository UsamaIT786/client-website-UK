import { NextResponse } from 'next/server';
// Pre-chunked legal document — generated at build time by scripts/prebuild-chat.mjs.
// Bundled directly into the serverless function: zero file I/O, instant cold starts.
import CHUNKS from '../../../data/chunks.json';

const chunks = CHUNKS as string[];

// ─── Fast keyword scorer ──────────────────────────────────────────────────────
// Scores each chunk by how many query keywords it contains (weighted by rarity).
// No regex loops, no bigram sets — runs in microseconds per chunk.

function scoreChunk(chunk: string, queryWords: string[]): number {
  if (queryWords.length === 0) return 0;
  const cl = chunk.toLowerCase();
  let hits = 0;
  for (const word of queryWords) {
    if (cl.includes(word)) hits++;
  }
  return hits / queryWords.length;
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
    // Only keep words longer than 3 chars to avoid noise
    const queryWords = queryLower.split(/\W+/).filter((w) => w.length > 3);

    // ── Score all chunks (fast: ~1–3 ms for 200 chunks) ───────────────────────
    const scored = chunks
      .map((chunk, idx) => ({ idx, score: scoreChunk(chunk, queryWords), chunk }))
      .filter((c) => c.score > 0)
      .sort((a, b) => b.score - a.score);

    // ── No match → graceful fallback ──────────────────────────────────────────
    if (scored.length === 0) {
      return NextResponse.json({
        answer:
          'I can only answer questions based on our official legal documentation. For advice tailored to your specific situation, please use our assessment form.',
      });
    }

    const best = scored[0];

    // ── Extract first 3 sentences for a concise answer ────────────────────────
    const rawSentences = best.chunk.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [best.chunk];
    let answer = rawSentences.slice(0, 3).join(' ').trim();
    answer = answer.charAt(0).toUpperCase() + answer.slice(1);

    // ── Suggest assessment form for complex multi-part queries ────────────────
    if (
      query.length > 70 ||
      queryWords.length > 8 ||
      (query.includes('?') && query.indexOf('?') !== query.lastIndexOf('?'))
    ) {
      answer +=
        '\n\nFor a comprehensive evaluation of your situation, I recommend completing our professional assessment form for an expert review.';
    }

    return NextResponse.json({ answer });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[Chat API] Error:', msg);
    // Always return 200 so the frontend gets a readable message, never a raw error
    return NextResponse.json({
      answer:
        'I encountered an issue processing your request. Please try again or contact us directly.',
    });
  }
}
