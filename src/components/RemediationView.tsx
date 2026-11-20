import React, { useState, useEffect, useMemo } from 'react';
import {
  Dumbbell,
  CheckCircle2,
  XCircle,
  BookOpen,
  Lightbulb,
  RotateCcw,
  Filter,
  Award,
  ArrowRight,
  ListOrdered,
  Target,
  Trash2
} from 'lucide-react';
import { DiagnosticResult, KnowledgeArea, SkillArea } from '../types';
import { REMEDIATION_EXERCISES } from '../data/remediationBank';
import { getRecommendedRemediations } from '../utils/diagnosticEngine';

const STORAGE_KEY_REMEDIATION = 'math_diag_remediation_answers_v1';

const ALL_SABERES: KnowledgeArea[] = [
  'Aritmética',
  'Álgebra',
  'Geometría',
  'Trigonometría',
  'Cálculo'
];

const ALL_SKILLS: SkillArea[] = [
  'Habilidades básicas',
  'Procesos de pensamiento y razonamiento',
  'Habilidades especiales',
  'Habilidades de análisis'
];

interface RemediationViewProps {
  diagnostic: DiagnosticResult | null;
  onRetakeTest: () => void;
}

export const RemediationView: React.FC<RemediationViewProps> = ({
  diagnostic,
  onRetakeTest
}) => {
  const recommendedExercises = useMemo(
    () => (diagnostic ? getRecommendedRemediations(diagnostic) : REMEDIATION_EXERCISES),
    [diagnostic]
  );

  const weakSaberes = useMemo(() => {
    if (!diagnostic) return new Set<KnowledgeArea>();
    return new Set(
      diagnostic.saberBreakdown
        .filter(s => s.total > 0 && s.percentage < 75)
        .map(s => s.saber)
    );
  }, [diagnostic]);

  const weakSkills = useMemo(() => {
    if (!diagnostic) return new Set<SkillArea>();
    return new Set(
      diagnostic.skillBreakdown
        .filter(sk => sk.total > 0 && sk.percentage < 75)
        .map(sk => sk.habilidad)
    );
  }, [diagnostic]);

  const [selectedFilter, setSelectedFilter] = useState<'recommended' | KnowledgeArea | 'all'>('recommended');
  const [selectedSkill, setSelectedSkill] = useState<SkillArea | 'all'>('all');
  const [answers, setAnswers] = useState<Record<string, 'a' | 'b' | 'c' | 'd'>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REMEDIATION);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading remediation progress', e);
    }
    return {};
  });
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REMEDIATION, JSON.stringify(answers));
    } catch (e) {
      console.error('Error saving remediation progress', e);
    }
  }, [answers]);

  // Preserve diagnostic priority order when viewing recommended exercises
  const displayExercises = useMemo(() => {
    const baseList =
      selectedFilter === 'recommended'
        ? recommendedExercises
        : selectedFilter === 'all'
        ? REMEDIATION_EXERCISES
        : REMEDIATION_EXERCISES.filter(ex => ex.saber === selectedFilter);

    if (selectedSkill === 'all') return baseList;
    return baseList.filter(ex => ex.habilidad === selectedSkill);
  }, [selectedFilter, selectedSkill, recommendedExercises]);

  const handleSelectOption = (exerciseId: string, option: 'a' | 'b' | 'c' | 'd') => {
    setAnswers(prev => ({ ...prev, [exerciseId]: option }));
  };

  const handleResetAllPractice = () => {
    setAnswers({});
    setShowHint({});
  };

  // Compute progress strictly over the currently displayed exercises
  const visibleCompletedCount = displayExercises.filter(ex => Boolean(answers[ex.id])).length;
  const visibleCorrectCount = displayExercises.filter(
    ex => answers[ex.id] === ex.correctAnswer
  ).length;

  const totalAnsweredGlobal = Object.keys(answers).length;
  const totalCorrectGlobal = REMEDIATION_EXERCISES.filter(
    ex => answers[ex.id] === ex.correctAnswer
  ).length;

  const visibleProgressPct =
    displayExercises.length > 0
      ? Math.round((visibleCorrectCount / displayExercises.length) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium tracking-wide">
              <span>Módulo de Refuerzo y Nivelación</span>
              <span aria-hidden="true">·</span>
              <span>{REMEDIATION_EXERCISES.length} Ejercicios Guiados</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1 flex items-center gap-2.5">
              <Dumbbell className="w-6 h-6 text-sky-600 shrink-0" />
              <span>Ejercicios Personalizados para Superar Falencias</span>
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {diagnostic
                ? 'Los ejercicios recomendados están ordenados por prioridad según las áreas y habilidades con menor rendimiento en tu diagnóstico.'
                : 'Explora y practica ejercicios paso a paso organizados por los 5 saberes y 4 habilidades matemáticas. Realiza primero la prueba diagnóstica para obtener una ruta personalizada.'}
            </p>
          </div>

          {/* Remediation Stats */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-50 border border-slate-200 p-4 rounded-xl shrink-0">
            <div className="text-center px-2">
              <span className="text-2xl font-bold text-slate-900 tabular-nums">
                {visibleCorrectCount} / {displayExercises.length}
              </span>
              <span className="block text-xs text-slate-500">Superados en vista</span>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              {totalAnsweredGlobal > 0 && (
                <button
                  onClick={handleResetAllPractice}
                  className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-rose-700 bg-white hover:bg-rose-50 rounded-lg border border-slate-200 hover:border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title="Borrar tus respuestas de práctica para volver a intentarlo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reiniciar práctica</span>
                </button>
              )}
              <button
                onClick={onRetakeTest}
                className="px-4 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reevaluar en Test</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar for current view */}
        {displayExercises.length > 0 && (
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span>
                Avance en esta vista: {visibleCompletedCount} respondidos · {visibleCorrectCount} correctos
                {totalAnsweredGlobal !== visibleCompletedCount && (
                  <span className="text-slate-400">
                    {' '}
                    (Total global: {totalCorrectGlobal}/{REMEDIATION_EXERCISES.length} superados)
                  </span>
                )}
              </span>
              <span className="font-semibold text-slate-700 tabular-nums">{visibleProgressPct}%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${visibleProgressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Filter Controls */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-slate-400 mr-1.5 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Saber:
            </span>

            <button
              onClick={() => setSelectedFilter('recommended')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === 'recommended'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>
                {diagnostic ? 'Recomendados' : 'Ruta General'} ({recommendedExercises.length})
              </span>
            </button>

            {ALL_SABERES.map(saber => {
              const count = REMEDIATION_EXERCISES.filter(e => e.saber === saber).length;
              const isWeak = weakSaberes.has(saber);
              return (
                <button
                  key={saber}
                  onClick={() => setSelectedFilter(saber)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    selectedFilter === saber
                      ? 'bg-slate-900 text-white'
                      : isWeak
                      ? 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {saber} ({count})
                </button>
              );
            })}

            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todos ({REMEDIATION_EXERCISES.length})
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 shrink-0">
            <label htmlFor="remediation-skill-filter" className="text-slate-500">
              Habilidad:
            </label>
            <select
              id="remediation-skill-filter"
              value={selectedSkill}
              onChange={e => setSelectedSkill(e.target.value as SkillArea | 'all')}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">Todas las habilidades</option>
              {ALL_SKILLS.map(skill => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Empty Filter State */}
      {displayExercises.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
          <p className="text-sm font-semibold text-slate-800">
            No hay ejercicios que coincidan con la combinación de filtros seleccionada.
          </p>
          <p className="text-xs text-slate-500">
            Prueba seleccionar "Todas las habilidades" o cambiar de saber para ver más ejercicios de práctica.
          </p>
          <button
            onClick={() => {
              setSelectedFilter('all');
              setSelectedSkill('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors cursor-pointer"
          >
            Mostrar los {REMEDIATION_EXERCISES.length} ejercicios
          </button>
        </div>
      ) : (
        /* Exercises List */
        <div className="space-y-6">
          {displayExercises.map((exercise, index) => {
            const userAns = answers[exercise.id];
            const hasAnswered = Boolean(userAns);
            const isCorrect = userAns === exercise.correctAnswer;
            const hintOpen = Boolean(showHint[exercise.id]);

            const isHighPriority =
              diagnostic &&
              weakSaberes.has(exercise.saber) &&
              weakSkills.has(exercise.habilidad);
            const isSaberDeficit = diagnostic && weakSaberes.has(exercise.saber);

            return (
              <div
                key={exercise.id}
                className={`bg-white border rounded-2xl p-6 shadow-sm transition-all ${
                  hasAnswered
                    ? isCorrect
                      ? 'border-emerald-300 ring-1 ring-emerald-400/20'
                      : 'border-rose-300 ring-1 ring-rose-400/20'
                    : 'border-slate-200'
                }`}
              >
                {/* Exercise Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                    <span className="font-bold text-sky-600 tabular-nums">
                      Ejercicio {index + 1}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-slate-800">{exercise.saber}</span>
                    <span aria-hidden="true">·</span>
                    <span>{exercise.habilidad}</span>
                    {isHighPriority ? (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-rose-700">
                          Prioridad alta (saber y habilidad por reforzar)
                        </span>
                      </>
                    ) : isSaberDeficit ? (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-amber-700">
                          Refuerzo recomendado en {exercise.saber}
                        </span>
                      </>
                    ) : null}
                  </div>

                  {hasAnswered && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      {isCorrect ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correcto · Concepto reforzado
                        </span>
                      ) : (
                        <span className="text-rose-700 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrecto · Revisa la solución
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-slate-900 mb-3">{exercise.title}</h2>

                {/* Píldora Teórica Clave */}
                <div className="bg-sky-50/70 border border-sky-200/80 rounded-xl p-4 mb-5 text-xs sm:text-sm text-sky-950">
                  <div className="font-bold flex items-center gap-1.5 text-sky-900 mb-1">
                    <BookOpen className="w-4 h-4 text-sky-700 shrink-0" />
                    <span>Píldora Teórica y Estrategia:</span>
                  </div>
                  <p className="leading-relaxed mb-2">{exercise.conceptSummary}</p>
                  {exercise.formulaOrTip && (
                    <div className="p-2.5 bg-white/90 border border-sky-200 rounded-lg font-mono text-sky-900 text-xs font-semibold flex items-start gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>Regla clave: {exercise.formulaOrTip}</span>
                    </div>
                  )}
                </div>

                {/* Exercise Prompt */}
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Problema Práctico:
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-slate-900 whitespace-pre-line leading-relaxed">
                    {exercise.prompt}
                  </p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                  {exercise.options.map(opt => {
                    const isSelected = userAns === opt.label;
                    const isRight = exercise.correctAnswer === opt.label;

                    let optStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                    if (hasAnswered) {
                      if (isRight) {
                        optStyle =
                          'border-emerald-400 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                      } else if (isSelected && !isRight) {
                        optStyle = 'border-rose-300 bg-rose-50 text-rose-950';
                      } else {
                        optStyle = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={opt.label}
                        onClick={() => handleSelectOption(exercise.id, opt.label)}
                        disabled={hasAnswered}
                        className={`p-3 rounded-xl border text-left text-xs sm:text-sm flex items-center gap-3 transition-all ${
                          hasAnswered ? 'cursor-default' : 'cursor-pointer'
                        } ${optStyle}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs uppercase shrink-0 ${
                            hasAnswered && isRight
                              ? 'bg-emerald-600 text-white'
                              : isSelected && hasAnswered
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {opt.label}
                        </span>
                        <span className="flex-1">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Hint button (exercise-specific hint) */}
                {!hasAnswered && (
                  <div className="mb-4">
                    {!hintOpen ? (
                      <button
                        onClick={() =>
                          setShowHint(prev => ({ ...prev, [exercise.id]: true }))
                        }
                        className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1.5 font-medium cursor-pointer"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        <span>Ver pista específica antes de responder</span>
                      </button>
                    ) : (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                        <span className="font-semibold block mb-0.5">Pista de resolución:</span>
                        <span>
                          {exercise.hint ||
                            'Revisa la regla clave en la píldora teórica y sustituye los datos del enunciado paso a paso.'}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Step-by-step resolution walkthrough (shown once answered) */}
                {hasAnswered && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <ListOrdered className="w-4 h-4 text-sky-600" />
                        <span>Explicación Paso a Paso:</span>
                      </span>
                      <button
                        onClick={() => {
                          setAnswers(prev => {
                            const next = { ...prev };
                            delete next[exercise.id];
                            return next;
                          });
                        }}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" /> Reintentar ejercicio
                      </button>
                    </div>

                    <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                      {exercise.explanation}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200">
                      {exercise.steps.map((st, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                            {i + 1}
                          </span>
                          <span>{st}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Completion Banner */}
      {visibleCompletedCount > 0 && (
        <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-300 text-xs font-semibold">
              <Award className="w-4 h-4" />
              <span>Avance de Nivelación Adaptativa</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Has practicado {visibleCompletedCount} de {displayExercises.length} ejercicios ({visibleCorrectCount} correctos)
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 max-w-xl">
              Al fortalecer tus falencias con práctica activa, estás preparado para volver a realizar la prueba diagnóstica y comprobar la mejora en tus porcentajes de saberes y habilidades.
            </p>
          </div>

          <button
            onClick={onRetakeTest}
            className="px-6 py-3 font-bold text-slate-900 bg-white hover:bg-emerald-50 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md shrink-0 text-sm"
          >
            <span>Volver a la Prueba Diagnóstica</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
