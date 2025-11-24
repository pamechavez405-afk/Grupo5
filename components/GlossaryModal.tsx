import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { XIcon } from './icons/XIcon';

const glossaryTerms = [
  { es: 'Factoreo', en: 'Factoring' },
  { es: 'Factor Común', en: 'Common Factor' },
  { es: 'Polinomio', en: 'Polynomial' },
  { es: 'Binomio', en: 'Binomial' },
  { es: 'Trinomio', en: 'Trinomial' },
  { es: 'Diferencia de Cuadrados', en: 'Difference of Squares' },
  { es: 'Trinomio Cuadrado Perfecto', en: 'Perfect Square Trinomial' },
  { es: 'Término', en: 'Term' },
  { es: 'Coeficiente', en: 'Coefficient' },
  { es: 'Variable', en: 'Variable' },
  { es: 'Exponente', en: 'Exponent' },
];

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in"
        onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col transition-transform duration-300 transform scale-95 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <BookOpenIcon className="h-7 w-7 text-blue-500" />
            <h2 className="text-2xl font-semibold text-slate-800">Glosario Bilingüe</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Cerrar glosario"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="space-y-4">
            {glossaryTerms.map((term, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-slate-100/70 rounded-lg border border-slate-200/80">
                <span className="font-semibold text-slate-800">{term.es}</span>
                <span className="text-slate-600">{term.en}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlossaryModal;