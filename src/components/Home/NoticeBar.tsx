import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../../contexts/SiteConfigContext';
import { useData } from '../../contexts/DataContext';
import { Wallet, CheckCircle2, Users } from 'lucide-react';

export const NoticeBar: React.FC = () => {
  const { config } = useSiteConfig();
  const { statistics } = useData();
  const notices = config.notices || [];
  const { baseStats } = config;

  // Stats Logic
  const totalRaised = (baseStats?.raised || 0) + (statistics?.totalRaised || 0);
  const totalDistributed = baseStats?.distributed || 0;
  const totalDonors = (baseStats?.donors || 0) + (statistics?.totalDonors || 0);

  const formatChineseNumber = (num: number) => {
    if (num >= 100000000) {
      return (num / 100000000).toFixed(2) + '亿';
    }
    if (num >= 10000) {
      return (num / 10000).toFixed(2) + '万';
    }
    return num.toLocaleString();
  };

  const currentDate = new Date();
  const dateStr = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;

  return (
    <div className="w-container mx-auto bg-noticeBg mb-3 md:mb-5">
      <div className="flex items-center h-[60px] md:h-[80px] px-2 py-2">
        {/* 1. Title Block */}
        <div
          className="w-[100px] md:w-[160px] h-[50px] md:h-[60px] bg-primary text-white font-bold text-sm md:text-lg leading-[50px] md:leading-[60px] text-center mr-3 md:mr-5 shrink-0 rounded-lg shadow-sm"
        >
          总会公告
        </div>

        {/* 2. Scrolling List (Vertical Marquee) */}
        <div className="flex-1 md:w-[300px] h-[50px] md:h-[60px] overflow-hidden relative md:mr-auto">
          <div className="absolute top-0 w-full animate-marquee-vertical pause-on-hover">
            <div className="flex flex-col">
              {[...notices, ...notices].map((notice, idx) => (
                <Link
                  key={`${notice.id}-${idx}`}
                  to={notice.link}
                  className="block h-[50px] md:h-[50px] leading-[50px] text-textSub text-xs md:text-[15px] overflow-hidden whitespace-nowrap text-ellipsis hover:text-primary transition-colors px-2 md:px-0"
                >
                  {notice.content}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Stats Section (Hidden on mobile, shown on desktop) */}
        <div className="hidden lg:flex gap-6 xl:gap-8 items-center h-full pr-4">
          {/* Stat 1: Raised */}
          <div className="flex items-center gap-2 xl:gap-3">
            <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-red-100 flex items-center justify-center text-primary">
              <Wallet size={20} className="xl:w-6 xl:h-6" />
            </div>
            <div>
              <div className="text-lg xl:text-xl font-bold text-primary leading-tight">
                {formatChineseNumber(totalRaised)}
              </div>
              <div className="text-[11px] xl:text-xs text-textSub text-nowrap">
                截止{dateStr}募捐总额
              </div>
            </div>
          </div>

          {/* Stat 2: Distributed */}
          <div className="flex items-center gap-2 xl:gap-3">
            <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
              <CheckCircle2 size={20} className="xl:w-6 xl:h-6" />
            </div>
            <div>
              <div className="text-lg xl:text-xl font-bold text-primary leading-tight">
                {formatChineseNumber(totalDistributed)}
              </div>
              <div className="text-[11px] xl:text-xs text-textSub text-nowrap">
                截止{dateStr}拨付总额
              </div>
            </div>
          </div>

          {/* Stat 3: Donors */}
          <div className="flex items-center gap-2 xl:gap-3">
            <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-orange-100 flex items-center justify-center text-accent">
              <Users size={20} className="xl:w-6 xl:h-6" />
            </div>
            <div>
              <div className="text-lg xl:text-xl font-bold text-primary leading-tight">
                {formatChineseNumber(totalDonors)}
              </div>
              <div className="text-[11px] xl:text-xs text-textSub text-nowrap">
                截止{dateStr}捐赠人次
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
