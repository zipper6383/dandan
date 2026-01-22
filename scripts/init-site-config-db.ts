import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Force load env vars BEFORE any other imports
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const DEFAULT_CONFIG = {
    headerImage: "https://res-img.n.gongyibao.cn/uploads/1dbdc970-d95e-45a8-859b-86e4e9abe89e/20240516/baba08128b1845d5866db0a8ed417d1f.jpg",
    banners: [
        "https://res-img.n.gongyibao.cn/uploads/1dbdc970-d95e-45a8-859b-86e4e9abe89e/20240506/96b897d2aff44edbb2441f5de3146b68.jpg",
        "https://picsum.photos/1200/400?random=101",
        "https://picsum.photos/1200/400?random=102"
    ],
    notices: [
        { id: '1', content: '龙岗区善泽民工互助会郑重声明：谨防诈骗', link: '/news/n1', icon: '📢' },
        { id: '2', content: '热烈庆祝龙岗区善泽民工互助会持续运营超过25周年', link: '/about', icon: '📢' },
        { id: '3', content: '守护工友权益，扶助困难群体', link: '/news/n2', icon: '📢' }
    ],
    footer: {
        address: "中国广东省深圳市龙岗区 · 龙岗大道务工人员综合服务大厦",
        phone: "0755 83942567",
        email: "contact@shanze-longgang.org",
        bankName: "中国建设银行深圳龙岗支行",
        bankAccount: "6230 9183 7456 2109 852",
        bankUnit: "龙岗区善泽民工互助会",
        techSupport: "公益宝"
    },
    baseStats: {
        raised: 233100000,
        distributed: 205800000,
        donors: 203469
    }
};

async function initSiteConfig() {
    console.log('🔄 Initializing Site Config Table...');

    try {
        // Dynamic import to ensure env vars are loaded
        const { sql } = await import('../database/db');

        // 1. Create table
        await sql`
      CREATE TABLE IF NOT EXISTS site_configs (
        id SERIAL PRIMARY KEY,
        header_image TEXT NOT NULL,
        banners JSONB DEFAULT '[]',
        notices JSONB DEFAULT '[]',
        footer_info JSONB DEFAULT '{}',
        base_stats JSONB DEFAULT '{}',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        console.log('✅ Table site_configs created (or exists).');

        // 2. Check if config exists
        const existing = await sql`SELECT id FROM site_configs WHERE id = 1`;

        if (existing.length === 0) {
            // 3. Insert default config
            // Note: Neon/Postgres driver handles JSON serialization automatically if we pass the object, 
            // but sometimes it's safer to pass stringified JSON for JSONB columns if using raw SQL tagged template.
            // Let's rely on JSON.stringify to be safe.
            await sql`
        INSERT INTO site_configs (id, header_image, banners, notices, footer_info, base_stats)
        VALUES (
            1, 
            ${DEFAULT_CONFIG.headerImage}, 
            ${JSON.stringify(DEFAULT_CONFIG.banners)}, 
            ${JSON.stringify(DEFAULT_CONFIG.notices)}, 
            ${JSON.stringify(DEFAULT_CONFIG.footer)}, 
            ${JSON.stringify(DEFAULT_CONFIG.baseStats)}
        )
      `;
            console.log('✅ Default configuration seeded.');
        } else {
            console.log('ℹ️ Configuration already exists. Skipping seed.');
        }

        process.exit(0);

    } catch (error) {
        console.error('❌ Error initializing site config:', error);
        process.exit(1);
    }
}

initSiteConfig();
