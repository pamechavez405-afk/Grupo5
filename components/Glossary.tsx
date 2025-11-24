import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface GlossaryButtonProps {
  onClick: () => void;
}

const Glossary: React.FC<GlossaryButtonProps> = ({ onClick }) => {
  return (
    <button
        onClick={onClick}
        className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 flex items-center space-x-2 px-3 sm:px-4 py-2 bg-transparent text-slate-600 font-semibold rounded-lg hover:bg-slate-900/5 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        aria-label="Abrir glosario"
    >
        <BookOpenIcon className="h-5 w-5" />
        <span className="hidden sm:inline">Glosario</span>
    </button>
  );
};

export default Glossary;