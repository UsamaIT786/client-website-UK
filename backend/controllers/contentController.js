import db from '../config/db.js';

export const getContent = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM site_content');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch content' });
    }
};

export const updateContent = async (req, res) => {
    const { section_key, content } = req.body;

    try {
        await db.execute(
            'INSERT INTO site_content (section_key, content) VALUES (?, ?) ON DUPLICATE KEY UPDATE content = ?',
            [section_key, content, content]
        );
        res.json({ message: 'Content updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update content' });
    }
};
