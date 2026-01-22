-- Create about_content table for CMS
CREATE TABLE IF NOT EXISTS about_content (
  id SERIAL PRIMARY KEY,
  section VARCHAR(50) NOT NULL, -- 'intro', 'mission', 'team', 'history', etc.
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_about_section ON about_content(section);
CREATE INDEX idx_about_active ON about_content(is_active);

-- Insert default content
INSERT INTO about_content (section, title, content, sort_order) VALUES
('intro', '关于我们', '<h2>龙岗区善泽民工互助会</h2><p>龙岗区善泽民工互助会成立于2016年，是经深圳市龙岗区民政局批准成立的非营利性社会组织。我们致力于维护务工人员合法权益、提供职业伤害救助、关爱外来建设者，为构建和谐劳动关系贡献力量。</p><p>互助会秉承"团结互助、共创美好"的理念，坚持公开透明、规范运作的原则，积极开展各类公益互助活动。</p>', 1),
('mission', '我们的使命', '<h3>使命与愿景</h3><ul><li><strong>使命：</strong>团结互助，维护权益，温暖每一位务工者</li><li><strong>愿景：</strong>成为务工人员最可信赖的温暖之家</li><li><strong>价值观：</strong>平等、互助、友爱、奉献</li></ul>', 2),
('services', '服务领域', '<h3>我们的服务</h3><div><h4>1. 权益维护</h4><p>为务工人员提供法律咨询和权益保障支持</p><h4>2. 职业救助</h4><p>为工伤及职业病患提供紧急救助和康复指导</p><h4>3. 技能培训</h4><p>提升务工人员职业技能，促进就业发展</p><h4>4. 关爱服务</h4><p>开展节日慰问、子女关爱等暖心活动</p></div>', 3),
('achievements', '发展历程', '<h3>我们的成就</h3><p><strong>2016年</strong> - 互助会正式成立</p><p><strong>2018年</strong> - 获评区级优秀社会组织</p><p><strong>2021年</strong> - 累计服务务工人员突破5万人次</p><p><strong>2024年</strong> - 发放互助金超过2亿元</p>', 4),
('team', '组织架构', '<h3>理事会成员</h3><p>互助会设理事会、监事会，实行理事会领导下的秘书长负责制。</p><ul><li>理事长：张三</li><li>副理事长：李四、王五</li><li>秘书长：赵六</li></ul>', 5),
('contact', '联系我们', '<h3>联系方式</h3><p><strong>地址：</strong>中国广东省深圳市龙岗区 · 龙岗大道务工人员综合服务大厦</p><p><strong>电话：</strong>0755 83942567</p><p><strong>邮箱：</strong>contact@shanze-longgang.org</p><p><strong>工作时间：</strong>周一至周五 9:00-17:30</p>', 6);

COMMENT ON TABLE about_content IS 'About page content management';
COMMENT ON COLUMN about_content.section IS 'Content section identifier';
COMMENT ON COLUMN about_content.sort_order IS 'Display order';
