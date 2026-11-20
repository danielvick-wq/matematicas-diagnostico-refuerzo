import React from 'react';
import { BookOpen, BarChart3, Dumbbell, Database, RotateCcw } from 'lucide-react';

export type ActiveTab = 'test' | 'report' | 'remediation' | 'bank';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  hasCompletedTest: boolean;
  onResetTest: () => void;
  questionCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  hasCompletedTest,
  onResetTest,
  questionCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSelectTab('test')} 
            className="text-lg md:text-xl font-bold tracking-tight text-slate-900 text-left hover:text-sky-600 transition-colors cursor-pointer"
          >
            Diagnóstico Matemático
          </button>
        </div>

        {/* Zone 2: Clean text navigation links / tabs */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => onSelectTab('test')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'test'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Prueba ({questionCount})</span>
          </button>

          <button
            onClick={() => onSelectTab('report')}
            disabled={!hasCompletedTest}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              !hasCompletedTest
                ? 'text-slate-400 opacity-60 cursor-not-allowed'
                : activeTab === 'report'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Diagnóstico & Falencias</span>
          </button>

          <button
            onClick={() => onSelectTab('remediation')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'remediation'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            <span>Ejercicios de Nivelación</span>
          </button>

          <button
            onClick={() => onSelectTab('bank')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'bank'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Banco de Preguntas</span>
          </button>
        </nav>

        {/* Zone 3: Primary action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onResetTest}
            title="Reiniciar respuestas de la prueba"
            className="px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 px-2 py-1.5 bg-slate-50 text-xs">
        <button
          onClick={() => onSelectTab('test')}
          className={`px-2 py-1 rounded font-medium cursor-pointer ${
            activeTab === 'test' ? 'text-sky-600 font-bold' : 'text-slate-600'
          }`}
        >
          Prueba
        </button>
        <button
          onClick={() => onSelectTab('report')}
          disabled={!hasCompletedTest}
          className={`px-2 py-1 rounded font-medium cursor-pointer ${
            !hasCompletedTest
              ? 'text-slate-300'
              : activeTab === 'report'
              ? 'text-sky-600 font-bold'
              : 'text-slate-600'
          }`}
        >
          Diagnóstico
        </button>
        <button
          onClick={() => onSelectTab('remediation')}
          className={`px-2 py-1 rounded font-medium cursor-pointer ${
            activeTab === 'remediation' ? 'text-sky-600 font-bold' : 'text-slate-600'
          }`}
        >
          Refuerzo
        </button>
        <button
          onClick={() => onSelectTab('bank')}
          className={`px-2 py-1 rounded font-medium cursor-pointer ${
            activeTab === 'bank' ? 'text-sky-600 font-bold' : 'text-slate-600'
          }`}
        >
          Banco ({questionCount})
        </button>
      </div>
    </header>
  );
};
