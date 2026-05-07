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

const getDocumentContent = async (pdfPath) => {
    if (documentTextCache) return documentTextCache;

    // 1. Check for a .txt version first (Fastest & most stable for production)
    const txtPath = pdfPath.replace('.pdf', '.txt');
    if (fs.existsSync(txtPath)) {
        console.log('Using optimized .txt source');
        documentTextCache = fs.readFileSync(txtPath, 'utf8');
        return documentTextCache;
    }

    // 2. Fallback to PDF Parsing
    if (!fs.existsSync(pdfPath)) {
        throw new Error(`Document not found at ${pdfPath}`);
    }

    console.log('Parsing PDF (this may be slow for large files)...');
    try {
        const pdf = require('pdf-parse');
        const dataBuffer = fs.readFileSync(pdfPath);
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
        throw new Error(`Failed to parse PDF: ${err.message}. Tip: Upload a .txt version for better performance.`);
    }
};

export const handleChat = async (req, res) => {
    const { query } = req.body;
    // Standardize path for Vercel
    const pdfPath = path.join(process.cwd(), 'uploads', 'ilovepdf_merged.pdf');

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const fullText = await getDocumentContent(pdfPath);
        
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

        if (bestMatch.score < 0.35) {
            return res.json({ 
                answer: "I apologize, but I can only provide information based on the official legal documents provided. This specific detail is not available." 
            });
        }

        res.json({ answer: chunks[bestMatch.index].trim() });

    } catch (error) {
        console.error('CRITICAL CHAT ERROR:', error);
        // On production, return the error message so we can see it in the console/network tab
        res.status(500).json({ 
            error: 'Document Assistant Error', 
            details: error.message,
            tip: "If this is a timeout or memory error, please upload a .txt version of your PDF to the uploads folder."
        });
    }
};
