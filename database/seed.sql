-- =============================================
-- Seed Data for 龙岗区善泽民工互助会
-- =============================================

-- =============================================
-- 0. SEED CATEGORIES
-- =============================================
INSERT INTO categories (id, name, slug, type, sort_order) VALUES
(1, '慈善活动', 'activity', 'project', 1),
(2, '互助帮扶', 'aid', 'project', 2),
(3, '关爱老人', 'elderly', 'project', 3),
(4, '慈善资讯', 'charity', 'news', 1),
(5, '区县动态', 'district', 'news', 2),
(6, '媒体报道', 'media', 'news', 3);

-- Reset sequence to avoid conflicts if we add more
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));

-- =============================================
-- 1. SEED PROJECTS
-- =============================================
-- Schema: id, title, image_url, raised_amount, target_amount, donor_count, valid_date, category_id, description, content, status
INSERT INTO projects (id, title, image_url, raised_amount, target_amount, donor_count, valid_date, category_id, description, content, status) VALUES
(1, '"中华慈善日"慈善市集义卖活动', 'https://picsum.photos/800/600?random=1', 2964.04, 500000, 41, '2025-10-31', 1,
  '在每个社区，集中开展为期一天的"慈善服务日"，并围绕核心需求，再开展5场不同主题的专场服务',
  '<p>为了庆祝中华慈善日，我们将举行大型义卖活动。所有收益将用于支持社区孤寡老人。活动现场将有志愿者提供的各类手工艺品、爱心企业捐赠的物资等。</p><p>我们诚挚邀请广大市民朋友参与，献出一份爱心。</p>',
  'fundraising'),

(2, '致敬英雄，爱心传递--为见义勇为英雄李静毅家庭募捐', 'https://picsum.photos/800/600?random=2', 57402.86, 3000000, 911, '2025-10-29', 2,
  '我们呼吁全市爱心企业、社会各界人士伸出援手，汇聚爱心暖流，给予这个英雄家庭最及时、最有力的支持。',
  '<p>英雄流血不流泪。李静毅同志在危难时刻挺身而出，保护了人民群众的生命财产安全，自己却身负重伤。</p><p>目前，巨额的医疗费用让这个本就不富裕的家庭雪上加霜。每一份捐款都是对正义的弘扬，对英雄的致敬。</p>',
  'fundraising'),

(3, '爱心同行盛夏送凉', 'https://picsum.photos/800/600?random=3', 930.02, 1444444, 19, '2025-10-31', 2,
  '为弱困群体、困难家庭、户外一线工作者提供必需生活物资，保障其基本生存需求。',
  '<p>炎炎夏日，当我们享受空调的清凉时，还有许多户外工作者顶着烈日坚守岗位。</p><p>本项目旨在购买防暑降温物资（绿豆、白糖、矿泉水、毛巾等），发放给环卫工人、交警、快递小哥等一线劳动者。</p>',
  'fundraising'),

(4, '爱满夕阳红，共筑幸福餐', 'https://picsum.photos/800/600?random=4', 2765.69, 5000000, 70, '2025-10-31', 3,
  '社区老年餐厅作为解决老年人就餐问题的重要设施，其重要性日益凸显。',
  '<p>针对独居、高龄、失能老人"做饭难、吃饭难"的问题，我们发起此项目，资助社区建立老年助餐点。</p><p>每捐助10元，就能让一位老人吃上一顿热乎乎的爱心午餐。</p>',
  'fundraising');

SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));

-- =============================================
-- 2. SEED FUNDS
-- =============================================
-- Schema: id, name, image_url, manager, total_amount, created_at
INSERT INTO funds (id, name, image_url, manager, total_amount, created_at) VALUES
(1, '善泽民工子女奖学金公益基金', 'https://picsum.photos/400/300?random=5', '龙岗区善泽民工互助会', 56413.48, '2025-06-06'),
(2, '善泽工友关怀计划专项基金', 'https://picsum.photos/400/300?random=6', '龙岗区善泽民工互助会', 21932.00, '2025-05-22'),
(3, '善泽夏日送清凉行动微基金', 'https://picsum.photos/400/300?random=7', '龙岗区善泽民工互助会', 46.00, '2025-05-14'),
(4, '龙岗民工技能培训专项基金', 'https://picsum.photos/400/300?random=8', '龙岗区人力资源局', 120000.00, '2025-04-10');

SELECT setval('funds_id_seq', (SELECT MAX(id) FROM funds));

-- =============================================
-- 3. SEED NEWS
-- =============================================
-- Schema: id, title, published_at, image_url, summary, content, author, category_id
INSERT INTO news (id, title, published_at, image_url, summary, content, author, category_id) VALUES
(1, '龙岗区善泽民工互助会郑重声明', '2022-04-08', '/images/news/charity-1.jpg',
  '本会在这里郑重提示，凡在本会互联网平台或利用本会财务号诱导捐款者刷单、下载第三方软件等捐款，都属欺骗行为。',
  '<p>近期发现有不法分子冒用龙岗区善泽民工互助会名义进行诈骗...</p><p>我们郑重声明：龙岗区善泽民工互助会从未组织任何形式的"刷单返利"活动。</p>',
  '本站', 4),

