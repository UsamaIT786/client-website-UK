import express from 'express';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', getBlogs);
router.post('/', verifyToken, createBlog);
router.put('/:id', verifyToken, updateBlog);
router.delete('/:id', verifyToken, deleteBlog);

export default router;
