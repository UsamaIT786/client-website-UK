import fs from 'fs';
import path from 'path';
import stringSimilarity from 'string-similarity';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache for the document content
let documentTextCache = null;

const getDocumentContent = async () => {
    if (documentTextCache) return documentTextCache;

    // Check multiple potential locations for the files (Standard vs Monorepo root)
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
        console.error('SEARCHED PATHS:', possiblePaths);
        throw new Error('Legal document source file not found in uploads folder.');
    }

    console.log('Using document source:', foundPath);

    if (foundPath.endsWith('.txt')) {
        documentTextCache = fs.readFileSync(foundPath, 'utf8');
        return documentTextCache;
    }

    // Fallback to PDF Parsing
    try {
        const pdf = require('pdf-parse');
        const dataBuffer = fs.readFileSync(foundPath);
        const data = await pdf(dataBuffer);
        
        let cleanedText = data.text
            .replace(/[ \t]+/g, ' ')
            .split('\n')
            .map(line => line.trim())
            .join(' ')
            .replace(/\s+/g, ' ');

        documentTextCache = cleanedText;
        return cleanedText;
    } catch (err) {
        console.error('PDF Parsing failed:', err);
        throw new Error(`Failed to parse PDF: ${err.message}`);
    }
};

export const handleChat = async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const fullText = await getDocumentContent();
        
        // Split text into sentences to avoid breaking words and ensure proper structure
        const sentences = fullText.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [fullText];
        const chunks = [];
        let currentChunk = "";
        
        // Create chunks of ~500-700 characters based on sentence boundaries
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

        const matches = stringSimilarity.findBestMatch(query.toLowerCase(), chunks.map(c => c.toLowerCase()));
        
        const queryWords = query.toLowerCase().split(/\W+/).filter(w => w.length > 3);
        const scores = matches.ratings.map((rating, index) => {
            let score = rating.rating;
            const chunk = chunks[index].toLowerCase();
            let keywordMatches = 0;
            queryWords.forEach(word => {
                if (chunk.includes(word)) keywordMatches++;
            });
            if (queryWords.length > 0) {
                score += (keywordMatches / queryWords.length) * 0.4;
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

        let answer = chunks[bestMatch.index];
        
        // Refine answer to be 2-3 sentences only for clarity and brevity
        const resultSentences = answer.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [answer];
        answer = resultSentences.slice(0, 3).join(" ").trim();

        // Professional tone and formatting cleanup
        answer = answer.charAt(0).toUpperCase() + answer.slice(1);

        // Guide to assessment form for detailed or multiple questions
        const isDetailedQuery = query.length > 70 || queryWords.length > 8 || query.includes("?") && query.indexOf("?") !== query.lastIndexOf("?");
        
        if (isDetailedQuery) {
            answer += "\n\nFor a comprehensive evaluation of your situation, I recommend completing our professional assessment form for an expert review.";
        }

        res.json({ answer });

    } catch (error) {
        console.error('CRITICAL CHAT ERROR:', error);
        res.status(500).json({ 
            error: 'Document Assistant Error', 
            details: error.message
        });
    }
};
