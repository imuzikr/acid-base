import { useState } from "react";

const Index = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          산과 염기 학습
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          고등학교 1학년 화학 학습 애플리케이션
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded border">
            <h2 className="font-bold text-blue-800">테스트 카운터</h2>
            <p className="text-2xl font-bold text-blue-600">{count}</p>
            <button 
              onClick={() => setCount(count + 1)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              증가
            </button>
          </div>
          <div className="p-4 bg-green-50 rounded border">
            <h2 className="font-bold text-green-800">상태 확인</h2>
            <p className="text-sm text-green-600">
              React가 정상적으로 작동하고 있습니다!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
