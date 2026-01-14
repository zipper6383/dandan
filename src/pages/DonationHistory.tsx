import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { SEO } from '../components/Shared/SEO';
import { Pagination } from '../components/Shared/Pagination';

const DonationHistory: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { donations } = useData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!isAuthenticated) {
    return (
      <div className="bg-bgBlock py-20 min-h-screen">
        <div className="w-container mx-auto text-center">
          <SEO title="我的捐赠" />
          <div className="bg-white p-12 rounded shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">请先登录</h2>
            <Link
              to="/login"
              className="inline-block bg-primary text-white px-8 py-3 rounded hover:bg-secondary transition-colors"
            >
              立即登录
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Mock user donations - in real app, filter by user ID
  const userDonations = donations.slice(0, 25);
  const totalPages = Math.ceil(userDonations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDonations = userDonations.slice(startIndex, startIndex + itemsPerPage);

  const totalAmount = userDonations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="bg-bgBlock py-8 min-h-screen">
      <SEO title="我的捐赠" />
      <div className="w-container mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white p-6 text-center mb-6">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{user?.username}</h3>
              <p className="text-sm text-gray-500">
                {user?.role === 'admin' ? '管理员' : '普通用户'}
              </p>
            </div>

            <div className="bg-white">
              <h2 className="text-lg font-bold text-primary p-4 border-b border-gray-200">
                个人中心
              </h2>
              <ul className="text-sm">
                <li className="border-b border-gray-100">
                  <Link
                    to="/profile"
                    className="block py-3 px-6 hover:text-primary hover:bg-gray-50 transition-colors"
                  >
                    基本信息
                  </Link>
                </li>
                <li className="border-b border-gray-100">
                  <Link
                    to="/profile/donations"
                    className="block py-3 px-6 bg-[#f47f7c] text-white transition-colors"
                  >
                    我的捐赠
                  </Link>
                </li>
                <li className="border-b border-gray-100">
                  <Link
                    to="/profile/volunteers"
                    className="block py-3 px-6 hover:text-primary hover:bg-gray-50 transition-colors"
                  >
                    志愿服务
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile/settings"
                    className="block py-3 px-6 hover:text-primary hover:bg-gray-50 transition-colors"
                  >
                    账号设置
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white p-8">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h1 className="text-2xl font-bold text-gray-800">我的捐赠</h1>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
                <div className="text-sm text-red-600 mb-2">累计捐赠金额</div>
                <div className="text-3xl font-bold text-red-700">
                  ￥{totalAmount.toLocaleString()}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="text-sm text-blue-600 mb-2">捐赠次数</div>
                <div className="text-3xl font-bold text-blue-700">{userDonations.length}</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="text-sm text-green-600 mb-2">帮助项目</div>
                <div className="text-3xl font-bold text-green-700">
                  {new Set(userDonations.map((d) => d.projectTitle)).size}
                </div>
              </div>
            </div>

            {/* Donations Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">日期</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">项目</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">金额</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                      支付方式
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">状态</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDonations.map((donation) => (
                    <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600">{donation.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                        {donation.projectTitle}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="text-red-600 font-bold">
                          ￥{donation.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{donation.payType}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                          已完成
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button className="text-primary hover:text-secondary text-xs">
                          查看详情
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {currentDonations.length === 0 && (
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>暂无捐赠记录</p>
                <Link
                  to="/projects"
                  className="inline-block mt-4 text-primary hover:text-secondary text-sm"
                >
                  去捐款 →
                </Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}

            {/* Download Certificate */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <svg
                    className="w-12 h-12 text-blue-500 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">捐赠证书</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      感谢您的爱心捐赠！您可以下载电子捐赠证书作为纪念。如需纸质证书，请联系我们。
                    </p>
                    <button className="px-6 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors text-sm">
                      下载捐赠证书
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;
