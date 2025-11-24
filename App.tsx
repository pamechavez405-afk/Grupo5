import React, { useState } from 'react';
import Header from './components/Header';
import Solver from './components/Solver';
import ExampleGenerator from './components/ExampleGenerator';
import MathContext from './components/MathContext';
import { Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <div className="min-h-screen bg-transparent font-sans text-slate-900">
      <Header language={language} onToggleLanguage={toggleLanguage} />
      <main className="container mx-auto p-4 md:p-8">
        
        {/* Introduction / Context Banner */}
        <div className="mb-8">
          <MathContext language={language} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Solver language={language} />
          </div>
          <div className="space-y-8">
            <ExampleGenerator language={language} />
          </div>
        </div>
        <footer className="text-center mt-12 text-slate-600 text-sm">
          {language === 'es' ? (
            <>
              <p>Desarrollado con React, Tailwind CSS y la API de Gemini.</p>
              <p>Objetivo: Ayudarte a resolver y comprender los diferentes casos de factoreo.</p>
            </>
          ) : (
            <>
              <p>Powered by React, Tailwind CSS, and Gemini API.</p>
              <p>Goal: To help you solve and understand different factoring cases.</p>
            </>
          )}
        </footer>
      </main>
    </div>
  );
};

export default App;