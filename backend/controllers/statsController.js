import db from '../config/db.js';

export const getStats = async (req, res) => {
    try {
        const [blogCount] = await db.execute('SELECT COUNT(*) as count FROM blogs');
        const [contentCount] = await db.execute('SELECT COUNT(*) as count FROM site_content');
        const [adminCount] = await db.execute('SELECT COUNT(*) as count FROM admins');
        const [recentBlogs] = await db.execute('SELECT id, title, created_at FROM blogs ORDER BY created_at DESC LIMIT 5');
        const [recentContent] = await db.execute('SELECT id, section_key, updated_at FROM site_content ORDER BY updated_at DESC LIMIT 5');

        res.json({
            blogs: blogCount[0].count,
            contentSections: contentCount[0].count,
            admins: adminCount[0].count,
            recentBlogs,
            recentContent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch stats: ' + error.message });
    }
};
