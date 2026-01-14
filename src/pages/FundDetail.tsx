import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/Shared/SEO';
import { ShareButtons } from '../components/Shared/ShareButtons';
import { useData } from '../contexts/DataContext';
import { Loading } from '../components/Shared/Loading';

const FundDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { funds, donations, addDonation } = useData();
  const fund = funds.find((f) => String(f.id) === id);
  const [donateAmount, setDonateAmount] = useState<string>('100');
  const [isDonating, setIsDonating] = useState(false);

  if (!fund) {
    return (
      <div className="p-20 text-center">
        <SEO title="基金不存在" />
        <p className="text-gray-500">基金不存在</p>
        <Link to="/funds" className="text-primary hover:underline mt-4 inline-block">
          返回基金列表
        </Link>
      </div>
    );
  }

  const handleDonate = async () => {
    if (!donateAmount || Number(donateAmount) <= 0) {
      alert('请输入有效的捐赠金额');
      return;
    }

    setIsDonating(true);

    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    addDonation({
      donor: '热心网友',
      amount: Number(donateAmount),
      projectTitle: `${fund.title} (基金)`,
      payType: '微信支付',
      channel: '官网PC端',
    });

    setIsDonating(false);
    alert(`感谢您的善心！成功向 ${fund.title} 捐赠 ${donateAmount} 元。`);
    setDonateAmount('');
  };

  // Filter donations for this fund (by title matching)
  const fundDonations = donations.filter((d) => d.projectTitle.includes(fund.title));

  return (
    <div className="bg-bgBlock min-h-screen py-8">
      <SEO title={fund.title} description={`${fund.title} - 公益基金详情`} />
      <div className="w-container mx-auto">
        {/* Breadcrumb */}
        <div className="text-[12px] text-textSub mb-4">
          <Link to="/" className="hover:text-primary">
            首页
          </Link>{' '}
          &gt;
          <Link to="/funds" className="hover:text-primary">
            {' '}
            公益基金
          </Link>{' '}
          &gt;
          <span className="text-gray-800"> 基金详情</span>
        </div>

        {/* Top Info Section */}
        <div className="bg-white p-6 shadow-sm mb-6 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-[480px] shrink-0 h-[320px] overflow-hidden rounded relative border border-gray-100">
            <img src={fund.image} alt={fund.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 flex flex-col justify-between py-2">
            <div>
              <h1 className="text-2xl font-bold text-textMain mb-4 leading-tight">{fund.title}</h1>
              <div className="bg-[#f9f9f9] p-4 rounded mb-6 border border-gray-100 text-[13px] text-textSub space-y-2">
                <p>
                  发起方/管理人：<span className="text-gray-800">{fund.sponsor}</span>
                </p>
                <p>
                  成立时间：<span className="text-gray-800">{fund.date}</span>
                </p>
                <p>
                  基金类型：
                  <span className="bg-gray-200 px-2 py-0.5 rounded text-xs">公益基金</span>
                </p>
              </div>

              {/* Fund Amount */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <span className="text-3xl font-bold text-accent font-sans">
                      ￥{fund.raised.toLocaleString()}
                    </span>
                    <span className="text-xs text-textSub ml-2">基金总额</span>
                  </div>
                </div>
                <div className="flex justify-between text-[12px] text-textLight mt-2">
                  <span>
                    <span className="text-textMain font-bold">{fundDonations.length}</span> 人次捐赠
                  </span>
                </div>
              </div>
            </div>

            {/* Donation Action */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="flex border-2 border-primary rounded overflow-hidden h-10">
                <span className="bg-gray-50 px-3 flex items-center text-gray-500 border-r border-gray-200 text-sm font-bold">
                  ￥
                </span>
                <input
                  type="number"
                  className="w-32 px-3 focus:outline-none font-bold text-gray-700"
                  value={donateAmount}
                  onChange={(e) => setDonateAmount(e.target.value)}
                  disabled={isDonating}
                />
              </div>
              <button
                className={`flex-1 text-white h-10 rounded text-[16px] font-bold shadow-md transform active:scale-95 transition-all tracking-wider ${isDonating ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-secondary'}`}
                onClick={handleDonate}
                disabled={isDonating}
              >
                {isDonating ? '处理中...' : '立即捐款'}
              </button>
            </div>

            {/* Share Section */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <ShareButtons
                title={fund.title}
                description={fund.description}
                className="justify-start"
              />
            </div>
          </div>
        </div>

        {/* Content & Records */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-[3] bg-white p-8 shadow-sm min-h-[400px]">
            <div className="border-b border-gray-200 mb-6">
              <span className="inline-block border-t-2 border-primary py-3 px-6 bg-white text-primary font-bold -mt-px text-lg">
                基金介绍
              </span>
            </div>

            <div className="prose max-w-none text-textMain leading-loose text-[14px]">
              <p className="mb-4">
                <strong>{fund.title}</strong> 是由 <strong>{fund.sponsor}</strong>{' '}
                发起设立的公益基金。
              </p>
              <p className="mb-4">
                该基金致力于支持慈善事业发展，帮助需要帮助的人群。自成立以来，已累计筹集善款{' '}
                <span className="text-accent font-bold">￥{fund.raised.toLocaleString()}</span>，
                惠及众多受助对象。
              </p>
              <p className="mb-4">
                我们欢迎社会各界爱心人士和企业参与捐赠，共同为慈善事业贡献力量。
              </p>

              <div className="mt-8 bg-blue-50 border border-blue-100 p-4 rounded">
                <h4 className="font-bold mb-2 text-blue-800">捐赠说明：</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                  <li>所有捐款将用于该基金指定的慈善项目</li>
                  <li>我们将定期公示基金使用情况</li>
                  <li>捐赠后可开具捐赠票据</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white p-5 shadow-sm h-fit">
            <h3 className="text-lg font-bold border-l-4 border-primary pl-3 mb-5 text-textMain">
              爱心捐赠榜
            </h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
              {fundDonations.length > 0 ? (
                fundDonations.slice(0, 20).map((d, i) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between text-sm border-b border-dashed border-gray-100 pb-3 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                        基金
                      </span>
                      <div>
                        <p className="font-bold text-gray-700">{d.donor}</p>
                        <p className="text-[10px] text-gray-400">{d.date}</p>
                      </div>
                    </div>
                    <span className="text-primary font-bold">￥{d.amount}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400">暂无捐赠记录</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundDetail;
