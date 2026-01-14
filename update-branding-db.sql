-- Update branding from 西安市慈善会 to 长安慈善会 in database

-- Update site_config footer (if bankUnit exists)
UPDATE site_config
SET value = jsonb_set(
  value,
  '{bankUnit}',
  '"长安慈善会"'::jsonb
)
WHERE key = 'footer'
  AND value ? 'bankUnit'
  AND value->>'bankUnit' = '西安市慈善会';

-- Update news author field (if contains old branding)
UPDATE news
SET author = '长安慈善会'
WHERE author = '西安市慈善会';

-- Update news title and content
UPDATE news
SET title = REPLACE(title, '西安市慈善会', '长安慈善会'),
    summary = REPLACE(summary, '西安市慈善会', '长安慈善会'),
    content = REPLACE(content, '西安市慈善会', '长安慈善会')
WHERE title LIKE '%西安市慈善会%'
   OR summary LIKE '%西安市慈善会%'
   OR content LIKE '%西安市慈善会%';

-- Update projects if any contain old branding in title or description
UPDATE projects
SET title = REPLACE(title, '西安市慈善会', '长安慈善会'),
    description = REPLACE(description, '西安市慈善会', '长安慈善会'),
    content = REPLACE(content, '西安市慈善会', '长安慈善会')
WHERE title LIKE '%西安市慈善会%'
   OR description LIKE '%西安市慈善会%'
   OR content LIKE '%西安市慈善会%';

-- Update funds if any contain old branding (note: funds table uses 'name' not 'title')
UPDATE funds
SET name = REPLACE(name, '西安市慈善会', '长安慈善会'),
    description = REPLACE(description, '西安市慈善会', '长安慈善会'),
    manager = REPLACE(manager, '西安市慈善会', '长安慈善会')
WHERE name LIKE '%西安市慈善会%'
   OR description LIKE '%西安市慈善会%'
   OR manager LIKE '%西安市慈善会%';

-- Verify updates
SELECT 'site_config' as table_name, COUNT(*) as updated_count
FROM site_config
WHERE value::text LIKE '%长安慈善会%'
UNION ALL
SELECT 'news', COUNT(*) FROM news WHERE author = '长安慈善会' OR title LIKE '%长安慈善会%' OR content LIKE '%长安慈善会%'
UNION ALL
SELECT 'projects', COUNT(*) FROM projects WHERE title LIKE '%长安慈善会%' OR description LIKE '%长安慈善会%' OR content LIKE '%长安慈善会%'
UNION ALL
SELECT 'funds', COUNT(*) FROM funds WHERE name LIKE '%长安慈善会%' OR description LIKE '%长安慈善会%' OR manager LIKE '%长安慈善会%';