(2, '慈善帮扶解难忧，锦旗回馈话初心', '2025-12-31', '/images/news/district-1.jpg',
  '一面承载着感恩之情的锦旗被郑重递上，一群特殊的访客——困难群众代表、志愿者代表齐聚于龙岗区善泽民工互助会。',
  '<p>2025年12月31日，龙岗区几位受助群众代表来到互助会，送上了一面写有"扶贫济困，大爱无疆"的锦旗。</p>',
  '本站', 5),

(3, '暖聚初心迎冬至 慈善同心聚情长', '2025-12-22', '/images/news/charity-2.jpg',
  '在冬至即将来临之际，为传承弘扬中华优秀传统文化，进一步增强团队凝聚力与向心力。',
  '<p>冬至大如年。为了让孤寡老人感受到节日的温暖，互助会组织志愿者开展了包饺子送温暖活动。</p>',
  '本站', 4),

(4, '深圳特区报：善泽互助事业高质量发展纪实', '2025-11-15', '/images/news/media-1.jpg',
  '深圳特区报头版刊登长篇通讯，报道龙岗区善泽民工互助会近年来在互助关怀、技能培训方面的突出贡献。',
  '<p>（深圳特区报讯）近年来，龙岗区善泽民工互助会坚持党建引领，广泛动员社会力量...</p>',
  '深圳特区报', 6),

(5, '龙岗区慈善会开展"九九重阳"慰问活动', '2025-10-09', '/images/news/district-2.jpg',
  '重阳节当天，龙岗区慈善会深入敬老院，为百岁老人送去慰问金和过冬衣物。',
  '<p>尊老爱幼是中华民族的传统美德...</p>',
  '龙岗分会', 5);

SELECT setval('news_id_seq', (SELECT MAX(id) FROM news));

-- =============================================
-- 4. SEED DONATIONS
-- =============================================
-- Schema: project_id, donor_name, amount, payment_method, created_at
INSERT INTO donations (project_id, donor_name, amount, payment_method, created_at) VALUES
(1, '爱心人士', 100, 'wechat', '2025-01-01'),
(1, '张**', 500, 'alipay', '2025-01-01'),
(2, '李**', 200, 'wechat', '2025-01-02'),
(2, '王**', 1000, 'unionpay', '2025-01-02'),
(3, '爱心企业', 50000, 'bank_transfer', '2025-01-03'),
(1, '赵**', 50, 'wechat', '2025-01-04'),
(2, '陈**', 300, 'alipay', '2025-01-05'),
(4, '匿名', 10000, 'bank_transfer', '2025-01-06');

-- =============================================
-- 5. SEED VOLUNTEERS
-- =============================================
-- Schema: name, phone, email, skills, status, joined_at
INSERT INTO volunteers (name, phone, email, skills, status, joined_at) VALUES
('王小明', '13800138000', 'wang@example.com', '社区服务', 'pending', '2025-02-20'),
('李华', '13912345678', 'lihua@example.com', '支教助学', 'approved', '2025-02-18'),
('张伟', '13788889999', 'zhang@example.com', '扶老助残', 'pending', '2025-02-22');

-- =============================================
-- 6. SEED NOTICES
-- =============================================
-- Schema: content, link_url, type, is_active
INSERT INTO notices (content, link_url, type, is_active) VALUES
('龙岗区善泽民工互助会郑重声明：谨防诈骗', '/news/1', 'default', TRUE),
('热烈庆祝龙岗区善泽民工互助会持续运营超过8周年', '/about', 'default', TRUE),
('互助帮扶解难忧，锦旗回馈话初心', '/news/2', 'default', TRUE);

-- =============================================
-- 7. SEED SITE CONFIG
-- =============================================
-- Schema: key, value (jsonb)
INSERT INTO site_config (key, value) VALUES
('header', '{"logo": "/logo.png", "contact": "0755 83942567"}'),
('footer', '{"address": "中国广东省深圳市龙岗区 · 龙岗大道务工人员综合服务大厦", "phone": "0755 83942567", "email": "contact@sz-longgang.org", "bankName": "中国建设银行深圳龙岗支行", "bankAccount": "6230 9183 7456 2109 852"}'),
('stats', '{"raised": 233100000, "distributed": 205800000, "donors": 203469}'),
('navigation', '[
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
]');

-- =============================================
-- 8. SEED USERS (Admin)
-- =============================================
INSERT INTO users (username, password_hash, role) VALUES
('admin', '$2b$10$bIkKCG1kvt22wsNaGIhjTe6w9y/xeVgHkmYLUKMKDLuZ9DMYxAYLy', 'admin');
