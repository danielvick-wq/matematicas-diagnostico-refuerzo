import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Dumbbell, 
  RotateCcw, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  BookOpen
} from 'lucide-react';
import { DiagnosticResult, Question } from '../types';
import { DiagramRenderer } from './DiagramRenderer';

interface DiagnosticReportProps {
  diagnostic: DiagnosticResult;
  questions: Question[];
  onStartRemediation: () => void;
  onRetakeTest: () => void;
}

export const DiagnosticReport: React.FC<DiagnosticReportProps> = ({
  diagnostic,
  questions,
  onStartRemediation,
  onRetakeTest
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'wrong' | 'correct'>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedQuestions(new Set(questions.map(q => q.id)));
  };

  const collapseAll = () => {
    setExpandedQuestions(new Set());
  };

  const filteredQuestions = questions.filter(q => {
    const isCorrect = diagnostic.answers[q.id] === q.correctAnswer;
    if (filterMode === 'correct') return isCorrect;
    if (filterMode === 'wrong') return !isCorrect;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Hero KPI Score Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium tracking-wide">
              <span>Informe Oficial de Diagnóstico</span>
              <span aria-hidden="true">·</span>
              <span>Saberes & Habilidades</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Diagnóstico Pedagógico de Rendimiento
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Análisis completo de tus fortalezas conceptuales y detección de falencias específicas para orientar tu plan de nivelación adaptativa.
            </p>
          </div>

          {/* Metric block */}
          <div className="flex items-center gap-4 bg-slate-800/80 border border-slate-700 p-4 rounded-xl shrink-0">
            <div className="text-center px-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-sky-400 tabular-nums">
                {diagnostic.totalCorrect}/{diagnostic.totalQuestions}
              </span>
              <span className="block text-xs text-slate-400 mt-0.5">Respuestas Correctas</span>
            </div>
            <div className="h-10 w-px bg-slate-700" />
            <div className="text-center px-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tabular-nums">
                {diagnostic.totalPercentage}%
              </span>
              <span className="block text-xs text-slate-400 mt-0.5">{diagnostic.overallLevel}</span>
            </div>
          </div>
        </div>

        {/* Action Button inside Hero */}
        <div className="relative z-10 mt-6 pt-6 border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Fecha: {new Date(diagnostic.completedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onRetakeTest}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Repetir Prueba</span>
            </button>

            <button
              onClick={onStartRemediation}
              className="px-5 py-2 text-xs sm:text-sm font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Dumbbell className="w-4 h-4 text-slate-900" />
              <span>Practicar Ejercicios para Nivelar Falencias</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Strengths & Weaknesses Highlights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fortalezas Identificadas */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Tus Fortalezas Identificadas</h2>
              <span className="text-xs text-slate-500">Saberes y habilidades consolidadas</span>
            </div>
          </div>

          <ul className="space-y-2.5">
            {diagnostic.fortalezas.map((fort, i) => (
              <li 
                key={i}
                className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs sm:text-sm text-emerald-950 flex items-start gap-2.5"
              >
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                <span>{fort}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Falencias / Deficiencias Detectadas */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-bold">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Falencias y Oportunidades de Mejora</h2>
              <span className="text-xs text-slate-500">Áreas que requieren ejercicios de nivelación</span>
            </div>
          </div>

          <ul className="space-y-2.5 mb-4">
            {diagnostic.falencias.map((fal, i) => (
              <li 
                key={i}
                className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl text-xs sm:text-sm text-rose-950 flex items-start gap-2.5"
              >
                <span className="text-rose-600 font-bold shrink-0 mt-0.5">!</span>
                <span>{fal}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={onStartRemediation}
            className="w-full py-2.5 px-4 text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Dumbbell className="w-4 h-4 text-rose-700" />
            <span>Resolver estas falencias con ejercicios de refuerzo</span>
          </button>
        </div>
      </div>

      {/* Matriz 1: Saberes Matemáticos */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Dimensión de Conocimiento</span>
            <span aria-hidden="true">·</span>
            <span>Aritmética, Geometría, Trigonometría, Álgebra, Cálculo</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-0.5">
            Diagnóstico por Saberes Matemáticos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diagnostic.saberBreakdown.map(s => {
            const isMastery = s.status === 'Dominio Alto';
            const isWeak = s.status === 'Falencia Crítica';

            return (
              <div 
                key={s.saber}
                className={`p-4 rounded-xl border transition-all ${
                  isMastery 
                    ? 'border-emerald-200 bg-emerald-50/20' 
                    : isWeak 
                    ? 'border-rose-200 bg-rose-50/20' 
                    : 'border-slate-200 bg-slate-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm text-slate-900">{s.saber}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                    isMastery 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : isWeak 
                      ? 'bg-rose-100 text-rose-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {s.percentage}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2.5">
                  <div 
                    className={`h-full rounded-full ${
                      isMastery ? 'bg-emerald-500' : isWeak ? 'bg-rose-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${s.percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>Aciertos: {s.correct} de {s.total}</span>
                  <span className="font-medium text-slate-700">{s.status}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {s.feedback}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Matriz 2: Habilidades Cognitivas */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="mb-5">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Dimensión Cognitiva</span>
            <span aria-hidden="true">·</span>
            <span>Habilidades Básicas, Procesos de Pensamiento, Especiales y Análisis</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-0.5">
            Diagnóstico por Habilidades
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {diagnostic.skillBreakdown.map(sk => {
            const isMastery = sk.status === 'Dominio Alto';
            const isWeak = sk.status === 'Falencia Crítica';

            return (
              <div 
                key={sk.habilidad}
                className={`p-4 rounded-xl border transition-all ${
                  isMastery 
                    ? 'border-emerald-200 bg-emerald-50/20' 
                    : isWeak 
                    ? 'border-rose-200 bg-rose-50/20' 
                    : 'border-slate-200 bg-slate-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xs text-slate-900 leading-snug">{sk.habilidad}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                    isMastery 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : isWeak 
                      ? 'bg-rose-100 text-rose-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {sk.percentage}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2.5">
                  <div 
                    className={`h-full rounded-full ${
                      isMastery ? 'bg-emerald-500' : isWeak ? 'bg-rose-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${sk.percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>Aciertos: {sk.correct} de {sk.total}</span>
                  <span className="font-medium text-slate-700">{sk.status}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {sk.feedback}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question-by-Question Review with Pedagogy */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Revisión Detallada de Preguntas ({filteredQuestions.length})
            </h2>
            <p className="text-xs text-slate-500">
              Explora las respuestas correctas con sus soluciones paso a paso y justificación matemática.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 font-medium rounded-md transition-colors cursor-pointer ${
                  filterMode === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Todas ({questions.length})
              </button>
              <button
                onClick={() => setFilterMode('wrong')}
                className={`px-3 py-1 font-medium rounded-md transition-colors cursor-pointer ${
                  filterMode === 'wrong' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Falencias ({questions.length - diagnostic.totalCorrect})
              </button>
              <button
                onClick={() => setFilterMode('correct')}
                className={`px-3 py-1 font-medium rounded-md transition-colors cursor-pointer ${
                  filterMode === 'correct' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Correctas ({diagnostic.totalCorrect})
              </button>
            </div>

            {/* Toggle expand all */}
            <button
              onClick={expandedQuestions.size === questions.length ? collapseAll : expandAll}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              {expandedQuestions.size === questions.length ? 'Plegar todas' : 'Desplegar todas'}
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-3">
          {filteredQuestions.map(q => {
            const userChoice = diagnostic.answers[q.id];
            const isCorrect = userChoice === q.correctAnswer;
            const isExpanded = expandedQuestions.has(q.id);

            return (
              <div 
                key={q.id}
                className={`border rounded-xl transition-all ${
                  isCorrect 
                    ? 'border-emerald-200 bg-emerald-50/10' 
                    : 'border-rose-200 bg-rose-50/10'
                }`}
              >
                {/* Question Row Header */}
                <div 
                  onClick={() => toggleExpand(q.id)}
                  className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span 
                      className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                        isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {q.number}
                    </span>

                    <div className="truncate">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
                        <span className="font-semibold text-slate-700">{q.saber}</span>
                        <span aria-hidden="true">·</span>
                        <span>{q.habilidad}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-900 truncate">
                        {q.prompt.split('\n')[0]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right text-xs">
                      {isCorrect ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correcta
                        </span>
                      ) : (
                        <span className="text-rose-700 font-semibold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Falencia
                        </span>
                      )}
                      <span className="text-slate-400 block text-[11px]">
                        Tu: {userChoice ? userChoice.toUpperCase() : 'Ninguna'} · Correcta: {q.correctAnswer.toUpperCase()}
                      </span>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 text-sm">
                    {/* Full prompt */}
                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <p className="font-medium text-slate-900 whitespace-pre-line">{q.prompt}</p>
                    </div>

                    {/* Diagram if available (with solution annotations highlighted) */}
                    {q.diagramType && (
                      <div className="my-2">
                        <DiagramRenderer diagramType={q.diagramType} showSolution={true} />
                      </div>
                    )}

                    {/* Choices table */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map(opt => {
                        const isUserSelected = userChoice === opt.label;
                        const isCorrectOption = q.correctAnswer === opt.label;

                        let style = 'bg-white border-slate-200 text-slate-700';
                        if (isCorrectOption) {
                          style = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold';
                        } else if (isUserSelected && !isCorrect) {
                          style = 'bg-rose-50 border-rose-300 text-rose-950';
                        }

                        return (
                          <div key={opt.label} className={`p-2.5 rounded-lg border flex items-center gap-2 ${style}`}>
                            <span className="font-bold uppercase w-5 h-5 rounded bg-slate-100 flex items-center justify-center shrink-0">
                              {opt.label}
                            </span>
                            <span className="flex-1">{opt.text}</span>
                            {isCorrectOption && (
                              <span className="text-emerald-700 font-bold text-[11px]">Respuesta Correcta</span>
                            )}
                            {isUserSelected && !isCorrect && (
                              <span className="text-rose-700 font-bold text-[11px]">Tu Elección</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-xl text-xs sm:text-sm text-sky-950 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-sky-900">
                        <BookOpen className="w-4 h-4 text-sky-700" />
                        <span>Solución y Explicación Paso a Paso:</span>
                      </div>
                      <p className="whitespace-pre-line text-sky-900 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
