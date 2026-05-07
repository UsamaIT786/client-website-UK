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
        
        const windowSize = 1000;
        const overlap = 200;
        const chunks = [];
        
        for (let i = 0; i < fullText.length; i += (windowSize - overlap)) {
            chunks.push(fullText.substring(i, i + windowSize));
            if (i + windowSize >= fullText.length) break;
        }

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

        if (bestMatch.score < 0.3) {
            return res.json({ 
                answer: "I apologize, but I can only provide information based on the official legal documents provided. This specific detail is not available." 
            });
        }

        res.json({ answer: chunks[bestMatch.index].trim() });

    } catch (error) {
        console.error('CRITICAL CHAT ERROR:', error);
        res.status(500).json({ 
            error: 'Document Assistant Error', 
            details: error.message
        });
    }
};
