import React from 'react';

export const DonationMethods: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded h-full hover:shadow-md transition-shadow duration-300">
      <div className="bg-[#fbfbfb] p-3 border-b border-gray-200 rounded-t flex items-center justify-between">
        <span className="font-bold text-gray-700">捐赠方式</span>
        <span className="text-xs text-primary bg-red-50 px-2 py-0.5 rounded">爱心传递</span>
      </div>
      <div className="p-4">
        {/* QR Code Section */}
        <div className="flex flex-col items-center mb-5 bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300">
            <img 
                src="/images/donation-qr.png" 
                alt="WeChat Pay QR Code" 
                className="w-40 h-40 object-contain mb-2 mix-blend-multiply"
            />
            <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
              微信扫码直接捐赠
            </p>
        </div>
        
        {/* Bank Info Section */}
        <div className="space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-primary rounded-full"></div>
              <h4 className="font-bold text-gray-700">银行转账</h4>
            </div>
            
            <div className="space-y-2 pl-3">
              <div className="group">
                <p className="text-xs text-gray-400 mb-0.5">户名</p>
                <p className="font-medium text-gray-800 select-all">龙岗区善泽民工互助会</p>
              </div>
              
              <div className="group">
                <p className="text-xs text-gray-400 mb-0.5">账号</p>
                <p className="font-mono text-lg text-accent font-bold select-all tracking-wide">6230 9183 7456 2109 852</p>
              </div>
              
              <div className="group">
                <p className="text-xs text-gray-400 mb-0.5">开户行</p>
                <p className="font-medium text-gray-800 select-all">中国建设银行深圳龙岗支行</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
