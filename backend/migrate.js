import db from './config/db.js';

const migrate = async () => {
    console.log('🚀 Starting Database Migration...');
    
    try {
        // 1. Create Admins Table
        await db.execute(`
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Admins table ready');

        // 2. Create Site Content Table
        await db.execute(`
            CREATE TABLE IF NOT EXISTS site_content (
                id INT AUTO_INCREMENT PRIMARY KEY,
                section_key VARCHAR(255) NOT NULL UNIQUE,
                content TEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Site Content table ready');

        // 3. Create Blogs Table
        await db.execute(`
            CREATE TABLE IF NOT EXISTS blogs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                image_url TEXT,
                content TEXT NOT NULL,
                author VARCHAR(255) DEFAULT 'Admin',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Blogs table ready');

        // 4. Insert Default Admin if not exists
        const [admins] = await db.execute('SELECT * FROM admins WHERE username = "admin"');
        if (admins.length === 0) {
            // Password is 'admin123'
            const hashedPassword = '$2a$10$7k/3M4V/R.1W1O.P9f9iO.Kq/g9yFz7Z6z5y8r9jL1Pz.E5rG5i2y'; 
            await db.execute('INSERT INTO admins (username, password) VALUES (?, ?)', ['admin', hashedPassword]);
            console.log('👤 Default admin user created (admin / admin123)');
        }

        console.log('✨ Migration Completed Successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration Failed:', error.message);
        process.exit(1);
    }
};

migrate();
