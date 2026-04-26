import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 22149, // Aiven ka port aksar 22149 hota hai
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // 🔥 YE LINE AIVEN KE LIYE LAZMI HAI
    ssl: {
        rejectUnauthorized: false
    }
});

export default db;
