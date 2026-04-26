import express from 'express';
import { getContent, updateContent } from '../controllers/contentController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', getContent);
router.post('/update', verifyToken, updateContent);

export default router;
