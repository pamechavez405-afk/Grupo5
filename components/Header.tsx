import React from 'react';
import { MotivationIllustration } from './icons/MotivationIllustration';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, onToggleLanguage }) => {
  const content = {
    es: {
      title: "Solucionador de Factoreo",
      subtitle: "Domina el arte de descomponer polinomios.",
      desc: "Desde las antiguas tablillas de Babilonia hasta la criptografía moderna, el factoreo ha sido una herramienta matemática fundamental."
    },
    en: {
      title: "Factoring Solver",
      subtitle: "Master the art of decomposing polynomials.",
      desc: "From ancient Babylonian tablets to modern cryptography, factoring has been a fundamental mathematical tool."
    }
  };

  const t = content[language];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white/80 supports-backdrop-blur:bg-white/60">
      <div className="container mx-auto px-4 py-3 md:px-8">
        <div className="flex items-center justify-between gap-4">
            {/* Left Side: Illustration (Corner) and Title */}
            <div className="flex items-center gap-3 md:gap-5">
                <div className="flex-shrink-0">
                    <MotivationIllustration className="h-16 w-auto md:h-20 drop-shadow-sm" />
                </div>
                <div className="text-left">
                    <h1 className="text-xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
                        {t.title}
                    </h1>
                    <p className="text-xs md:text-sm font-medium text-slate-500 hidden sm:block">
                        {t.subtitle}
                    </p>
                </div>
            </div>

            {/* Right Side: Language Toggle */}
            <div className="flex items-center">
                <button
                    onClick={onToggleLanguage}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-slate-200 text-yellow-600 font-bold text-xs md:text-sm rounded-lg shadow-sm hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all duration-200"
                    aria-label={language === 'es' ? "Switch to English" : "Cambiar a Español"}
                >
                    <span className={language === 'es' ? 'text-slate-900' : 'text-slate-400'}>ES</span>
                    <span className="text-slate-300">|</span>
                    <span className={language === 'en' ? 'text-slate-900' : 'text-slate-400'}>EN</span>
                </button>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;