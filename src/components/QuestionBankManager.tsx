import React, { useState, useRef } from 'react';
import {
  Database,
  Plus,
  Trash2,
  RotateCcw,
  Download,
  Upload,
  Filter,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Pencil,
  AlertCircle,
  X,
  Search
} from 'lucide-react';
import { Question, KnowledgeArea, SkillArea, DifficultyLevel } from '../types';
import { DiagramRenderer } from './DiagramRenderer';

const VALID_SABERES: KnowledgeArea[] = [
  'Aritmética',
  'Álgebra',
  'Geometría',
  'Trigonometría',
  'Cálculo'
];

const VALID_SKILLS: SkillArea[] = [
  'Habilidades básicas',
  'Procesos de pensamiento y razonamiento',
  'Habilidades especiales',
  'Habilidades de análisis'
];

const VALID_DIFFICULTIES: DifficultyLevel[] = ['Básico', 'Intermedio', 'Avanzado'];

interface QuestionBankManagerProps {
  questions: Question[];
  onAddQuestions: (newQuestions: Question[]) => void;
  onUpdateQuestion: (updatedQuestion: Question) => void;
  onDeleteQuestion: (questionId: string) => void;
  onResetToDefault: () => void;
  onImportQuestions: (imported: Question[], mode: 'append' | 'replace') => void;
}

const SAMPLE_BONUS_QUESTIONS: Omit<Question, 'number'>[] = [
  {
    id: 'bonus-arit-1',
    prompt:
      'Un tanque de agua se llena hasta los 3/5 de su capacidad. Si se extraen 120 litros y queda lleno hasta la mitad (1/2) de su capacidad total, ¿cuál es la capacidad total del tanque?',
    saber: 'Aritmética',
    habilidad: 'Procesos de pensamiento y razonamiento',
    difficulty: 'Intermedio',
    options: [
      { label: 'a', text: '960 litros' },
      { label: 'b', text: '1.000 litros' },
      { label: 'c', text: '1.200 litros' },
      { label: 'd', text: '1.500 litros' }
    ],
    correctAnswer: 'c',
    explanation:
      'Planteamos la diferencia de fracciones respecto a la capacidad total C:\n(3/5)C - (1/2)C = 120\n(6/10 - 5/10)C = 120  ⇒  (1/10)C = 120  ⇒  C = 1.200 litros.',
    hint: 'Calcula qué fracción del tanque representan los 120 litros extraídos restando 3/5 - 1/2.',
    isCustom: true
  },
  {
    id: 'bonus-alg-1',
    prompt:
      'Al resolver el sistema de ecuaciones lineales:\n2x + y = 11\nx - y = 1\n¿Cuál es el valor de x + 2y?',
    saber: 'Álgebra',
    habilidad: 'Habilidades básicas',
    difficulty: 'Intermedio',
    options: [
      { label: 'a', text: '7' },
      { label: 'b', text: '10' },
      { label: 'c', text: '11' },
      { label: 'd', text: '14' }
    ],
    correctAnswer: 'b',
    explanation:
      'Sumando ambas ecuaciones se elimina y: (2x + y) + (x - y) = 11 + 1 ⇒ 3x = 12 ⇒ x = 4.\nSustituyendo en x - y = 1 obtenemos 4 - y = 1 ⇒ y = 3.\nFinalmente: x + 2y = 4 + 2(3) = 4 + 6 = 10.',
    hint: 'Suma directamente las dos ecuaciones para eliminar la variable y.',
    isCustom: true
  },
  {
    id: 'bonus-geom-1',
    prompt:
      'El área total de un cono circular recto de radio basal r = 3 cm y generatriz g = 5 cm es:',
    saber: 'Geometría',
    habilidad: 'Habilidades especiales',
    difficulty: 'Intermedio',
    options: [
      { label: 'a', text: '15π cm²' },
      { label: 'b', text: '24π cm²' },
      { label: 'c', text: '30π cm²' },
      { label: 'd', text: '36π cm²' }
    ],
    correctAnswer: 'b',
    explanation:
      'Área total = Área basal + Área lateral = π·r² + π·r·g.\nÁrea basal = π·(3)² = 9π cm².\nÁrea lateral = π·(3)·(5) = 15π cm².\nÁrea total = 9π + 15π = 24π cm².',
    hint: 'Suma el área del círculo basal (π·r²) más el área lateral (π·r·g).',
    isCustom: true
  },
  {
    id: 'bonus-trig-1',
    prompt:
      'Si sen(x) = 3/5 y el ángulo x está en el primer cuadrante, ¿cuál es el valor exacto de tan(x)?',
    saber: 'Trigonometría',
    habilidad: 'Habilidades de análisis',
    difficulty: 'Básico',
    options: [
      { label: 'a', text: '3/4' },
      { label: 'b', text: '4/3' },
      { label: 'c', text: '4/5' },
      { label: 'd', text: '5/4' }
    ],
    correctAnswer: 'a',
    explanation:
      'En el triángulo rectángulo con cateto opuesto = 3 e hipotenusa = 5, el cateto adyacente es √(5² - 3²) = √16 = 4.\nPor tanto, tan(x) = opuesto / adyacente = 3/4.',
    hint: 'Recuerda el triángulo pitagórico 3-4-5 y la razón tan(x) = opuesto / adyacente.',
    isCustom: true
  },
  {
    id: 'bonus-calc-1',
    prompt:
      '¿Cuál es la derivada de la función f(x) = 3x⁴ - 5x² + 7x - 9 respecto a x?',
    saber: 'Cálculo',
    habilidad: 'Habilidades de análisis',
    difficulty: 'Intermedio',
    options: [
      { label: 'a', text: "f'(x) = 12x³ - 10x + 7" },
      { label: 'b', text: "f'(x) = 12x⁴ - 10x² + 7" },
      { label: 'c', text: "f'(x) = 7x³ - 10x + 7" },
      { label: 'd', text: "f'(x) = 12x³ - 5x + 7" }
    ],
    correctAnswer: 'a',
    explanation:
      "Aplicando la regla de la potencia d/dx(xⁿ) = n·xⁿ⁻¹:\nd/dx(3x⁴) = 12x³, d/dx(-5x²) = -10x, d/dx(7x) = 7, d/dx(-9) = 0.\nPor lo tanto f'(x) = 12x³ - 10x + 7.",
    hint: 'Multiplica cada coeficiente por su exponente y réstale 1 al exponente; la derivada de una constante es 0.',
    isCustom: true
  }
];

function validateImportedQuestions(raw: unknown): {
  valid: Question[];
  rejectedCount: number;
} {
  if (!Array.isArray(raw)) {
    return { valid: [], rejectedCount: 0 };
  }

  const valid: Question[] = [];
  let rejectedCount = 0;

  raw.forEach((item, idx) => {
    if (!item || typeof item !== 'object') {
      rejectedCount++;
      return;
    }
    const obj = item as Record<string, unknown>;
    const prompt = typeof obj.prompt === 'string' ? obj.prompt.trim() : '';
    const saber = obj.saber as KnowledgeArea;
    const habilidad = obj.habilidad as SkillArea;
    const difficulty = VALID_DIFFICULTIES.includes(obj.difficulty as DifficultyLevel)
      ? (obj.difficulty as DifficultyLevel)
      : 'Intermedio';
    const correctAnswer = obj.correctAnswer as 'a' | 'b' | 'c' | 'd';

    if (
      !prompt ||
      !VALID_SABERES.includes(saber) ||
      !VALID_SKILLS.includes(habilidad) ||
      !['a', 'b', 'c', 'd'].includes(correctAnswer) ||
      !Array.isArray(obj.options) ||
      obj.options.length !== 4
    ) {
      rejectedCount++;
      return;
    }

    const expectedLabels: ('a' | 'b' | 'c' | 'd')[] = ['a', 'b', 'c', 'd'];
    const normalizedOptions: Question['options'] = [];
    let optionsOk = true;

    for (let i = 0; i < 4; i++) {
      const rawOpt = obj.options[i] as Record<string, unknown> | undefined;
      const optText = rawOpt && typeof rawOpt.text === 'string' ? rawOpt.text.trim() : '';
      const optLabel =
        rawOpt && ['a', 'b', 'c', 'd'].includes(rawOpt.label as string)
          ? (rawOpt.label as 'a' | 'b' | 'c' | 'd')
          : expectedLabels[i];

      if (!optText) {
        optionsOk = false;
        break;
      }

      normalizedOptions.push({
        label: optLabel,
        text: optText,
        subtext: typeof rawOpt?.subtext === 'string' ? rawOpt.subtext : undefined
      });
    }

    const labelSet = new Set(normalizedOptions.map(o => o.label));
    if (!optionsOk || labelSet.size !== 4) {
      rejectedCount++;
      return;
    }

    valid.push({
      id:
        typeof obj.id === 'string' && obj.id.trim()
          ? obj.id.trim()
          : `import-${Date.now()}-${idx}`,
      number: idx + 1,
      prompt,
      saber,
      habilidad,
      difficulty,
      diagramType: typeof obj.diagramType === 'string' ? (obj.diagramType as Question['diagramType']) : undefined,
      options: normalizedOptions,
      correctAnswer,
      explanation:
        typeof obj.explanation === 'string' && obj.explanation.trim()
          ? obj.explanation.trim()
          : 'Solución importada desde archivo JSON.',
      hint: typeof obj.hint === 'string' && obj.hint.trim() ? obj.hint.trim() : undefined,
      isCustom: typeof obj.isCustom === 'boolean' ? obj.isCustom : true
    });
  });

  return { valid, rejectedCount };
}

