import React, { useState, useEffect } from 'react';
import { SEO } from '../components/Shared/SEO';
import { ShareButtons } from '../components/Shared/ShareButtons';
import { Loading } from '../components/Shared/Loading';

interface AboutContent {
  id: number;
  section: string;
  title: string;
  content: string;
  sort_order: number;
}

const AboutDynamic: React.FC = () => {
  const [contents, setContents] = useState<AboutContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await fetch(`${API_BASE}/about`);
      const data = await response.json();
      setContents(data);
      if (data.length > 0) {
        setActiveSection(data[0].section);
      }
    } catch (error) {
      console.error('Failed to fetch about content:', error);
    } finally {
      setLoading(false);
    }
  };

  const activeContent = contents.find((c) => c.section === activeSection);

  if (loading) return <Loading />;

  return (
    <div className="bg-bgBlock py-8 min-h-screen">
      <SEO title="关于我们" description="长安仁爱慈善基金会简介" />

      <div className="w-container mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Menu */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white mb-6">
              <h2 className="text-xl font-normal text-primary p-4 border-b border-gray-200 flex items-center tracking-wide">
                <span className="mr-2 text-lg">→</span> 关于我们
              </h2>
              <ul className="text-sm text-gray-600">
                {contents.map((content) => (
                  <li key={content.id} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() => setActiveSection(content.section)}
                      className={`block w-full text-center py-3 px-8 transition-colors ${
                        activeSection === content.section
                          ? 'bg-[#f47f7c] text-white'
                          : 'hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      {content.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* QR Code */}
            <div className="p-4 text-center bg-white hidden md:block">
              <img
                src="https://res-img.n.gongyibao.cn/uploads/1dbdc970-d95e-45a8-859b-86e4e9abe89e/20210825/248ac00189d845b09a8470fd7cf8e806.png"
                alt="WeChat"
                className="w-32 h-32 mx-auto mb-2 border border-gray-200 p-1"
              />
              <p className="text-xs text-gray-600">扫码关注官方微信</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white p-8 min-h-[600px]">
            {activeContent ? (
              <>
                <div className="border-b border-gray-200 pb-4 mb-8">
                  <h1 className="text-3xl font-normal text-gray-800 tracking-wide">
                    {activeContent.title}
                  </h1>
                </div>

                <div
                  className="prose max-w-none text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: activeContent.content }}
                />

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <ShareButtons title={activeContent.title} description="长安仁爱慈善基金会" />
                </div>
              </>
            ) : (
              <div className="text-center py-20 text-gray-400">
                <p>暂无内容</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDynamic;
