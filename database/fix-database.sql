-- =============================================
-- Database Fix Script
-- Fixes categories, migrations, and seed data
-- =============================================

-- 1. Create about_content table if not exists
CREATE TABLE IF NOT EXISTS about_content (
  id SERIAL PRIMARY KEY,
  section VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_about_section ON about_content(section);
CREATE INDEX IF NOT EXISTS idx_about_active ON about_content(is_active);

-- 2. Clear and reseed categories with proper data
-- First, update foreign keys to NULL
UPDATE news SET category_id = NULL;
UPDATE projects SET category_id = NULL;

-- Now safe to delete categories
DELETE FROM categories;

INSERT INTO categories (name, slug, type, sort_order) VALUES
-- News categories
('慈善资讯', 'charity', 'news', 1),
('媒体报道', 'media', 'news', 2),
('区县动态', 'district', 'news', 3),
-- Project categories
('助学项目', 'education', 'project', 1),
('医疗救助', 'medical', 'project', 2),
('社区服务', 'community', 'project', 3),
('扶老助残', 'elderly', 'project', 4),
('应急救援', 'emergency', 'project', 5);

-- 3. Insert about content if not exists
INSERT INTO about_content (section, title, content, sort_order, is_active)
SELECT 'intro', '关于我们', '<h2>长安仁爱慈善基金会</h2><p>长安仁爱慈善基金会成立于2010年，是经西安市民政局批准成立的地方性公募基金会。我们致力于扶贫济困、助学助医、关爱弱势群体，为构建和谐社会贡献力量。</p><p>基金会秉承"仁爱为本、慈善为怀"的理念，坚持公开透明、规范运作的原则，积极开展各类慈善公益活动。</p>', 1, true
WHERE NOT EXISTS (SELECT 1 FROM about_content WHERE section = 'intro');

INSERT INTO about_content (section, title, content, sort_order, is_active)
SELECT 'mission', '我们的使命', '<h3>使命与愿景</h3><ul><li><strong>使命：</strong>传递爱心，帮助需要帮助的人</li><li><strong>愿景：</strong>让每个人都能感受到社会的温暖</li><li><strong>价值观：</strong>诚信、透明、专业、高效</li></ul>', 2, true
WHERE NOT EXISTS (SELECT 1 FROM about_content WHERE section = 'mission');

INSERT INTO about_content (section, title, content, sort_order, is_active)
SELECT 'services', '服务领域', '<h3>我们的服务</h3><div><h4>1. 扶贫济困</h4><p>为贫困家庭提供生活救助和发展支持</p><h4>2. 助学助教</h4><p>资助贫困学生完成学业，改善教育条件</p><h4>3. 医疗救助</h4><p>帮助大病患者减轻医疗负担</p><h4>4. 养老助残</h4><p>关爱老年人和残疾人群体</p></div>', 3, true
WHERE NOT EXISTS (SELECT 1 FROM about_content WHERE section = 'services');

INSERT INTO about_content (section, title, content, sort_order, is_active)
SELECT 'achievements', '发展历程', '<h3>我们的成就</h3><p><strong>2010年</strong> - 基金会正式成立</p><p><strong>2015年</strong> - 获得公募资格</p><p><strong>2020年</strong> - 累计募集善款突破5000万元</p><p><strong>2024年</strong> - 服务受益人群超过10万人次</p>', 4, true
WHERE NOT EXISTS (SELECT 1 FROM about_content WHERE section = 'achievements');

INSERT INTO about_content (section, title, content, sort_order, is_active)
SELECT 'team', '组织架构', '<h3>理事会成员</h3><p>基金会设理事会、监事会，实行理事会领导下的秘书长负责制。</p><ul><li>理事长：张三</li><li>副理事长：李四、王五</li><li>秘书长：赵六</li></ul>', 5, true
WHERE NOT EXISTS (SELECT 1 FROM about_content WHERE section = 'team');

INSERT INTO about_content (section, title, content, sort_order, is_active)
SELECT 'contact', '联系我们', '<h3>联系方式</h3><p><strong>地址：</strong>陕西省西安市莲湖区长安文化遗产大厦五层</p><p><strong>电话：</strong>029-86785588</p><p><strong>邮箱：</strong>info@renai-changan.org</p><p><strong>工作时间：</strong>周一至周五 9:00-17:30</p>', 6, true
WHERE NOT EXISTS (SELECT 1 FROM about_content WHERE section = 'contact');

-- 4. Update existing news to use proper category slugs
UPDATE news SET category_id = (SELECT id FROM categories WHERE slug = 'charity' AND type = 'news' LIMIT 1)
WHERE id IN (SELECT id FROM news WHERE category_id IS NULL OR category_id NOT IN (SELECT id FROM categories));

-- 5. Update existing projects to use proper category IDs
UPDATE projects SET category_id = (SELECT id FROM categories WHERE slug = 'education' AND type = 'project' LIMIT 1)
WHERE category_id IS NULL OR category_id NOT IN (SELECT id FROM categories);

-- Verify results
SELECT 'Categories count:' as info, COUNT(*) as count FROM categories
UNION ALL
SELECT 'About content count:' as info, COUNT(*) as count FROM about_content
UNION ALL
SELECT 'News count:' as info, COUNT(*) as count FROM news
UNION ALL
SELECT 'Projects count:' as info, COUNT(*) as count FROM projects;
