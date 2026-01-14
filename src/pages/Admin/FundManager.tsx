import { Edit, Plus, Search, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SEO } from '../../components/Shared/SEO';
import { useData } from '../../contexts/DataContext';
import { Fund } from '../../types';

const FundManager: React.FC = () => {
  const { funds, addFund, updateFund, deleteFund } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFund, setEditingFund] = useState<Fund | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Fund>();

  const openModal = (fund?: Fund) => {
    if (fund) {
      setEditingFund(fund);
      setValue('title', fund.title);
      setValue('sponsor', fund.sponsor);
      setValue('raised', fund.raised);
      setValue('image', fund.image);
    } else {
      setEditingFund(null);
      reset({
        title: '',
        sponsor: '',
        raised: 0,
        image: 'https://picsum.photos/400/300?random=' + Math.floor(Math.random() * 100),
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFund(null);
    reset();
  };

  const onSubmit = async (data: Omit<Fund, 'id' | 'times' | 'date'>) => {
    try {
      if (editingFund) {
        await updateFund({
          ...editingFund,
          ...data,
          raised: Number(data.raised) || 0,
        });
      } else {
        await addFund({
          ...data,
          id: Date.now().toString(),
          raised: Number(data.raised) || 0,
          times: 0,
          date: new Date().toISOString().split('T')[0],
        });
      }
      closeModal();
    } catch (error) {
      console.error('Failed to save fund:', error);
      alert('保存失败，请重试');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这个基金吗？')) {
      try {
        await deleteFund(id);
      } catch (error) {
        console.error('Failed to delete fund:', error);
        alert('删除失败，请重试');
      }
    }
  };

  const filtered = funds.filter(
    (f) => f.title.includes(searchTerm) || f.sponsor.includes(searchTerm)
  );

  return (
    <div>
      <SEO title="基金管理" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">公益基金管理</h1>
        <button
          onClick={() => openModal()}
          className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-secondary"
        >
          <Plus size={18} /> 添加基金
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-sm mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索基金名称或发起方..."
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
              <th className="p-4 border-b">缩略图</th>
              <th className="p-4 border-b">基金名称</th>
              <th className="p-4 border-b">发起方/管理人</th>
              <th className="p-4 border-b">基金总额</th>
              <th className="p-4 border-b">成立时间</th>
              <th className="p-4 border-b">操作</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {filtered.map((f) => (
              <tr key={f.id} className="hover:bg-gray-50 border-b last:border-0">
                <td className="p-4">
                  <img src={f.image} alt="" className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-4 font-medium max-w-xs truncate" title={f.title}>
                  {f.title}
                </td>
                <td className="p-4">{f.sponsor}</td>
                <td className="p-4 text-accent font-bold">￥{f.raised.toLocaleString()}</td>
                <td className="p-4 text-gray-500">{f.date}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(f)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="编辑"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="删除"
                      onClick={() => handleDelete(f.id)}
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
          <div className="p-10 text-center text-gray-400">未找到相关基金</div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">{editingFund ? '编辑基金' : '添加基金'}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">基金名称</label>
                <input
                  {...register('title', { required: '基金名称不能为空' })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                  placeholder="例如：长安慈善微基金"
                />
                {errors.title && <span className="text-red-500 text-xs">请输入基金名称</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    发起方/管理人
                  </label>
                  <input
                    {...register('sponsor', { required: true })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                    placeholder="例如：张敬"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    基金总额 (元)
                  </label>
                  <input
                    type="number"
                    {...register('raised', { required: true })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">封面图片 URL</label>
                <input
                  {...register('image')}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                  placeholder="https://..."
                />
                <p className="text-xs text-gray-400 mt-1">建议尺寸: 400x300px</p>
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
                  {editingFund ? '保存修改' : '立即添加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundManager;
