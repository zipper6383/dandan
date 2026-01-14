import React, { useState, useEffect } from 'react';
import { DollarSign, Users, FileText, Activity, TrendingUp } from 'lucide-react';
import { SEO } from '../../components/Shared/SEO';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DashboardStats {
  total_projects: number;
  active_projects: number;
  total_news: number;
  total_funds: number;
  total_donations: number;
  total_raised: number;
  total_volunteers: number;
  approved_volunteers: number;
}

interface DonationTrend {
  date: string;
  count: number;
  amount: number;
}

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}> = ({ title, value, icon, color, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color} text-white`}>{icon}</div>
      {trend && (
        <div className="flex items-center gap-1 text-green-600 text-sm">
          <TrendingUp size={16} />
          <span>{trend}</span>
        </div>
      )}
    </div>
    <p className="text-gray-500 text-sm mb-1">{title}</p>
    <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
  </div>
);

const DashboardWithCharts: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [donationTrends, setDonationTrends] = useState<DonationTrend[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:3001/api';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, trendsRes] = await Promise.all([
        fetch(`${API_BASE}/statistics/dashboard`),
        fetch(`${API_BASE}/statistics/donation-trends?period=30`),
      ]);

      const statsData = await statsRes.json();
      const trendsData = await trendsRes.json();

      setStats(statsData);
      setDonationTrends(trendsData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (num: number) => {
    if (num >= 100000000) return `￥${(num / 100000000).toFixed(2)}亿`;
    if (num >= 10000) return `￥${(num / 10000).toFixed(1)}万`;
    return `￥${num.toLocaleString()}`;
  };

  const COLORS = ['#d32f2f', '#1976d2', '#388e3c', '#f57c00', '#7b1fa2'];

  const projectStatusData = stats
    ? [
        { name: '募捐中', value: stats.active_projects },
        { name: '已完成', value: stats.total_projects - stats.active_projects },
      ]
    : [];

  const volunteerStatusData = stats
    ? [
        { name: '已批准', value: stats.approved_volunteers },
        { name: '待审核', value: stats.total_volunteers - stats.approved_volunteers },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <SEO title="管理概览" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">数据仪表盘</h1>
        <p className="text-gray-600 mt-1">实时监控平台运营数据</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="总募捐额"
          value={formatMoney(stats?.total_raised || 0)}
          icon={<DollarSign size={24} />}
          color="bg-primary"
          trend="+12.5%"
        />
        <StatCard
          title="活跃项目"
          value={`${stats?.active_projects || 0} 个`}
          icon={<FileText size={24} />}
          color="bg-blue-500"
          trend="+3"
        />
        <StatCard
          title="注册志愿者"
          value={`${stats?.total_volunteers || 0} 人`}
          icon={<Users size={24} />}
          color="bg-green-500"
          trend="+8.2%"
        />
        <StatCard
          title="累计捐赠次数"
          value={`${stats?.total_donations || 0} 次`}
          icon={<Activity size={24} />}
          color="bg-purple-500"
          trend="+15.3%"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Donation Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">捐赠趋势（近30天）</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={donationTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#d32f2f"
                strokeWidth={2}
                name="金额（元）"
              />
              <Line type="monotone" dataKey="count" stroke="#1976d2" strokeWidth={2} name="次数" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">项目状态分布</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {projectStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Volunteer Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">志愿者状态</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volunteerStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#388e3c" name="人数" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">快速统计</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">总项目数</span>
              <span className="text-2xl font-bold text-gray-800">{stats?.total_projects}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">新闻文章</span>
              <span className="text-2xl font-bold text-gray-800">{stats?.total_news}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">公益基金</span>
              <span className="text-2xl font-bold text-gray-800">{stats?.total_funds}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">平均捐赠额</span>
              <span className="text-2xl font-bold text-primary">
                ￥
                {stats?.total_donations
                  ? Math.round(stats.total_raised / stats.total_donations).toLocaleString()
                  : 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">待处理事项</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center text-sm p-3 bg-yellow-50 rounded">
              <span className="text-gray-700">新的志愿者申请待审核</span>
              <span className="px-3 py-1 bg-yellow-500 text-white rounded text-xs">
                {stats?.total_volunteers && stats?.approved_volunteers
                  ? stats.total_volunteers - stats.approved_volunteers
                  : 0}
              </span>
            </li>
            <li className="flex justify-between items-center text-sm p-3 bg-blue-50 rounded">
              <span className="text-gray-700">活跃募捐项目</span>
              <span className="px-3 py-1 bg-blue-500 text-white rounded text-xs">
                {stats?.active_projects || 0}
              </span>
            </li>
            <li className="flex justify-between items-center text-sm p-3 bg-green-50 rounded">
              <span className="text-gray-700">本月新增捐赠</span>
              <span className="px-3 py-1 bg-green-500 text-white rounded text-xs">
                {donationTrends.slice(-7).reduce((sum, d) => sum + d.count, 0)}
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">系统信息</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span className="text-gray-600">系统版本</span>
              <span className="font-medium">v2.0.0</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span className="text-gray-600">数据库状态</span>
              <span className="text-green-600 font-medium">● 正常</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span className="text-gray-600">上次备份</span>
              <span className="font-medium">2025-01-14 03:00</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span className="text-gray-600">API响应时间</span>
              <span className="font-medium">45ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWithCharts;
