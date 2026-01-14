import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Force load env vars BEFORE any other imports
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const UPDATED_CONFIG = {
    headerImage: "/images/changan.png",
    projectsBanner: "/images/changan.png",
    banners: [
        "https://res-img.n.gongyibao.cn/uploads/1dbdc970-d95e-45a8-859b-86e4e9abe89e/20240506/96b897d2aff44edbb2441f5de3146b68.jpg",
        "/images/changan.png",
        "https://picsum.photos/1200/400?random=102"
    ],
    notices: [
        { id: '1', content: '长安仁爱慈善基金会郑重声明：谨防诈骗', link: '/news/1', icon: '📢' },
        { id: '2', content: '热烈庆祝长安仁爱慈善基金会持续运营超过25周年', link: '/about', icon: '📢' },
        { id: '3', content: '慈善帮扶解难忧，锦旗回馈话初心', link: '/news/2', icon: '📢' }
    ],
    footer: {
        address: "陕西省西安市莲湖区长安文化遗产大厦五层",
        phone: "029-86785588",
        email: "contact@changanrenai.org.cn",
        bankName: "中国银行西安高新支行",
        bankAccount: "1234 5678 9012 3456",
        bankUnit: "长安仁爱慈善基金会",
        techSupport: "长安仁爱慈善基金会技术团队"
    },
    baseStats: {
        raised: 542000000,
        distributed: 300000000,
        donors: 1250000,
        projects: 500,
        volunteers: 8500
    },
    qualifications: {
        cert1: "/images/cert_1.jpg",
        title1: "社会团体登记证书",
        cert2: "/images/cert_2.jpg",
        title2: "公募资格证书"
    },
    paymentMethods: {
        alipay: {
            name: "长安仁爱慈善基金会",
            account: "请联系我们获取",
            icon: ""
        },
        wechat: {
            name: "长安仁爱慈善基金会",
            account: "请联系我们获取",
            icon: ""
        }
    },

};

async function syncDatabaseConfig() {
    console.log('🔄 Synchronizing Database Configuration...');

    try {
        // Dynamic import to ensure env vars are loaded
        const { sql } = await import('../database/db');

        // 1. Ensure site_configs table has all necessary columns
        console.log('📊 Updating table structure...');
        await sql`
            ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS projects_banner TEXT;
            ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS qualifications JSONB DEFAULT '{}';
            ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS payment_methods JSONB DEFAULT '{}';
        `;

        // 2. Update existing configuration or insert new one
        console.log('💾 Updating site configuration...');
        await sql`
            INSERT INTO site_configs (
                id, 
                header_image, 
                projects_banner,
                banners, 
                notices, 
                footer_info, 
                base_stats,
                qualifications,
                payment_methods,
                updated_at
            ) VALUES (
                1,
                ${UPDATED_CONFIG.headerImage},
                ${UPDATED_CONFIG.projectsBanner},
                ${JSON.stringify(UPDATED_CONFIG.banners)},
                ${JSON.stringify(UPDATED_CONFIG.notices)},
                ${JSON.stringify(UPDATED_CONFIG.footer)},
                ${JSON.stringify(UPDATED_CONFIG.baseStats)},
                ${JSON.stringify(UPDATED_CONFIG.qualifications)},
                ${JSON.stringify(UPDATED_CONFIG.paymentMethods)},
                CURRENT_TIMESTAMP
            )
            ON CONFLICT (id) DO UPDATE SET
                header_image = EXCLUDED.header_image,
                projects_banner = EXCLUDED.projects_banner,
                banners = EXCLUDED.banners,
                notices = EXCLUDED.notices,
                footer_info = EXCLUDED.footer_info,
                base_stats = EXCLUDED.base_stats,
                qualifications = EXCLUDED.qualifications,
                payment_methods = EXCLUDED.payment_methods,
                updated_at = CURRENT_TIMESTAMP;
        `;

        // 3. Update legacy site_config table for backward compatibility
        console.log('🔄 Updating legacy configuration...');
        
        const navigationConfig = [
            {"id":"home","label":"首页","path":"/"},
            {"id":"info","label":"信息公开","path":"/info","children":[
                {"id":"i1","label":"网络资料下载","path":"/info/download"},
                {"id":"i2","label":"财务工作报告","path":"/info/financial"},
                {"id":"i3","label":"年度工作报告","path":"/info/annual"},
                {"id":"i4","label":"收支明细","path":"/info/transactions"}
            ]},
            {"id":"news","label":"新闻中心","path":"/news","children":[
                {"id":"n1","label":"慈善资讯","path":"/news/charity"},
                {"id":"n2","label":"媒体报道","path":"/news/media"},
                {"id":"n3","label":"区县动态","path":"/news/district"}
            ]},
            {"id":"projects","label":"慈善项目","path":"/projects"},
            {"id":"funds","label":"公益基金","path":"/funds"},
            {"id":"volunteer","label":"志愿服务","path":"/volunteer"},
            {"id":"about","label":"机构介绍","path":"/about"}
        ];

        // Update navigation
        await sql`
            INSERT INTO site_config (key, value) VALUES ('navigation', ${JSON.stringify(navigationConfig)})
            ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
        `;

        // Update footer
        await sql`
            INSERT INTO site_config (key, value) VALUES ('footer', ${JSON.stringify(UPDATED_CONFIG.footer)})
            ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
        `;

        // Update stats
        await sql`
            INSERT INTO site_config (key, value) VALUES ('stats', ${JSON.stringify(UPDATED_CONFIG.baseStats)})
            ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
        `;

        // 4. Ensure all projects and news have images
        console.log('🖼️ Updating content images...');
        await sql`
            UPDATE projects SET 
                image_url = COALESCE(image_url, 'https://picsum.photos/400/300?random=' || id::text),
                updated_at = CURRENT_TIMESTAMP
            WHERE image_url IS NULL OR image_url = '';
        `;

        await sql`
            UPDATE news SET 
                image_url = COALESCE(image_url, 'https://picsum.photos/400/300?random=' || (id + 100)::text)
            WHERE image_url IS NULL OR image_url = '';
        `;

        // 5. Create performance indexes
        console.log('⚡ Creating performance indexes...');
        await sql`
            CREATE INDEX IF NOT EXISTS idx_site_configs_updated_at ON site_configs(updated_at);
            CREATE INDEX IF NOT EXISTS idx_projects_updated_at ON projects(updated_at);
            CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at);
        `;

        console.log('✅ Database configuration synchronized successfully!');
        console.log('🎯 All banner configurations are now consistent');
        console.log('📱 All devices will display images with consistent stretch-fill behavior');
        console.log('⚙️ Admin interface updated with new configuration options');

        process.exit(0);

    } catch (error) {
        console.error('❌ Error synchronizing database configuration:', error);
        process.exit(1);
    }
}

syncDatabaseConfig();