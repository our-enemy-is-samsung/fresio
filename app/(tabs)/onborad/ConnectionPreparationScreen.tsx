import React from 'react';

interface StatusBarContentProps {
  time: string;
}

const StatusBarContent: React.FC<StatusBarContentProps> = ({ time }) => (
  <div className="flex justify-between items-center px-5 py-2">
    <span className="text-sm font-semibold">{time}</span>
    <div className="flex items-end gap-0.5">
      <div className="w-0.5 h-2 bg-black rounded-full"></div>
      <div className="w-0.5 h-3 bg-black rounded-full"></div>
      <div className="w-0.5 h-2 bg-black rounded-full"></div>
    </div>
  </div>
);

interface ConnectionPreparationScreenProps {
  onNext?: () => void;
}

const ConnectionPreparationScreen: React.FC<ConnectionPreparationScreenProps> = ({ onNext }) => {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-md mx-auto h-full flex flex-col">
        <StatusBarContent time="9:41" />
        
        <div className="px-5 py-2 flex justify-end">
          <button 
            onClick={onNext}
            className="text-rose-500 font-medium"
          >
            다음
          </button>
        </div>
        
        <div className="px-5 pt-10 flex-1">
          <h1 className="text-2xl font-semibold mb-4">
            제품 연결 준비
          </h1>
          <p className="text-gray-600 leading-relaxed">
            프레시오의 페어링 버튼을 3초 이상 눌러주세요
            <br />
            연결이 준비되면 기기에서 소리가 재생됩니다
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionPreparationScreen;