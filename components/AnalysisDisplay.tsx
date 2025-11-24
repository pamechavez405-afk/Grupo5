import React, { useState } from 'react';
import { AnalysisResult, Language } from '../types';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { ListIcon } from './icons/ListIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface AnalysisDisplayProps {
  result: AnalysisResult | null;
  language: Language;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result, language }) => {
  const [showSteps, setShowSteps] = useState(false);

  const t = {
    es: {
      identified: "Caso Identificado:",
      steps: "Solución Paso a Paso",
      why: "¿Por qué funciona este método?"
    },
    en: {
      identified: "Identified Case:",
      steps: "Step-by-Step Solution",
      why: "Why does this method work?"
    }
  }[language];

  if (!result) {
    return null;
  }

  return (
    <div className="mt-8 space-y-8 animate-fade-in">
      {!result.esValido ? (
        <div className="p-6 bg-amber-100/50 border border-amber-300 rounded-2xl">
          <h3 className="font-bold text-xl text-amber-900">{result.tipo}</h3>
          <p className="mt-2 text-amber-800">{result.explicacionMetodo}</p>
        </div>
      ) : (
        <>
          {/* Tipo de Caso y Resultado Final */}
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
            <div className="flex items-start space-x-4">
              <SparklesIcon className="h-8 w-8 text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-xl text-blue-900">{t.identified} {result.tipo}</h3>
                <p className="mt-2 text-2xl md:text-3xl font-mono bg-white p-3 rounded-md inline-block shadow-sm text-slate-800">
                  {result.resultado}
                </p>
              </div>
            </div>
          </div>

          {/* Solución Paso a Paso - Accordion */}
          <div className="bg-white/50 border border-slate-200/80 rounded-2xl shadow-sm">
            <div 
              className="flex items-center justify-between cursor-pointer p-5 hover:bg-slate-900/5 transition-colors duration-300 rounded-lg"
              onClick={() => setShowSteps(!showSteps)}
              role="button"
              aria-expanded={showSteps}
              aria-controls="step-by-step-solution"
            >
                <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <ListIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="font-bold text-xl text-slate-800">{t.steps}</h3>
                </div>
                <svg 
                    className={`w-6 h-6 text-slate-600 transform transition-transform duration-300 ${showSteps ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {showSteps && (
              <div id="step-by-step-solution" className="p-6 border-t border-slate-200 animate-fade-in">
                <div className="relative pl-4 border-l-4 border-blue-200">
                  {result.pasos.map((step, index) => (
                    <div key={index} className="mb-10 ml-8 relative group">
                       <span className="absolute -left-[58px] top-0 flex items-center justify-center w-12 h-12 bg-white ring-8 ring-white rounded-full text-blue-400 font-bold text-2xl transition-all duration-300 group-hover:bg-blue-400 group-hover:text-white">
                        {index + 1}
                      </span>
                      <div className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-300">
                        <h4 className="font-bold text-lg text-blue-600 mb-2">{step.paso}</h4>
                        <p className="text-slate-700 leading-relaxed">{step.descripcion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Explicación del Método */}
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <LightbulbIcon className="h-7 w-7 text-yellow-500" />
              <h3 className="font-bold text-xl text-yellow-900">{t.why}</h3>
            </div>
            <p className="text-yellow-900 leading-relaxed">{result.explicacionMetodo}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalysisDisplay;