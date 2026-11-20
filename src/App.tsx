import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { INITIAL_QUESTIONS } from './data/initialQuestions';
import { Question, DiagnosticResult } from './types';
import { computeDiagnosticReport } from './utils/diagnosticEngine';
import { Header, ActiveTab } from './components/Header';
import { TestView } from './components/TestView';
import { DiagnosticReport } from './components/DiagnosticReport';
import { RemediationView } from './components/RemediationView';
import { QuestionBankManager } from './components/QuestionBankManager';

const STORAGE_KEY_QUESTIONS = 'math_diag_questions_v3';
const STORAGE_KEY_ANSWERS = 'math_diag_answers_v3';
const STORAGE_KEY_FLAGS = 'math_diag_flags_v3';
const STORAGE_KEY_REPORT = 'math_diag_report_v3';

function renumberQuestions(list: Question[]): Question[] {
  return list.map((q, idx) => ({
    ...q,
    number: idx + 1
  }));
}

const OFFICIAL_QUESTION_MAP = new Map<string, Question>(
  INITIAL_QUESTIONS.map(q => [q.id, q])
);

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('test');
  const [confirmAction, setConfirmAction] = useState<'resetTest' | 'resetBank' | null>(null);

  // Questions bank state (syncs official q1..q20 with latest definitions while preserving custom/imported items)
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUESTIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const restored: Question[] = parsed.map((p: Question) => {
            const official = OFFICIAL_QUESTION_MAP.get(p.id);
            if (official) return official;
            return { ...p, isCustom: true };
          });
          return renumberQuestions(restored);
        }
      }
    } catch (e) {
      console.error('Error loading questions from storage', e);
    }
    return renumberQuestions(INITIAL_QUESTIONS);
  });

  // User answers state (questionId -> 'a' | 'b' | 'c' | 'd' | null)
  const [answers, setAnswers] = useState<Record<string, 'a' | 'b' | 'c' | 'd' | null>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ANSWERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading answers from storage', e);
    }
    return {};
  });

  // Flagged questions
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FLAGS);
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {
      console.error('Error loading flags from storage', e);
    }
    return new Set();
  });

  // Diagnostic Report
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REPORT);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading report from storage', e);
    }
    return null;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(questions));
    } catch (e) {
      console.error(e);
    }
  }, [questions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
    } catch (e) {
      console.error(e);
    }
  }, [answers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FLAGS, JSON.stringify(Array.from(flaggedQuestions)));
    } catch (e) {
      console.error(e);
    }
  }, [flaggedQuestions]);

  useEffect(() => {
    try {
      if (diagnosticResult) {
        localStorage.setItem(STORAGE_KEY_REPORT, JSON.stringify(diagnosticResult));
      } else {
        localStorage.removeItem(STORAGE_KEY_REPORT);
      }
    } catch (e) {
      console.error(e);
    }
  }, [diagnosticResult]);

  // Handlers
  const handleSelectAnswer = (questionId: string, option: 'a' | 'b' | 'c' | 'd') => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleToggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const handleSubmitTest = () => {
    const report = computeDiagnosticReport(questions, answers);
    setDiagnosticResult(report);
    setActiveTab('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const executeConfirmedAction = () => {
    if (confirmAction === 'resetTest') {
      setAnswers({});
      setFlaggedQuestions(new Set());
      setDiagnosticResult(null);
      setActiveTab('test');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (confirmAction === 'resetBank') {
      setQuestions(renumberQuestions(INITIAL_QUESTIONS));
      setAnswers({});
      setFlaggedQuestions(new Set());
      setDiagnosticResult(null);
    }
    setConfirmAction(null);
  };

  const handleAddQuestions = (newQuestions: Question[]) => {
    setQuestions(prev => {
      const existingIds = new Set(prev.map(q => q.id));
      const uniqueNew = newQuestions.filter(q => !existingIds.has(q.id));
      return renumberQuestions([...prev, ...uniqueNew]);
    });
  };

  const handleUpdateQuestion = (updatedQuestion: Question) => {
    setQuestions(prev =>
      renumberQuestions(prev.map(q => (q.id === updatedQuestion.id ? updatedQuestion : q)))
    );
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(prev => renumberQuestions(prev.filter(q => q.id !== questionId)));
    setAnswers(prev => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
    setFlaggedQuestions(prev => {
      if (!prev.has(questionId)) return prev;
      const next = new Set(prev);
      next.delete(questionId);
      return next;
    });
  };

  const handleImportQuestions = (imported: Question[], mode: 'append' | 'replace') => {
    if (mode === 'replace') {
      const normalized = imported.map(q => {
        const official = OFFICIAL_QUESTION_MAP.get(q.id);
        return official ? official : { ...q, isCustom: true };
      });
      setQuestions(renumberQuestions(normalized));
      setAnswers({});
      setFlaggedQuestions(new Set());
      setDiagnosticResult(null);
    } else {
      setQuestions(prev => {
        const existingIds = new Set(prev.map(q => q.id));
        const toAppend = imported.map((q, idx) => {
          const official = OFFICIAL_QUESTION_MAP.get(q.id);
          if (official && !existingIds.has(official.id)) return official;
          const uniqueId = existingIds.has(q.id) ? `${q.id}-${Date.now()}-${idx}` : q.id;
          existingIds.add(uniqueId);
          return { ...q, id: uniqueId, isCustom: true };
        });
        return renumberQuestions([...prev, ...toAppend]);
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        hasCompletedTest={!!diagnosticResult}
        onResetTest={() => setConfirmAction('resetTest')}
        questionCount={questions.length}
      />

      <main className="flex-1">
        {activeTab === 'test' && (
          <TestView
            questions={questions}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
            onSelectAnswer={handleSelectAnswer}
            onToggleFlag={handleToggleFlag}
            onSubmitTest={handleSubmitTest}
          />
        )}

        {activeTab === 'report' && diagnosticResult && (
          <DiagnosticReport
            diagnostic={diagnosticResult}
            questions={questions}
            onStartRemediation={() => {
              setActiveTab('remediation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRetakeTest={() => {
              setActiveTab('test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'remediation' && (
          <RemediationView
            diagnostic={diagnosticResult}
            onRetakeTest={() => {
              setActiveTab('test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'bank' && (
          <QuestionBankManager
            questions={questions}
            onAddQuestions={handleAddQuestions}
            onUpdateQuestion={handleUpdateQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onResetToDefault={() => setConfirmAction('resetBank')}
            onImportQuestions={handleImportQuestions}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Diagnóstico Matemático</span>
            <span aria-hidden="true">·</span>
            <span>Aritmética, Geometría, Trigonometría, Álgebra y Cálculo</span>
          </div>
          <div>
            <span>Evaluación de Habilidades Básicas, Razonamiento, Especiales y Análisis</span>
          </div>
        </div>
      </footer>

      {/* In-app Confirmation Modal (replaces window.confirm) */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {confirmAction === 'resetTest'
                    ? '¿Reiniciar respuestas del test?'
                    : '¿Restablecer banco de preguntas?'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {confirmAction === 'resetTest'
                    ? 'Se limpiarán tus respuestas actuales y el reporte diagnóstico para comenzar una nueva evaluación desde cero.'
                    : 'Se restaurarán las 20 preguntas originales del examen y se eliminarán las preguntas personalizadas o importadas.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={executeConfirmedAction}
                className={`px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer ${
                  confirmAction === 'resetBank'
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-sky-600 hover:bg-sky-700'
                }`}
              >
                {confirmAction === 'resetTest' ? 'Sí, reiniciar test' : 'Sí, restablecer banco'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
