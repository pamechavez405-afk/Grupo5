import React, { useState, useEffect } from 'react';
import { Language, MathContextResult } from '../types';
import { getMathContext } from '../services/geminiService';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface MathContextProps {
  language: Language;
}

const MathContext: React.FC<MathContextProps> = ({ language }) => {
  const [data, setData] = useState<MathContextResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const t = {
    es: {
      loading: "Descubriendo historia...",
      refresh: "Otro dato curioso"
    },
    en: {
      loading: "Discovering history...",
      refresh: "Another fun fact"
    }
  }[language];

  const fetchContext = async () => {
    setIsLoading(true);
    try {
      const result = await getMathContext(language);
      setData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch on mount and when language changes
  useEffect(() => {
    fetchContext();
  }, [language]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 p-6 md:p-8 rounded-2xl shadow-md border border-blue-100 flex flex-col relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-200/40 rounded-full blur-3xl group-hover:bg-blue-300/40 transition-colors duration-500"></div>

      <div className="flex items-center space-x-4 mb-5 z-10">
        <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600 ring-1 ring-blue-50">
           <BookOpenIcon className="h-8 w-8" />
        </div>
        <h3 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 tracking-tight drop-shadow-sm">
          {data ? data.title : (language === 'es' ? 'Contexto Histórico' : 'Historical Context')}
        </h3>
      </div>

      <div className="flex-grow z-10 min-h-[60px]">
        {isLoading ? (
          <div className="flex items-center justify-start h-full space-x-2 text-blue-400 animate-pulse">
            <span className="text-lg font-medium">{t.loading}</span>
          </div>
        ) : (
          <p className="text-blue-900 text-lg md:text-xl font-medium leading-relaxed max-w-5xl">
            {data?.content}
          </p>
        )}
      </div>

      <button
        onClick={fetchContext}
        disabled={isLoading}
        className="mt-6 self-start text-sm font-bold text-blue-600 hover:text-blue-800 bg-white hover:bg-blue-50 px-5 py-2 rounded-full transition-all duration-200 border border-blue-200 shadow-sm hover:shadow-md z-10"
      >
        {t.refresh}
      </button>
    </div>
  );
};

export default MathContext;