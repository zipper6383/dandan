import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface AboutContent {
  id: number;
  section: string;
  title: string;
  content: string;
  sort_order: number;
  is_active: boolean;
}

const AboutContentEditor: React.FC = () => {
  const [contents, setContents] = useState<AboutContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    section: '',
    title: '',
    content: '',
    sort_order: 0,
    is_active: true,
  });

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await fetch(`${API_BASE}/about`);
      const data = await response.json();
      setContents(data);
    } catch (error) {
      console.error('Failed to fetch contents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (content: AboutContent) => {
    setEditingId(content.id);
    setFormData({
      section: content.section,
      title: content.title,
      content: content.content,
      sort_order: content.sort_order,
      is_active: content.is_active,
    });
  };

  const handleSave = async () => {
    try {
      const url = editingId ? `${API_BASE}/about/${editingId}` : `${API_BASE}/about`;

      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editingId ? '更新成功' : '创建成功');
        setEditingId(null);
        setFormData({
          section: '',
          title: '',
          content: '',
          sort_order: 0,
          is_active: true,
        });
        fetchContents();
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert('保存失败');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个内容吗？')) return;

    try {
      const response = await fetch(`${API_BASE}/about/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('删除成功');
        fetchContents();
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('删除失败');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      section: '',
      title: '',
      content: '',
      sort_order: 0,
      is_active: true,
    });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">关于我们 - 内容管理</h1>
        <p className="text-gray-600 mt-2">管理"关于我们"页面的内容板块</p>
      </div>

      {/* Editor Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          {editingId ? '编辑内容' : '新增内容'}
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">板块标识 *</label>
              <input
                type="text"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                placeholder="例如: intro, mission, team"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">标题 *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                placeholder="板块标题"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">排序</label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) =>
                  setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">状态</label>
              <select
                value={formData.is_active ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
              >
                <option value="true">启用</option>
                <option value="false">禁用</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              内容 * (支持HTML)
            </label>
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              modules={modules}
              className="bg-white"
              style={{ height: '300px', marginBottom: '50px' }}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors"
            >
              {editingId ? '更新' : '创建'}
            </button>
            {editingId && (
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">现有内容</h2>

        <div className="space-y-4">
          {contents.map((content) => (
            <div
              key={content.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{content.title}</h3>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {content.section}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        content.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {content.is_active ? '启用' : '禁用'}
                    </span>
                    <span className="text-xs text-gray-500">排序: {content.sort_order}</span>
                  </div>
                  <div
                    className="text-sm text-gray-600 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: content.content }}
                  />
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(content)}
                    className="px-4 py-2 text-sm border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(content.id)}
                    className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {contents.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>暂无内容，请创建第一个板块</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutContentEditor;
