-- Update specific articles visible in the screenshot to use new local images

-- 1. Update "Yangcheng Evening News" (羊城晚报)
UPDATE news 
SET image_url = '/images/news/media-3.jpg' 
WHERE title LIKE '%羊城晚报%';

-- 2. Update "Summer Cool" (夏季送清凉) - likely a project or news
UPDATE news 
SET image_url = '/images/news/charity-5.jpg' 
WHERE title LIKE '%夏季送清凉%';

UPDATE projects 
SET image_url = '/images/news/charity-5.jpg' 
WHERE title LIKE '%夏季送清凉%';

-- 3. Update "Charity Day" (中华慈善日)
UPDATE news 
SET image_url = '/images/news/charity-3.jpg' 
WHERE title LIKE '%中华慈善日%';

UPDATE projects 
SET image_url = '/images/news/charity-3.jpg' 
WHERE title LIKE '%中华慈善日%';

-- 4. Update "Hand in Hand / 5th Anniversary" (携手共进)
UPDATE news 
SET image_url = '/images/news/media-1.jpg' 
WHERE title LIKE '%携手共进%';

-- 5. Update any other articles from seed-more-news that might have been skipped
UPDATE news SET image_url = '/images/news/charity-1.jpg' WHERE title = '民政部：进一步加强社会组织规范化建设';
UPDATE news SET image_url = '/images/news/charity-2.jpg' WHERE title = '2026年全国慈善工作会议在京召开';
UPDATE news SET image_url = '/images/news/charity-3.jpg' WHERE title = '广东省出台新规：鼓励企业参与公益慈善事业';
UPDATE news SET image_url = '/images/news/charity-4.jpg' WHERE title = '关于开展"中华慈善日"主题宣传活动的通知';
UPDATE news SET image_url = '/images/news/charity-5.jpg' WHERE title = '社会组织参与乡村振兴战略研讨会顺利举行';

UPDATE news SET image_url = '/images/news/district-1.jpg' WHERE title = '龙岗区启动"关爱来深建设者"百日行动';
UPDATE news SET image_url = '/images/news/district-2.jpg' WHERE title = '坂田街道举办民工子女暑期夏令营';
UPDATE news SET image_url = '/images/news/district-3.jpg' WHERE title = '龙岗区慈善会召开2026年度理事会议';
UPDATE news SET image_url = '/images/news/district-4.jpg' WHERE title = '横岗街道：打造"暖蜂驿站"，服务快递外卖小哥';
UPDATE news SET image_url = '/images/news/district-5.jpg' WHERE title = '龙岗区社会组织公益创投项目大赛启动';

UPDATE news SET image_url = '/images/news/media-1.jpg' WHERE title = '深圳卫视：善泽互助会——民工兄弟的"娘家人"';
UPDATE news SET image_url = '/images/news/media-2.jpg' WHERE title = '南方都市报：从受助到助人，一位民工志愿者的蜕变';
UPDATE news SET image_url = '/images/news/media-4.jpg' WHERE title = '晶报：爱心企业携手善泽，共筑民工安居梦';
UPDATE news SET image_url = '/images/news/media-5.jpg' WHERE title = '腾讯公益：善泽互助会项目上线，邀您一起做好事';
