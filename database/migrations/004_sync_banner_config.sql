-- Migration 004: Synchronize Banner Configuration and Update Site Settings
-- This migration updates the database to reflect consistent banner behavior
-- and ensures all site configuration is properly synchronized

-- 1. Update site_configs table to include projectsBanner field
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS projects_banner TEXT;

-- 2. Update the existing configuration with consistent banner settings
UPDATE site_configs SET
    header_image = '/logo.png',
    projects_banner = '/logo.png',
    banners = '["https://res-img.n.gongyibao.cn/uploads/1dbdc970-d95e-45a8-859b-86e4e9abe89e/20240506/96b897d2aff44edbb2441f5de3146b68.jpg", "/logo.png", "https://picsum.photos/1200/400?random=102"]',
    notices = '[
        {"id": "1", "content": "龙岗区善泽民工互助会郑重声明：谨防诈骗", "link": "/news/1", "icon": "📢"},
        {"id": "2", "content": "热烈庆祝龙岗区善泽民工互助会持续运营超过8周年", "link": "/about", "icon": "📢"},
        {"id": "3", "content": "互助帮扶解难忧，锦旗回馈话初心", "link": "/news/2", "icon": "📢"}
    ]',
    footer_info = '{
        "address": "中国广东省深圳市龙岗区 · 龙岗大道务工人员综合服务大厦",
        "phone": "0755 83942567",
        "email": "contact@shanze-longgang.org",
        "bankName": "中国建设银行深圳龙岗支行",
        "bankAccount": "6230 9183 7456 2109 852",
        "bankUnit": "龙岗区善泽民工互助会",
        "techSupport": "善泽互助会技术团队"
    }',
    base_stats = '{
        "raised": 233100000,
        "distributed": 205800000,
        "donors": 203469,
        "projects": 500,
        "volunteers": 8500
    }',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 1;

-- 3. Insert default configuration if it doesn't exist
INSERT INTO site_configs (
    id,
    header_image,
    projects_banner,
    banners,
    notices,
    footer_info,
    base_stats,
    updated_at
)
SELECT
    1,
    '/logo.png',
    '/logo.png',
    '["https://res-img.n.gongyibao.cn/uploads/1dbdc970-d95e-45a8-859b-86e4e9abe89e/20240506/96b897d2aff44edbb2441f5de3146b68.jpg", "/logo.png", "https://picsum.photos/1200/400?random=102"]',
    '[
        {"id": "1", "content": "龙岗区善泽民工互助会郑重声明：谨防诈骗", "link": "/news/1", "icon": "📢"},
        {"id": "2", "content": "热烈庆祝龙岗区善泽民工互助会持续运营超过8周年", "link": "/about", "icon": "📢"},
        {"id": "3", "content": "互助帮扶解难忧，锦旗回馈话初心", "link": "/news/2", "icon": "📢"}
    ]',
    '{
        "address": "中国广东省深圳市龙岗区 · 龙岗大道务工人员综合服务大厦",
        "email": "contact@shanze-longgang.org",
        "phone": "0755 83942567",
        "bankName": "中国建设银行深圳龙岗支行",
        "bankAccount": "6230 9183 7456 2109 852",
        "bankUnit": "龙岗区善泽民工互助会",
        "techSupport": "善泽互助会技术团队"
    }',
    '{
        "raised": 233100000,
        "distributed": 205800000,
        "donors": 203469,
        "projects": 500,
        "volunteers": 8500
    }',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM site_configs WHERE id = 1);

-- 4. Update projects table to ensure consistent data
UPDATE projects SET
    image_url = COALESCE(image_url, 'https://picsum.photos/400/300?random=' || id::text),
    updated_at = CURRENT_TIMESTAMP
WHERE image_url IS NULL OR image_url = '';

-- 5. Update news table to ensure consistent data
UPDATE news SET
    image_url = COALESCE(image_url, 'https://picsum.photos/400/300?random=' || (id + 100)::text)
WHERE image_url IS NULL OR image_url = '';

-- 6. Add qualifications and donation QRs configuration
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS qualifications JSONB DEFAULT '{}';
ALTER TABLE site_configs ADD COLUMN IF NOT EXISTS donation_qrs JSONB DEFAULT '{}';

-- Update with qualification and donation QR configuration
UPDATE site_configs SET
    qualifications = '{
        "cert1": "/images/cert_1.jpg",
        "title1": "社会团体登记证书",
        "cert2": "/images/cert_2.jpg",
        "title2": "公募资格证书"
    }',
    donation_qrs = '{
        "qr1": "/images/unified-qr.png",
        "title1": "微信扫码捐赠",
        "qr2": "/images/unified-qr.png",
        "title2": "支付宝扫码捐赠"
    }'
WHERE id = 1;

-- 7. Create index for better performance
CREATE INDEX IF NOT EXISTS idx_site_configs_updated_at ON site_configs(updated_at);

-- 8. Update navigation configuration to be consistent
UPDATE site_config SET value = '[
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
]' WHERE key = 'navigation';

-- 9. Update footer configuration to be consistent
UPDATE site_config SET value = '{
  "address": "中国广东省深圳市龙岗区 · 龙岗大道务工人员综合服务大厦",
  "phone": "0755 83942567",
  "email": "contact@shanze-longgang.org",
  "bankName": "中国建设银行深圳龙岗支行",
  "bankAccount": "6230 9183 7456 2109 852",
  "bankUnit": "龙岗区善泽民工互助会",
  "techSupport": "善泽互助会技术团队"
}' WHERE key = 'footer';

-- 10. Update stats configuration
UPDATE site_config SET value = '{
  "raised": 233100000,
  "distributed": 205800000,
  "donors": 203469,
  "projects": 500,
  "volunteers": 8500
}' WHERE key = 'stats';

COMMIT;
