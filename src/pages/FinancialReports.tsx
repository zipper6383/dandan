import React from 'react';
import { SEO } from '../components/Shared/SEO';

const FinancialReports: React.FC = () => {
  // Mock data - sẽ được thay thế bằng API call
  const reports = [
    {
      id: 1,
      title: '2024年度财务审计报告',
      date: '2024-12-31',
      fileUrl: '#',
      fileSize: '2.5 MB',
    },
    {
      id: 2,
      title: '2024年第三季度财务报告',
      date: '2024-09-30',
      fileUrl: '#',
      fileSize: '1.8 MB',
    },
    {
      id: 3,
      title: '2024年第二季度财务报告',
      date: '2024-06-30',
      fileUrl: '#',
      fileSize: '1.6 MB',
    },
    {
      id: 4,
      title: '2024年第一季度财务报告',
      date: '2024-03-31',
      fileUrl: '#',
      fileSize: '1.7 MB',
    },
    {
      id: 5,
      title: '2023年度财务审计报告',
      date: '2023-12-31',
      fileUrl: '#',
      fileSize: '2.3 MB',
    },
  ];

  return (
    <div className="bg-bgBlock py-8 min-h-screen">
      <SEO title="财务报告" description="长安仁爱慈善基金会财务报告公开" />

      <div className="w-container mx-auto">
        <div className="bg-white p-8">
          {/* Page Header */}
          <div className="border-b-2 border-primary pb-4 mb-8">
            <h1 className="text-3xl font-bold text-textMain">财务报告</h1>
            <p className="text-textSub mt-2">Financial Reports - 公开透明，接受监督</p>
          </div>

          {/* Info Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <p className="text-sm text-gray-700">
              <strong>说明：</strong>
              本基金会严格遵守《慈善法》和《基金会管理条例》，定期公开财务信息。所有报告均经过专业审计机构审计，确保真实、准确、完整。
            </p>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-textMain group-hover:text-primary transition-colors mb-2">
                      {report.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-textSub">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        发布日期：{report.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                        文件大小：{report.fileSize}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={report.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors text-sm"
                    >
                      下载报告
                    </a>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm">
                      在线预览
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p>暂无财务报告</p>
            </div>
          )}

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-textMain mb-4">联系我们</h3>
            <p className="text-textSub text-sm">
              如需了解更多财务信息或有任何疑问，请联系我们：
              <br />
              电话：029-12345678
              <br />
              邮箱：finance@xiancharity.org
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;
