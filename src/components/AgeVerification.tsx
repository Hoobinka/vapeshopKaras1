import React, { useState } from 'react';
import { ShieldAlert, Check, X } from 'lucide-react';

interface AgeVerificationProps {
  onVerify: (verified: boolean) => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerify }) => {
  const [error, setError] = useState<string>('');

  const handleVerify = () => {
    onVerify(true);
  };

  const handleReject = () => {
    setError('Вы должны быть старше 18 лет, чтобы посетить этот сайт.');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <ShieldAlert className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Подтверждение возраста</h2>
        <p className="text-gray-600 mb-6">
          Этот веб-сайт содержит материалы, предназначенные только для лиц старше 18 лет.
          Пожалуйста, подтвердите, что вам исполнилось 18 лет.
        </p>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleVerify}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <Check className="h-5 w-5" />
            <span>Мне 18 или больше</span>
          </button>
          <button
            onClick={handleReject}
            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
            <span>Мне меньше 18</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;