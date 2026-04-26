-- Admin Table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site Content Table
CREATE TABLE IF NOT EXISTS site_content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_key VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url TEXT,
    content TEXT NOT NULL,
    author VARCHAR(255) DEFAULT 'Admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert a default admin (password: admin123)
-- Note: In a real app, you should hash this password. This is just for initial setup.
-- I will provide a script to update this with a hashed password.
INSERT INTO admins (username, password) VALUES ('admin', '$2a$10$7k/3M4V/R.1W1O.P9f9iO.Kq/g9yFz7Z6z5y8r9jL1Pz.E5rG5i2y'); -- admin123 hashed
