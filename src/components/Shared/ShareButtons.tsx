import React from 'react';

interface ShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  url = window.location.href,
  title = document.title,
  description = '',
  className = '',
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    wechat: () => {
      // WeChat sharing requires QR code generation
      alert('请使用微信扫一扫分享此页面');
    },
    weibo: `https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}&pic=`,
    qq: `https://connect.qq.com/widget/shareqq/index.html?url=${encodedUrl}&title=${encodedTitle}&desc=${encodedDescription}`,
    qzone: `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodedUrl}&title=${encodedTitle}&desc=${encodedDescription}`,
    douban: `https://www.douban.com/share/service?url=${encodedUrl}&title=${encodedTitle}&text=${encodedDescription}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    if (platform === 'wechat') {
      shareLinks.wechat();
    } else {
      const link = shareLinks[platform];
      window.open(link, '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('链接已复制到剪贴板');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('复制失败，请手动复制链接');
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-textSub mr-2">分享到：</span>

      {/* WeChat */}
      <button
        onClick={() => handleShare('wechat')}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
        title="分享到微信"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.5 9.5a1 1 0 110-2 1 1 0 010 2zm7 0a1 1 0 110-2 1 1 0 010 2zm-3.5 8.5c-5.5 0-10-3.5-10-8s4.5-8 10-8 10 3.5 10 8-4.5 8-10 8z" />
        </svg>
      </button>

      {/* Weibo */}
      <button
        onClick={() => handleShare('weibo')}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
        title="分享到微博"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 12c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm-8 6c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />
        </svg>
      </button>

      {/* QQ */}
      <button
        onClick={() => handleShare('qq')}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        title="分享到QQ"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
        </svg>
      </button>

      {/* QZone */}
      <button
        onClick={() => handleShare('qzone')}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
        title="分享到QQ空间"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7l-10-5z" />
        </svg>
      </button>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-colors"
        title="复制链接"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  );
};
