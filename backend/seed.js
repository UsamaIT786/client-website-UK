import bcrypt from 'bcryptjs';
import db from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
    try {
        const password = 'admin123';
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Generated hash:', hashedPassword);

        // Delete old admin and insert fresh one
        await db.execute('DELETE FROM admins WHERE username = ?', ['admin']);
        await db.execute('INSERT INTO admins (username, password) VALUES (?, ?)', ['admin', hashedPassword]);

        console.log('✅ Admin user created successfully!');
        console.log('   Username: admin');
        console.log('   Password: admin123');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

seedAdmin();
