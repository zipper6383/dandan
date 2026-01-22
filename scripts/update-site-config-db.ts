import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const DEFAULT_CONFIG = {
  header: {
    title: '龙岗区善泽民工互助会',
    logo: '/logo.png',
  },
  headerImage: '/images/longgang-banner.png',
  banners: ['/images/longgang-banner.png'],
  projectsBanner: '/images/longgang-banner.png',
  navigation: [
    { id: 'home', label: '首页', path: '/' },
    { id: 'about', label: '关于我们', path: '/about' },
    { id: 'projects', label: '公益项目', path: '/projects' },
    { id: 'news', label: '新闻中心', path: '/news' },
    { id: 'public-info', label: '信息公开', path: '/public-info' },
    { id: 'party', label: '党建园地', path: '/party' },
    { id: 'contact', label: '联系我们', path: '/contact' },
  ],
  notices: [
    { id: '1', content: '龙岗区善泽民工互助会郑重声明：谨防诈骗', link: '/news/n1', icon: '📢' },
    {
      id: '2',
      content: '热烈庆祝龙岗区善泽民工互助会持续运营超过25周年',
      link: '/about',
      icon: '📢',
    },
    { id: '3', content: '守护工友权益，扶助困难群体', link: '/news/n2', icon: '📢' },
  ],
  footer: {
    contact: '善泽互助会',
    copyright: '2026 Longgang District Shanze Migrant Worker Mutual Aid Association',
    address: '中国广东省深圳市龙岗区 · 龙岗大道务工人员综合服务大厦',
    phone: '0755 83942567',
    email: 'contact@shanze-longgang.org',
    bankName: '中国建设银行深圳龙岗支行',
    bankAccount: '6230 9183 7456 2109 852',
    bankUnit: '龙岗区善泽民工互助会',
  },
  baseStats: {
    raised: 233100000,
    projects: 100,
    donors: 203469,
    volunteers: 5000,
  },
  qualifications: {
    cert1: '/images/unified-qr.png',
    title1: '证书',
  },
  paymentMethods: {
    alipay: {
      name: '龙岗区善泽民工互助会',
      account: 'szmzjz@163.com',
      icon: '/images/unified-qr.png',
    },
    wechat: {
      name: '龙岗区善泽民工互助会',
      account: 'szmzjz',
      icon: '/images/unified-qr.png',
    },
  },
  donationQRs: {
    qr1: '/images/unified-qr.png',
    title1: '微信支付',
    qr2: '/images/unified-qr.png',
    title2: '支付宝支付',
  },
};

async function updateSiteConfig() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    // Loop through each key in DEFAULT_CONFIG and update it individually
    for (const [key, value] of Object.entries(DEFAULT_CONFIG)) {
      const query = `
        INSERT INTO site_config (key, value)
        VALUES ($1, $2)
        ON CONFLICT (key)
        DO UPDATE SET value = $2;
      `;
      await client.query(query, [key, JSON.stringify(value)]);
      console.log(`Updated key: ${key}`);
    }

    console.log('Site config updated successfully (individual keys).');
  } catch (err) {
    console.error('Error updating site config:', err);
  } finally {
    await client.end();
  }
}

updateSiteConfig();
