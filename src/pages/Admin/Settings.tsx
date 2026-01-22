import { Bell, Plus, RotateCcw, Save, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { SEO } from '../../components/Shared/SEO';
import { useSiteConfig } from '../../contexts/SiteConfigContext';
import { SiteConfig } from '../../types';

const Settings: React.FC = () => {
  const { config, updateConfig, resetConfig } = useSiteConfig();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<SiteConfig>({
    defaultValues: config,
  });

  const {
    fields: bannerFields,
    append: appendBanner,
    remove: removeBanner,
  } = useFieldArray({
    control,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: 'banners' as any, // Primitive array limitation in react-hook-form types
  });

  const {
    fields: noticeFields,
    append: appendNotice,
    remove: removeNotice,
  } = useFieldArray({
    control,
    name: 'notices',
  });

  // Sync form with context if config changes externally or initially
  useEffect(() => {
    reset(config);
  }, [config, reset]);

  const onSubmit = (data: SiteConfig) => {
    updateConfig(data);
    alert('设置已保存！前台页面已更新。');
  };

  const handleReset = () => {
    if (window.confirm('确定要恢复默认设置吗？所有自定义修改将丢失。')) {
      resetConfig();
    }
  };

  return (
    <div className="pb-10">
      <SEO title="系统设置" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">系统设置</h1>
        <button
          onClick={handleReset}
          className="text-red-500 text-sm flex items-center gap-1 hover:underline"
        >
          <RotateCcw size={14} /> 恢复默认
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Header Settings */}
        <section className="bg-white p-6 rounded shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">顶部 Header 设置</h2>
          <div className="bg-blue-50 border border-blue-200 p-3 rounded text-xs text-blue-800 mb-4">
            <strong>📝 一致性说明：</strong>
            所有页面的 Banner
            图片均采用“拉伸填充”模式，即图片会自动拉伸以完全填充容器尺寸，不保持原始比例。这确保了所有设备上的一致显示效果。
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Header Banner 图片链接
              </label>
              <input
                {...register('headerImage')}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                placeholder="https://..."
              />
              <p className="text-xs text-gray-400 mt-1">
                建议尺寸: 宽度≥1200px，高度350-400px（图片将自动拉伸填充容器，不保持原比例）
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                慈善项目页 Banner 图片链接
              </label>
              <input
                {...register('projectsBanner')}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                placeholder="https://... 或 /logo.png"
              />
              <p className="text-xs text-gray-400 mt-1">
                建议尺寸: 高度220px（图片将自动拉伸填充容器，不保持原比例）。留空则使用默认图片。
              </p>
            </div>
          </div>
        </section>

        {/* Base Statistics Settings - NEW SECTION */}
        <section className="bg-white p-6 rounded shadow-sm border-2 border-purple-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
            <span className="text-purple-600">📊</span>
            基础统计数据设置
          </h2>
          <p className="text-xs text-gray-500 mb-4 bg-purple-50 p-3 rounded">
            💡
            提示：这些基础数据会与实时数据库统计相加，显示在首页和管理后台。用于设置历史累计数据或初始基数。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                募捐总额基数 (元)
              </label>
              <input
                type="number"
                {...register('baseStats.raised', { valueAsNumber: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                placeholder="0"
              />
              <p className="text-xs text-gray-400 mt-1">历史累计募捐金额（不含当前数据库记录）</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                拨付总额基数 (元) ⚠️
              </label>
              <input
                type="number"
                {...register('baseStats.distributed', { valueAsNumber: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                placeholder="0"
              />
              <p className="text-xs text-gray-400 mt-1">
                已拨付/已使用的善款总额（目前仅支持手动设置）
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">捐赠人次基数</label>
              <input
                type="number"
                {...register('baseStats.donors', { valueAsNumber: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                placeholder="0"
              />
              <p className="text-xs text-gray-400 mt-1">历史累计捐赠人次</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">项目数基数</label>
              <input
                type="number"
                {...register('baseStats.projects', { valueAsNumber: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                placeholder="0"
              />
              <p className="text-xs text-gray-400 mt-1">历史项目总数（不含当前数据库）</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">志愿者数基数</label>
              <input
                type="number"
                {...register('baseStats.volunteers', { valueAsNumber: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                placeholder="0"
              />
              <p className="text-xs text-gray-400 mt-1">历史志愿者总数</p>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 p-3 rounded text-xs text-yellow-800">
            <strong>⚠️ 重要说明：</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>前台显示 = 基数 + 数据库实时统计</li>
              <li>"拨付总额" 目前仅支持手动设置基数，无自动统计</li>
              <li>修改后立即生效，请谨慎操作</li>
            </ul>
          </div>
        </section>

        {/* Qualifications Settings */}
        <section className="bg-white p-6 rounded shadow-sm border-2 border-green-50">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">机构资质证书设置</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">证书 1</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">图片链接</label>
                <input
                  {...register('qualifications.cert1')}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标题文本</label>
                <input
                  {...register('qualifications.title1')}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">证书 2</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">图片链接</label>
                <input
                  {...register('qualifications.cert2')}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标题文本</label>
                <input
                  {...register('qualifications.title2')}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Electronic Payment Settings */}
        <section className="bg-white p-6 rounded shadow-sm border-2 border-green-50">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">电子支付方式设置</h2>
          <div className="bg-green-50 border border-green-200 p-3 rounded text-xs text-green-800 mb-4">
            <strong>📝 说明：</strong>
            设置支付宝和微信的捐赠账户信息。可以上传自定义图标或使用默认文字显示。
          </div>

          {/* Quick Actions */}
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-yellow-800">🚀 快速操作</span>
              <button
                type="button"
                onClick={() => {
                  // Clear both icon fields
                  const form = document.querySelector('form');
                  const alipayIcon = form?.querySelector(
                    'input[name="paymentMethods.alipay.icon"]'
                  ) as HTMLInputElement;
                  const wechatIcon = form?.querySelector(
                    'input[name="paymentMethods.wechat.icon"]'
                  ) as HTMLInputElement;
                  if (alipayIcon) alipayIcon.value = '';
                  if (wechatIcon) wechatIcon.value = '';
                }}
                className="text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                清除所有图片 (Show Text Only)
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-gray-50 border border-gray-200 p-4 rounded mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              👀 预览效果 Preview (Scale 1:5)
            </h4>
            <div className="flex justify-center gap-4 items-start">
              {/* Alipay Preview - Scaled down */}
              <div className="flex flex-col items-center">
                <div className="w-[60px] h-[80px] bg-blue-500 rounded flex items-center justify-center mb-2 overflow-hidden">
                  <span className="text-white font-bold text-xs">支付宝</span>
                </div>
                <p className="text-xs text-gray-600">支付宝转账</p>
              </div>

              {/* WeChat Preview - Scaled down */}
              <div className="flex flex-col items-center">
                <div className="w-[60px] h-[80px] bg-green-500 rounded flex items-center justify-center mb-2 overflow-hidden">
                  <span className="text-white font-bold text-xs">微信</span>
                </div>
                <p className="text-xs text-gray-600">微信转账</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              ℹ️ 实际尺寸: 300x400px | 如果设置了图标链接，将显示图片而非文字
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">支付宝账户</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">账户名称</label>
                <input
                  {...register('paymentMethods.alipay.name')}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
                  placeholder="龙岗区善泽民工互助会"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">账户号码</label>
                <input
                  {...register('paymentMethods.alipay.account')}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
                  placeholder="支付宝账户号"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">支付宝图标</label>
                <input
                  {...register('paymentMethods.alipay.icon')}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
                  placeholder="https://... 或 /images/alipay-icon.png"
                />
                <p className="text-xs text-gray-400 mt-1">
                  建议尺寸: 300x400px, 支持 PNG/JPG/SVG 格式
                </p>
                <p className="text-xs text-red-500 mt-1">
                  ⚠️ 注意：必须是直接链接到图片文件，不是网页链接
                </p>
                <p className="text-xs text-green-600 mt-1">
                  ✅ 正确格式: https://example.com/image.png
                </p>
                <p className="text-xs text-red-500 mt-1">
                  ⚠️ 注意：必须是直接链接到图片文件，不是网页链接
                </p>
                <p className="text-xs text-green-600 mt-1">
                  ✅ 正确格式: https://example.com/image.png
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">微信账户</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">账户名称</label>
                <input
                  {...register('paymentMethods.wechat.name')}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
                  placeholder="龙岗区善泽民工互助会"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">微信号</label>
                <input
                  {...register('paymentMethods.wechat.account')}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
                  placeholder="微信号或手机号"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">微信图标</label>
                <input
                  {...register('paymentMethods.wechat.icon')}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:border-primary"
                  placeholder="https://... 或 /images/wechat-icon.png"
                />
                <p className="text-xs text-gray-400 mt-1">
                  建议尺寸: 300x400px, 支持 PNG/JPG/SVG 格式
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Notice Bar Settings - NEW SECTION */}
        <section className="bg-white p-6 rounded shadow-sm border-2 border-blue-100">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Bell className="text-blue-500" size={20} />
              公告栏通知设置
            </h2>
            <button
              type="button"
              onClick={() =>
                appendNotice({ id: Date.now().toString(), content: '', link: '/', icon: '📢' })
              }
              className="text-primary text-sm flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded"
            >
              <Plus size={16} /> 添加通知
            </button>
          </div>

          <p className="text-xs text-gray-500 mb-4 bg-blue-50 p-2 rounded">
            💡 提示：这些通知将在首页顶部公告栏滚动显示，自动循环播放
          </p>

          <div className="space-y-4">
            {noticeFields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 p-4 rounded bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-gray-700">通知 #{index + 1}</label>
                  <button
                    type="button"
                    onClick={() => removeNotice(index)}
                    className="text-red-400 hover:text-red-600 text-xs flex items-center gap-1"
                    title="删除"
                  >
                    <Trash2 size={14} /> 删除
                  </button>
                </div>

                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-1">
                    <label className="block text-xs text-gray-600 mb-1">图标</label>
                    <input
                      {...register(`notices.${index}.icon`)}
                      className="w-full border border-gray-300 rounded px-2 py-2 text-center focus:outline-none focus:border-primary"
                      placeholder="📢"
                      maxLength={2}
                    />
                  </div>

                  <div className="col-span-7">
                    <label className="block text-xs text-gray-600 mb-1">通知内容 *</label>
                    <input
                      {...register(`notices.${index}.content`)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                      placeholder="输入通知内容..."
                      required
                    />
                  </div>

                  <div className="col-span-4">
                    <label className="block text-xs text-gray-600 mb-1">跳转链接 *</label>
                    <input
                      {...register(`notices.${index}.link`)}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                      placeholder="/news/..."
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            {noticeFields.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-8 border-2 border-dashed border-gray-200 rounded">
                暂无通知，点击上方"添加通知"按钮开始添加
              </p>
            )}
          </div>
        </section>

        {/* Home Banner Settings */}
        <section className="bg-white p-6 rounded shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-lg font-bold text-gray-800">首页轮播图设置</h2>
            <button
              type="button"
              onClick={() => appendBanner('')}
              className="text-primary text-sm flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded"
            >
              <Plus size={16} /> 添加一张
            </button>
          </div>

          <div className="space-y-4">
            {bannerFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-start">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 mb-1">
                    图片 {index + 1}
                  </label>
                  <input
                    {...register(`banners.${index}` as const)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                    placeholder="https://..."
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeBanner(index)}
                  className="mt-6 text-red-400 hover:text-red-600 p-2"
                  title="删除"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {bannerFields.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">暂无轮播图</p>
            )}
          </div>
        </section>

        {/* Footer Settings */}
        <section className="bg-white p-6 rounded shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">页脚 Footer 信息</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                单位名称 (开户单位)
              </label>
              <input {...register('footer.bankUnit')} className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">开户银行</label>
              <input {...register('footer.bankName')} className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">银行账号</label>
              <input
                {...register('footer.bankAccount')}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
              <input {...register('footer.phone')} className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱</label>
              <input {...register('footer.email')} className="w-full border px-3 py-2 rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">办公地址</label>
              <input {...register('footer.address')} className="w-full border px-3 py-2 rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">技术支持文字</label>
              <input
                {...register('footer.techSupport')}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
        </section>

        {/* Action Bar */}
        <div className="fixed bottom-0 left-64 right-0 bg-white border-t p-4 shadow-lg z-10 flex justify-end px-8">
          <button
            type="submit"
            disabled={!isDirty}
            className={`px-6 py-2 rounded text-white font-bold flex items-center gap-2 ${isDirty ? 'bg-primary hover:bg-secondary' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            <Save size={18} /> 保存设置
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
