import React from 'react';
import { SEO } from '../components/Shared/SEO';
import { useSiteConfig } from '../contexts/SiteConfigContext';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('donation');
  const { config } = useSiteConfig(); // Load config

  // Sidebar menu structure
  const menuItems = [
    { id: 'donation', label: '捐赠方式' },
    { id: 'intro', label: '本会简介' },
    { id: 'charter', label: '机构章程' },
    { id: 'structure', label: '组织架构' },
    { id: 'leadership', label: '领导成员' },
    { id: 'council', label: '理事成员' },
    { id: 'management', label: '管理办法' },
    { id: 'qualifications', label: '机构资质' },
    { id: 'honors', label: '机构荣誉' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'intro':
        return (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-primary mb-6">龙岗区善泽民工互助会简介</h2>
            <p className="indent-8 mb-4">
              龙岗区善泽民工互助会（以下简称"互助会"）成立于2016年，是经深圳市龙岗区民政局批准成立的非营利性社会组织。互助会始终坚持"团结互助、共创美好"的宗旨，致力于维护务工人员合法权益，提供职业伤害救助，关爱外来建设者，促进社会融合与和谐发展。
            </p>
            <p className="indent-8 mb-4">
              互助会自成立以来，认真贯彻落实《中华人民共和国慈善法》及相关法规，以"权益维护、急难救助、技能提升、人文关怀"为核心服务领域。累计投入互助金及物资共计2亿余元，实施公益项目500余个，服务务工人员及家属超过20万人次。创立了"工伤探视"、"法律援助直通车"、"暖工行动"、"子女夏令营"等多个品牌项目，受到社会各界广泛好评。
            </p>
            <p className="indent-8 mb-6">
              互助会被评为"5A级社会组织"、"深圳市先进社会组织"；多次荣获"鹏城慈善奖"、"关爱务工人员示范项目奖"；被龙岗区民政局授予"优秀基层党组织"等荣誉称号。
            </p>
            <p className="indent-8 mb-6">
              欢迎各级各类组织，爱心企业、爱心人士参与善泽互助，支持务工人员群体，共同建设温暖龙岗。
            </p>

            <div className="mt-12 text-[16px] text-gray-800 space-y-2">
              <p>爱心互助电话：0755 83942567</p>
              <p>联系人：陈老师</p>
              <p>求助电话：0755 83942567</p>
              <p>地址：中国广东省深圳市龙岗区 · 龙岗大道务工人员综合服务大厦</p>
            </div>
          </div>
        );
      case 'qualifications':
        return (
          <div className="prose max-w-none text-gray-800">
            <div className="border-b border-gray-200 pb-4 mb-8 text-center">
              <h1 className="text-3xl font-normal text-gray-800 mb-6 tracking-wide">机构资质</h1>
            </div>
            <div className="flex flex-col items-center gap-8">
              {config.qualifications?.cert1 && (
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 border border-gray-200 shadow-sm">
                    <img
                      src={config.qualifications.cert1}
                      alt={config.qualifications.title1 || '证书'}
                      className="max-w-full h-auto"
                    />
                  </div>
                  <p className="text-sm font-bold text-gray-700 mt-2">
                    {config.qualifications.title1}
                  </p>
                </div>
              )}

              {config.qualifications?.cert2 && (
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 border border-gray-200 shadow-sm">
                    <img
                      src={config.qualifications.cert2}
                      alt={config.qualifications.title2 || '证书'}
                      className="max-w-full h-auto"
                    />
                  </div>
                  <p className="text-sm font-bold text-gray-700 mt-2">
                    {config.qualifications.title2}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      case 'donation':
        return (
          <div className="prose max-w-none text-gray-800">
            <div className="border-b border-gray-200 pb-4 mb-8 text-center">
              <h1 className="text-3xl font-normal text-gray-800 mb-6 tracking-wide">捐赠方式</h1>
              <div className="flex justify-center flex-col items-center gap-2 text-gray-600">
                <p>户名：{config.footer?.bankUnit || '龙岗区善泽民工互助会'}</p>
                <p>账号：{config.footer?.bankAccount || '6230 9183 7456 2109 852'}</p>
                <p>开户行：{config.footer?.bankName || '中国建设银行深圳龙岗支行'}</p>
              </div>
            </div>

            {/* Electronic Payment Methods Section */}
            <div className="mt-12 mb-8">
              <h2 className="text-2xl font-normal text-gray-700 mb-6 text-center">电子支付方式</h2>

              <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8">
                {/* Unified Image Check */}
                {config.paymentMethods?.alipay?.icon &&
                config.paymentMethods?.wechat?.icon &&
                config.paymentMethods.alipay.icon === config.paymentMethods.wechat.icon ? (
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={config.paymentMethods.alipay.icon}
                      alt="电子支付"
                      className="max-w-full md:max-w-[600px] h-auto object-contain rounded shadow-lg"
                    />
                    <div className="text-center mt-2">
                      <p className="text-lg font-semibold text-gray-800">扫码捐赠 (微信/支付宝)</p>
                      <p className="text-sm text-gray-600 mt-1">
                        户名：{config.paymentMethods.alipay.name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Alipay */}
                    {config.paymentMethods?.alipay && (
                      <div className="flex flex-col items-center gap-3">
                        {config.paymentMethods.alipay.icon ? (
                          <img
                            src={config.paymentMethods.alipay.icon}
                            alt="支付宝"
                            className="w-[300px] h-[400px] object-cover rounded shadow-lg"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className =
                                  'w-[300px] h-[400px] bg-blue-500 rounded flex items-center justify-center shadow-lg';
                                fallback.innerHTML =
                                  '<span class="text-white font-bold text-4xl">支付宝</span>';
                                parent.insertBefore(fallback, e.currentTarget);
                              }
                            }}
                          />
                        ) : (
                          <div className="w-[300px] h-[400px] bg-blue-500 rounded flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-4xl">支付宝</span>
                          </div>
                        )}
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-800">支付宝转账</p>
                          {config.paymentMethods.alipay.name && (
                            <p className="text-sm text-gray-600">
                              账户名：{config.paymentMethods.alipay.name}
                            </p>
                          )}
                          {config.paymentMethods.alipay.account && (
                            <p className="text-sm text-gray-600">
                              账号：{config.paymentMethods.alipay.account}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* WeChat */}
                    {config.paymentMethods?.wechat && (
                      <div className="flex flex-col items-center gap-3">
                        {config.paymentMethods.wechat.icon ? (
                          <img
                            src={config.paymentMethods.wechat.icon}
                            alt="微信支付"
                            className="w-[300px] h-[400px] object-cover rounded shadow-lg"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className =
                                  'w-[300px] h-[400px] bg-green-500 rounded flex items-center justify-center shadow-lg';
                                fallback.innerHTML =
                                  '<span class="text-white font-bold text-4xl">微信</span>';
                                parent.insertBefore(fallback, e.currentTarget);
                              }
                            }}
                          />
                        ) : (
                          <div className="w-[300px] h-[400px] bg-green-500 rounded flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-4xl">微信</span>
                          </div>
                        )}
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-800">微信转账</p>
                          {config.paymentMethods.wechat.name && (
                            <p className="text-sm text-gray-600">
                              账户名：{config.paymentMethods.wechat.name}
                            </p>
                          )}
                          {config.paymentMethods.wechat.account && (
                            <p className="text-sm text-gray-600">
                              微信号：{config.paymentMethods.wechat.account}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Fallback message if no payment methods configured */}
              {!config.paymentMethods?.alipay && !config.paymentMethods?.wechat && (
                <div className="text-center py-8">
                  <p className="text-gray-500">如需使用电子支付方式，请联系我们获取具体账户信息</p>
                  <p className="text-sm text-gray-400 mt-2">
                    联系电话：{config.footer?.phone || '0755 83942567'}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-xl text-gray-400 mb-2">🚧 内容建设中</p>
            <p className="text-gray-500">此板块内容正在整理完善，敬请期待...</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white min-h-screen pb-12">
      <SEO title="机构介绍" description="龙岗区善泽民工互助会简介" />

      <div className="w-container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            {/* Menu Section */}
            <div className="bg-white mb-6">
              <h2 className="text-xl font-normal text-primary p-4 border-b border-gray-200 flex items-center tracking-wide">
                <span className="mr-2 text-lg">→</span> 机构介绍
              </h2>
              <ul className="text-sm text-gray-600">
                {menuItems.map((item) => (
                  <li key={item.id} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-center block py-3 px-8 transition-colors ${
                        activeTab === item.id
                          ? 'bg-[#f47f7c] text-white'
                          : 'hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default About;
