import { Edit, Plus, Search, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SEO } from '../../components/Shared/SEO';
import { CategoriesAPI } from '../../services/api';
import { Category } from '../../types';

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Omit<Category, 'id'>>();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await CategoriesAPI.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
      alert('加载分类失败');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setValue('name', category.name);
      setValue('slug', category.slug);
      setValue('type', category.type);
      setValue('sortOrder', category.sortOrder);
    } else {
      setEditingCategory(null);
      reset({
        name: '',
        slug: '',
        type: 'project',
        sortOrder: 0,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    reset();
  };

  const onSubmit = async (data: Omit<Category, 'id'>) => {
    try {
      if (editingCategory) {
        await CategoriesAPI.update(editingCategory.id, data);
      } else {
        await CategoriesAPI.create(data);
      }
      await loadCategories();
      closeModal();
    } catch (error) {
      console.error('Failed to save category:', error);
      alert('保存失败，请重试');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('确定要删除这个分类吗？如果有项目或新闻使用此分类，将无法删除。')) {
      try {
        await CategoriesAPI.delete(id);
        await loadCategories();
      } catch (error) {
        console.error('Failed to delete category:', error);
        alert('删除失败，可能有项目或新闻正在使用此分类');
      }
    }
  };

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const typeLabels = {
    news: '新闻',
    project: '项目',
    download: '下载',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div>
      <SEO title="分类管理" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">分类管理</h1>
        <button
          onClick={() => openModal()}
          className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-secondary"
        >
          <Plus size={18} /> 添加分类
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-sm mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索分类名称或标识..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 font-bold text-sm">
            <tr>
              <th className="p-4 border-b">ID</th>
              <th className="p-4 border-b">分类名称</th>
              <th className="p-4 border-b">标识 (Slug)</th>
              <th className="p-4 border-b">类型</th>
              <th className="p-4 border-b">排序</th>
              <th className="p-4 border-b">操作</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 border-b last:border-0">
                <td className="p-4 text-gray-500">#{c.id}</td>
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4 text-gray-600 font-mono text-xs">{c.slug}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {typeLabels[c.type]}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{c.sortOrder}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(c)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="编辑"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="删除"
                      onClick={() => handleDelete(c.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-10 text-center text-gray-400">未找到相关分类</div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">{editingCategory ? '编辑分类' : '添加分类'}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">分类名称</label>
                <input
                  {...register('name', { required: '分类名称不能为空' })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                  placeholder="例如：教育支持"
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">标识 (Slug)</label>
                <input
                  {...register('slug', { required: '标识不能为空' })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary font-mono text-sm"
                  placeholder="例如：education-support"
                />
                {errors.slug && <span className="text-red-500 text-xs">{errors.slug.message}</span>}
                <p className="text-xs text-gray-400 mt-1">
                  用于URL，只能包含小写字母、数字和连字符
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">类型</label>
                  <select
                    {...register('type', { required: true })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                  >
                    <option value="project">项目</option>
                    <option value="news">新闻</option>
                    <option value="download">下载</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">排序</label>
                  <input
                    type="number"
                    {...register('sortOrder', { required: true, valueAsNumber: true })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-400 mt-1">数字越小越靠前</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded hover:bg-secondary"
                >
                  {editingCategory ? '保存修改' : '立即添加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
