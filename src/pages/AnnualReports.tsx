import React from 'react';
import { SEO } from '../components/Shared/SEO';

const AnnualReports: React.FC = () => {
  // Mock data - sẽ được thay thế bằng API call
  const reports = [
    {
      id: 1,
      year: 2024,
      title: '2024年度工作报告',
      summary: '2024年，基金会共开展慈善项目32个，受益人数超过10万人次，募集善款2800万元。',
      coverImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800',
      fileUrl: '#',
      fileSize: '5.2 MB',
      publishDate: '2025-01-15',
    },
    {
      id: 2,
      year: 2023,
      title: '2023年度工作报告',
      summary: '2023年，基金会共开展慈善项目28个，受益人数超过8万人次，募集善款2400万元。',
      coverImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
      fileUrl: '#',
      fileSize: '4.8 MB',
      publishDate: '2024-01-20',
    },
    {
      id: 3,
      year: 2022,
      title: '2022年度工作报告',
      summary: '2022年，基金会共开展慈善项目25个，受益人数超过7万人次，募集善款2100万元。',
      coverImage: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800',
      fileUrl: '#',
      fileSize: '4.5 MB',
      publishDate: '2023-01-18',
    },
  ];

  return (
    <div className="bg-bgBlock py-8 min-h-screen">
      <SEO title="年度报告" description="长安仁爱慈善基金会年度工作报告" />

      <div className="w-container mx-auto">
        <div className="bg-white p-8">
          {/* Page Header */}
          <div className="border-b-2 border-primary pb-4 mb-8">
            <h1 className="text-3xl font-bold text-textMain">年度报告</h1>
            <p className="text-textSub mt-2">Annual Reports - 回顾过去，展望未来</p>
          </div>

          {/* Info Notice */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
            <p className="text-sm text-gray-700">
              <strong>关于年度报告：</strong>
              年度报告全面展示基金会一年来的工作成果、财务状况、项目执行情况及社会影响力。我们致力于以透明、负责的态度向社会各界汇报工作。
            </p>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div
                key={report.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all group"
              >
                {/* Cover Image */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={report.coverImage}
                    alt={report.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                    {report.year}年
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-textMain mb-3 group-hover:text-primary transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-sm text-textSub mb-4 line-clamp-3">{report.summary}</p>

                  <div className="flex items-center justify-between text-xs text-textLight mb-4">
                    <span>发布：{report.publishDate}</span>
                    <span>{report.fileSize}</span>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={report.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors text-sm"
                    >
                      下载报告
                    </a>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm">
                      预览
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {reports.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <p>暂无年度报告</p>
            </div>
          )}

          {/* Statistics Summary */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-textMain mb-6">历年成果统计</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded">
                <div className="text-3xl font-bold text-primary mb-2">85+</div>
                <div className="text-sm text-textSub">累计项目</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded">
                <div className="text-3xl font-bold text-green-600 mb-2">25万+</div>
                <div className="text-sm text-textSub">受益人次</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded">
                <div className="text-3xl font-bold text-yellow-600 mb-2">7300万</div>
                <div className="text-sm text-textSub">募集善款（元）</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded">
                <div className="text-3xl font-bold text-red-600 mb-2">5000+</div>
                <div className="text-sm text-textSub">志愿者</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualReports;