export const QuestionBankManager: React.FC<QuestionBankManagerProps> = ({
  questions,
  onAddQuestions,
  onUpdateQuestion,
  onDeleteQuestion,
  onResetToDefault,
  onImportQuestions
}) => {
  const [selectedSaber, setSelectedSaber] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Modal state for create / edit
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Inline feedback banner (replaces window.alert)
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'info' | 'error';
    text: string;
  } | null>(null);

  // Import preview confirmation modal (choose append vs replace)
  const [pendingImport, setPendingImport] = useState<{
    valid: Question[];
    rejectedCount: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form fields
  const [prompt, setPrompt] = useState('');
  const [saber, setSaber] = useState<KnowledgeArea>('Aritmética');
  const [habilidad, setHabilidad] = useState<SkillArea>('Habilidades básicas');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermedio');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<'a' | 'b' | 'c' | 'd'>('a');
  const [explanation, setExplanation] = useState('');
  const [hint, setHint] = useState('');

  const resetForm = () => {
    setPrompt('');
    setSaber('Aritmética');
    setHabilidad('Habilidades básicas');
    setDifficulty('Intermedio');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setCorrectAnswer('a');
    setExplanation('');
    setHint('');
    setFormError(null);
    setEditingQuestion(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (q: Question) => {
    setEditingQuestion(q);
    setPrompt(q.prompt);
    setSaber(q.saber);
    setHabilidad(q.habilidad);
    setDifficulty(q.difficulty);
    setOptA(q.options.find(o => o.label === 'a')?.text || '');
    setOptB(q.options.find(o => o.label === 'b')?.text || '');
    setOptC(q.options.find(o => o.label === 'c')?.text || '');
    setOptD(q.options.find(o => o.label === 'd')?.text || '');
    setCorrectAnswer(q.correctAnswer);
    setExplanation(q.explanation);
    setHint(q.hint || '');
    setFormError(null);
    setShowModal(true);
  };

  const filteredQuestions = questions.filter(q => {
    if (selectedSaber !== 'all' && q.saber !== selectedSaber) return false;
    if (selectedSkill !== 'all' && q.habilidad !== selectedSkill) return false;
    if (searchQuery.trim()) {
      const needle = searchQuery.toLowerCase();
      const haystack = `${q.number} ${q.prompt} ${q.saber} ${q.habilidad} ${q.options.map(o => o.text).join(' ')}`.toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !optA.trim() || !optB.trim() || !optC.trim() || !optD.trim()) {
      setFormError('Por favor completa el enunciado y las 4 opciones de respuesta (a, b, c, d).');
      return;
    }

    const basePayload = {
      prompt: prompt.trim(),
      saber,
      habilidad,
      difficulty,
      options: [
        { label: 'a' as const, text: optA.trim() },
        { label: 'b' as const, text: optB.trim() },
        { label: 'c' as const, text: optC.trim() },
        { label: 'd' as const, text: optD.trim() }
      ],
      correctAnswer,
      explanation:
        explanation.trim() || 'Solución y justificación matemática cargada por el docente.',
      hint: hint.trim() || undefined
    };

    if (editingQuestion) {
      onUpdateQuestion({
        ...editingQuestion,
        ...basePayload
      });
      setStatusMessage({
        type: 'success',
        text: `Pregunta #${editingQuestion.number} actualizada correctamente.`
      });
    } else {
      const newQ: Question = {
        id: `custom-${Date.now()}`,
        number: questions.length + 1,
        ...basePayload,
        isCustom: true
      };
      onAddQuestions([newQ]);
      setStatusMessage({
        type: 'success',
        text: `Nueva pregunta añadida al banco en la posición #${questions.length + 1}.`
      });
    }

    setShowModal(false);
    resetForm();
  };

  const handleAddSampleQuestions = () => {
    const missingSamples = SAMPLE_BONUS_QUESTIONS.filter(
      bonus => !questions.some(q => q.id === bonus.id)
    );

    if (missingSamples.length === 0) {
      setStatusMessage({
        type: 'info',
        text: 'Las 5 preguntas muestra (una por cada saber) ya están activas en el banco.'
      });
      return;
    }

    const batch: Question[] = missingSamples.map((bonus, idx) => ({
      ...bonus,
      number: questions.length + idx + 1
    }));

    onAddQuestions(batch);
    setStatusMessage({
      type: 'success',
      text: `Se añadieron ${batch.length} preguntas muestra cubriendo Aritmética, Álgebra, Geometría, Trigonometría y Cálculo.`
    });
  };

  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `banco_preguntas_matematicas_${questions.length}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setStatusMessage({
      type: 'info',
      text: `Se exportaron ${questions.length} preguntas en formato JSON.`
    });
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset input value so the same file can be re-selected later
    e.target.value = '';
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const { valid, rejectedCount } = validateImportedQuestions(parsed);

        if (valid.length === 0) {
          setStatusMessage({
            type: 'error',
            text: 'El archivo JSON no contiene preguntas válidas. Verifica que cada pregunta incluya enunciado, saber, habilidad, 4 opciones (a-d) y respuesta correcta.'
          });
          return;
        }

        setPendingImport({ valid, rejectedCount });
      } catch {
        setStatusMessage({
          type: 'error',
          text: 'No se pudo leer el archivo JSON. Verifica que la sintaxis del archivo sea válida.'
        });
      }
    };
    reader.readAsText(file);
  };

  const confirmImport = (mode: 'append' | 'replace') => {
    if (!pendingImport) return;
    onImportQuestions(pendingImport.valid, mode);
    setStatusMessage({
      type: 'success',
      text:
        mode === 'append'
          ? `Se integraron ${pendingImport.valid.length} preguntas al banco actual${
              pendingImport.rejectedCount > 0
                ? ` (${pendingImport.rejectedCount} omitidas por formato incompleto)`
                : ''
            }.`
          : `El banco fue reemplazado por ${pendingImport.valid.length} preguntas importadas.`
    });
    setPendingImport(null);
  };

  // Summary counts by Saber for quick inspection
  const saberDistribution = VALID_SABERES.map(s => ({
    saber: s,
    count: questions.filter(q => q.saber === s).length
  }));

  const pendingSamplesCount = SAMPLE_BONUS_QUESTIONS.filter(
    bonus => !questions.some(q => q.id === bonus.id)
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Inline Status Feedback Banner */}
      {statusMessage && (
        <div
          role="status"
          className={`rounded-xl px-4 py-3 border text-xs sm:text-sm flex items-center justify-between gap-3 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : statusMessage.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-900'
              : 'bg-sky-50 border-sky-200 text-sky-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {statusMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            ) : (
              <CheckCircle2
                className={`w-4 h-4 shrink-0 ${
                  statusMessage.type === 'success' ? 'text-emerald-600' : 'text-sky-600'
                }`}
              />
            )}
            <span className="font-medium">{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="p-1 rounded-md hover:bg-black/5 cursor-pointer"
            aria-label="Cerrar notificación"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium tracking-wide">
              <span>Alimentador del Banco de Preguntas</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">Total: {questions.length} Preguntas Activas</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1 flex items-center gap-2.5">
              <Database className="w-6 h-6 text-sky-600 shrink-0" />
              <span>Gestión y Alimentación del Banco de Preguntas</span>
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              La evaluación inicial incluye las 20 preguntas base. Puedes inspeccionar cada ítem con su diagrama y solución, agregar preguntas nuevas, cargar el paquete muestra o importar/exportar en JSON.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Nueva Pregunta</span>
            </button>

            <button
              onClick={handleAddSampleQuestions}
              className="px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Añadir 5 preguntas muestra equilibradas (una por cada saber)"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>
                {pendingSamplesCount > 0
                  ? `+${pendingSamplesCount} Preguntas Muestra`
                  : 'Muestras Cargadas'}
              </span>
            </button>

            <button
              onClick={handleExportJSON}
              className="p-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Exportar banco completo a JSON"
              aria-label="Exportar banco a JSON"
            >
              <Download className="w-4 h-4" />
            </button>

            <label
              className="p-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
              title="Importar banco desde JSON"
              aria-label="Importar banco desde JSON"
            >
              <Upload className="w-4 h-4" />
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>

            <button
              onClick={onResetToDefault}
              className="p-2.5 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
              title="Restablecer a las 20 preguntas oficiales originales"
              aria-label="Restablecer banco original"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Distribution Summary Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px]">
            Distribución por saber:
          </span>
          {saberDistribution.map(item => (
            <button
              key={item.saber}
              onClick={() =>
                setSelectedSaber(prev => (prev === item.saber ? 'all' : item.saber))
              }
              className={`cursor-pointer transition-colors ${
                selectedSaber === item.saber
                  ? 'text-sky-700 font-bold underline underline-offset-4'
                  : 'hover:text-slate-900'
              }`}
            >
              {item.saber}: <strong className="tabular-nums text-slate-900">{item.count}</strong>
            </button>
          ))}
        </div>

        {/* Filter controls */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por enunciado o número..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Saber:</span>
            <select
              value={selectedSaber}
              onChange={e => setSelectedSaber(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800"
            >
              <option value="all">Todos los saberes</option>
              {VALID_SABERES.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span>Habilidad:</span>
            <select
              value={selectedSkill}
              onChange={e => setSelectedSkill(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800"
            >
              <option value="all">Todas las habilidades</option>
              {VALID_SKILLS.map(sk => (
                <option key={sk} value={sk}>
                  {sk}
                </option>
              ))}
            </select>
          </div>

          <span className="text-xs text-slate-400 ml-auto tabular-nums">
            Mostrando {filteredQuestions.length} de {questions.length} preguntas
          </span>
        </div>
      </div>

      {/* Questions List with Expandable Preview */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-2">
          <p className="text-sm font-semibold text-slate-800">
            No se encontraron preguntas con esos filtros.
          </p>
          <button
            onClick={() => {
              setSelectedSaber('all');
              setSelectedSkill('all');
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 cursor-pointer"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredQuestions.map(q => {
            const isExpanded = expandedId === q.id;
            const correctOpt = q.options.find(o => o.label === q.correctAnswer);

            return (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-xl shadow-2xs hover:border-slate-300 transition-colors overflow-hidden"
              >
                <div className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 font-bold text-xs text-slate-700 flex items-center justify-center shrink-0 tabular-nums">
                      {q.number}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 mb-1">
                        <span className="font-semibold text-sky-700">{q.saber}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-600">{q.habilidad}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-400">{q.difficulty}</span>
                        {q.diagramType && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-slate-500">Incluye gráfico</span>
                          </>
                        )}
                        {q.isCustom && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-amber-700 font-semibold">Agregada al banco</span>
                          </>
                        )}
                      </div>

                      <p className="text-sm font-medium text-slate-900 leading-snug line-clamp-2">
                        {q.prompt}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1.5">
                        <span>
                          Respuesta correcta:{' '}
                          <strong className="uppercase text-emerald-700">{q.correctAnswer}</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate max-w-md">{correctOpt?.text}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Ocultar' : 'Ver detalle'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {q.isCustom && (
                      <>
                        <button
                          onClick={() => openEditModal(q)}
                          className="p-2 text-slate-500 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                          title="Editar pregunta"
                          aria-label={`Editar pregunta ${q.number}`}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            onDeleteQuestion(q.id);
                            setStatusMessage({
                              type: 'info',
                              text: `Pregunta #${q.number} eliminada y numeración actualizada.`
                            });
                          }}
                          className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Eliminar pregunta"
                          aria-label={`Eliminar pregunta ${q.number}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Expanded Detail Preview */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-4 bg-slate-50/70 border-t border-slate-100 space-y-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Enunciado completo
                      </span>
                      <p className="text-sm text-slate-900 whitespace-pre-line leading-relaxed">
                        {q.prompt}
                      </p>
                    </div>

                    {q.diagramType && (
                      <div className="max-w-xl">
                        <DiagramRenderer diagramType={q.diagramType} showSolution={true} />
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map(opt => {
                        const isRight = opt.label === q.correctAnswer;
                        return (
                          <div
                            key={opt.label}
                            className={`p-2.5 rounded-lg border text-xs flex items-center gap-2.5 ${
                              isRight
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                                : 'bg-white border-slate-200 text-slate-700'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold uppercase shrink-0 ${
                                isRight
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {opt.label}
                            </span>
                            <span className="flex-1">{opt.text}</span>
                            {isRight && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-3.5 text-xs text-slate-700 space-y-1.5">
                      <span className="font-bold text-slate-900 block">
                        Solución y justificación:
                      </span>
                      <p className="whitespace-pre-line leading-relaxed">{q.explanation}</p>
                      {q.hint && (
                        <p className="text-amber-800 pt-1.5 border-t border-slate-100">
                          <strong>Pista:</strong> {q.hint}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal to Create / Edit Question */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                  {editingQuestion ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingQuestion
                      ? `Editar Pregunta #${editingQuestion.number}`
                      : 'Alimentar con Nueva Pregunta'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingQuestion
                      ? 'Actualiza el enunciado, clasificación u opciones de esta pregunta.'
                      : 'Agrega un ítem al banco de diagnóstico y evaluación.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveQuestion} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Enunciado o Pregunta *
                </label>
                <textarea
                  required
                  rows={2}
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="Ej: Calcule el valor de x en la ecuación lineal..."
                  className="w-full p-3 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Saber / Conocimiento *
                  </label>
                  <select
                    value={saber}
                    onChange={e => setSaber(e.target.value as KnowledgeArea)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                  >
                    {VALID_SABERES.map(s => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Habilidad Cognitiva *
                  </label>
                  <select
                    value={habilidad}
                    onChange={e => setHabilidad(e.target.value as SkillArea)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                  >
                    {VALID_SKILLS.map(sk => (
                      <option key={sk} value={sk}>
                        {sk}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Dificultad *
                  </label>
                  <select
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value as DifficultyLevel)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm"
                  >
                    {VALID_DIFFICULTIES.map(d => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Opciones de Respuesta (a, b, c, d) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { label: 'a', value: optA, setter: setOptA },
                    { label: 'b', value: optB, setter: setOptB },
                    { label: 'c', value: optC, setter: setOptC },
                    { label: 'd', value: optD, setter: setOptD }
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-slate-100 text-xs font-bold flex items-center justify-center shrink-0">
                        {item.label}
                      </span>
                      <input
                        required
                        type="text"
                        placeholder={`Opción ${item.label}`}
                        value={item.value}
                        onChange={e => item.setter(e.target.value)}
                        className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Respuesta Correcta *
                </label>
                <div className="flex items-center gap-4">
                  {(['a', 'b', 'c', 'd'] as const).map(letter => (
                    <label
                      key={letter}
                      className="flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="correctAnswer"
                        value={letter}
                        checked={correctAnswer === letter}
                        onChange={() => setCorrectAnswer(letter)}
                        className="text-sky-600"
                      />
                      <span className="uppercase font-bold">Opción {letter}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Explicación Matemática / Solución Paso a Paso
                </label>
                <textarea
                  rows={2}
                  value={explanation}
                  onChange={e => setExplanation(e.target.value)}
                  placeholder="Detalla el procedimiento algebraico o geométrico..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pista Opcional
                </label>
                <input
                  type="text"
                  value={hint}
                  onChange={e => setHint(e.target.value)}
                  placeholder="Consejo orientativo para el estudiante..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  {editingQuestion ? 'Guardar Cambios' : 'Guardar y Añadir a la Prueba'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Confirmation Modal (Append vs Replace) */}
      {pendingImport && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Importar {pendingImport.valid.length} preguntas válidas
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Elige si deseas sumarlas al banco actual o reemplazar todas las preguntas.
                </p>
              </div>
              <button
                onClick={() => setPendingImport(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                aria-label="Cancelar importación"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {pendingImport.rejectedCount > 0 && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                Se omitieron {pendingImport.rejectedCount} registros del archivo por no cumplir con la estructura requerida.
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                onClick={() => confirmImport('append')}
                className="flex-1 px-4 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors cursor-pointer"
              >
                Añadir al banco actual
              </button>
              <button
                onClick={() => confirmImport('replace')}
                className="flex-1 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Reemplazar banco
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
