import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Bookmark, 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle,
  Clock,
  Sparkles
} from 'lucide-react';
import { Question } from '../types';
import { DiagramRenderer } from './DiagramRenderer';

interface TestViewProps {
  questions: Question[];
  answers: Record<string, 'a' | 'b' | 'c' | 'd' | null>;
  flaggedQuestions: Set<string>;
  onSelectAnswer: (questionId: string, option: 'a' | 'b' | 'c' | 'd') => void;
  onToggleFlag: (questionId: string) => void;
  onSubmitTest: () => void;
}

export const TestView: React.FC<TestViewProps> = ({
  questions,
  answers,
  flaggedQuestions,
  onSelectAnswer,
  onToggleFlag,
  onSubmitTest
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Clamp currentIndex if questions are deleted in the Question Bank
  useEffect(() => {
    if (questions.length > 0 && currentIndex >= questions.length) {
      setCurrentIndex(questions.length - 1);
    }
  }, [questions.length, currentIndex]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex] || questions[0];
  const selectedOption = currentQ ? answers[currentQ.id] : null;
  const isFlagged = currentQ ? flaggedQuestions.has(currentQ.id) : false;

  const answeredCount = questions.filter(
    q => answers[q.id] !== null && answers[q.id] !== undefined
  ).length;
  const totalCount = questions.length;
  const progressPercent = totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 0;
  const unansweredCount = Math.max(0, totalCount - answeredCount);

  const handleNext = () => {
    setShowHint(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    setShowHint(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!currentQ) {
    return (
      <div className="p-12 text-center text-slate-500">
        No hay preguntas cargadas en la prueba actual.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Test Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Evaluación Diagnóstica</span>
            <span aria-hidden="true">·</span>
            <span>{totalCount} Preguntas</span>
            <span aria-hidden="true">·</span>
            <span>Matemáticas y Habilidades</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Test de Saberes y Habilidades Cognitivas
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <Clock className="w-4 h-4 text-sky-600" />
            <span className="font-semibold">{formatTime(elapsedSeconds)}</span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            Finalizar Prueba
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-medium">
          <span>Progreso: {answeredCount} de {totalCount} preguntas respondidas</span>
          <span className="tabular-nums font-semibold">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-sky-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Question Card (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm">
          {/* Question Header & Metadata */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
              <span className="font-bold text-sky-600 text-sm sm:text-base">
                Pregunta {currentQ.number}
              </span>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span>{currentQ.saber}</span>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span className="text-slate-500">{currentQ.habilidad}</span>
              <span aria-hidden="true" className="text-slate-300 hidden sm:inline">/</span>
              <span className="text-slate-400 hidden sm:inline">{currentQ.difficulty}</span>
            </div>

            <button
              onClick={() => onToggleFlag(currentQ.id)}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isFlagged 
                  ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                  : 'text-slate-500 hover:bg-slate-100 border border-slate-200'
              }`}
              title={isFlagged ? 'Quitar marca para revisión' : 'Marcar para revisar después'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span className="hidden sm:inline">{isFlagged ? 'Marcada' : 'Marcar'}</span>
            </button>
          </div>

          {/* Prompt */}
          <div className="mb-6">
            <p className="text-base sm:text-lg text-slate-900 font-medium leading-relaxed whitespace-pre-line">
              {currentQ.prompt}
            </p>
          </div>

          {/* Diagram Renderer if question has diagram */}
          {currentQ.diagramType && (
            <div className="mb-6">
              <DiagramRenderer diagramType={currentQ.diagramType} />
            </div>
          )}

          {/* Multiple Choice Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map(opt => {
              const isSelected = selectedOption === opt.label;
              return (
                <button
                  key={opt.label}
                  onClick={() => onSelectAnswer(currentQ.id, opt.label)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'border-sky-600 bg-sky-50/70 text-sky-950 font-medium ring-2 ring-sky-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold uppercase transition-colors ${
                      isSelected
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {opt.label}
                  </span>
                  <div className="flex-1 pt-0.5">
                    <span className="text-sm sm:text-base leading-normal">{opt.text}</span>
                    {opt.subtext && (
                      <span className="block text-xs text-slate-500 mt-0.5">{opt.subtext}</span>
                    )}
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Hint disclosure */}
          {currentQ.hint && (
            <div className="mb-6">
              {!showHint ? (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1.5 font-medium cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>¿Necesitas una pista?</span>
                </button>
              ) : (
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">Pista pedagógica:</span>
                    <span>{currentQ.hint}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-5 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors flex items-center gap-2 cursor-pointer ${
                currentIndex === 0
                  ? 'border-slate-200 text-slate-400 opacity-50 cursor-not-allowed'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <span className="text-xs text-slate-500 font-medium">
              {currentIndex + 1} de {questions.length}
            </span>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2 text-sm font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowSubmitModal(true)}
                className="px-5 py-2 text-sm font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Revisar y Finalizar</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Question Jumper Grid (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-1">
              Mapa de la Prueba
            </h2>
            <p className="text-xs text-slate-500">
              Salta directamente a cualquier pregunta de la prueba.
            </p>
          </div>

          {/* Grid buttons */}
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== null && answers[q.id] !== undefined;
              const isCurrent = idx === currentIndex;
              const isQFlagged = flaggedQuestions.has(q.id);

              let style = 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100';
              if (isCurrent) {
                style = 'bg-slate-900 text-white border-slate-900 font-bold ring-2 ring-slate-400';
              } else if (isAnswered) {
                style = 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold';
              } else if (isQFlagged) {
                style = 'bg-amber-50 border-amber-300 text-amber-800 font-medium';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setShowHint(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-10 rounded-lg border text-xs flex flex-col items-center justify-center relative transition-all cursor-pointer ${style}`}
                >
                  <span>{q.number}</span>
                  {isQFlagged && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute top-1 right-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300 inline-block"></span>
              <span>Respondida ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300 inline-block"></span>
              <span>Marcada para revisión ({flaggedQuestions.size})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300 inline-block"></span>
              <span>Sin responder ({unansweredCount})</span>
            </div>
          </div>

          {/* Summary action */}
          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200 transition-colors cursor-pointer"
            >
              Completar y Generar Diagnóstico
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">¿Finalizar y calificar prueba?</h3>
                <p className="text-xs text-slate-500">Se evaluarán tus saberes matemáticos y habilidades.</p>
              </div>
            </div>

            {unansweredCount > 0 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-5 text-xs text-amber-800 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block mb-0.5">Tienes {unansweredCount} preguntas sin responder:</span>
                  <span>Las preguntas no respondidas se contarán como falencias para sugerirte ejercicios de nivelación.</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-600 mb-5">
                Has respondido todas las {totalCount} preguntas. Tu diagnóstico detallado por áreas (Aritmética, Álgebra, Geometría, Trigonometría, Cálculo) y habilidades estará listo de inmediato.
              </p>
            )}

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Seguir respondiendo
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  onSubmitTest();
                }}
                className="px-5 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                Confirmar y Ver Diagnóstico
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
