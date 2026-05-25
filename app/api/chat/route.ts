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

// ─── Predefined Intents ────────────────────────────────────────────────────────
// High-quality, 3-line responses for the most common immigration queries
const INTENTS = [
  {
    keywords: ["visitor visa", "visit visa", "tourist visa", "holiday visa"],
    answer: "A UK Visitor Visa allows you to stay in the UK for up to 6 months for tourism, visiting family, or short-term business activities. You must prove you are a genuine visitor and intend to leave the UK at the end of your visit. For specific advice on your situation, please complete our free assessment form."
  },
  {
    keywords: ["student visa", "tier 4", "study in uk", "university visa"],
    answer: "The UK Student Visa (formerly Tier 4) is for individuals aged 16 or over who have been offered a place on a course by a licensed student sponsor. You need to prove you have enough money to support yourself and pay for your course. Please complete our free assessment form to start your application process."
  },
  {
    keywords: ["skilled worker", "work permit", "work visa", "tier 2", "sponsor"],
    answer: "A Skilled Worker visa allows you to come to or stay in the UK to do an eligible job with an approved employer. You must have a 'certificate of sponsorship' from your employer and meet specific salary requirements. If you have a job offer, complete our assessment form for professional guidance."
  },
  {
    keywords: ["spouse visa", "partner visa", "family reunion", "marriage visa", "dependent visa", "family visa"],
    answer: "The UK Family Visa allows you to live with your spouse, partner, or family member in the UK. You must meet specific financial requirements (usually a combined income of £29,000) and prove your relationship is genuine. Our specialists can help you navigate this complex process if you complete an assessment."
  },
  {
    keywords: ["citizenship", "ilr", "indefinite leave", "settlement", "british passport"],
    answer: "Indefinite Leave to Remain (ILR) allows you to settle in the UK without time restrictions, and is typically available after 5 years on a qualifying visa. After holding ILR for 12 months, you may be eligible to apply for British Citizenship. Contact us via the assessment form to verify your eligibility."
  },
  {
    keywords: ["appeal", "judicial review", "admin review", "refused visa", "refusal"],
    answer: "If your visa application was refused, you may have the right to an Administrative Review, an Immigration Appeal, or a Judicial Review depending on your case. Strict time limits apply, so it is crucial to act quickly. Please fill out our assessment form immediately so our legal team can review your refusal."
  }
];

function matchIntent(queryLower: string): string | null {
  for (const intent of INTENTS) {
    if (intent.keywords.some(kw => queryLower.includes(kw))) {
      return intent.answer;
    }
  }
  return null;
}

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
  let score = 0;
  for (const word of queryWords) {
    // Count exact word occurrences
    const match = cl.match(new RegExp(`\\b${word}\\b`, 'gi'));
    if (match) {
      // 1 point for the first occurrence, 0.1 for subsequent ones to prevent spamming
      score += 1 + (match.length - 1) * 0.1;
    }
  }
  return score;
}

// ─── Extract up to 4 relevant sentences from the best-matching chunk ──────────
function extractAnswer(chunk: string, queryWords: string[]): string {
  const clean = sanitise(chunk);
  // Split on sentence-ending punctuation followed by a space or end
  const sentences = clean.match(/[^.!?]+[.!?]+(?:\s|$)/g) ?? [clean];
  
  if (queryWords.length === 0) {
    return clean.slice(0, 400).trim();
  }

  // Score each sentence
  const scoredSentences = sentences.map(sentence => {
    const sl = sentence.toLowerCase();
    let hits = 0;
    for (const word of queryWords) {
      if (sl.match(new RegExp(`\\b${word}\\b`, 'i'))) {
        hits++;
      }
    }
    return { sentence: sentence.trim(), hits };
  });

  // Find the index of the best matching sentence
  let bestIndex = 0;
  let maxHits = -1;
  scoredSentences.forEach((s, idx) => {
    if (s.hits > maxHits) {
      maxHits = s.hits;
      bestIndex = idx;
    }
  });

  // Extract the best sentence and surrounding context (e.g., 1 before, 2 after)
  const startIdx = Math.max(0, bestIndex - 1);
  const endIdx = Math.min(sentences.length, startIdx + 3);
  
  const selected = sentences
    .slice(startIdx, endIdx)
    .map(s => s.trim())
    .filter(s => s.length > 10) // skip very short fragments
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

    // ── Check Predefined Intents ───────────────────────────────────────────────
    const intentAnswer = matchIntent(queryLower);
    if (intentAnswer) {
      return NextResponse.json({ answer: intentAnswer });
    }

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

    const answer = extractAnswer(scored[0].chunk, queryWords);

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
