import React, { useState } from 'react';
import { SEO } from '../components/Shared/SEO';

interface DownloadItem {
  id: number;
  title: string;
  category: string;
  description: string;
  fileUrl: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  downloads: number;
}

const DownloadCenter: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Mock data - sẽ được thay thế bằng API call
  const categories = [
    { id: 'all', name: '全部资料' },
    { id: 'financial', name: '财务报告' },
    { id: 'annual', name: '年度报告' },
    { id: 'policy', name: '政策文件' },
    { id: 'form', name: '申请表格' },
    { id: 'other', name: '其他资料' },
  ];

  const downloads: DownloadItem[] = [
    {
      id: 1,
      title: '2024年度财务审计报告',
      category: 'financial',
      description: '经第三方审计机构审计的2024年度完整财务报告',
      fileUrl: '#',
      fileSize: '2.5 MB',
      fileType: 'PDF',
      uploadDate: '2025-01-15',
      downloads: 328,
    },
    {
      id: 2,
      title: '2024年度工作报告',
      category: 'annual',
      description: '2024年度基金会工作总结及成果展示',
      fileUrl: '#',
      fileSize: '5.2 MB',
      fileType: 'PDF',
      uploadDate: '2025-01-15',
      downloads: 456,
    },
    {
      id: 3,
      title: '慈善项目申请表',
      category: 'form',
      description: '申请慈善项目资助的标准表格',
      fileUrl: '#',
      fileSize: '156 KB',
      fileType: 'DOC',
      uploadDate: '2024-12-01',
      downloads: 892,
    },
    {
      id: 4,
      title: '志愿者注册表',
      category: 'form',
      description: '志愿者注册及信息登记表格',
      fileUrl: '#',
      fileSize: '128 KB',
      fileType: 'DOC',
      uploadDate: '2024-12-01',
      downloads: 1245,
    },
    {
      id: 5,
      title: '基金会章程',
      category: 'policy',
      description: '长安仁爱慈善基金会章程（2024年修订版）',
      fileUrl: '#',
      fileSize: '890 KB',
      fileType: 'PDF',
      uploadDate: '2024-11-20',
      downloads: 567,
    },
    {
      id: 6,
      title: '捐赠管理办法',
      category: 'policy',
      description: '基金会捐赠接收、管理及使用办法',
      fileUrl: '#',
      fileSize: '456 KB',
      fileType: 'PDF',
      uploadDate: '2024-11-20',
      downloads: 423,
    },
  ];

  const filteredDownloads =
    activeCategory === 'all'
      ? downloads
      : downloads.filter((item) => item.category === activeCategory);

  const getFileIcon = (fileType: string) => {
    switch (fileType.toUpperCase()) {
      case 'PDF':
        return (
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 18h12V6h-4V2H4v16zm-2 1V0h12l4 4v16H2v-1z" />
          </svg>
        );
      case 'DOC':
      case 'DOCX':
        return (
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 18h12V6h-4V2H4v16zm-2 1V0h12l4 4v16H2v-1z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 18h12V6h-4V2H4v16zm-2 1V0h12l4 4v16H2v-1z" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-bgBlock py-8 min-h-screen">
      <SEO title="资料下载" description="长安仁爱慈善基金会相关资料下载中心" />

      <div className="w-container mx-auto">
        <div className="bg-white p-8">
          {/* Page Header */}
          <div className="border-b-2 border-primary pb-4 mb-8">
            <h1 className="text-3xl font-bold text-textMain">资料下载</h1>
            <p className="text-textSub mt-2">Download Center - 公开资料，便捷下载</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-full text-sm transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Downloads List */}
          <div className="space-y-4">
            {filteredDownloads.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  {/* File Icon */}
                  <div className="shrink-0">{getFileIcon(item.fileType)}</div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-textMain group-hover:text-primary transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-textSub mb-3">{item.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-textLight">
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
                        {item.fileType} · {item.fileSize}
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        上传时间：{item.uploadDate}
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
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        下载次数：{item.downloads}
                      </span>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="shrink-0">
                    <a
                      href={item.fileUrl}
                      download
                      className="px-6 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors text-sm flex items-center gap-2"
                    >
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      下载
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredDownloads.length === 0 && (
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
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <p>该分类暂无资料</p>
            </div>
          )}

          {/* Help Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-textMain mb-4">下载说明</h3>
            <div className="text-sm text-textSub space-y-2">
              <p>• 所有资料均为公开文件，可免费下载使用</p>
              <p>• 如遇下载问题，请联系我们：029-12345678</p>
              <p>• 部分文件需要使用 Adobe Reader 或 Microsoft Office 打开</p>
              <p>• 资料仅供参考学习，未经授权不得用于商业用途</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadCenter;
