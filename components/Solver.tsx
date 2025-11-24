import React, { useState, useCallback } from 'react';
import { AnalysisResult, FactoringCase, FactoringCaseTranslations, Language } from '../types';
import { analyzeExpression } from '../services/geminiService';
import AnalysisDisplay from './AnalysisDisplay';

interface SolverProps {
  language: Language;
}

const Solver: React.FC<SolverProps> = ({ language }) => {
  const [expression, setExpression] = useState<string>('x^2 + 5x + 6');
  const [selectedCase, setSelectedCase] = useState<FactoringCase>(FactoringCase.AUTO_DETECT);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const t = {
    es: {
      title: "Analizador de Casos",
      intro: "Introduce un polinomio. Puedes dejar que la IA detecte el caso o seleccionar uno específico para probar.",
      choose: "Elige el tipo de ejercicio:",
      placeholder: "Ej: 2x^2 - 18",
      solve: "Resolver",
      analyzing: "Analizando...",
      errEmpty: "Por favor, introduce una expresión algebraica.",
      errAnalysis: "Hubo un error al analizar la expresión. Por favor, inténtalo de nuevo."
    },
    en: {
      title: "Case Analyzer",
      intro: "Enter a polynomial. You can let AI detect the case or select a specific one to test.",
      choose: "Choose exercise type:",
      placeholder: "Ex: 2x^2 - 18",
      solve: "Solve",
      analyzing: "Analyzing...",
      errEmpty: "Please enter an algebraic expression.",
      errAnalysis: "There was an error analyzing the expression. Please try again."
    }
  }[language];

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expression.trim()) {
      setError(t.errEmpty);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeExpression(expression, selectedCase, language);
      setResult(analysis);
    } catch (err) {
      setError(t.errAnalysis);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [expression, selectedCase, language, t]);

  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200/50 transition-all duration-300">
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">{t.title}</h2>
      <p className="text-slate-600 mb-8 text-lg">{t.intro}</p>
      
      <div className="mb-8">
        <p className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wide">{t.choose}</p>
        <div className="flex flex-wrap gap-2">
            {Object.values(FactoringCase).map((caseType) => (
            <button
                key={caseType}
                type="button"
                onClick={() => setSelectedCase(caseType)}
                className={`px-4 py-2 text-sm font-bold rounded-full transition-all duration-200 ${
                selectedCase === caseType
                    ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400 ring-offset-1'
                    : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-700 ring-1 ring-slate-200'
                }`}
            >
                {FactoringCaseTranslations[caseType][language]}
            </button>
            ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder={t.placeholder}
          className="flex-grow w-full px-5 py-4 text-xl font-mono text-slate-900 bg-white/80 border-2 border-slate-300 rounded-xl shadow-inner appearance-none focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-950 font-bold text-lg py-3 px-8 rounded-xl hover:shadow-xl hover:shadow-yellow-400/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all duration-200 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center disabled:hover:translate-y-0"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.analyzing}
            </>
          ) : (
            t.solve
          )}
        </button>
      </form>

      {error && <div className="mt-6 p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg font-medium">{error}</div>}

      <AnalysisDisplay result={result} language={language} />
    </div>
  );
};

export default Solver;