-- Drop tables if they exist (clean slate for dev)
DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS volunteers CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS funds CASCADE;
DROP TABLE IF EXISTS notices CASCADE;
DROP TABLE IF EXISTS banners CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS site_config CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Core Tables

CREATE TABLE site_config (
    id SERIAL PRIMARY KEY,
    key VARCHAR(50) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'news', 'project', 'download'
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE banners (
    id SERIAL PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    link_url VARCHAR(255),
    title VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE notices (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'default',
    link_url VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Content Modules

CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content TEXT, -- HTML
    image_url VARCHAR(255),
    author VARCHAR(100),
    views INTEGER DEFAULT 0,
    published_at TIMESTAMP DEFAULT NOW(),
    is_published BOOLEAN DEFAULT true
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'fundraising', -- 'fundraising', 'completed'
    target_amount DECIMAL(12, 2) DEFAULT 0,
    raised_amount DECIMAL(12, 2) DEFAULT 0,
    donor_count INTEGER DEFAULT 0,
    image_url VARCHAR(255),
    description TEXT,
    content TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    valid_date TIMESTAMP -- Legacy field support
);

CREATE TABLE funds (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    total_amount DECIMAL(12, 2) DEFAULT 0,
    manager VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. User & Interaction Tables

CREATE TABLE users ( -- Renaming from admin_users to users for generality, can add role
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'editor',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE volunteers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending',
    skills TEXT,
    joined_at TIMESTAMP DEFAULT NOW(),
    hours_contributed INTEGER DEFAULT 0
);

CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    fund_id INTEGER REFERENCES funds(id),
    donor_name VARCHAR(100) DEFAULT 'Anonymous',
    amount DECIMAL(12, 2) NOT NULL,
    message TEXT,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    status VARCHAR(20) DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_news_category ON news(category_id);
CREATE INDEX idx_projects_category ON projects(category_id);
CREATE INDEX idx_donations_project ON donations(project_id);
CREATE INDEX idx_donations_fund ON donations(fund_id);
