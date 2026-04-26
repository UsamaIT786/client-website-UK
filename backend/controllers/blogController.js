import db from '../config/db.js';

export const getBlogs = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM blogs ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
};

export const createBlog = async (req, res) => {
    const { title, image_url, content } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO blogs (title, image_url, content) VALUES (?, ?, ?)',
            [title, image_url, content]
        );
        res.status(201).json({ id: result.insertId, message: 'Blog created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create blog' });
    }
};

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, image_url, content } = req.body;
    try {
        await db.execute(
            'UPDATE blogs SET title = ?, image_url = ?, content = ? WHERE id = ?',
            [title, image_url, content, id]
        );
        res.json({ message: 'Blog updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update blog' });
    }
};

export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM blogs WHERE id = ?', [id]);
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete blog' });
    }
};
