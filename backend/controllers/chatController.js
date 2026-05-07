import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';
import stringSimilarity from 'string-similarity';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache for the PDF content to avoid re-reading every time
let pdfTextCache = null;
let lastModified = 0;

const getPdfContent = async (pdfPath) => {
    const stats = fs.statSync(pdfPath);
    if (pdfTextCache && stats.mtimeMs === lastModified) {
        return pdfTextCache;
    }

    const dataBuffer = fs.readFileSync(pdfPath);
    const parser = new PDFParse({ data: dataBuffer });
    const data = await parser.getText();
    
    // Clean the text:
    // 1. Replace multiple spaces with single space
    // 2. Join lines that likely belong together (if line doesn't end in punctuation)
    let cleanedText = data.text
        .replace(/[ \t]+/g, ' ')
        .split('\n')
        .map(line => line.trim())
        .join(' ')
        .replace(/\. \. \./g, '...') // fix ellipses
        .replace(/\s+/g, ' ');

    pdfTextCache = cleanedText;
    lastModified = stats.mtimeMs;
    return cleanedText;
};

export const handleChat = async (req, res) => {
    const { query } = req.body;
    const pdfPath = path.join(__dirname, '../uploads/ilovepdf_merged.pdf');

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        if (!fs.existsSync(pdfPath)) {
            return res.json({ 
                answer: "I apologize, but I can only provide information based on the official legal documents provided. This specific detail is not available." 
            });
        }

        const fullText = await getPdfContent(pdfPath);
        
        // Split into overlapping windows for better context matching
        const windowSize = 800;
        const overlap = 200;
        const chunks = [];
        
        for (let i = 0; i < fullText.length; i += (windowSize - overlap)) {
            chunks.push(fullText.substring(i, i + windowSize));
            if (i + windowSize >= fullText.length) break;
        }

        // Find matches
        const matches = stringSimilarity.findBestMatch(query.toLowerCase(), chunks.map(c => c.toLowerCase()));
        
        // Improve score based on keyword overlap
        const queryWords = query.toLowerCase().split(/\W+/).filter(w => w.length > 3);
        const scores = matches.ratings.map((rating, index) => {
            let score = rating.rating;
            const chunk = chunks[index].toLowerCase();
            
            // Keyword boost
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

        // The threshold needs to be adjusted because we added keyword boosting
        // Combined score above 0.4 is usually decent
        if (bestMatch.score < 0.4) {
            return res.json({ 
                answer: "I apologize, but I can only provide information based on the official legal documents provided. This specific detail is not available." 
            });
        }

        let answer = chunks[bestMatch.index].trim();
        
        // Trim to nearest sentence if possible to look cleaner
        const firstSentenceEnd = answer.indexOf('. ');
        const lastSentenceEnd = answer.lastIndexOf('. ');
        
        // Ensure we don't return a half-sentence at the start/end if possible
        // but for a 12MB PDF, chunks are better than nothing.
        
        res.json({ answer });

    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
