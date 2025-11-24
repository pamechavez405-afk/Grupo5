import React, { useState, useCallback } from 'react';
import { FactoringCase, PracticeExample, FactoringCaseTranslations, Language } from '../types';
import { generateExample } from '../services/geminiService';

interface ExampleGeneratorProps {
  language: Language;
}

const ExampleGenerator: React.FC<ExampleGeneratorProps> = ({ language }) => {
  const [example, setExample] = useState<PracticeExample | null>(null);
  const [loadingCase, setLoadingCase] = useState<FactoringCase | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const t = {
    es: {
      title: "Practicar",
      desc: "¿Necesitas practicar? Elige un caso de factoreo y la IA creará un ejercicio para ti.",
      gen: "Generando...",
      err: "No se pudo generar un ejemplo. Inténtalo de nuevo.",
      exOf: "Ejercicio de:",
      show: "Mostrar Solución",
      hide: "Ocultar Solución",
      motivation: "¡La práctica hace al maestro!"
    },
    en: {
      title: "Practice",
      desc: "Need practice? Choose a factoring case and AI will create an exercise for you.",
      gen: "Generating...",
      err: "Could not generate an example. Please try again.",
      exOf: "Exercise of:",
      show: "Show Solution",
      hide: "Hide Solution",
      motivation: "Practice makes perfect!"
    }
  }[language];

  const handleGenerate = useCallback(async (caseType: FactoringCase) => {
    setLoadingCase(caseType);
    setError(null);
    setExample(null);
    setShowSolution(false);

    try {
      const generated = await generateExample(caseType, language);
      setExample({ ...generated, tipo: FactoringCaseTranslations[caseType][language] });
    } catch (err) {
      setError(t.err);
      console.error(err);
    } finally {
      setLoadingCase(null);
    }
  }, [language, t]);
  
  const factoringCases = Object.values(FactoringCase).filter(c => c !== FactoringCase.AUTO_DETECT);

  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200/50 h-full flex flex-col">
      <h2 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">{t.title}</h2>
      <p className="text-slate-600 mb-8 text-base leading-relaxed">{t.desc}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {factoringCases.map(caseType => (
          <button
            key={caseType}
            onClick={() => handleGenerate(caseType)}
            disabled={!!loadingCase}
            className="w-full text-left p-4 bg-white ring-1 ring-slate-200 rounded-xl hover:bg-blue-50 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-wait group shadow-sm hover:shadow-md"
          >
            <span className="font-bold text-slate-700 group-hover:text-blue-700 transition-colors text-lg">{FactoringCaseTranslations[caseType][language]}</span>
             {loadingCase === caseType && <span className="text-sm text-slate-500 ml-2 animate-pulse">{t.gen}</span>}
          </button>
        ))}
      </div>

      {error && <div className="mt-6 p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm">{error}</div>}

      {example && (
        <div className="mt-8 p-6 bg-slate-100/50 border border-slate-200/80 rounded-xl animate-fade-in flex-grow flex flex-col justify-center">
          <h3 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-3 text-center">{t.exOf} <span className="text-blue-600 normal-case text-base block mt-1">{example.tipo}</span></h3>
          <p className="my-4 text-3xl font-mono text-center bg-white p-8 rounded-xl shadow-sm text-slate-800 border border-slate-100">{example.problema}</p>
          
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="w-full sm:w-auto mx-auto mt-4 flex justify-center items-center px-6 py-3 bg-white text-yellow-700 font-bold rounded-full ring-1 ring-yellow-400 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-400 transition-colors duration-200 text-sm shadow-sm"
          >
            {showSolution ? t.hide : t.show}
          </button>

          {showSolution && (
            <div className="mt-6 p-5 bg-yellow-50/80 border border-yellow-200 rounded-xl animate-fade-in shadow-inner">
              <p className="text-center font-mono text-yellow-900 text-2xl font-bold tracking-wide">{example.resultado}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExampleGenerator;