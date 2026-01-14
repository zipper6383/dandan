import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { SEO } from '../components/Shared/SEO';

const UserProfile: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: '',
    phone: '',
    realName: '',
    avatar: 'https://via.placeholder.com/150',
  });

  if (!isAuthenticated) {
    return (
      <div className="bg-bgBlock py-20 min-h-screen">
        <div className="w-container mx-auto text-center">
          <SEO title="个人中心" />
          <div className="bg-white p-12 rounded shadow-sm">
            <svg
              className="w-20 h-20 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">请先登录</h2>
            <p className="text-gray-600 mb-6">登录后即可查看和管理您的个人信息</p>
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

  const handleSave = () => {
    // TODO: API call to update user profile
    setIsEditing(false);
    alert('个人信息已更新');
  };

  return (
    <div className="bg-bgBlock py-8 min-h-screen">
      <SEO title="个人中心" />
      <div className="w-container mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white p-6 text-center mb-6">
              <img
                src={formData.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-100"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-1">{formData.username}</h3>
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
                    className="block py-3 px-6 bg-[#f47f7c] text-white transition-colors"
                  >
                    基本信息
                  </Link>
                </li>
                <li className="border-b border-gray-100">
                  <Link
                    to="/profile/donations"
                    className="block py-3 px-6 hover:text-primary hover:bg-gray-50 transition-colors"
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
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
              <h1 className="text-2xl font-bold text-gray-800">基本信息</h1>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors"
                >
                  编辑资料
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors"
                  >
                    保存
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Username */}
              <div className="flex items-center">
                <label className="w-32 text-gray-600">用户名：</label>
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                    />
                  ) : (
                    <span className="text-gray-800">{formData.username}</span>
                  )}
                </div>
              </div>

              {/* Real Name */}
              <div className="flex items-center">
                <label className="w-32 text-gray-600">真实姓名：</label>
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.realName}
                      onChange={(e) => setFormData({ ...formData, realName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                      placeholder="请输入真实姓名"
                    />
                  ) : (
                    <span className="text-gray-800">{formData.realName || '未设置'}</span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <label className="w-32 text-gray-600">邮箱：</label>
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                      placeholder="请输入邮箱地址"
                    />
                  ) : (
                    <span className="text-gray-800">{formData.email || '未设置'}</span>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center">
                <label className="w-32 text-gray-600">手机号：</label>
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                      placeholder="请输入手机号"
                    />
                  ) : (
                    <span className="text-gray-800">{formData.phone || '未设置'}</span>
                  )}
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center">
                <label className="w-32 text-gray-600">账号类型：</label>
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm">
                    {user?.role === 'admin' ? '管理员' : '普通用户'}
                  </span>
                </div>
              </div>

              {/* Registration Date */}
              <div className="flex items-center">
                <label className="w-32 text-gray-600">注册时间：</label>
                <div className="flex-1">
                  <span className="text-gray-800">2024-01-15 10:30:00</span>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-6">我的统计</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-red-50 rounded">
                  <div className="text-3xl font-bold text-red-600 mb-2">12</div>
                  <div className="text-sm text-gray-600">捐赠次数</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded">
                  <div className="text-3xl font-bold text-green-600 mb-2">5,280</div>
                  <div className="text-sm text-gray-600">捐赠金额（元）</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded">
                  <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
                  <div className="text-sm text-gray-600">志愿活动</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">24</div>
                  <div className="text-sm text-gray-600">服务时长（小时）</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
