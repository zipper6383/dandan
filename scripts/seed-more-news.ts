import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const NEW_NEWS = [
  // 慈善资讯 (Charity News)
  {
    category: 'charity',
    title: '民政部：进一步加强社会组织规范化建设',
    content:
      '<p>近日，民政部印发《关于进一步加强社会组织规范化建设的通知》，强调要深化社会组织改革，激发社会组织活力...</p>',
    author: '民政部',
    image: '/images/news/charity-1.jpg',
  },
  {
    category: 'charity',
    title: '2026年全国慈善工作会议在京召开',
    content:
      '<p>会议总结了2025年全国慈善工作取得的成绩，部署了2026年重点任务，强调要发挥第三次分配作用...</p>',
    author: '中国慈善联合会',
    image: '/images/news/charity-2.jpg',
  },
  {
    category: 'charity',
    title: '广东省出台新规：鼓励企业参与公益慈善事业',
    content:
      '<p>广东省人民政府发布关于促进慈善事业健康发展的实施意见，提出多项优惠政策鼓励企业履行社会责任...</p>',
    author: '广东省民政厅',
    image: '/images/news/charity-3.jpg',
  },
  {
    category: 'charity',
    title: '关于开展"中华慈善日"主题宣传活动的通知',
    content: '<p>为迎接第九个"中华慈善日"，我会将举办系列宣传活动，弘扬慈善文化...</p>',
    author: '秘书处',
    image: '/images/news/charity-4.jpg',
  },
  {
    category: 'charity',
    title: '社会组织参与乡村振兴战略研讨会顺利举行',
    content: '<p>研讨会邀请了多位专家学者，就社会组织如何更有效地参与乡村振兴进行了深入探讨...</p>',
    author: '综合部',
    image: '/images/news/charity-5.jpg',
  },

  // 区县动态 (District Updates)
  {
    category: 'district',
    title: '龙岗区启动"关爱来深建设者"百日行动',
    content:
      '<p>龙岗区政府联合多家社会组织，启动为期100天的关爱行动，旨在改善来深建设者的工作生活环境...</p>',
    author: '龙岗发布',
    image: '/images/news/district-1.jpg',
  },
  {
    category: 'district',
    title: '坂田街道举办民工子女暑期夏令营',
    content:
      '<p>为解决民工子女暑期看护难问题，坂田街道联合善泽互助会举办了丰富多彩的夏令营活动...</p>',
    author: '坂田街道办',
    image: '/images/news/district-2.jpg',
  },
  {
    category: 'district',
    title: '龙岗区慈善会召开2026年度理事会议',
    content: '<p>会议审议通过了2025年度工作报告和财务报告，选举产生了新一届理事会成员...</p>',
    author: '龙岗慈善会',
    image: '/images/news/district-3.jpg',
  },
  {
    category: 'district',
    title: '横岗街道：打造"暖蜂驿站"，服务快递外卖小哥',
    content:
      '<p>横岗街道在多个社区设立"暖蜂驿站"，为快递员、外卖员提供饮水、充电、休息等服务...</p>',
    author: '横岗在线',
    image: '/images/news/district-4.jpg',
  },
  {
    category: 'district',
    title: '龙岗区社会组织公益创投项目大赛启动',
    content: '<p>本次大赛旨在发掘和培育优秀的公益项目，资助金额最高可达20万元...</p>',
    author: '区社工委',
    image: '/images/news/district-5.jpg',
  },

  // 媒体报道 (Media Reports)
  {
    category: 'media',
    title: '深圳卫视：善泽互助会——民工兄弟的"娘家人"',
    content:
      '<p>昨晚深圳卫视《第一现场》栏目播出了关于善泽互助会的专题报道，讲述了互助会成立以来的感人故事...</p>',
    author: '深圳卫视',
    image: '/images/news/media-1.jpg',
  },
  {
    category: 'media',
    title: '南方都市报：从受助到助人，一位民工志愿者的蜕变',
    content:
      '<p>老张曾经是善泽互助会的受助者，如今他已经成为了一名五星级志愿者，用自己的行动回馈社会...</p>',
    author: '南方都市报',
    image: '/images/news/media-2.jpg',
  },
  {
    category: 'media',
    title: '羊城晚报：龙岗这种"互助模式"值得推广',
    content:
      '<p>评论文章指出，善泽互助会探索出的"民工互助+社会支持"模式，为解决外来务工人员融入城市问题提供了新思路...</p>',
    author: '羊城晚报',
    image: '/images/news/media-3.jpg',
  },
  {
    category: 'media',
    title: '晶报：爱心企业携手善泽，共筑民工安居梦',
    content: '<p>近日，多家爱心企业向善泽互助会捐赠物资，用于改善困难民工的居住条件...</p>',
    author: '晶报',
    image: '/images/news/media-4.jpg',
  },
  {
    category: 'media',
    title: '腾讯公益：善泽互助会项目上线，邀您一起做好事',
    content: '<p>善泽互助会的"大病救助"项目正式上线腾讯公益平台，期待广大网友伸出援手...</p>',
    author: '腾讯公益',
    image: '/images/news/media-5.jpg',
  },
];

async function seedMoreNews() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    // Get category IDs
    const catRes = await client.query('SELECT id, slug FROM categories');
    const catMap = new Map(catRes.rows.map((c) => [c.slug, c.id]));

    console.log('Seeding news...');

    for (const item of NEW_NEWS) {
      const categoryId = catMap.get(item.category);
      if (!categoryId) {
        console.warn(`Category ${item.category} not found, skipping.`);
        continue;
      }

      // Generate random date within last 6 months
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 180));

      // Check if exists
      const existRes = await client.query('SELECT id FROM news WHERE title = $1', [item.title]);
      if (existRes.rowCount && existRes.rowCount > 0) {
        console.log(`Skipped (exists): ${item.title}`);
        continue;
      }

      const query = `
        INSERT INTO news (title, content, category_id, author, published_at, views, image_url, is_published)
        VALUES ($1, $2, $3, $4, $5, $6, $7, true)
        RETURNING id;
      `;

      const res = await client.query(query, [
        item.title,
        item.content,
        categoryId,
        item.author,
        date,
        Math.floor(Math.random() * 1000) + 100, // Random views
        item.image || '/images/default-news.jpg',
      ]);

      if (res.rowCount && res.rowCount > 0) {
        console.log(`Added: ${item.title}`);
      } else {
        console.log(`Skipped (exists): ${item.title}`);
      }
    }

    console.log('Done.');
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

seedMoreNews();
