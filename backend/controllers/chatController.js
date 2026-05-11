import fs from 'fs';
import path from 'path';
import stringSimilarity from 'string-similarity';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache for document chunks and text
let cachedChunks = null;
let documentTextCache = null;

const getDocumentContent = async () => {
    if (documentTextCache) return documentTextCache;

    const possiblePaths = [
        path.join(process.cwd(), 'backend', 'uploads', 'ilovepdf_merged.txt'),
        path.join(process.cwd(), 'uploads', 'ilovepdf_merged.txt'),
        path.join(process.cwd(), 'backend', 'uploads', 'ilovepdf_merged.pdf'),
        path.join(process.cwd(), 'uploads', 'ilovepdf_merged.pdf')
    ];

    let foundPath = null;
    for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
            foundPath = p;
            break;
        }
    }

    if (!foundPath) {
        throw new Error('Legal document source file not found.');
    }

    if (foundPath.endsWith('.txt')) {
        documentTextCache = fs.readFileSync(foundPath, 'utf8');
        return documentTextCache;
    }

    try {
        const pdf = require('pdf-parse');
        const dataBuffer = fs.readFileSync(foundPath);
        const data = await pdf(dataBuffer);
        documentTextCache = data.text.replace(/\s+/g, ' ').trim();
        return documentTextCache;
    } catch (err) {
        throw new Error(`Failed to parse PDF: ${err.message}`);
    }
};

const getDocumentChunks = async () => {
    if (cachedChunks) return cachedChunks;

    const fullText = await getDocumentContent();
    
    // Split text into sentences to avoid breaking words and ensure proper structure
    const sentences = fullText.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [fullText];
    const chunks = [];
    let currentChunk = "";
    
    // Create chunks of ~600 characters based on sentence boundaries
    for (const sentence of sentences) {
        const cleanSentence = sentence.trim();
        if (!cleanSentence) continue;
        
        if ((currentChunk + " " + cleanSentence).length < 700) {
            currentChunk += (currentChunk ? " " : "") + cleanSentence;
        } else {
            if (currentChunk) chunks.push(currentChunk);
            currentChunk = cleanSentence;
        }
    }
    if (currentChunk) chunks.push(currentChunk);
    
    cachedChunks = chunks;
    return chunks;
};

export const handleChat = async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const chunks = await getDocumentChunks();
        const queryLower = query.toLowerCase();
        const queryWords = queryLower.split(/\W+/).filter(w => w.length > 3);

        // Pre-filter chunks to speed up similarity matching
        // Only compare chunks that share at least one keyword if possible
        let candidateChunks = chunks;
        if (queryWords.length > 0) {
            const filtered = chunks.filter(chunk => {
                const chunkLower = chunk.toLowerCase();
                return queryWords.some(word => chunkLower.includes(word));
            });
            if (filtered.length > 0) candidateChunks = filtered;
        }

        const matches = stringSimilarity.findBestMatch(queryLower, candidateChunks.map(c => c.toLowerCase()));
        
        const scores = matches.ratings.map((rating, index) => {
            let score = rating.rating;
            const chunk = candidateChunks[index].toLowerCase();
            let keywordMatches = 0;
            queryWords.forEach(word => {
                if (chunk.includes(word)) keywordMatches++;
            });
            if (queryWords.length > 0) {
                score += (keywordMatches / queryWords.length) * 0.5;
            }
            return { index, score };
        });

        scores.sort((a, b) => b.score - a.score);
        const bestMatch = scores[0];

        if (bestMatch.score < 0.25) {
            return res.json({ 
                answer: "I apologize, but I can only provide information based on our official legal documentation. For specific advice tailored to your case, please use our assessment form." 
            });
        }

        let answer = candidateChunks[bestMatch.index];
        
        // Refine answer to be 2-3 sentences only
        const resultSentences = answer.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [answer];
        answer = resultSentences.slice(0, 3).join(" ").trim();

        // Formatting cleanup
        answer = answer.charAt(0).toUpperCase() + answer.slice(1);

        // Guide to assessment form for complex queries
        if (query.length > 70 || queryWords.length > 8 || (query.includes("?") && query.indexOf("?") !== query.lastIndexOf("?"))) {
            answer += "\n\nFor a comprehensive evaluation of your situation, I recommend completing our professional assessment form for an expert review.";
        }

        res.json({ answer });

    } catch (error) {
        console.error('CRITICAL CHAT ERROR:', error);
        res.status(500).json({ error: 'Document Assistant Error' });
    }
};
