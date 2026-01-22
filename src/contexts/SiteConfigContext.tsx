import React, { createContext, useContext, useEffect, useState } from 'react';
import { SiteConfig } from '../types';

import { NAV_ITEMS } from '../services/mockData';

// Default values (The original hardcoded values)
const DEFAULT_CONFIG: SiteConfig = {
  header: {
    title: '龙岗区善泽民工互助会',
    logo: '/logo.png',
  },
  headerImage: '/images/longgang-banner.png',
  banners: ['/images/longgang-banner.png'],
  projectsBanner: '/images/longgang-banner.png',
  navigation: NAV_ITEMS,

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

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: SiteConfig) => void;
  resetConfig: () => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | null>(null);

import { SiteConfigAPI } from '../services/api';

// ... (keep usage of DEFAULT_CONFIG)

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);

  // Load from Database on mount
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const remoteConfig = await SiteConfigAPI.getConfig();
        if (remoteConfig) {
          // Merge remote config with defaults to ensure all fields exist
          // Special handling for navigation to ensure it includes all default items
          const mergedConfig = { ...DEFAULT_CONFIG, ...remoteConfig };
          if (!remoteConfig.navigation || remoteConfig.navigation.length === 0) {
            mergedConfig.navigation = NAV_ITEMS;
          }
          setConfig(mergedConfig);
        }
      } catch (error) {
        console.error('Failed to load site config from DB', error);
        // Fallback or just use defaults
      }
    };
    loadConfig();
  }, []);

  const updateConfig = async (newConfig: SiteConfig) => {
    try {
      // Optimistic update
      setConfig(newConfig);
      await SiteConfigAPI.updateConfig(newConfig);
    } catch (error) {
      console.error('Failed to save config to DB', error);
    }
  };

  const resetConfig = async () => {
    try {
      setConfig(DEFAULT_CONFIG);
      await SiteConfigAPI.updateConfig(DEFAULT_CONFIG);
    } catch (error) {
      console.error('Failed to reset config', error);
    }
  };

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
